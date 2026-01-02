"use client"

import React, { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
    OrbitControls,
    useGLTF,
    ContactShadows,
    Environment,
    Center
} from "@react-three/drei"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Box } from "lucide-react"
import models from "@/data/models.json"
import { Button } from "@/components/ui/button"
import { getAssetPath } from "@/lib/utils"

function Model({ path, scale, rotation }: { path: string, scale: number, rotation?: [number, number, number] }) {
    const { scene } = useGLTF(getAssetPath(path)) as any
    return (
        <Center precise>
            <primitive
                object={scene}
                scale={scale}
                rotation={rotation || [0, 0, 0]}
            />
        </Center>
    )
}

export function ModelShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const currentModel = models[currentIndex]

    const nextModel = () => setCurrentIndex((prev) => (prev + 1) % models.length)
    const prevModel = () => setCurrentIndex((prev) => (prev - 1 + models.length) % models.length)

    return (
        <section id="showcase" className="w-full py-24 px-6 md:px-12 bg-background transition-colors duration-500 overflow-hidden border-t border-border">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                        3D Showcase
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                        High-fidelity 3D models with interactive preview.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevModel}
                        className="w-12 h-12 rounded-full border-border bg-card/50 backdrop-blur-md hover:bg-card/80 transition-all active:scale-95"
                    >
                        <ChevronLeft className="w-6 h-6 text-foreground" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextModel}
                        className="w-12 h-12 rounded-full border-border bg-card/50 backdrop-blur-md hover:bg-card/80 transition-all active:scale-95"
                    >
                        <ChevronRight className="w-6 h-6 text-foreground" />
                    </Button>
                </div>
            </div>

            <div className="w-full h-[400px] md:h-[520px] rounded-[48px] overflow-hidden bg-card border border-border relative transition-all duration-500 shadow-sm group/viewer">
                {/* Model Info Overlay */}
                <div className="absolute top-8 left-8 z-10 pointer-events-none">
                    <motion.div
                        key={currentModel.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-1"
                    >
                        <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                            Now Viewing
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                            {currentModel.name}
                        </h3>
                    </motion.div>
                </div>

                {/* Interaction Hint */}
                <div className="absolute bottom-8 right-8 z-10 pointer-events-none hidden md:block">
                    <div className="px-4 py-2 bg-background/50 backdrop-blur-xl rounded-full border border-border flex items-center gap-2">
                        <Box className="w-4 h-4 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Drag to Rotate • Scroll to Zoom
                        </span>
                    </div>
                </div>

                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 8], fov: 45 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={1.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#0071e3" />

                        <group position={[0, 0, 0]}>
                            <Center bottom>
                                <Model
                                    key={currentModel.id}
                                    path={currentModel.path}
                                    scale={currentModel.scale || 1}
                                    rotation={currentModel.rotation as [number, number, number]}
                                />
                            </Center>
                            <ContactShadows
                                position={[0, -0.01, 0]}
                                opacity={0.5}
                                scale={10}
                                blur={2}
                                far={10}
                                resolution={256}
                                color="#000000"
                            />
                        </group>

                        <OrbitControls
                            makeDefault
                            enableZoom={true}
                            minDistance={4}
                            maxDistance={12}
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI / 1.75}
                        />
                        <Environment preset="city" />
                    </Suspense>
                    <color attach="background" args={[isDark ? "#101010" : "#fbfbfd"]} />
                </Canvas>
            </div>

            {/* Model Thumbnails/Indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {models.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 transition-all duration-300 rounded-full ${idx === currentIndex ? "w-12 bg-primary" : "w-4 bg-border hover:bg-muted-foreground"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}
