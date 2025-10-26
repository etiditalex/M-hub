import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Social Media Icon Component (3D Sphere with color)
function SocialIcon({ 
  position, 
  color, 
  delay = 0,
  shape = 'sphere',
  name
}: { 
  position: [number, number, number]
  color: string
  delay?: number
  shape?: 'sphere' | 'box'
  name: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Rolling animation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + delay) * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime + delay) * 0.3
      
      // Floating effect
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3
    }
    
    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1.2 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1
      glowRef.current.scale.set(scale, scale, scale)
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1
    }
    
    if (textRef.current) {
      // Keep text billboard (always facing camera)
      textRef.current.quaternion.copy(state.camera.quaternion)
    }
  })

  // Create text sprite
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx) {
    canvas.width = 512
    canvas.height = 128
    ctx.font = 'bold 80px Arial'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(name, 256, 64)
  }
  const texture = new THREE.CanvasTexture(canvas)

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Glow effect */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.3, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
        
        {/* Main icon */}
        <mesh ref={meshRef} castShadow>
          {shape === 'sphere' ? (
            <icosahedronGeometry args={[1, 1]} />
          ) : (
            <boxGeometry args={[1.5, 1.5, 1.5]} />
          )}
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        
        {/* Text label */}
        <mesh ref={textRef} position={[0, -2, 0]}>
          <planeGeometry args={[3, 0.75]} />
          <meshBasicMaterial map={texture} transparent opacity={0.9} />
        </mesh>
      </group>
    </Float>
  )
}

// Connecting Lines Between Icons
function ConnectionLine({ 
  start, 
  end 
}: { 
  start: [number, number, number]
  end: [number, number, number]
}) {
  const lineRef = useRef<THREE.Line>(null)

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#22c55e', transparent: true, opacity: 0.4 }))} ref={lineRef} />
  )
}

// Particles Effect
function Particles() {
  const particlesRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20
        positions[i + 1] = (Math.random() - 0.5) * 20
        positions[i + 2] = (Math.random() - 0.5) * 20
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#22c55e" transparent opacity={0.6} />
    </points>
  )
}

// Main Scene Component
function Scene() {
  const socialIcons = [
    { position: [-4, 2, 0] as [number, number, number], color: '#1877f2', delay: 0, shape: 'sphere' as const, name: 'Facebook' },
    { position: [0, 3, 0] as [number, number, number], color: '#1da1f2', delay: 0.5, shape: 'box' as const, name: 'Twitter' },
    { position: [4, 2, 0] as [number, number, number], color: '#0077b5', delay: 1, shape: 'sphere' as const, name: 'LinkedIn' },
    { position: [-3, -1, 0] as [number, number, number], color: '#e4405f', delay: 1.5, shape: 'sphere' as const, name: 'Instagram' },
    { position: [3, -1, 0] as [number, number, number], color: '#25d366', delay: 2, shape: 'sphere' as const, name: 'WhatsApp' },
    { position: [0, -2, 0] as [number, number, number], color: '#ff0000', delay: 2.5, shape: 'box' as const, name: 'YouTube' },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

      <Particles />

      {socialIcons.map((icon, index) => (
        <SocialIcon key={index} {...icon} />
      ))}

      {/* Connection Lines */}
      <ConnectionLine start={[-4, 2, 0]} end={[0, 3, 0]} />
      <ConnectionLine start={[0, 3, 0]} end={[4, 2, 0]} />
      <ConnectionLine start={[-4, 2, 0]} end={[-3, -1, 0]} />
      <ConnectionLine start={[4, 2, 0]} end={[3, -1, 0]} />
      <ConnectionLine start={[-3, -1, 0]} end={[0, -2, 0]} />
      <ConnectionLine start={[3, -1, 0]} end={[0, -2, 0]} />

      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

// Main Export Component
export default function SocialMediaScene() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} shadows>
        <Scene />
      </Canvas>
    </div>
  )
}

