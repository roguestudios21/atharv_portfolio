import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Introduction } from "@/components/sections/Introduction"
import { Services } from "@/components/sections/Services"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { ModelShowcase } from "@/components/sections/ModelShowcase"
import { Achievements } from "@/components/sections/Achievements"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main className="flex flex-col">
        <Introduction />
        <Services />
        <Projects />
        <Skills />
        <ModelShowcase />
        <Achievements />
      </main>
      <Footer />
    </div>
  )
}
