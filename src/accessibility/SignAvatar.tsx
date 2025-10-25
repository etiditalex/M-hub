import { useRef, useEffect, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface SignAvatarProps {
  message: string
  isActive: boolean
}

// Avatar Model Component
function AvatarModel({ animation }: { animation: string }) {
  const group = useRef<THREE.Group>(null)
  
  // In production, replace with actual GLTF model path
  // For now, we'll create a simple geometric representation
  
  useFrame((state) => {
    if (group.current) {
      // Idle animation
      if (animation === 'idle') {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05
      }
      
      // Greeting animation
      if (animation === 'hello') {
        const time = state.clock.elapsedTime
        group.current.rotation.x = Math.sin(time * 3) * 0.2
      }
      
      // Thank you animation
      if (animation === 'thankyou') {
        const time = state.clock.elapsedTime
        group.current.rotation.z = Math.sin(time * 2) * 0.15
      }
    }
  })

  return (
    <group ref={group}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      
      {/* Left Arm */}
      <group position={[-0.4, 0.9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        {/* Left Hand */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      </group>
      
      {/* Right Arm */}
      <group position={[0.4, 0.9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        {/* Right Hand */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      </group>
      
      {/* Glow effect */}
      <pointLight intensity={0.5} distance={3} color="#38bdf8" />
    </group>
  )
}

// Main Avatar Component
const SignAvatar = ({ message, isActive }: SignAvatarProps) => {
  const [currentAnimation, setCurrentAnimation] = useState('idle')

  useEffect(() => {
    if (!isActive) {
      setCurrentAnimation('idle')
      return
    }

    // Determine animation based on message content
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      setCurrentAnimation('hello')
      setTimeout(() => setCurrentAnimation('idle'), 2000)
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      setCurrentAnimation('thankyou')
      setTimeout(() => setCurrentAnimation('idle'), 2000)
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      setCurrentAnimation('goodbye')
      setTimeout(() => setCurrentAnimation('idle'), 2000)
    } else if (lowerMessage.includes('welcome')) {
      setCurrentAnimation('welcome')
      setTimeout(() => setCurrentAnimation('idle'), 2000)
    } else {
      setCurrentAnimation('gesture')
      setTimeout(() => setCurrentAnimation('idle'), 1500)
    }
  }, [message, isActive])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="space-y-2"
    >
      <label className="text-sm text-gray-400 font-medium">
        Sign Avatar Response:
      </label>
      
      <div className="relative bg-gradient-to-b from-dark-800 to-dark-900 rounded-lg overflow-hidden border border-white/10">
        <Canvas
          camera={{ position: [0, 1.5, 3], fov: 50 }}
          className="h-48"
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#f59e0b" />
          
          <Suspense fallback={null}>
            <AvatarModel animation={currentAnimation} />
          </Suspense>
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate={currentAnimation === 'idle'}
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        {/* Animation Label */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <motion.div
            key={currentAnimation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-4 py-1.5 bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 rounded-full"
          >
            <span className="text-xs text-primary-400 font-medium capitalize">
              {currentAnimation === 'idle' ? 'Listening...' : `Signing: ${currentAnimation}`}
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Response Text */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-white/5 border border-white/10 rounded-lg"
        >
          <p className="text-sm text-gray-300 italic">"{message}"</p>
        </motion.div>
      )}
      
      {/* Avatar Info */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Avatar Status: Active</span>
        <span>Animation: {currentAnimation}</span>
      </div>
    </motion.div>
  )
}

// Preload avatar assets (for future GLTF models)
export const preloadAvatar = () => {
  // useGLTF.preload('/models/sign-avatar.glb')
  console.log('Avatar assets ready for preload')
}

export default SignAvatar

