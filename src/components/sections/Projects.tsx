"use client"

import React, { useState, useRef } from "react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

import Image from "next/image"

import projects from "@/data/projects.json"
import { getAssetPath } from "@/lib/utils"

interface Project {
    id: number;
    title: string;
    description: string;
    details: string;
    tags: string[];
    link?: string;
    buttonText?: string;
    image?: string;
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
        <section id="projects" className="py-24 px-6 md:px-12 w-full">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-12">Projects</h2>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 pb-8 md:pb-12 snap-x snap-mandatory scroll-smooth"
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="flex-shrink-0 w-[260px] md:w-[320px] aspect-[4/5] md:aspect-[33/61] bg-secondary rounded-[24px] relative group snap-center overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                        {project.image ? (
                            <Image
                                src={getAssetPath(project.image)}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        ) : (
                            /* Wireframe Cross (X) for projects without images */
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                                <div className="w-full h-[1px] bg-foreground rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                                <div className="w-full h-[1px] bg-foreground -rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        <div className="absolute bottom-8 left-8 right-8 z-10">
                            <h3 className="text-white font-bold text-2xl mb-2">{project.title}</h3>
                            <p className="text-white/70 text-sm line-clamp-3">{project.description}</p>
                        </div>

                        <div className="absolute bottom-6 right-6 z-10">
                            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                                <Plus className="w-6 h-6 text-white group-hover:text-black" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-end gap-3 mt-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("left")}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-border bg-card hover:bg-muted transition-all outline-none"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("right")}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-border bg-card hover:bg-muted transition-all outline-none"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
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
                    <div className="w-full aspect-[16/9] bg-secondary rounded-2xl relative overflow-hidden">
                        {selectedProject?.image ? (
                            <Image
                                src={getAssetPath(selectedProject.image)}
                                alt={selectedProject.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <div className="w-full h-[1px] bg-foreground rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                                <div className="w-full h-[1px] bg-foreground -rotate-45 transform origin-center absolute top-1/2 left-0 scale-[3]" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-foreground mb-3">Overview</h4>
                        <p className="text-foreground/80 leading-relaxed font-medium">
                            {selectedProject?.description}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-foreground mb-3">Details</h4>
                        <p className="text-foreground/70 leading-relaxed">
                            {selectedProject?.details}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {selectedProject?.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 bg-secondary/50 text-foreground font-semibold rounded-full text-xs tracking-tight border border-border/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {selectedProject?.link ? (
                        <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full md:w-auto"
                        >
                            <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto text-lg font-medium border-0 transition-all">
                                {selectedProject.buttonText || "Launch Case Study"}
                            </Button>
                        </a>
                    ) : (
                        <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto text-lg font-medium border-0 transition-all">
                            {selectedProject?.buttonText || "Launch Case Study"}
                        </Button>
                    )}
                </div>
            </Modal>

        </section>
    )
}
