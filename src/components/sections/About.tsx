"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import slides from "@/data/about.json"

export function About() {
    const [current, setCurrent] = useState(0)

    const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length)
    const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section id="about" className="py-16 px-6 md:px-12 w-full">
            {/* Large Card Section */}
            <div className="bg-card rounded-[40px] md:rounded-[60px] w-full min-h-[400px] md:aspect-[21/9] relative overflow-hidden group shadow-premium transition-colors duration-500 border border-border/50">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`absolute inset-0 ${slides[current].color} flex items-center justify-center transition-colors duration-1000`}
                    >
                        <span className="text-white/20 font-bold text-5xl md:text-8xl lg:text-9xl tracking-tighter select-none">
                            EXPLORING
                        </span>
                    </motion.div>
                </AnimatePresence>

                {/* Persistent Title Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-4xl md:text-7xl lg:text-[120px] font-bold tracking-tighter text-foreground drop-shadow-sm transition-colors duration-500 select-none">
                        About Myself
                    </h2>
                </div>

                {/* Change Controls - Persistent */}
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 z-20">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-card/40 backdrop-blur-xl border-border shadow-lg hover:bg-card/60 hover:scale-110 transition-all text-foreground outline-none"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </Button>

                    {/* Dots */}
                    <div className="flex gap-2 md:gap-4 items-center">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 md:h-2.5 rounded-full transition-all duration-500 border border-white/10 ${idx === current ? "bg-primary w-8 md:w-16 shadow-lg shadow-primary/20" : "bg-white/20 w-2 md:w-2.5"}`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-card/40 backdrop-blur-xl border-border shadow-lg hover:bg-card/60 hover:scale-110 transition-all text-foreground outline-none"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </Button>
                </div>

            </div>
        </section>
    )
}
