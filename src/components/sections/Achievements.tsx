"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trophy } from "lucide-react"
import { Modal } from "@/components/ui/modal"

import achievements from "@/data/achievements.json"

export function Achievements() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <section id="achievements" className="py-24 px-6 md:px-12 w-full">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-12 transition-colors duration-500">Achievements</h2>

            <div
                className="bg-card border border-border/50 shadow-sm rounded-[32px] md:rounded-[48px] p-8 md:p-16 relative overflow-hidden h-[450px] md:h-[525px] cursor-pointer group hover:shadow-lg transition-all duration-500"
                onClick={() => setIsOpen(true)}
            >
                <div className="space-y-4 md:space-y-6">
                    {achievements.slice(0, 8).map((item, index) => (
                        <div key={index} className="flex items-start gap-3 md:gap-4">
                            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-primary mt-1.5 flex-shrink-0 transition-colors duration-500" />
                            <p className="text-foreground text-sm md:text-base lg:text-lg font-semibold leading-normal transition-colors duration-500">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Blur Mask */}
                <div className="absolute inset-x-0 bottom-0 h-32 md:h-40 bg-gradient-to-t from-card via-card/95 to-transparent pointer-events-none transition-all duration-500" />

                {/* Floating Plus Button */}
                <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Plus className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                </div>
            </div>

            {/* Achievements Modal */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Full Achievement List"
                maxWidthClass="max-w-5xl"
            >
                <div className="space-y-6 md:space-y-8 py-2 md:py-4">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-4 md:gap-5 p-4 md:p-6 rounded-2xl bg-muted hover:bg-accent transition-colors"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-foreground text-lg md:text-xl mb-1 md:mb-2 leading-tight">{item.title}</h4>
                                <p className="text-foreground/90 font-semibold mb-2 md:mb-3 text-sm md:text-base">{item.description}</p>
                                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium">{item.details}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Modal>
        </section>
    )
}
