"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

function AnimatedStars() {
    const ref = useRef<THREE.Group>(null)
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })
    return (
        <group ref={ref}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    )
}

export function BackgroundCanvas() {
    return (
        <div className="absolute inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <AnimatedStars />
            </Canvas>
        </div>
    )
}
