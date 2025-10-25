import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Pause, Play } from 'lucide-react'

interface SpeechOutputProps {
  text: string
  enabled: boolean
  showSubtitles: boolean
}

const SpeechOutput = ({ text, enabled, showSubtitles }: SpeechOutputProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentWord, setCurrentWord] = useState('')
  const [speechSupported, setSpeechSupported] = useState(false)

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('speechSynthesis' in window) {
      setSpeechSupported(true)
    }
  }, [])

  useEffect(() => {
    if (enabled && text && speechSupported) {
      speakText(text)
    }

    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [text, enabled])

  const speakText = (textToSpeak: string) => {
    if (!speechSupported) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    
    // Configure voice settings
    utterance.rate = 0.9 // Slightly slower for clarity
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // Try to select a pleasant voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Female')
    ) || voices.find(voice => voice.lang.startsWith('en'))
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      setCurrentWord('')
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      setIsSpeaking(false)
      setIsPaused(false)
    }

    utterance.onboundary = (event) => {
      // Highlight current word for subtitle effect
      if (event.name === 'word' && showSubtitles) {
        const word = textToSpeak.substr(event.charIndex, event.charLength || 10)
        setCurrentWord(word)
      }
    }

    window.speechSynthesis.speak(utterance)
  }

  const handlePauseResume = () => {
    if (!speechSupported) return

    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    } else {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }

  const handleStop = () => {
    if (!speechSupported) return
    
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
    setCurrentWord('')
  }

  if (!enabled || !speechSupported) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3"
    >
      {/* Speech Controls */}
      <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <motion.div
            animate={isSpeaking && !isPaused ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-primary-400' : 'text-gray-400'}`} />
          </motion.div>
          <div>
            <p className="text-sm font-medium">
              {isSpeaking
                ? isPaused
                  ? 'Speech Paused'
                  : 'Speaking...'
                : 'Ready to Speak'}
            </p>
            <p className="text-xs text-gray-500">Web Speech API</p>
          </div>
        </div>

        {isSpeaking && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePauseResume}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? (
                <Play className="w-4 h-4 text-green-400" />
              ) : (
                <Pause className="w-4 h-4 text-yellow-400" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Stop"
            >
              <VolumeX className="w-4 h-4 text-red-400" />
            </button>
          </div>
        )}
      </div>

      {/* Live Subtitles */}
      {showSubtitles && isSpeaking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-dark-800 border border-primary-500/30 rounded-lg"
        >
          <div className="flex items-start space-x-2 mb-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse mt-2" />
            <p className="text-xs text-primary-400 font-medium uppercase tracking-wide">
              Live Subtitles
            </p>
          </div>
          <p className="text-base text-gray-200 leading-relaxed">
            {text.split(' ').map((word, index) => (
              <span
                key={index}
                className={`${
                  word === currentWord
                    ? 'bg-primary-500/30 text-primary-300 px-1 rounded'
                    : ''
                } transition-all duration-200`}
              >
                {word}{' '}
              </span>
            ))}
          </p>
        </motion.div>
      )}

      {/* Waveform Visualization */}
      {isSpeaking && !isPaused && (
        <div className="flex items-center justify-center space-x-1 h-12 bg-white/5 rounded-lg">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-primary-500 to-primary-300 rounded-full"
              animate={{
                height: ['20%', '80%', '20%'],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      )}

      {/* Browser Support Notice */}
      {!speechSupported && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-400">
            Voice output is not supported in your browser. Please use a modern browser like Chrome, Edge, or Safari.
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default SpeechOutput

