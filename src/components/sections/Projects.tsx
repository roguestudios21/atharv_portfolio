"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

import projects from "@/data/projects.json"

interface Project {
    id: number;
    title: string;
    description: string;
    details: string;
    tags: string[];
}

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 350
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            })
        }
    }

    return (
        <section id="projects" className="py-16 px-6 md:px-12 w-full">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-8 md:mb-12">Projects</h2>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar gap-6 pb-8 md:pb-12 snap-x snap-mandatory scroll-smooth"
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] bg-[#8E8180] rounded-[24px] relative group snap-center overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                        {/* Wireframe Cross (X) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                            <div className="w-full h-[1px] bg-black rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                            <div className="w-full h-[1px] bg-black -rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-white font-bold text-2xl mb-2">{project.title}</h3>
                            <p className="text-white/70 text-sm line-clamp-3">{project.description}</p>
                        </div>

                        <div className="absolute bottom-6 right-6">
                            <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                                <Plus className="w-6 h-6 text-white group-hover:text-[#1d1d1f]" />
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-end gap-3 mt-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("left")}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[#d2d2d7] hover:bg-[#F5F5F7] hover:scale-105 transition-all outline-none"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#1d1d1f]" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("right")}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[#d2d2d7] hover:bg-[#F5F5F7] hover:scale-105 transition-all outline-none"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#1d1d1f]" />
                </Button>
            </div>

            {/* Project Modal */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title}
                maxWidthClass="max-w-5xl"
            >
                <div className="space-y-6">
                    <div className="w-full aspect-video bg-[#8E8180] rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <div className="w-full h-[1px] bg-black rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                            <div className="w-full h-[1px] bg-black -rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-[#1d1d1f] mb-3">Overview</h4>
                        <p className="text-[#1d1d1f]/80 leading-relaxed font-medium">
                            {selectedProject?.description}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-[#1d1d1f] mb-3">Details</h4>
                        <p className="text-[#1d1d1f]/70 leading-relaxed">
                            {selectedProject?.details}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {selectedProject?.tags.map(tag => (
                            <span key={tag} className="px-4 py-1.5 bg-[#F5F5F7] text-[#1d1d1f]/70 rounded-full text-sm font-medium border border-[#d2d2d7]">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <Button className="w-full md:w-auto bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full px-8 py-6 h-auto text-lg font-medium border-0 transition-all">
                        Launch Case Study
                    </Button>
                </div>
            </Modal>

        </section>
    )
}
