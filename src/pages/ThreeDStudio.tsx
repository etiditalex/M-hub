import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus, MeshDistortMaterial, Environment } from '@react-three/drei'
import { Box as BoxIcon, Play, RotateCw, Download } from 'lucide-react'
import * as THREE from 'three'
import PageLayout from '../components/PageLayout'
import SEO from '../components/SEO'

type SceneType = 'orbs' | 'waves' | 'cubes' | 'abstract'

/**
 * Animated Orbs
 */
function AnimatedOrbs() {
  const group = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={group}>
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#4fd573"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Sphere args={[0.5, 32, 32]} position={[2, 1, -1]}>
        <meshStandardMaterial color="#ffffff" emissive="#4fd573" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.3, 32, 32]} position={[-2, -1, 1]}>
        <meshStandardMaterial color="#4fd573" emissive="#4fd573" emissiveIntensity={0.8} />
      </Sphere>
    </group>
  )
}

/**
 * Animated Waves
 */
function AnimatedWaves() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry
      const positions = geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 2 + time) * 0.5 + Math.cos(y * 2 + time) * 0.5
      }

      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[8, 8, 32, 32]} />
      <meshStandardMaterial
        color="#4fd573"
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

/**
 * Animated Cubes
 */
function AnimatedCubes() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.x = clock.getElapsedTime() * 0.3
      group.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  const cubes = Array.from({ length: 27 }, (_, i) => {
    const x = (i % 3) - 1
    const y = Math.floor(i / 3) % 3 - 1
    const z = Math.floor(i / 9) - 1
    return { position: [x * 1.5, y * 1.5, z * 1.5] as [number, number, number], key: i }
  })

  return (
    <group ref={group}>
      {cubes.map((cube) => (
        <Box key={cube.key} args={[0.5, 0.5, 0.5]} position={cube.position}>
          <meshStandardMaterial
            color="#4fd573"
            emissive="#4fd573"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      ))}
    </group>
  )
}

/**
 * Abstract Torus
 */
function AbstractScene() {
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = clock.getElapsedTime() * 0.5
      torusRef.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group>
      <Torus ref={torusRef} args={[1.5, 0.5, 32, 100]}>
        <MeshDistortMaterial
          color="#4fd573"
          distort={0.6}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Torus>
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </Sphere>
    </group>
  )
}

/**
 * 3D Scene Component
 */
function Scene({ type }: { type: SceneType }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4fd573" />
      
      {type === 'orbs' && <AnimatedOrbs />}
      {type === 'waves' && <AnimatedWaves />}
      {type === 'cubes' && <AnimatedCubes />}
      {type === 'abstract' && <AbstractScene />}
      
      <Environment preset="night" />
      <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={1} />
    </>
  )
}

/**
 * 3D Creative Studio - Interactive Three.js canvas
 */
export default function ThreeDStudio() {
  const [sceneType, setSceneType] = useState<SceneType>('orbs')
  const [autoRotate, setAutoRotate] = useState(true)

  const scenes: { value: SceneType; label: string; description: string }[] = [
    { value: 'orbs', label: 'Glowing Orbs', description: 'Distorted spheres with emission' },
    { value: 'waves', label: 'Wave Grid', description: 'Animated wireframe waves' },
    { value: 'cubes', label: 'Cube Matrix', description: '3D cube grid formation' },
    { value: 'abstract', label: 'Abstract Torus', description: 'Distorted torus ring' },
  ]

  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = `mhub-3d-${sceneType}-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <PageLayout>
      <SEO
        title="3D Creative Studio - M-Hub AI"
        description="Design and visualize interactive 3D scenes, animations, and creative experiences with WebGL rendering."
        keywords={["3D studio", "WebGL", "Three.js", "3D design", "interactive 3D", "creative studio"]}
        url="https://etiditalex.github.io/M-hub/mhub-ai/3d"
      />

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center mx-auto mb-6">
              <BoxIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              3D Creative Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Design and visualize interactive 3D experiences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Controls Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Scene Selector */}
              <div className="card-white">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Select Scene
                </h3>
                <div className="space-y-2">
                  {scenes.map((scene) => (
                    <button
                      key={scene.value}
                      onClick={() => setSceneType(scene.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        sceneType === scene.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 bg-gray-50 hover:border-primary-300'
                      }`}
                      aria-pressed={sceneType === scene.value}
                    >
                      <div className="font-semibold text-black mb-1">
                        {scene.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {scene.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="card-white">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Controls
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                      autoRotate
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-black">Auto Rotate</span>
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      autoRotate ? 'bg-primary-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${
                        autoRotate ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </button>

                  <button
                    onClick={handleScreenshot}
                    className="btn-primary w-full"
                    aria-label="Download screenshot"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Save Screenshot
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="card-white">
                <h3 className="text-lg font-semibold text-black mb-4">
                  <Play className="w-5 h-5 inline mr-2 text-primary-500" />
                  Interact
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <RotateCw className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-black">Rotate:</span> Click and drag
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BoxIcon className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-black">Zoom:</span> Scroll or pinch
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BoxIcon className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-black">Pan:</span> Right-click and drag
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="card-white p-0 overflow-hidden" style={{ height: '700px' }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <Scene type={sceneType} />
                </Canvas>
              </div>

              {/* Scene Info */}
              <div className="mt-6 card-white">
                <h3 className="text-lg font-semibold text-black mb-2">
                  Current Scene: {scenes.find(s => s.value === sceneType)?.label}
                </h3>
                <p className="text-gray-600 mb-4">
                  {scenes.find(s => s.value === sceneType)?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
                    WebGL Rendering
                  </span>
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
                    Real-Time
                  </span>
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
                    Interactive
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 card-white"
          >
            <h3 className="text-xl font-bold text-black mb-6 text-center">
              Studio Features
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-gray-600">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                  <BoxIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="font-semibold text-black mb-1">
                  Procedural Generation
                </div>
                <p className="text-sm">
                  Dynamic 3D scenes created on-the-fly
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                  <RotateCw className="w-6 h-6 text-primary-600" />
                </div>
                <div className="font-semibold text-black mb-1">
                  Real-Time Interaction
                </div>
                <p className="text-sm">
                  Rotate, zoom, and pan in real-time
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-primary-600" />
                </div>
                <div className="font-semibold text-black mb-1">
                  Smooth Animations
                </div>
                <p className="text-sm">
                  60 FPS fluid animations
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-primary-600" />
                </div>
                <div className="font-semibold text-black mb-1">
                  Export Ready
                </div>
                <p className="text-sm">
                  Save screenshots instantly
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}

