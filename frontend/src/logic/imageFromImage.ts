import { base64ToBytes, scrollToElement } from '@/lib/utils';
import { SteganographyService } from '../../bindings/github.com/thavixt/steganographix-wails3';

export async function imageFromImage(
  sourceCanvas: HTMLCanvasElement | null,
  targetCanvas: HTMLCanvasElement | null,
): Promise<ImageData | string | undefined> {
  if (!sourceCanvas || !targetCanvas) {
    return;
  }

  return new Promise<ImageData | string>(async (resolve, reject) => {
    try {
      const sourceCanvasCtx = sourceCanvas?.getContext('2d');
      const targetCanvasCtx = targetCanvas?.getContext('2d');
      if (!sourceCanvas || !sourceCanvasCtx || !targetCanvas || !targetCanvasCtx) {
        console.error('Source and/or target canvases not found');
        return;
      };

      const imageData = sourceCanvasCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
      const sourceImageData = new Uint8Array(imageData.data.buffer);
      const extractedString = await SteganographyService.ExtractLSB(
        Array.from(sourceImageData) as unknown as any,
        imageData.width,
        imageData.height,
      );
      const extractedBytes = base64ToBytes(extractedString as unknown as string);
      console.log(extractedBytes);
      
      // Set your desired width and height for the output image
      const width = imageData.width / 2;
      const height = imageData.height / 2;

      // Create a new ImageData object
      const newImageData = new ImageData(width, height);

      // Fill the ImageData with the extracted bytes (assumes RGBA)
      for (let i = 0; i < newImageData.data.length; i++) {
        newImageData.data[i] = extractedBytes[i] ?? 0; // fallback to 0 if undefined
      }

      // Paint to targetCanvas
      targetCanvas.width = width;
      targetCanvas.height = height;
      targetCanvasCtx.putImageData(newImageData, 0, 0);
      scrollToElement(sourceCanvas);
      resolve(newImageData);
    } catch (ex) {
      console.error(ex);
      reject((ex as Error).message);
    }
  })
}