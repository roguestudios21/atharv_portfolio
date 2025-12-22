"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trophy } from "lucide-react"
import { Modal } from "@/components/ui/modal"

import achievements from "@/data/achievements.json"

export function Achievements() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <section id="achievements" className="py-16 px-6 md:px-12 w-full">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-8 md:mb-12">Achievements</h2>

            <div
                className="bg-[#F5F5F7] rounded-[32px] p-8 md:p-16 relative overflow-hidden h-[450px] md:h-[525px] cursor-pointer group hover:shadow-lg transition-all duration-500"
                onClick={() => setIsOpen(true)}
            >
                <div className="space-y-4 md:space-y-6">
                    {achievements.slice(0, 8).map((item, index) => (
                        <div key={index} className="flex items-start gap-3 md:gap-4">
                            {/* Custom Bullet */}
                            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#1d1d1f] mt-1.5 flex-shrink-0" />
                            <p className="text-[#1d1d1f] text-sm md:text-base lg:text-lg font-medium leading-normal">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Blur Mask */}
                <div className="absolute inset-x-0 bottom-0 h-32 md:h-40 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7]/95 to-transparent pointer-events-none" />

                {/* Floating Plus Button */}
                <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0071e3] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
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
                            className="flex items-start gap-4 md:gap-5 p-4 md:p-6 rounded-2xl bg-[#F5F5F7] hover:bg-[#E8E8ED] transition-colors"
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0071e3]/10 flex items-center justify-center shrink-0">
                                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-[#0071e3]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1d1d1f] text-lg md:text-xl mb-1 md:mb-2">{item.title}</h4>
                                <p className="text-[#1d1d1f]/80 font-medium mb-2 md:mb-3 text-sm md:text-base">{item.description}</p>
                                <p className="text-[#1d1d1f]/60 text-xs md:text-sm leading-relaxed">{item.details}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Modal>
        </section>
    )
}
