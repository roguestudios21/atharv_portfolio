"use client"

import React, { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import skills from "@/data/skills.json"

export function Skills() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 200
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            })
        }
    }

    return (
        <section id="skills" className="py-16 px-6 md:px-12 w-full">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-8 md:mb-12">Skills</h2>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar gap-6 md:gap-8 pb-8 md:pb-12 snap-x snap-mandatory scroll-smooth"
            >
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-[#F5F5F7] rounded-[24px] border border-[#d2d2d7] relative flex flex-col items-center justify-center overflow-hidden group snap-center hover:shadow-lg transition-all"
                    >
                        {/* Wireframe Cross (X) */}
                        <div className="w-full h-[1px] bg-[#1d1d1f]/5 rotate-45 absolute" />
                        <div className="w-full h-[1px] bg-[#1d1d1f]/5 -rotate-45 absolute" />

                        <span className="text-xs md:text-sm font-semibold text-[#1d1d1f]/80 mt-auto mb-6 transform group-hover:scale-110 transition-transform">
                            {skill.name}
                        </span>

                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-end gap-3 mt-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("left")}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[#d2d2d7] hover:bg-[#F5F5F7] transition-all outline-none"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#1d1d1f]" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("right")}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[#d2d2d7] hover:bg-[#F5F5F7] transition-all outline-none"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#1d1d1f]" />
                </Button>
            </div>
        </section>
    )
}
