import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function ReactLogo(props: any) {
  const { nodes } = useGLTF('/models/react_logo.glb') as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Part (base_4) */}
      <mesh geometry={nodes.base_4.geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#ffffff" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes['0081A3_2'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#61DAFB" roughness={0.05} metalness={0.5} emissive="#61DAFB" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['0081A3'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#61DAFB" roughness={0.05} metalness={0.5} emissive="#61DAFB" emissiveIntensity={1.0} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/react_logo.glb')
