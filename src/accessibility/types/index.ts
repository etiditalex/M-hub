// TypeScript type definitions for Sign-Language Accessibility Features

/**
 * Gesture detection result from TensorFlow.js
 */
export interface GestureResult {
  gesture: string
  confidence: number
  timestamp?: number
}

/**
 * Hand landmark data from Handpose model
 */
export interface HandLandmarks {
  landmarks: number[][]
  handInViewConfidence: number
  boundingBox: {
    topLeft: [number, number]
    bottomRight: [number, number]
  }
}

/**
 * Animation types for 3D avatar
 */
export type AvatarAnimation = 
  | 'idle'
  | 'hello'
  | 'thankyou'
  | 'goodbye'
  | 'welcome'
  | 'gesture'

/**
 * Avatar state
 */
export interface AvatarState {
  currentAnimation: AvatarAnimation
  isActive: boolean
  message: string
}

/**
 * Sign-Language Mode configuration
 */
export interface SignLanguageConfig {
  enableCamera: boolean
  enableVoice: boolean
  showSubtitles: boolean
  detectionInterval: number // milliseconds
  confidenceThreshold: number // 0-1
  autoSend: boolean
}

/**
 * Detection status
 */
export type DetectionStatus = 
  | 'idle'
  | 'loading'
  | 'detecting'
  | 'error'

/**
 * Webcam state
 */
export interface WebcamState {
  isActive: boolean
  hasPermission: boolean
  error: string | null
  stream: MediaStream | null
}

/**
 * Speech synthesis state
 */
export interface SpeechState {
  isSpeaking: boolean
  isPaused: boolean
  currentWord: string
  supported: boolean
}

/**
 * Message for chat integration
 */
export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  source?: 'keyboard' | 'sign-language'
}

/**
 * Gesture mapping entry
 */
export interface GestureMapping {
  id: string
  name: string
  pattern: (landmarks: number[][]) => boolean
  confidence: number
  description?: string
}

/**
 * Custom gesture detector function
 */
export type GestureDetector = (landmarks: number[][]) => GestureResult | null

/**
 * Model loading status
 */
export interface ModelStatus {
  isLoaded: boolean
  isLoading: boolean
  error: string | null
  progress: number // 0-100
}

/**
 * Accessibility preferences (stored locally)
 */
export interface AccessibilityPreferences {
  preferredVoice?: string
  speechRate: number
  speechPitch: number
  speechVolume: number
  subtitlesEnabled: boolean
  highContrastMode: boolean
  largeText: boolean
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  fps: number
  detectionLatency: number // milliseconds
  modelLoadTime: number // milliseconds
  memoryUsage: number // MB
}

/**
 * Event handlers
 */
export interface SignLanguageEventHandlers {
  onGestureDetected?: (gesture: GestureResult) => void
  onTextAccumulated?: (text: string) => void
  onMessageSent?: (message: string) => void
  onError?: (error: Error) => void
  onCameraStateChange?: (state: WebcamState) => void
  onModelLoaded?: () => void
}

/**
 * Component props for main SignLanguageMode
 */
export interface SignLanguageModeProps {
  onSendMessage?: (message: string) => void
  config?: Partial<SignLanguageConfig>
  handlers?: SignLanguageEventHandlers
  className?: string
}

/**
 * Component props for SignDetector
 */
export interface SignDetectorProps {
  isActive: boolean
  onTextDetected: (text: string) => void
  onGestureDetected?: (gesture: GestureResult) => void
  config?: Partial<SignLanguageConfig>
}

/**
 * Component props for SignAvatar
 */
export interface SignAvatarProps {
  message: string
  isActive: boolean
  animation?: AvatarAnimation
  onAnimationComplete?: () => void
}

/**
 * Component props for SpeechOutput
 */
export interface SpeechOutputProps {
  text: string
  enabled: boolean
  showSubtitles: boolean
  preferences?: Partial<AccessibilityPreferences>
  onSpeechEnd?: () => void
}

/**
 * Component props for InstructionsModal
 */
export interface InstructionsModalProps {
  onClose: () => void
  onStart?: () => void
  showOnFirstVisit?: boolean
}

/**
 * Finger state for gesture recognition
 */
export interface FingerState {
  thumb: boolean
  index: boolean
  middle: boolean
  ring: boolean
  pinky: boolean
}

/**
 * Hand orientation
 */
export interface HandOrientation {
  angle: number // radians
  direction: 'up' | 'down' | 'left' | 'right'
  palmFacing: 'camera' | 'away'
}

/**
 * Advanced gesture features
 */
export interface GestureFeatures {
  fingerStates: FingerState
  orientation: HandOrientation
  handSize: number
  curvature: number
  spread: number
}

/**
 * Training data for custom gestures
 */
export interface GestureTrainingData {
  gestureName: string
  samples: number[][][]
  labels: string[]
  accuracy?: number
}

/**
 * Export all supported gestures
 */
export const SUPPORTED_GESTURES = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'L', 'O', 'V', 'W', 'Y'] as const

export type SupportedGesture = typeof SUPPORTED_GESTURES[number]

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: SignLanguageConfig = {
  enableCamera: false,
  enableVoice: true,
  showSubtitles: true,
  detectionInterval: 500,
  confidenceThreshold: 0.7,
  autoSend: false,
}

/**
 * Default accessibility preferences
 */
export const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  speechRate: 0.9,
  speechPitch: 1.0,
  speechVolume: 1.0,
  subtitlesEnabled: true,
  highContrastMode: false,
  largeText: false,
}

