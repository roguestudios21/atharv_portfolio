"use client"

import React, { useEffect, useRef } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

export function CatAssistant() {
    const catRef = useRef<HTMLDivElement>(null)

    // Smooth movement for eyes
    const mouseX = useSpring(0, { stiffness: 150, damping: 20 })
    const mouseY = useSpring(0, { stiffness: 150, damping: 20 })

    // Eyeball synchronization (subtle movement)
    const eyeballX = useTransform(mouseX, (val) => val * 0.2)
    const eyeballY = useTransform(mouseY, (val) => val * 0.2)

    const [isIdle, setIsIdle] = React.useState(true)
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIsIdle(false)
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current)

            idleTimerRef.current = setTimeout(() => setIsIdle(true), 5000)

            if (catRef.current) {
                const rect = catRef.current.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                const relX = e.clientX - centerX
                const relY = e.clientY - centerY

                const maxDistance = 6 // Reduced for more subtle tracking
                const angle = Math.atan2(relY, relX)
                const distance = Math.min(Math.sqrt(relX * relX + relY * relY) / 25, maxDistance)

                mouseX.set(Math.cos(angle) * distance)
                mouseY.set(Math.sin(angle) * distance)
            }
        }

        // Ambient wandering when idle
        let frame: number
        const animateIdle = (time: number) => {
            if (isIdle) {
                const x = Math.sin(time / 2000) * 4
                const y = Math.cos(time / 1500) * 2
                mouseX.set(x)
                mouseY.set(y)
            }
            frame = requestAnimationFrame(animateIdle)
        }
        frame = requestAnimationFrame(animateIdle)

        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(frame)
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        }
    }, [mouseX, mouseY, isIdle])

    return (
        <div
            ref={catRef}
            className="fixed bottom-0 right-8 z-[100] w-48 md:w-64 pointer-events-none select-none transition-all duration-500"
        >
            {/* Enhanced Halo Effect */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                    duration: 4, // Slower pulsing
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 bg-primary/30 blur-[80px] rounded-full -z-10 translate-y-20 scale-[1.8]"
            />

            <svg viewBox="0 0 438 487" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
                {/* Body */}
                <path d="M4.37751 485.94C-19.084 340.54 71.0373 41.8532 84.3776 13.9397C97.7179 -13.9737 146.877 62.9403 146.877 62.9403H257.878C257.878 62.9403 299.878 13.9402 312.878 3.44024C325.877 -7.05975 332.378 13.9402 332.378 13.9402C332.378 13.9402 329.877 50.9409 341.378 104.44C348.152 135.958 376.271 216.757 399.768 284.275C416.156 331.367 430.296 371.997 433.378 384.94C440.877 416.441 433.378 485.94 433.378 485.94H4.37751Z" fill="#26252C" stroke="white" strokeWidth="2" />
                <path d="M0.5 485C132.1 483.8 179.5 478 185 474L190 470.5L200 466.5L209.5 462L219.5 453.5C219.5 453.5 223.993 447.842 225 443.5C225.838 439.886 225 434 225 434V423.5L222.5 411L216.5 399.5L209.5 392.5L200 385L188.5 381L177 378H137C114.5 378 54 415 54 415L0.5 446V485Z" fill="#26252C" />

                {/* Coffee & Arm Group */}
                <motion.g
                    animate={{ y: [0, -40, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 8,
                        ease: "easeInOut"
                    }}
                >
                    {/* Steam */}
                    <g transform="translate(240, 290)">
                        {[0, 1, 2].map((i) => (
                            <motion.path
                                key={i}
                                d="M0 0C5 -5 5 -10 0 -15C-5 -20 -5 -25 0 -30"
                                stroke="white"
                                strokeWidth="1"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ opacity: 0, y: 0 }}
                                animate={{
                                    opacity: [0, 0.4, 0],
                                    y: -30,
                                    x: i * 12 - 12
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.8,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </g>

                    <path d="M185 474V485H280L283.17 457.5L266.5 460L238 462H209.5L200 466.5L190 470.5L185 474Z" fill="#D9D9D9" />
                    <path d="M177 378L188.5 381L200 385L209.5 392.5L216.5 399.5L222.5 411L225 423.5V434C225 434 225.838 439.886 225 443.5C223.993 447.842 219.5 453.5 219.5 453.5L209.5 462H238L266.5 460L283.17 457.5L293.486 368L297.435 333.742L288 337L272.5 338H245H225H206.5L185.5 336L174.558 332L177 378Z" fill="#1097CE" />
                    <path d="M298.5 324.5C298.5 324.5 290 321.5 286.5 321.5C283 321.5 261 318.5 235 318.5C216.566 318.5 208.437 318.5 202.059 318.5L194.5 318.5C185.5 318.5 174 321.5 174 321.5L185.5 327.5L206.5 329H225H245H272.5L289.5 327.5L298.5 324.5Z" fill="#795C70" />
                    <path d="M185.5 327.5L174 321.5L174.558 332L185.5 336L206.5 338H225H245H272.5L288 337L297.435 333.742L298.5 324.5L289.5 327.5L272.5 329H245H225H206.5L185.5 327.5Z" fill="#EDC7E6" />
                    <path d="M185 474C179.5 478 132.1 483.8 0.5 485V446L54 415C54 415 114.5 378 137 378M185 474V485H280L283.17 457.5M185 474L190 470.5L200 466.5L209.5 462M298.5 324.5C298.5 324.5 290 321.5 286.5 321.5C283 321.5 261 318.5 235 318.5C216.566 318.5 208.437 318.5 202.059 318.5M298.5 324.5L289.5 327.5L272.5 329H245H225H206.5L185.5 327.5L174 321.5M298.5 324.5L297.435 333.742M174 321.5C174 321.5 185.5 318.5 194.5 318.5M174 321.5L174.558 332M177 378C177 378 159.5 378 137 378M177 378L188.5 381L200 385L209.5 392.5L216.5 399.5L222.5 411L225 423.5V434C225 434 225.838 439.886 225 443.5C223.993 447.842 219.5 453.5 219.5 453.5L209.5 462M177 378L174.558 332M177 378H137M194.5 318.5L202.059 318.5M194.5 318.5C197.119 318.5 199.442 318.5 202.059 318.5M209.5 462H238L266.5 460L283.17 457.5M174.558 332L185.5 336L206.5 338H225H245H272.5L288 337L297.435 333.742M297.435 333.742L293.486 368M177 371.5L199 373H235L272.5 371.5L293.486 368M293.486 368L283.17 457.5" stroke="white" strokeWidth="2" />
                </motion.g>

                {/* Heart-shaped Nose - Subtly tracking */}
                <motion.path
                    style={{ x: useTransform(mouseX, (val) => val * 0.25), y: useTransform(mouseY, (val) => val * 0.25) }}
                    d="M192.5 179.5H203H215.5H218.5L213 185.5L208 192L205 197.5L203 192L197.5 185.5L192.5 179.5Z"
                    fill="#E63A48" stroke="white" strokeWidth="2"
                />

                {/* Left Eye Group - Synchronized Blinking */}
                <motion.g
                    animate={{ scaleY: [1.1, 1.1, 0.925, 1.1, 1.1] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatDelay: 2,
                        times: [0, 0.95, 0.97, 0.99, 1],
                        ease: "easeInOut"
                    }}
                    style={{ originX: "130px", originY: "148px" }}
                >
                    <motion.path
                        style={{ x: eyeballX, y: eyeballY, scale: 1.1 }}
                        d="M103.5 134.5V146.5L105 151.5L107.5 155.5L111 159L115.5 161.5L122 163.5L128.5 164H136L143.5 162.5L148.5 160.5L152.5 157.5L155.5 152.5L156.5 147V140L155.5 134.5H103.5Z"
                        fill="#FFEB3B" stroke="white" strokeWidth="2"
                    />
                    <motion.path
                        style={{ x: mouseX, y: mouseY, scale: 1.1 }}
                        d="M126 138.5L125.5 141V143.5V146.5V150V153.5V156L126 158L127.5 159.5L129.5 161L132 159.5L133 157.5L133.5 156V153.5V150V146.5V143.5V141L133 138.5L131.5 136L129.5 134.5L127.5 136L126 138.5Z"
                        fill="#1A1D1A" stroke="white" strokeWidth="1"
                    />
                </motion.g>

                {/* Right Eye Group - Synchronized Blinking */}
                <motion.g
                    animate={{ scaleY: [1.1, 1.1, 0.925, 1.1, 1.1] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatDelay: 2,
                        times: [0, 0.95, 0.97, 0.99, 1],
                        ease: "easeInOut"
                    }}
                    style={{ originX: "278px", originY: "148px" }}
                >
                    <motion.path
                        style={{ x: eyeballX, y: eyeballY, scale: 1.1 }}
                        d="M251.5 134.5V146.5L253 151.5L255.5 155.5L259 159L263.5 161.5L270 163.5L276.5 164H284L291.5 162.5L296.5 160.5L300.5 157.5L303.5 152.5L304.5 147V140L303.5 134.5H251.5Z"
                        fill="#FFEB3B" stroke="white" strokeWidth="2"
                    />
                    <motion.path
                        style={{ x: mouseX, y: mouseY, scale: 1.1 }}
                        d="M278 138.5L277.5 141V143.5V146.5V150V153.5V156L278 158L279.5 159.5L281.5 161L284 159.5L285 157.5L285.5 156V153.5V150V146.5V143.5V141L285 138.5L283.5 136L281.5 134.5L279.5 136L278 138.5Z"
                        fill="#1A1D1A" stroke="white" strokeWidth="1"
                    />
                </motion.g>
            </svg>
        </div>
    )
}
