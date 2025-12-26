import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function PythonLogo(props: any) {
  const { nodes } = useGLTF('/models/python_logo.glb') as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Part (base_2) */}
      <mesh geometry={nodes.base_2.geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#ffffff" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes.FFD43B.geometry} position={[0.226, 0.03, -0.226]} rotation={[-Math.PI, 0, -Math.PI]}>
        <meshStandardMaterial color="#FFD43B" roughness={0.05} metalness={0.5} emissive="#FFD43B" emissiveIntensity={0.2} />
      </mesh>
      <mesh geometry={nodes['306998'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#306998" roughness={0.05} metalness={0.5} emissive="#306998" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/python_logo.glb')
