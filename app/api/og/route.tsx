import type { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { getMatchResult } from "@/lib/calculator";

export const runtime = "nodejs";

const W = 1200;
const H = 630;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function monsterPng(imagePath: string, size: number): Promise<Buffer | null> {
  try {
    const raw = await readFile(join(process.cwd(), "public", imagePath));
    let png: Buffer = raw;
    if (imagePath.endsWith(".svg")) {
      const text = raw.toString("utf-8");
      const match = /data:image\/png;base64,([A-Za-z0-9+/=]+)/.exec(text);
      if (match == null) return null;
      png = Buffer.from(match[1], "base64");
    }
    return await sharp(png)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
  } catch {
    return null;
  }
}

function shell(inner: string): Buffer {
  return Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">` +
      `<rect x="6" y="6" width="${W - 12}" height="${H - 12}" fill="none" stroke="#ff9d00" stroke-width="12"/>` +
      inner +
      `</svg>`,
  );
}

function text(
  x: number,
  y: number,
  size: number,
  fill: string,
  content: string,
  bold = false,
): string {
  return (
    `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ` +
    `text-anchor="middle" font-family="sans-serif"${bold ? " font-weight=\"bold\"" : ""}>` +
    `${esc(content)}</text>`
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const n1 = (searchParams.get("n1") ?? "").trim().slice(0, 20);
  const n2 = (searchParams.get("n2") ?? "").trim().slice(0, 20);

  const base = sharp({
    create: { width: W, height: H, channels: 4, background: "#000000" },
  });

  if (!n1 || !n2) {
    const overlay = shell(
      text(600, 300, 96, "#ff9d00", "할로윈 몬스터 짝꿍 테스트", true) +
        text(600, 380, 44, "#ffffff", "이름으로 알아보는 몬스터 궁합"),
    );
    const png = await base.composite([{ input: overlay }]).png().toBuffer();
    return new Response(new Uint8Array(png), {
      headers: {
        "content-type": "image/png",
        "cache-control": "public, max-age=86400",
      },
    });
  }

  const result = getMatchResult(n1, n2);
  const [img1, img2] = await Promise.all([
    monsterPng(result.monster1.imagePath, 300),
    monsterPng(result.monster2.imagePath, 300),
  ]);

  const overlay = shell(
    text(600, 105, 56, "#ff9d00", "할로윈 몬스터 짝꿍 테스트", true) +
      text(600, 350, 150, "#ff9d00", `${result.score}%`, true) +
      text(290, 470, 40, "#ffffff", `${n1.slice(0, 8)} · ${result.monster1.name}`) +
      text(910, 470, 40, "#ffffff", `${n2.slice(0, 8)} · ${result.monster2.name}`) +
      text(600, 575, 52, "#ffffff", result.chemiTitle),
  );

  const layers: { input: Buffer; left?: number; top?: number }[] = [
    { input: overlay },
  ];
  if (img1 != null) layers.push({ input: img1, left: 140, top: 140 });
  if (img2 != null) layers.push({ input: img2, left: 760, top: 140 });

  const png = await base.composite(layers).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=86400",
    },
  });
}
