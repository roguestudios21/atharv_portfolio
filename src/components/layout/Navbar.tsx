"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Timeline", href: "#timeline" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
    { name: "About", href: "#about" },
]

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3 supports-[backdrop-filter]:bg-white/60" : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-[1400px]">
                <Link href="/" className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                    Atharv
                </Link>
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScrollTo(e, link.href)}
                            className="text-xs font-medium text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors uppercase tracking-wide"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
