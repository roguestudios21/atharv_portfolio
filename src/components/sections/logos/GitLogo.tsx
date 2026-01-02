import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { getAssetPath } from '@/lib/utils'

export function GitLogo(props: any) {
  const { nodes } = useGLTF(getAssetPath('/models/git_logo.glb')) as any
  return (
    <group {...props} dispose={null}>
      {/* Matte Glass Base */}
      <mesh geometry={nodes.base_6.geometry} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial transmission={1} thickness={1} roughness={0.2} transparent opacity={0.5} color="#ffffff" />
      </mesh>
      {/* Colored Parts */}
      <mesh geometry={nodes['#3d2d00'].geometry} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#F05032" roughness={0.05} metalness={0.5} emissive="#F05032" emissiveIntensity={1.0} />
      </mesh>
      <mesh geometry={nodes['#ffffff'].geometry} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.5} emissive="#ffffff" emissiveIntensity={1.0} />
      </mesh>
    </group>
  )
}

useGLTF.preload(getAssetPath('/models/git_logo.glb'))
