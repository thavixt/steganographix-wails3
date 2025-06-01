import { useRef, useState } from 'react'
import { FileInput } from '@/components/FileInput';
import { Canvas } from '@/components/Canvas';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { imageFromImage } from '@/logic/imageFromImage.js';
import { clearCanvas, resizeCanvas } from '@/lib/utils.js';

export default function StegoImage() {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [fileName, setFileName] = useState('');
  const [sourceFileDimensions, setSourceFileDimensions] = useState<Record<'x' | 'y', number> | null>(null);
  const [resultFileDimensions, setResultFileDimensions] = useState<Record<'x' | 'y', number> | null>(null);
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const extractedCanvasRef = useRef<HTMLCanvasElement>(null);
  const toEmbedCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  const resetStates = () => {
    setInputDisabled(true);
    clearCanvas(sourceCanvasRef.current);
    clearCanvas(extractedCanvasRef.current);
    clearCanvas(toEmbedCanvasRef.current);
    clearCanvas(resultCanvasRef.current);
    if (sourceInputRef.current) {
      sourceInputRef.current.value = '';
    }
    setSourceFileDimensions(null);
    setResultFileDimensions(null);
  }

  const resizeCanvases = (width: number, height: number) => {
    resizeCanvas(sourceCanvasRef.current, width, height);
    resizeCanvas(extractedCanvasRef.current, width, height);
    resizeCanvas(toEmbedCanvasRef.current, width, height);
    resizeCanvas(resultCanvasRef.current, width, height);
  }

  const onInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files?.length) {
      resetStates();
      return;
    }

    const file = files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new window.Image();
      img.onload = function () {
        const canvas = sourceCanvasRef.current;
        if (canvas) {
          setSourceFileDimensions({ x: img.width, y: img.height });
          resizeCanvases(img.width, img.height);

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, img.width, img.height);
          }
        }
        setInputDisabled(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const extractImage = async () => {
    setInputDisabled(true);
    const result = await imageFromImage(fileName, sourceCanvasRef.current, extractedCanvasRef.current);
    if (sourceFileDimensions) {
      setResultFileDimensions({ x: sourceFileDimensions.x / 2, y: sourceFileDimensions.y / 2 });
    }
    console.log("imageFromImage result:", sourceFileDimensions, resultFileDimensions, result);
    setInputDisabled(false);
  }

  return (
    <Card>
      <CardHeader className='pb-4 flex flex-col gap-2'>
        <CardTitle>Image from image</CardTitle>
        <CardDescription>Extract a (potentially) hidden image from any photo you have. The extracted image will have quarter the size of the original - half the width and height.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-24">
        <Section title='Source image'>
          <Canvas ref={sourceCanvasRef} />
          <FileInput ref={sourceInputRef} label='Select an image' name='input' onChange={onInput} />
          <Button disabled={inputDisabled} onClick={extractImage}>Extract steganographic data</Button>
        </Section>
        <Section title='Extracted image'>
          <Canvas ref={extractedCanvasRef} />
          {(sourceFileDimensions && resultFileDimensions) ? (
            <p>
              The above image was extracted from a <code>{sourceFileDimensions.x}x{sourceFileDimensions.y}</code> image, resulting in a <code>{resultFileDimensions.x}x{resultFileDimensions.y}</code> image.
            </p>
          ) : null}
          <Button variant="secondary" disabled={inputDisabled}>Download image</Button>
          <Button variant="destructive" disabled={inputDisabled} onClick={resetStates}>Reset</Button>
        </Section>
        <Section title='Image to embed'>
          <Canvas ref={toEmbedCanvasRef} />
          <FileInput label='Select an image to embed' name='embed' disabled={inputDisabled} />
          <Button disabled={inputDisabled}>Embed steganographic data</Button>
        </Section>
        <Section title='Result image'>
          <Canvas ref={resultCanvasRef} />
          <Button variant="secondary" disabled={inputDisabled}>Download image</Button>
        </Section>
      </CardContent>
    </Card>
  )
}
