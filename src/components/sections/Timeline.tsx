"use client"

import React, { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import timelineData from "@/data/timeline.json"

export function Timeline() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 600
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            })
        }
    }

    return (
        <section id="timeline" className="w-full px-6 md:px-12 py-8">
            <div className="relative w-full aspect-[4/3] md:aspect-[25/4] bg-card rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col justify-center px-0 shadow-premium transition-colors duration-500 border border-border/50">
                <div
                    ref={scrollRef}
                    className="flex items-center overflow-x-auto no-scrollbar px-16 md:px-24 w-full h-full snap-x snap-mandatory scroll-smooth"
                >
                    <div className="relative flex items-center min-w-max h-full">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 md:h-1 bg-foreground/20 -translate-y-1/2 transition-colors duration-500" />

                        {timelineData.map((item, index) => (
                            <div key={index} className="relative w-[25vw] h-full flex items-center justify-center snap-center group px-4 md:px-8">
                                <div className="absolute w-0.5 md:w-1 h-6 md:h-8 bg-foreground z-10 transition-colors duration-500" />
                                <div className="absolute top-[calc(50%-60px)] md:top-[calc(50%-80px)] font-bold text-xl md:text-3xl text-foreground/90 tracking-tighter transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap">
                                    {item.date}
                                </div>
                                <div className="absolute top-[calc(50%+20px)] md:top-[calc(50%+40px)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 w-48 md:w-64 bg-background/80 backdrop-blur-xl rounded-2xl shadow-premium p-4 md:p-6 text-center z-20 border border-border/50">
                                    <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-foreground tracking-tight">{item.title}</h3>
                                    <p className="text-xs md:text-sm text-muted-foreground leading-snug font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                        <div className="w-16 md:w-24 shrink-0" />
                    </div>
                </div>

                <div className="absolute top-6 left-8 md:top-8 md:left-12 pointer-events-none">
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground/5 transition-colors duration-500 uppercase">Timeline</h2>
                </div>

                <div className="absolute bottom-6 right-8 md:bottom-8 md:right-12 flex items-center gap-3 z-30">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("left")}
                        className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-card/80 backdrop-blur shadow-sm border border-border hover:bg-card hover:scale-110 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("right")}
                        className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-card/80 backdrop-blur shadow-sm border border-border hover:bg-card hover:scale-110 transition-all"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
