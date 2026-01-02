import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { getAssetPath } from '@/lib/utils'

export function TensorflowLogo(props: any) {
  const { nodes } = useGLTF(getAssetPath('/models/tensorflow_logo.glb')) as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Part (base_3) */}
      <mesh geometry={nodes.base_3.geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#ffffff" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes['#FFA000002'].geometry} position={[-0.016, 0.05, 0]}>
        <meshStandardMaterial color="#FFA000" roughness={0.05} metalness={0.5} emissive="#FFA000" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#FFA000001'].geometry} position={[-0.016, 0.04, 0]}>
        <meshStandardMaterial color="#FFA000" roughness={0.05} metalness={0.5} emissive="#FFA000" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#FFB300'].geometry} position={[-0.016, 0.05, 0]}>
        <meshStandardMaterial color="#FFB300" roughness={0.05} metalness={0.5} emissive="#FFB300" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#FFB300001'].geometry} position={[-0.016, 0.04, 0]}>
        <meshStandardMaterial color="#FFB300" roughness={0.05} metalness={0.5} emissive="#FFB300" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#FFB300002'].geometry} position={[-0.016, 0.03, 0]}>
        <meshStandardMaterial color="#FFB300" roughness={0.05} metalness={0.5} emissive="#FFB300" emissiveIntensity={1.0} />
      </mesh>
    </group>
  )
}

useGLTF.preload(getAssetPath('/models/tensorflow_logo.glb'))
