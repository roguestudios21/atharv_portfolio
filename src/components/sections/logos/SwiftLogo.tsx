import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function SwiftLogo(props: any) {
  const { nodes } = useGLTF('/models/swift_logo.glb') as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Part (FF6D00) */}
      <mesh geometry={nodes.FF6D00.geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#FF6D00" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes['#E64A19'].geometry} position={[0, 0.032, 0]}>
        <meshStandardMaterial color="#E64A19" roughness={0.05} metalness={0.5} emissive="#E64A19" emissiveIntensity={0.2} />
      </mesh>
      <mesh geometry={nodes.ffffff.geometry} position={[0, 0.053, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.5} emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/swift_logo.glb')
