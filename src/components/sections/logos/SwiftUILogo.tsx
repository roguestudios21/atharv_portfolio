import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function SwiftUILogo(props: any) {
  const { nodes } = useGLTF('/models/swiftUI_logo.glb') as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Part (#007AFF) */}
      <mesh geometry={nodes['#007AFF'].geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#007AFF" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes.ffffff001.geometry} position={[0, 0.053, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.5} emissive="#ffffff" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes.a000c8.geometry} position={[0, 0.032, 0]}>
        <meshStandardMaterial color="#a000c8" roughness={0.05} metalness={0.5} emissive="#a000c8" emissiveIntensity={1.0} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/swiftUI_logo.glb')
