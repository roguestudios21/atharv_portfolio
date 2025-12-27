"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, RotateCcw, Trophy, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function BoatGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark' // Use this for game logic scaling/colors if needed

    // Game State Refs
    const gameState = useRef({
        boatY: 160,
        velocity: 0,
        obstacles: [] as { x: number, y: number, type: 'rock' | 'orb', size: number, rotation: number }[],
        particles: [] as { x: number, y: number, speed: number, size: number, alpha: number }[],
        score: 0,
        speed: 5,
        targetY: 160,
        isGameOver: false,
        isStarted: false,
        lastSpawn: 0,
        time: 0
    })

    const requestRef = useRef<number>(0)

    useEffect(() => {
        const saved = localStorage.getItem("boat-game-highscore")
        if (saved) setHighScore(parseInt(saved))
    }, [])

    const startGame = () => {
        if (!canvasRef.current) return

        gameState.current = {
            boatY: canvasRef.current.height / 2,
            velocity: 0,
            obstacles: [],
            particles: [],
            score: 0,
            speed: 6,
            targetY: canvasRef.current.height / 2,
            isGameOver: false,
            isStarted: true,
            lastSpawn: performance.now(),
            time: 0
        }

        setScore(0)
        setIsGameOver(false)
        setIsStarted(true)

        cancelAnimationFrame(requestRef.current)
        requestRef.current = requestAnimationFrame(gameLoop)
    }

    const handleInput = useCallback((direction: 'up' | 'down') => {
        if (!gameState.current.isStarted || gameState.current.isGameOver) return

        const moveAmount = 60 // Reduce step size slightly for smaller height
        if (direction === 'up') {
            gameState.current.targetY = Math.max(40, gameState.current.targetY - moveAmount)
        } else {
            gameState.current.targetY = Math.min(280, gameState.current.targetY + moveAmount)
        }
    }, [])

    // Keyboard controls removed as per request
    // Only keeping space for start if needed, but request implies removing key control.
    // However, "Start" usually needs a trigger. The Start button is main. 
    // Let's remove the movement keys. Space to start is convenient but maybe they want NO keys?
    // "remove boat controlling by keys" -> implies movement. 
    // I will remove the entire listener to be safe and strictly follow "remove by keys".
    // Users will tap the button to start.

    // Update canvas size on resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Keep internal resolution high but scalable
                // We rely on CSS for dynamic width, but canvas element width needs to standard 
                // for the game logic coordinates to make sense or we scale context.
                // For simplicity, fixed internal resolution, scaled via CSS.
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const gameLoop = (time: number) => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const state = gameState.current
        state.time += 0.05

        // Dynamic Colors based on Theme
        // We capture the ref value here, but note that inside loop `isDark` closure value might be stale 
        // if not careful. However, resolvedTheme changes re-render component, which re-defines gameLoop?
        // No, gameLoop is not re-defined unless we add it to dependency or use a ref for theme.
        // Let's rely on standard colors that look good in both or stick to a unified "Game Look".
        // Actually, a dark game looks good on light sites too (contrast).
        // Let's stick to the dark premium look for consistency, but ensure UI around it adapts.

        // Clear canvas
        ctx.fillStyle = "#1e293b" // Slate 800 (Lighter base)
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Gradient Background (Lighter Stream)
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#0f172a") // Slate 900
        gradient.addColorStop(0.5, "#334155") // Slate 700 (Lighter middle)
        gradient.addColorStop(1, "#0f172a") // Slate 900
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Grid
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
        ctx.lineWidth = 1
        for (let i = 0; i < canvas.width; i += 100) {
            ctx.beginPath()
            ctx.moveTo(i - (time * 20) % 100, 0)
            ctx.lineTo(i - (time * 20) % 100, canvas.height)
            ctx.stroke()
        }

        // Particles
        if (Math.random() < 0.4) {
            state.particles.push({
                x: canvas.width,
                y: Math.random() * canvas.height,
                speed: 10 + Math.random() * 10,
                size: 1 + Math.random() * 2,
                alpha: 0.1 + Math.random() * 0.2
            })
        }

        state.particles = state.particles.filter(p => {
            p.x -= p.speed
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
            ctx.beginPath()
            ctx.rect(p.x, p.y, p.size * 10, p.size)
            ctx.fill()
            return p.x > -50
        })

        // Physics
        const dy = state.targetY - state.boatY
        state.velocity = dy * 0.1
        state.boatY += state.velocity

        // Draw Boat
        const boatX = 120
        ctx.save()
        ctx.translate(boatX, state.boatY)
        ctx.rotate(state.velocity * 0.002)

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.beginPath()
        ctx.ellipse(0, 20, 40, 10, 0, 0, Math.PI * 2)
        ctx.fill()

        // Hull
        ctx.fillStyle = "#fff"
        ctx.beginPath()
        ctx.moveTo(30, 0)
        ctx.lineTo(-20, 15)
        ctx.lineTo(-20, -15)
        ctx.fill()

        // Cockpit
        ctx.fillStyle = "#3b82f6"
        ctx.beginPath()
        ctx.arc(-5, 0, 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()

        if (state.isStarted && !state.isGameOver) {
            state.score += 0.05
            if (Math.floor(state.score) > score) {
                setScore(Math.floor(state.score))
            }
            state.speed = 6 + (state.score / 200)

            if (time - state.lastSpawn > 1200 - Math.min(600, state.score)) {
                const type = Math.random() > 0.3 ? 'rock' : 'orb'
                state.obstacles.push({
                    x: canvas.width + 50,
                    y: 40 + Math.random() * (canvas.height - 80),
                    type,
                    size: type === 'rock' ? 20 : 12,
                    rotation: Math.random() * Math.PI
                })
                state.lastSpawn = time
            }

            state.obstacles = state.obstacles.filter(obs => {
                obs.x -= state.speed

                if (obs.type === 'rock') {
                    ctx.save()
                    ctx.translate(obs.x, obs.y)
                    obs.rotation += 0.02
                    ctx.rotate(obs.rotation)

                    ctx.fillStyle = "#ef4444"
                    ctx.shadowBlur = 15
                    ctx.shadowColor = "rgba(239, 68, 68, 0.4)"

                    ctx.beginPath()
                    ctx.moveTo(obs.size, 0)
                    ctx.lineTo(-obs.size / 2, obs.size)
                    ctx.lineTo(-obs.size / 2, -obs.size)
                    ctx.fill()
                    ctx.restore()
                } else {
                    ctx.save()
                    ctx.translate(obs.x, obs.y)

                    ctx.fillStyle = "#eab308"
                    ctx.shadowBlur = 20
                    ctx.shadowColor = "#eab308"

                    ctx.beginPath()
                    ctx.arc(0, 0, obs.size, 0, Math.PI * 2)
                    ctx.fill()

                    ctx.fillStyle = "#fff"
                    ctx.beginPath()
                    ctx.arc(0, 0, obs.size / 2, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.restore()
                }
                ctx.shadowBlur = 0

                const dx = obs.x - boatX
                const dy = obs.y - state.boatY
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < obs.size + 15) {
                    if (obs.type === 'rock') {
                        state.isGameOver = true
                        setIsGameOver(true)
                        setIsStarted(false)
                        if (state.score > highScore) {
                            setHighScore(Math.floor(state.score))
                            localStorage.setItem("boat-game-highscore", Math.floor(state.score).toString())
                        }
                    } else {
                        state.score += 20
                        ctx.fillStyle = "rgba(234, 179, 8, 0.3)"
                        ctx.fillRect(0, 0, canvas.width, canvas.height)
                        return false
                    }
                }

                return obs.x > -50
            })
        }

        if (!state.isGameOver) {
            requestRef.current = requestAnimationFrame(gameLoop)
        }
    }

    return (
        <section id="river-run" className="py-24 px-6 md:px-12 w-full">
            {/* Header matches styling of other sections */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 w-full">
                <div>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                        River Run
                    </h2>
                </div>

                <div className="flex items-center gap-6 md:gap-8 bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-end gap-2">
                            <Trophy className="w-3 h-3" /> Best
                        </div>
                        <div className="text-xl font-mono font-bold text-foreground">{highScore.toString().padStart(5, '0')}</div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Score</div>
                        <div className="text-3xl font-mono font-bold text-primary">{Math.floor(score).toString().padStart(5, '0')}</div>
                    </div>
                </div>
            </div>

            {/* Main Game Container - Matches Introduction container style */}
            <div className="relative w-full aspect-[4/5] md:aspect-[3/1] bg-card rounded-[32px] md:rounded-[48px] overflow-hidden shadow-sm border border-border/50 group">
                <canvas
                    ref={canvasRef}
                    width={960}
                    height={320}
                    className="w-full h-full object-cover object-left"
                />

                <AnimatePresence>
                    {!isStarted && !isGameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-10 transition-all duration-500 p-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <Button onClick={startGame} size="lg" className="w-full md:w-auto h-14 md:h-16 px-10 rounded-full text-lg font-semibold shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.6)] transition-all scale-100 hover:scale-105 active:scale-95 bg-primary text-primary-foreground border-0">
                                    <Play className="w-5 h-5 mr-3 fill-current" /> Initialize Run
                                </Button>
                                <p className="mt-6 text-xs text-white/50 tracking-[0.2em] uppercase font-medium">
                                    Tap to Start
                                </p>
                            </motion.div>
                        </div>
                    )}

                    {isGameOver && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl z-20 p-4"
                        >
                            <div className="text-center mb-10">
                                <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">Run Complete</h3>
                                <div className="flex items-center justify-center gap-4 mt-6">
                                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                        <span className="text-xs text-white/60 mr-3 tracking-widest uppercase">Final Score</span>
                                        <span className="text-2xl font-mono text-white font-bold">{Math.floor(score)}</span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={startGame} size="lg" className="h-14 px-8 rounded-full text-base font-medium bg-white text-black hover:bg-white/90 hover:scale-105 transition-all">
                                <RotateCcw className="w-4 h-4 mr-2" /> System Reboot
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Controls - Invisibile Touch Zones */}
                {isStarted && !isGameOver && (
                    <div className="absolute inset-0 md:hidden z-10 flex flex-col">
                        <div className="flex-1 active:bg-white/5 transition-colors" onPointerDown={(e) => { e.preventDefault(); handleInput('up') }} />
                        <div className="flex-1 active:bg-white/5 transition-colors" onPointerDown={(e) => { e.preventDefault(); handleInput('down') }} />
                    </div>
                )}

                {/* Fixed Navigation Buttons - Top Right Corner (Desktop) / Bottom Right (Mobile) */}
                <div className="absolute bottom-6 right-6 md:top-8 md:bottom-auto md:right-8 z-30 flex flex-col gap-3">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-lg transition-all active:scale-95"
                        onPointerDown={(e) => { e.preventDefault(); handleInput('up') }}
                    >
                        <ChevronUp className="w-6 h-6" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-lg transition-all active:scale-95"
                        onPointerDown={(e) => { e.preventDefault(); handleInput('down') }}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </Button>
                </div>
            </div>

        </section>
    )
}
