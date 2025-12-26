import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function FirebaseLogo(props: any) {
  const { nodes } = useGLTF('/models/firebase_logo.glb') as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Base */}
      <mesh geometry={nodes.base_7.geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#ffffff" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes['#FFA000'].geometry} position={[0, 0.032, 0]} scale={0.898}>
        <meshStandardMaterial color="#FFA000" roughness={0.05} metalness={0.5} emissive="#FFA000" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#FF8F00'].geometry} position={[0.002, 0.042, 0]} scale={0.898}>
        <meshStandardMaterial color="#FF8F00" roughness={0.05} metalness={0.5} emissive="#FF8F00" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#FF6F00'].geometry} position={[0, 0.042, 0]} scale={0.898}>
        <meshStandardMaterial color="#FF6F00" roughness={0.05} metalness={0.5} emissive="#FF6F00" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#FFC400'].geometry} position={[0, 0.05, 0]} scale={0.898}>
        <meshStandardMaterial color="#FFC400" roughness={0.05} metalness={0.5} emissive="#FFC400" emissiveIntensity={1.0} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/firebase_logo.glb')
