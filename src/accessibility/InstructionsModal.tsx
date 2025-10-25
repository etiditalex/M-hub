import { motion } from 'framer-motion'
import { X, Camera, Hand, Volume2, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import { getSupportedGestures } from './utils/gestureDetection'

interface InstructionsModalProps {
  onClose: () => void
}

const InstructionsModal = ({ onClose }: InstructionsModalProps) => {
  const supportedGestures = getSupportedGestures()

  const steps = [
    {
      icon: Camera,
      title: 'Enable Camera Access',
      description: 'Allow camera permissions when prompted. The camera feed stays on your device - nothing is uploaded.',
      color: 'text-blue-400',
    },
    {
      icon: Hand,
      title: 'Position Your Hand',
      description: 'Place your hand in the camera view with good lighting. Keep your hand flat and fingers visible.',
      color: 'text-green-400',
    },
    {
      icon: CheckCircle,
      title: 'Make Gestures',
      description: 'Form ASL alphabet letters. Hold each gesture for 1-2 seconds for detection. Watch the green indicator.',
      color: 'text-primary-400',
    },
    {
      icon: Volume2,
      title: 'Get Responses',
      description: 'The 3D avatar will sign back responses, and voice output can read them aloud with subtitles.',
      color: 'text-purple-400',
    },
  ]

  const tips = [
    'Use good lighting for better detection',
    'Keep your hand steady when forming signs',
    'The system learns as you use it',
    'Practice with simple letters first',
    'Use the "Add Space" button between words',
  ]

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-dark-900 border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="sticky top-0 bg-dark-900 border-b border-white/10 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Hand className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Sign-Language Mode Guide</h2>
                <p className="text-sm text-gray-400">How to use accessibility features</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Steps */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Info className="w-5 h-5 text-primary-400" />
                <span>Getting Started</span>
              </h3>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${step.color}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-bold text-gray-500">STEP {index + 1}</span>
                        </div>
                        <h4 className="font-semibold mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Supported Gestures */}
            <div>
              <h3 className="text-xl font-bold mb-4">Supported ASL Letters</h3>
              <div className="p-4 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-xl">
                <p className="text-sm text-gray-400 mb-3">
                  Currently supported alphabet signs:
                </p>
                <div className="flex flex-wrap gap-2">
                  {supportedGestures.map((gesture) => (
                    <motion.div
                      key={gesture}
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center font-bold text-lg cursor-pointer hover:bg-primary-500/30 transition-colors"
                    >
                      {gesture}
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  More gestures are being added continuously. Check for updates!
                </p>
              </div>
            </div>

            {/* Tips */}
            <div>
              <h3 className="text-xl font-bold mb-4">Pro Tips</h3>
              <div className="space-y-2">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Privacy & Security</h4>
                  <p className="text-sm text-gray-300">
                    All hand detection happens locally in your browser using TensorFlow.js. 
                    No video or images are uploaded to any server. Your camera feed remains 
                    completely private and secure on your device.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <a
                href="https://www.lifeprint.com/asl101/fingerspelling/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-400 hover:text-primary-300 underline"
              >
                Learn ASL Alphabet →
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
              >
                Got It, Let's Start!
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default InstructionsModal

