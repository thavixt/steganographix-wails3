import type { RefObject } from "react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LogService } from "../../bindings/github.com/thavixt/steganographix-wails3";
import { CanvasToBMP } from "@/logic/CanvasToBmp";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function base64ToBytes(base64: string): number[] {
  const binaryString = atob(base64);
  return Array.from(binaryString, char => char.charCodeAt(0));
}

export function clearCanvas(canvas: HTMLCanvasElement | null) {
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function resizeCanvas(canvas: HTMLCanvasElement | null, width: number, height: number) {
  if (!canvas) {
    return;
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export const scrollToElement = (ref: RefObject<HTMLElement | null> | HTMLElement, offset = 64) => {
  let element: HTMLElement | null = null;
  if ('current' in ref) {
    element = ref.current;
  } else {
    element = ref;
  }
  if (!element) {
    return;
  }
  window.scrollTo({
    top: element.offsetTop - offset,
    behavior: 'smooth'
  });
};

export function downloadCanvasToPng(
  canvas: HTMLCanvasElement | null,
  filename?: string,
) {
  if (!canvas) {
    console.warn('[downloadCanvasImage] canvas not present');
    return;
  }

  const uuid = crypto.randomUUID().slice(0, 8);
  const outputFileName = filename ?? `steganographix-${uuid}`;
  const url = canvas.toDataURL(`image/png`, 1);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${outputFileName}.png`;
  // a.hidden = true;
  // document.body.appendChild(a);
  console.warn(`[downloadCanvasImage] downloading ${outputFileName}.png`);
  LogService.Log(`[downloadCanvasImage] ${url.toString()}`);
  link.click();
}

export function downloadCanvasToBmp(
  canvas: HTMLCanvasElement | null,
  filename?: string,
) {
  if (!canvas) {
    console.warn('[downloadCanvasImage] canvas not present');
    return;
  }

  const uuid = crypto.randomUUID().slice(0, 8);
  const outputFileName = filename ?? `steganographix-${uuid}`;
  const url = CanvasToBMP.toDataURL(canvas);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${outputFileName}.png`;
  // a.hidden = true;
  // document.body.appendChild(a);
  console.warn(`[downloadCanvasImage] downloading ${outputFileName}.png`);
  LogService.Log(`[downloadCanvasImage] ${url.toString()}`);
  link.click();
}