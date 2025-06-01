import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SteganographyService } from '../../bindings/github.com/thavixt/steganographix-wails3'
import { toast } from "sonner";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Steganographix!</CardTitle>
        <CardDescription>
          Curious if you have something hidden in that funny cat picture you got on Facebook?
          <br />
          Let's check!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        Select from the available methods from the top.
        <ul className="list-disc pl-4">
          <li><b>Image from image</b> - extract a hidden smaller <b>image</b> from any image</li>
          <li><b>Text from image</b> - extract a block of hidden <b>text</b> from any image</li>
          <li><b>Compare</b> - compare two images and highlight the difference. <em>Useful if you suspect an image has been altered and is worth trying to extract steganographic data from.</em></li>
          <li><b>Image to image</b> - <b>embed a smaller image</b> into any image file.</li>
          <li><b>Text to image</b> - <b>embed text</b> into an image</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={async () => {
            const greetings = await SteganographyService.Greet("visitor");
            toast(greetings)
          }}
        >
          Greet me
        </Button>
      </CardFooter>
    </Card>
  )
}