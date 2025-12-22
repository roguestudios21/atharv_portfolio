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
            <div className="bg-[#E8E8ED] rounded-[32px] md:rounded-[48px] w-full aspect-video md:aspect-[21/9] relative overflow-hidden group shadow-sm">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`absolute inset-0 ${slides[current].color} flex items-center justify-center`}
                    >
                        <span className="text-white/20 font-bold text-5xl md:text-8xl lg:text-9xl tracking-tighter select-none">
                            EXPLORING
                        </span>
                    </motion.div>
                </AnimatePresence>

                {/* Persistent Title Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-4xl md:text-7xl lg:text-[120px] font-bold tracking-tighter text-[#1d1d1f] drop-shadow-sm select-none">
                        About Myself
                    </h2>
                </div>

                {/* Change Controls - Persistent */}
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 z-20">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/40 backdrop-blur-xl border-white/20 shadow-lg hover:bg-white/60 hover:scale-110 transition-all text-[#1d1d1f] outline-none"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </Button>

                    {/* Dots */}
                    <div className="flex gap-2 md:gap-4">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-500 ${idx === current ? "bg-[#1d1d1f] w-8 md:w-12" : "bg-black/20"}`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/40 backdrop-blur-xl border-white/20 shadow-lg hover:bg-white/60 hover:scale-110 transition-all text-[#1d1d1f] outline-none"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </Button>
                </div>

            </div>
        </section>
    )
}
