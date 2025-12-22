import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/10 bg-black">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Atharv Choughule. All rights reserved.
                </div>
                <div className="flex items-center space-x-6">
                    <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="w-5 h-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
