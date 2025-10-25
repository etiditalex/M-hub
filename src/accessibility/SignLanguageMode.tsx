import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, X, Info, Volume2, VolumeX, Camera, CameraOff } from 'lucide-react'
import Card from '../components/Card'

// Lazy load heavy components
const SignDetector = lazy(() => import('./SignDetector'))
const SignAvatar = lazy(() => import('./SignAvatar'))
const SpeechOutput = lazy(() => import('./SpeechOutput'))
const InstructionsModal = lazy(() => import('./InstructionsModal'))

interface SignLanguageModeProps {
  onSendMessage?: (message: string) => void
}

const SignLanguageMode = ({ onSendMessage }: SignLanguageModeProps) => {
  const [isActive, setIsActive] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [detectedText, setDetectedText] = useState('')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [aiResponse, setAiResponse] = useState('')

  const handleToggleMode = () => {
    if (!isActive) {
      setShowInstructions(true)
    }
    setIsActive(!isActive)
    setIsCameraActive(false)
    setDetectedText('')
  }

  const handleTextDetected = (text: string) => {
    setDetectedText(text)
  }

  const handleSendDetectedText = () => {
    if (detectedText.trim() && onSendMessage) {
      onSendMessage(detectedText)
      // Simulate AI response for avatar animation
      setAiResponse('Thank you for your message. I understand.')
      setDetectedText('')
    }
  }

  const handleCameraToggle = () => {
    setIsCameraActive(!isCameraActive)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleMode}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            : 'bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
        }`}
        title="Sign-Language Mode"
      >
        <Accessibility className="w-6 h-6 text-white" />
      </motion.button>

      {/* Main Accessibility Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Accessibility className="w-5 h-5 text-green-400" />
                  <h3 className="font-bold text-lg">Sign-Language Mode</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowInstructions(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Instructions"
                  >
                    <Info className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={handleToggleMode}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between space-x-3">
                <button
                  onClick={handleCameraToggle}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isCameraActive
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30'
                  }`}
                >
                  {isCameraActive ? (
                    <Camera className="w-4 h-4" />
                  ) : (
                    <CameraOff className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {isCameraActive ? 'Camera On' : 'Camera Off'}
                  </span>
                </button>

                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title={isVoiceEnabled ? 'Disable Voice' : 'Enable Voice'}
                >
                  {isVoiceEnabled ? (
                    <Volume2 className="w-5 h-5 text-primary-400" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showSubtitles
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}
                >
                  CC
                </button>
              </div>

              {/* Webcam & Detection */}
              {isCameraActive && (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-48 bg-dark-800 rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400" />
                    </div>
                  }
                >
                  <SignDetector
                    isActive={isCameraActive}
                    onTextDetected={handleTextDetected}
                  />
                </Suspense>
              )}

              {/* Detected Text Display */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">
                  Detected Input:
                </label>
                <div className="relative">
                  <textarea
                    value={detectedText}
                    onChange={(e) => setDetectedText(e.target.value)}
                    placeholder="Your detected sign language will appear here..."
                    className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  />
                  {detectedText && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <span className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                        Detected
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendDetectedText}
                disabled={!detectedText.trim()}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send to AI Assistant
              </button>

              {/* 3D Avatar Section */}
              {aiResponse && (
                <Suspense fallback={<div className="h-32 bg-dark-800 rounded-lg" />}>
                  <SignAvatar message={aiResponse} isActive={!!aiResponse} />
                </Suspense>
              )}

              {/* Speech Output */}
              {isVoiceEnabled && aiResponse && (
                <Suspense fallback={null}>
                  <SpeechOutput
                    text={aiResponse}
                    enabled={isVoiceEnabled}
                    showSubtitles={showSubtitles}
                  />
                </Suspense>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions Modal */}
      {showInstructions && (
        <Suspense fallback={null}>
          <InstructionsModal onClose={() => setShowInstructions(false)} />
        </Suspense>
      )}
    </>
  )
}

export default SignLanguageMode

