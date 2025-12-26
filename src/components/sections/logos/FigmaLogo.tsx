import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    base_5: THREE.Mesh
    ['#1abcfe']: THREE.Mesh
    ['#0acf83']: THREE.Mesh
    ['#ff7262']: THREE.Mesh
    ['#f24e1e']: THREE.Mesh
    ['#a259ff']: THREE.Mesh
  }
}

export function FigmaLogo(props: any) {
  const { nodes } = useGLTF('/models/figma_logo.glb') as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Base */}
      <mesh geometry={nodes.base_5.geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#ffffff" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes['#1abcfe'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#1abcfe" roughness={0.05} metalness={0.5} emissive="#1abcfe" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#0acf83'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#0acf83" roughness={0.05} metalness={0.5} emissive="#0acf83" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#ff7262'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#ff7262" roughness={0.05} metalness={0.5} emissive="#ff7262" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#f24e1e'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#f24e1e" roughness={0.05} metalness={0.5} emissive="#f24e1e" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#a259ff'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#a259ff" roughness={0.05} metalness={0.5} emissive="#a259ff" emissiveIntensity={1.0} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/figma_logo.glb')
