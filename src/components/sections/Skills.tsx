"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, Float, RoundedBox, PerspectiveCamera, Center } from "@react-three/drei"
import * as THREE from "three"
import { ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import skills from "@/data/skills.json"

import { BlenderLogo } from "./logos/BlenderLogo"
import { FigmaLogo } from "./logos/FigmaLogo"
import { FirebaseLogo } from "./logos/FirebaseLogo"
import { GitLogo } from "./logos/GitLogo"
import { PythonLogo } from "./logos/PythonLogo"
import { ReactLogo } from "./logos/ReactLogo"
import { SwiftLogo } from "./logos/SwiftLogo"
import { SwiftUILogo } from "./logos/SwiftUILogo"
import { TensorflowLogo } from "./logos/TensorflowLogo"

interface Skill {
    id: number;
    name: string;
    icon: string;
}

const LogoComponents: Record<string, React.ComponentType<any>> = {
    "Blender": BlenderLogo,
    "Figma": FigmaLogo,
    "Firebase": FirebaseLogo,
    "Git": GitLogo,
    "Python": PythonLogo,
    "React": ReactLogo,
    "Swift": SwiftLogo,
    "SwiftUI": SwiftUILogo,
    "TensorFlow": TensorflowLogo,
};

function SkillBlock({ skill, index, total, hoveredId, setHoveredId }: {
    skill: Skill,
    index: number,
    total: number,
    hoveredId: number | null,
    setHoveredId: (id: number | null) => void
}) {
    const meshRef = useRef<THREE.Group>(null)
    const isHovered = hoveredId === skill.id
    const LogoComponent = LogoComponents[skill.name]
    const has3DModel = !!LogoComponent

    // Calculate position on a cylinder
    const radius = 25
    const angle = (index / total) * Math.PI * 2

    useFrame((state) => {
        if (!meshRef.current) return
        const targetScale = isHovered ? 1.1 : 1
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    })

    return (
        <group
            ref={meshRef}
            position={[
                Math.sin(angle) * radius,
                (index % 3 - 1) * 1.5,
                Math.cos(angle) * radius
            ]}
            rotation={[0, angle, 0]}
        >
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                {has3DModel ? (
                    <group
                        onPointerOver={(e) => {
                            e.stopPropagation()
                            setHoveredId(skill.id)
                        }}
                        onPointerOut={() => setHoveredId(null)}
                    >
                        <Center>
                            {LogoComponent && (
                                <LogoComponent
                                    scale={15}
                                    rotation={[Math.PI / 2, 0, 0]}
                                    position={[0, 0, 0]}
                                />
                            )}
                        </Center>
                        {/* Invisible hit-box */}
                        <mesh visible={false}>
                            <boxGeometry args={[6, 6, 2]} />
                        </mesh>
                    </group>
                ) : (
                    <RoundedBox
                        args={[4.0, 4.0, 0.5]}
                        radius={0.1}
                        smoothness={4}
                        onPointerOver={(e) => {
                            e.stopPropagation()
                            setHoveredId(skill.id)
                        }}
                        onPointerOut={() => setHoveredId(null)}
                    >
                        <meshStandardMaterial
                            color={isHovered ? "#0071e3" : "#ffffff"}
                            emissive={isHovered ? "#0071e3" : "#000000"}
                            emissiveIntensity={isHovered ? 0.3 : 0}
                            roughness={0.1}
                            metalness={0.2}
                        />
                    </RoundedBox>
                )}

                {!has3DModel && (
                    <Html
                        transform
                        distanceFactor={6}
                        position={[0, 0, 0.61]}
                        className="pointer-events-none select-none"
                        occlude="blending"
                    >
                        <div className="flex flex-col items-center justify-center w-40 h-40">
                            {skill.icon && (
                                <div className="w-18 h-18 mb-5 drop-shadow-lg">
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                            <span className={`text-center font-bold text-lg tracking-tight transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#1d1d1f]'}`}>
                                {skill.name}
                            </span>
                        </div>
                    </Html>
                )}
            </Float>
        </group>
    )
}

function SkillCloud({ rotationX, rotationY }: { rotationX: number, rotationY: number }) {
    const groupRef = useRef<THREE.Group>(null)
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    useFrame(() => {
        if (groupRef.current) {
            // Smoothly interpolate to the target rotations
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY, 0.05)
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotationX, 0.05)
        }
    })

    return (
        <group ref={groupRef}>
            {skills.map((skill, index) => (
                <SkillTileProxy
                    key={skill.id}
                    skill={skill}
                    index={index}
                    total={skills.length}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                />
            ))}
        </group>
    )
}

// Wrapper to avoid confusion with the component name
const SkillTileProxy = SkillBlock;

export function Skills() {
    const [rotationY, setRotationY] = useState(0)
    const [rotationX, setRotationX] = useState(0)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const startRotationY = useRef(0)

    // Handle button clicks
    const rotate = (direction: "left" | "right") => {
        const step = (Math.PI * 2) / 8 // Rotate 1/8th of a circle
        setRotationY(prev => direction === "right" ? prev + step : prev - step)
    }

    // Drag Interaction Logic
    const onPointerDown = (e: React.PointerEvent) => {
        isDragging.current = true
        startX.current = e.clientX
        startRotationY.current = rotationY
        // Set capture to keep receiving events even if mouse leaves the element
        const target = e.currentTarget as HTMLElement
        target.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return

        const deltaX = e.clientX - startX.current
        // Sensitivity factor (lower is slower/more controlled)
        const sensitivity = 0.005

        setRotationY(startRotationY.current + deltaX * sensitivity)

        // Add a very subtle X tilt based on Y movement for extra depth if desired
        // but let's keep it mostly horizontal for now as requested.
    }

    const onPointerUp = (e: React.PointerEvent) => {
        isDragging.current = false
        const target = e.currentTarget as HTMLElement
        target.releasePointerCapture(e.pointerId)
    }

    return (
        <section id="skills" className="py-24 px-6 md:px-12 w-full bg-[#fbfbfd]">
            <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">Skills & Technologies</h2>
                        <p className="text-lg md:text-xl text-[#86868b] max-w-2xl">
                            A curated set of tools and platforms I use to bring ideas to life.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => rotate("left")}
                            className="w-12 h-12 rounded-full border-[#d2d2d7] hover:bg-white hover:shadow-md transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-6 h-6 text-[#1d1d1f]" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => rotate("right")}
                            className="w-12 h-12 rounded-full border-[#d2d2d7] hover:bg-white hover:shadow-md transition-all active:scale-95"
                        >
                            <ChevronRight className="w-6 h-6 text-[#1d1d1f]" />
                        </Button>
                    </div>
                </div>

                <div className="w-full h-[450px] md:h-[550px] rounded-[48px] overflow-hidden bg-white border border-[#d2d2d7] relative shadow-2xl shadow-black/5 group/canvas mt-8">
                    {/* Drag Overlay */}
                    <div
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing touch-none"
                    />

                    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 38], fov: 40 }}>
                        <PerspectiveCamera makeDefault position={[0, 0, 38]} fov={40} />
                        <ambientLight intensity={1.2} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} color="#0071e3" />
                        <spotLight position={[-15, 20, 10]} angle={0.25} penumbra={1} intensity={2} castShadow />

                        <React.Suspense fallback={null}>
                            <SkillCloud rotationX={rotationX} rotationY={rotationY} />
                        </React.Suspense>

                        <fog attach="fog" args={["#fbfbfd", 35, 95]} />
                    </Canvas>

                    {/* Overlay interaction hint */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-black/5 backdrop-blur-md rounded-full border border-black/5 pointer-events-none z-10">
                        <MousePointer2 className="w-4 h-4 text-[#1d1d1f]/40" />
                        <span className="text-[10px] font-bold text-[#1d1d1f]/40 uppercase tracking-[0.2em]">
                            Hold and Drag to Rotate
                        </span>
                    </div>

                    <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5 rounded-[48px] z-10" />
                </div>
            </div>
        </section>
    )
}
