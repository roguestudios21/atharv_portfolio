"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react"

import data from "@/data/introduction.json"

export function Introduction() {
    return (
        <section id="introduction" className="w-full px-4 md:px-12 py-24 md:py-32">
            {/* Main Hero Container - Flex-col on mobile, aspect ratio removed for mobile flexibility */}
            <div className="relative w-full md:aspect-[20/9] bg-card rounded-[32px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 md:p-20 shadow-premium transition-all duration-500 border border-border/50">

                {/* Subtle Background Accent */}
                <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-gradient-to-b md:bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

                {/* Content Wrapper */}
                <div className="z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-[1700px] w-full mx-auto">

                    {/* Text Content */}
                    <div className="space-y-6 md:space-y-8 flex-1 order-2 md:order-1 text-center md:text-left">
                        <div>
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4 md:mb-6 text-foreground">
                                {data.name}
                            </h1>
                            <p className="text-lg md:text-2xl lg:text-3xl font-medium text-muted-foreground tracking-tight leading-relaxed max-w-2xl mx-auto md:mx-0">
                                {data.role}
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3 text-muted-foreground/80">
                            <div className="flex items-center gap-2.5 hover:text-foreground transition-colors text-sm md:text-lg font-medium cursor-default">
                                <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary/70" />
                                <span>{data.email}</span>
                            </div>
                            <div className="flex items-center gap-2.5 hover:text-foreground transition-colors text-sm md:text-lg font-medium cursor-default">
                                <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary/70" />
                                <span>{data.phone}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-5 pt-4">
                            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 md:h-16 text-base md:text-lg font-semibold border-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                <Link href={data.resumeUrl} target="_blank" className="flex items-center gap-2.5">
                                    <Download className="w-5 h-5" />
                                    Download Resume
                                </Link>
                            </Button>

                            <div className="flex items-center gap-4">
                                <Button asChild variant="outline" size="icon" aria-label="Github Profile" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-border bg-background hover:bg-secondary hover:scale-105 transition-all duration-300">
                                    <Link href={data.socials.github} target="_blank">
                                        <Github className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="icon" aria-label="LinkedIn Profile" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-border bg-background hover:bg-secondary hover:scale-105 transition-all duration-300">
                                    <Link href={data.socials.linkedin} target="_blank">
                                        <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div className="relative w-full max-w-[280px] md:max-w-none md:w-[28rem] lg:w-[32rem] aspect-[3/4] rounded-[24px] md:rounded-[56px] overflow-hidden border border-border shadow-2xl shrink-0 order-1 md:order-2 self-center bg-secondary/50 mx-auto md:mx-0">
                        <Image
                            src={data.profileImage}
                            alt={data.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-1000"
                            priority
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>

                </div>
            </div>
        </section>
    )
}
