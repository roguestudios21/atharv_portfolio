"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react"

import data from "@/data/introduction.json"

export function Introduction() {
    return (
        <section id="introduction" className="w-full px-6 md:px-12 pt-32 pb-8">
            {/* Container with ~20:9 Aspect Ratio (20% reduction from 16:9) */}
            <div className="relative w-full aspect-[20/9] bg-[#8E8180] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 md:p-16 text-white text-center md:text-left shadow-sm">

                {/* Content Wrapper */}
                <div className="z-10 flex flex-col md:flex-row items-center gap-12 max-w-[1800px] w-full mx-auto">

                    {/* Text Content (Moved to left) */}
                    <div className="space-y-6 flex-1 order-2 md:order-1">
                        <div>
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-tight mb-4">
                                {data.name}
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl font-medium opacity-90 leading-relaxed max-w-2xl">
                                {data.role}
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-white/80">
                            <div className="flex items-center gap-2 hover:text-white transition-colors text-sm md:text-base">
                                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                                <span>{data.email}</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-white transition-colors text-sm md:text-base">
                                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                <span>{data.phone}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                            <Button asChild className="bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full px-8 h-12 md:h-14 text-base md:text-lg border-0 shadow-lg hover:shadow-xl transition-all">
                                <Link href={data.resumeUrl} target="_blank" className="flex items-center gap-2">
                                    <Download className="w-5 h-5" />
                                    Download Resume
                                </Link>
                            </Button>

                            <div className="flex items-center gap-3">
                                <Button asChild variant="glass" size="icon" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border-white/20">
                                    <Link href={data.socials.github} target="_blank">
                                        <Github className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </Link>
                                </Button>
                                <Button asChild variant="glass" size="icon" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border-white/20">
                                    <Link href={data.socials.linkedin} target="_blank">
                                        <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Picture (Scaled by 1.5x) */}
                    <div className="relative w-72 md:w-[27rem] lg:w-[30rem] aspect-[3/4] rounded-[32px] md:rounded-[48px] overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 order-1 md:order-2 self-center">
                        <Image
                            src={data.profileImage}
                            alt={data.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}
