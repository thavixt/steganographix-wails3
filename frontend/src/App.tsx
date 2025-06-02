import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import Home from '@/tabs/Home'
import StegoImage from "@/tabs/StegoImage"
import About from "@/tabs/About"

function App() {
  return (
    <main className='m-auto w-full max-w-[1000px] flex flex-col gap-8 items-center justify-center'>
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="stego-image">Extract and embed image</TabsTrigger>
          <TabsTrigger value="stego-text">Extract and embed text</TabsTrigger>
          <TabsTrigger value="compare">Compare images</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="home"><Home /></TabsContent>
        <TabsContent value="stego-image"><StegoImage /></TabsContent>
        <TabsContent value="about"><About /></TabsContent>
      </Tabs>
      <Toaster visibleToasts={3} position="bottom-center" />
    </main>
  )
}

export default App
