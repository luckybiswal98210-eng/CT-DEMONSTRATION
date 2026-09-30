import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";

const SECTIONS = [
  { id: "hero", title: "00 · Intro" },
  { id: "problem", title: "01 · The Problem" },
  { id: "why-s3", title: "02 · Why Amazon S3" },
  { id: "architecture", title: "03 · Architecture" },
  { id: "inside-bucket", title: "04 · Inside S3" },
  { id: "upload", title: "05 · Upload Flow" },
  { id: "download", title: "06 · Download Flow" },
  { id: "security", title: "07 · Security" },
  { id: "lifecycle", title: "08 · Backup & Lifecycle" },
  { id: "performance", title: "09 · Scalability" },
  { id: "cost", title: "10 · Cost Model" },
  { id: "simulation", title: "11 · Live Demo" },
  { id: "real-world", title: "12 · One Request" },
  { id: "pros-cons", title: "13 · Trade-offs" },
  { id: "conclusion", title: "14 · Conclusion" }
];

async function main() {
  console.log("=== Generating Cloud Storage using Amazon S3 Presentation PDF ===");
  const port = 9460;
  const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--window-size=1920,1080",
    "--hide-scrollbars",
    "--enable-gpu",
    "--no-sandbox",
    "about:blank"
  ]);

  let pageInfo = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/new`, { method: "PUT" });
      pageInfo = await res.json();
      if (pageInfo?.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  if (!pageInfo?.webSocketDebuggerUrl) {
    console.error("Could not connect to Chrome debugger");
    chrome.kill();
    return;
  }

  const ws = new WebSocket(pageInfo.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let reqId = 1;
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = reqId++;
      const handler = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === id) {
          ws.removeEventListener("message", handler);
          if (d.error) reject(d.error);
          else resolve(d.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
    mobile: false
  });

  const url = "https://ct-demonstration.vercel.app?_vercel_share=Zs70XctTeUbQsr52dDQDIJNkBBsNMrv2";
  console.log("Navigating to URL:", url);
  await send("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 4500));

  console.log("Preparing page styles, images, and fonts...");
  await send("Runtime.evaluate", {
    expression: `
      (async () => {
        // Eager load all images
        document.querySelectorAll('img').forEach(img => {
          img.removeAttribute('loading');
          img.loading = 'eager';
        });

        // Wait for all images to decode
        await Promise.all(Array.from(document.images).map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise(r => {
            img.addEventListener('load', r, { once: true });
            img.addEventListener('error', r, { once: true });
            setTimeout(r, 4000);
          });
        }));

        if (document.fonts) {
          await document.fonts.ready;
        }

        // Hide floating chrome
        const hideSelectors = [
          '[data-testid="floating-section-nav"]',
          '[data-testid="scroll-progress-bar"]',
          '[data-testid="fullscreen-toggle"]',
          '[data-testid="presentation-mode-toggle"]',
          'div.fixed.bottom-5.right-5'
        ];
        hideSelectors.forEach(sel => {
          document.querySelectorAll(sel).forEach(el => el.style.display = 'none');
        });

        // Force all animations to complete state
        document.querySelectorAll('*').forEach(el => {
          el.style.animation = 'none';
          el.style.transition = 'none';
          const inlineStyle = el.getAttribute('style') || '';
          if (inlineStyle.includes('opacity: 0')) {
            el.style.opacity = '1';
          }
          if (inlineStyle.includes('transform:') && inlineStyle.includes('translateY')) {
            el.style.transform = 'none';
          }
        });

        // Specific to MaskedLine
        document.querySelectorAll('.block.overflow-hidden > *').forEach(el => {
          el.style.transform = 'none';
          el.style.opacity = '1';
        });

        // Solid yellow indicator
        const yellowDot = document.querySelector('.bg-\\\\[\\\\#FACC15\\\\]');
        if (yellowDot) {
          yellowDot.style.opacity = '1';
          yellowDot.style.backgroundColor = '#FACC15';
        }

        // Add compact section styling for slides
        const style = document.createElement('style');
        style.id = 'pdf-slide-styles';
        style.textContent = \`
          body {
            background-color: #070c18 !important;
          }
          section {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }
        \`;
        document.head.appendChild(style);
      })()
    `,
    awaitPromise: true
  });

  await new Promise((r) => setTimeout(r, 1500));

  // Create temporary slide directory
  const tempDir = path.join(process.cwd(), ".slide_temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const capturedImages = [];

  for (let i = 0; i < SECTIONS.length; i++) {
    const { id, title } = SECTIONS[i];
    console.log(`[Slide ${i + 1}/${SECTIONS.length}] Capturing ${title} (#${id})...`);

    const elInfo = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const el = document.getElementById('${id}');
          if (!el) return null;
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
          const r = el.getBoundingClientRect();
          return {
            x: 0,
            y: window.scrollY + r.top,
            width: 1920,
            height: Math.max(1080, Math.ceil(r.height))
          };
        })()
      `,
      returnByValue: true
    });

    if (!elInfo.result.value) {
      console.warn(`Could not find #${id}`);
      continue;
    }

    // Brief settle time for Three.js/WebGL render frames
    await new Promise((r) => setTimeout(r, 600));

    const rect = elInfo.result.value;
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      clip: {
        x: 0,
        y: rect.y,
        width: 1920,
        height: rect.height,
        scale: 1
      },
      captureBeyondViewport: true
    });

    const imgPath = path.join(tempDir, `slide_${String(i).padStart(2, "0")}_${id}.png`);
    fs.writeFileSync(imgPath, Buffer.from(shot.data, "base64"));
    capturedImages.push({ imgPath, rect });
  }

  ws.close();
  chrome.kill();

  console.log(`\nAssembling ${capturedImages.length} slides into 16:9 Presentation PDF...`);
  const pdfDoc = await PDFDocument.create();

  // Widescreen 16:9 dimensions: 1920 x 1080 pt
  const SLIDE_WIDTH = 1920;
  const SLIDE_HEIGHT = 1080;
  const BG_COLOR = rgb(7 / 255, 12 / 255, 24 / 255); // #070c18

  for (let i = 0; i < capturedImages.length; i++) {
    const { imgPath } = capturedImages[i];
    const imgBytes = fs.readFileSync(imgPath);
    const pngImage = await pdfDoc.embedPng(imgBytes);

    const imgWidth = pngImage.width;
    const imgHeight = pngImage.height;

    // Calculate proportional fit within 1920 x 1080
    const scale = Math.min(SLIDE_WIDTH / imgWidth, SLIDE_HEIGHT / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;

    const x = (SLIDE_WIDTH - renderWidth) / 2;
    const y = (SLIDE_HEIGHT - renderHeight) / 2;

    const page = pdfDoc.addPage([SLIDE_WIDTH, SLIDE_HEIGHT]);

    // Draw dark presentation background
    page.drawRectangle({
      x: 0,
      y: 0,
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      color: BG_COLOR
    });

    // Draw high-resolution slide image
    page.drawImage(pngImage, {
      x,
      y,
      width: renderWidth,
      height: renderHeight
    });
  }

  // Set PDF metadata
  pdfDoc.setTitle("Cloud Storage using Amazon S3 — Case Study Presentation");
  pdfDoc.setAuthor("Lucky Biswal");
  pdfDoc.setSubject("College Management System Cloud Storage Case Study");
  pdfDoc.setKeywords(["Amazon S3", "Cloud Storage", "Lucky Biswal", "Architecture", "Presentation"]);

  const pdfBytes = await pdfDoc.save();

  // Output paths
  const rootPdfPath = path.join(process.cwd(), "Cloud-Storage-using-Amazon-S3.pdf");
  const publicPdfPath = path.join(process.cwd(), "public", "Amazon-S3-Presentation.pdf");

  fs.writeFileSync(rootPdfPath, pdfBytes);
  fs.writeFileSync(publicPdfPath, pdfBytes);

  console.log(`\nSUCCESS! Generated presentation PDF:`);
  console.log(`1. Root: ${rootPdfPath} (${(pdfBytes.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`2. Public: ${publicPdfPath}`);

  // Cleanup temp files
  for (const item of capturedImages) {
    if (fs.existsSync(item.imgPath)) fs.unlinkSync(item.imgPath);
  }
  if (fs.existsSync(tempDir)) fs.rmdirSync(tempDir);
}

main().catch(console.error);
