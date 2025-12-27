"use client"

import React from "react"
import { motion } from "framer-motion"
import {
    Video,
    Smartphone,
    Box,
    Play,
    Zap,
    FileText,
    MessageSquare,
    ArrowUpRight
} from "lucide-react"
import services from "@/data/services.json"
import { cn } from "@/lib/utils"

const iconMap = {
    Video,
    Smartphone,
    Box,
    Play,
    Zap,
    FileText,
    MessageSquare
}

const WHATSAPP_NUMBER = "919326501727"

export function Services() {
    return (
        <section id="services" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden transition-colors duration-500">
            <div className="w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-left mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter text-foreground">
                        Services
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                        Industry-standard solutions tailored to your creative and technical needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[220px]">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon as keyof typeof iconMap]

                        // Bento grid logic based on sizing - Theme-aware styling
                        const gridClasses = cn(
                            "group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 transition-all hover:bg-card/60 hover:border-primary/50 backdrop-blur-sm",
                            service.size === "large" ? "md:col-span-2 md:row-span-2" :
                                service.size === "medium" ? "md:col-span-2 md:row-span-1" :
                                    "md:col-span-1 md:row-span-1"
                        )

                        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I would like a quotation for ${service.title} services.`)}`

                        return (
                            <motion.a
                                key={service.id}
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={gridClasses}
                            >
                                <div className="flex h-full flex-col justify-between">
                                    <div>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                            {Icon && <Icon className="h-6 w-6" />}
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div className="mt-4 flex items-end justify-between">
                                        <p className="text-sm text-muted-foreground line-clamp-2 pr-8">
                                            {service.description}
                                        </p>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>

                                {/* Decorative Background Glow */}
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                            </motion.a>
                        )
                    })}
                </div>
            </div>

            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50" />
        </section>
    )
}
