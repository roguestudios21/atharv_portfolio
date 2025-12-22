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
            {/* Container with 25:4 Aspect Ratio (Reduced height) */}
            <div className="relative w-full aspect-[25/4] bg-[#E8E8ED] rounded-[32px] overflow-hidden flex flex-col justify-center px-0 shadow-sm">

                {/* Scrollable Area */}
                <div
                    ref={scrollRef}
                    className="flex items-center overflow-x-auto no-scrollbar px-16 md:px-24 w-full h-full snap-x snap-mandatory scroll-smooth"
                >
                    {/* Continuous Line */}
                    <div className="relative flex items-center min-w-max h-full">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 md:h-1 bg-[#1d1d1f] -translate-y-1/2" />

                        {timelineData.map((item, index) => (
                            <div key={index} className="relative w-[25vw] h-full flex items-center justify-center snap-center group px-4 md:px-8">

                                {/* Tick Mark on Line */}
                                <div className="absolute w-0.5 md:w-1 h-6 md:h-8 bg-[#1d1d1f] z-10" />

                                {/* Labels (Updated to Date) */}
                                <div className="absolute top-[calc(50%-60px)] md:top-[calc(50%-80px)] font-bold text-xl md:text-3xl text-[#1d1d1f] transition-transform duration-300 group-hover:-translate-y-1 whitespace-nowrap">
                                    {item.date}
                                </div>

                                {/* Popup Card */}
                                <div className="absolute top-[calc(50%+20px)] md:top-[calc(50%+40px)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 w-48 md:w-64 bg-white rounded-2xl shadow-xl p-4 md:p-6 text-center z-20">
                                    <div className="w-3 h-3 md:w-4 md:h-4 bg-white absolute -top-1.5 md:-top-2 left-1/2 -translate-x-1/2 rotate-45" />
                                    <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-[#1d1d1f]">{item.title}</h3>
                                    <p className="text-xs md:text-sm text-[#86868b] leading-snug">{item.desc}</p>
                                </div>

                            </div>
                        ))}

                        {/* End Padding to ensure last item is reachable */}
                        <div className="w-16 md:w-24 shrink-0" />
                    </div>
                </div>

                {/* Labels & Bottom Controls */}
                <div className="absolute top-6 left-8 md:top-8 md:left-12 pointer-events-none">
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f]/10">Timeline</h2>
                </div>

                {/* Navigation Buttons (Moved to bottom right) */}
                <div className="absolute bottom-6 right-8 md:bottom-8 md:right-12 flex items-center gap-3 z-30">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("left")}
                        className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur shadow-sm border-0 hover:bg-white hover:scale-110 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#1d1d1f]" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("right")}
                        className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur shadow-sm border-0 hover:bg-white hover:scale-110 transition-all"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#1d1d1f]" />
                    </Button>
                </div>

            </div>
        </section>
    )
}
