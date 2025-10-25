import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { motion } from 'framer-motion'
import { Camera, AlertCircle } from 'lucide-react'
import { detectHandGesture } from './utils/gestureDetection'

interface SignDetectorProps {
  isActive: boolean
  onTextDetected: (text: string) => void
}

const SignDetector = ({ isActive, onTextDetected }: SignDetectorProps) => {
  const webcamRef = useRef<Webcam>(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [detectionActive, setDetectionActive] = useState(false)
  const [currentGesture, setCurrentGesture] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [accumulatedText, setAccumulatedText] = useState('')
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      loadModel()
    } else {
      stopDetection()
    }

    return () => {
      stopDetection()
    }
  }, [isActive])

  const loadModel = async () => {
    try {
      setError(null)
      // Dynamically import TensorFlow.js only when needed
      const tf = await import('@tensorflow/tfjs')
      const handpose = await import('@tensorflow-models/handpose')
      
      await tf.ready()
      await handpose.load()
      
      setIsModelLoaded(true)
      setDetectionActive(true)
      startDetection()
    } catch (err) {
      console.error('Error loading hand detection model:', err)
      setError('Failed to load hand detection model. Please refresh and try again.')
    }
  }

  const startDetection = () => {
    if (detectionIntervalRef.current) return

    detectionIntervalRef.current = setInterval(async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        await detectHand()
      }
    }, 500) // Detect every 500ms for performance
  }

  const stopDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
    setDetectionActive(false)
  }

  const detectHand = async () => {
    try {
      const video = webcamRef.current?.video
      if (!video) return

      const result = await detectHandGesture(video)
      
      if (result) {
        setCurrentGesture(result.gesture)
        setConfidence(result.confidence)
        
        // Only add to text if confidence is high enough
        if (result.confidence > 0.7 && result.gesture !== ' ') {
          const newText = accumulatedText + result.gesture
          setAccumulatedText(newText)
          onTextDetected(newText)
        }
      } else {
        setCurrentGesture(null)
        setConfidence(0)
      }
    } catch (err) {
      console.error('Hand detection error:', err)
    }
  }

  const handleClearText = () => {
    setAccumulatedText('')
    onTextDetected('')
  }

  const handleAddSpace = () => {
    const newText = accumulatedText + ' '
    setAccumulatedText(newText)
    onTextDetected(newText)
  }

  const handleRemoveLast = () => {
    const newText = accumulatedText.slice(0, -1)
    setAccumulatedText(newText)
    onTextDetected(newText)
  }

  return (
    <div className="space-y-3">
      {/* Webcam Display */}
      <div className="relative">
        <div
          className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
            currentGesture
              ? 'border-green-500 shadow-lg shadow-green-500/30'
              : 'border-white/10'
          }`}
        >
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-48 object-cover bg-dark-800"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: 'user',
            }}
            onUserMediaError={(err) => {
              console.error('Webcam error:', err)
              setError('Unable to access camera. Please check permissions.')
            }}
          />

          {/* Loading Overlay */}
          {!isModelLoaded && (
            <div className="absolute inset-0 bg-dark-900/90 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mb-3" />
              <p className="text-sm text-gray-400">Loading hand detection model...</p>
            </div>
          )}

          {/* Detection Indicator */}
          {isModelLoaded && detectionActive && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-3 left-3 flex items-center space-x-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30"
            >
              <Camera className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-medium">Detecting</span>
            </motion.div>
          )}

          {/* Current Gesture Display */}
          {currentGesture && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 px-4 py-2 bg-green-500/90 rounded-lg"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentGesture}</div>
                <div className="text-xs text-white/80">
                  {Math.round(confidence * 100)}% confident
                </div>
              </div>
            </motion.div>
          )}

          {/* Hand Guide Overlay */}
          {isModelLoaded && !currentGesture && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-dark-900/80 rounded-full">
              <p className="text-xs text-gray-400">Show hand gesture to camera</p>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-start space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleAddSpace}
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
        >
          Add Space
        </button>
        <button
          onClick={handleRemoveLast}
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
          disabled={!accumulatedText}
        >
          Delete Last
        </button>
        <button
          onClick={handleClearText}
          className="flex-1 px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
          disabled={!accumulatedText}
        >
          Clear All
        </button>
      </div>

      {/* Detection Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Model: {isModelLoaded ? 'Loaded ✓' : 'Loading...'}</span>
        <span>Characters: {accumulatedText.length}</span>
      </div>
    </div>
  )
}

export default SignDetector

