import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json(
        { ok: false, error: "URL is required" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const images = await page.evaluate(() => {
      const imgElements = document.querySelectorAll("img");
      const imgUrls = [];
      imgElements.forEach((img) => {
        if (img.src && img.src.includes("scontent")) {
          imgUrls.push(img.src);
        }
      });
      return Array.from(new Set(imgUrls));
    });

    await browser.close();
    return NextResponse.json({
      ok: true,
      type: "images",
      images: images,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
