"use client"

import React, { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
]

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        setMobileMenuOpen(false)
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    scrolled
                        ? "bg-background/80 backdrop-blur-xl border-b border-border/40 py-4 shadow-sm"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-[1400px]">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground transition-all hover:opacity-80">
                        Atharv
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className="text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-all uppercase tracking-[0.15em]"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pl-6 border-l border-border/50">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-4">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-foreground"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 pt-24"
                    >
                        <div className="flex flex-col items-center space-y-8 w-full">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScrollTo(e, link.href)}
                                    className="text-2xl font-bold text-foreground hover:text-primary transition-all uppercase tracking-[0.2em]"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
