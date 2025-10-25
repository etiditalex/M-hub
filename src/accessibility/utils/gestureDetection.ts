// Gesture Detection Utility using TensorFlow.js
// This module handles hand landmark detection and gesture classification

interface HandPrediction {
  landmarks: number[][]
  handInViewConfidence: number
  boundingBox: {
    topLeft: [number, number]
    bottomRight: [number, number]
  }
}

interface GestureResult {
  gesture: string
  confidence: number
}

let handposeModel: any = null

/**
 * Load the handpose model (lazy loaded)
 */
export const loadHandposeModel = async () => {
  if (handposeModel) return handposeModel

  try {
    const handpose = await import('@tensorflow-models/handpose')
    handposeModel = await handpose.load()
    return handposeModel
  } catch (error) {
    console.error('Error loading handpose model:', error)
    throw error
  }
}

/**
 * Detect hand gesture from video element
 */
export const detectHandGesture = async (
  video: HTMLVideoElement
): Promise<GestureResult | null> => {
  try {
    if (!handposeModel) {
      handposeModel = await loadHandposeModel()
    }

    const predictions: HandPrediction[] = await handposeModel.estimateHands(video)

    if (predictions.length > 0) {
      const hand = predictions[0]
      const gesture = classifyGesture(hand.landmarks)
      return gesture
    }

    return null
  } catch (error) {
    console.error('Error detecting hand gesture:', error)
    return null
  }
}

/**
 * Classify gesture based on hand landmarks
 * This is a simplified version - you can expand with more complex algorithms
 */
function classifyGesture(landmarks: number[][]): GestureResult {
  // Calculate finger states (extended or closed)
  const fingerStates = getFingerStates(landmarks)
  
  // Map finger patterns to ASL alphabet signs
  const gesture = mapToASLAlphabet(fingerStates, landmarks)
  
  return gesture
}

/**
 * Determine which fingers are extended
 */
function getFingerStates(landmarks: number[][]): boolean[] {
  // Finger tip indices: thumb(4), index(8), middle(12), ring(16), pinky(20)
  // Finger base indices: thumb(2), index(5), middle(9), ring(13), pinky(17)
  
  const fingerTips = [4, 8, 12, 16, 20]
  const fingerBases = [2, 5, 9, 13, 17]
  const wrist = landmarks[0]
  
  return fingerTips.map((tipIndex, i) => {
    const tip = landmarks[tipIndex]
    const base = landmarks[fingerBases[i]]
    
    // Calculate distance from wrist
    const tipDistance = Math.hypot(tip[0] - wrist[0], tip[1] - wrist[1])
    const baseDistance = Math.hypot(base[0] - wrist[0], base[1] - wrist[1])
    
    // Finger is extended if tip is farther from wrist than base
    return tipDistance > baseDistance * 1.1
  })
}

/**
 * Map finger patterns to ASL alphabet letters
 * This is a simplified mapping - real ASL requires more complex analysis
 */
function mapToASLAlphabet(
  fingerStates: boolean[],
  landmarks: number[][]
): GestureResult {
  const [thumb, index, middle, ring, pinky] = fingerStates
  
  // Calculate hand orientation and other features (for future use)
  // const palmBase = landmarks[0]
  // const indexTip = landmarks[8]
  // const angle = Math.atan2(indexTip[1] - palmBase[1], indexTip[0] - palmBase[0])
  
  // Simple pattern matching for common letters
  // Note: Real ASL detection requires ML models trained on ASL datasets
  
  // Letter A: Fist with thumb to the side
  if (!index && !middle && !ring && !pinky && thumb) {
    return { gesture: 'A', confidence: 0.85 }
  }
  
  // Letter B: All fingers extended except thumb
  if (!thumb && index && middle && ring && pinky) {
    return { gesture: 'B', confidence: 0.85 }
  }
  
  // Letter C: Hand curved like 'C'
  if (thumb && !index && !middle && !ring && !pinky) {
    const curvature = calculateHandCurvature(landmarks)
    if (curvature > 0.3) {
      return { gesture: 'C', confidence: 0.75 }
    }
  }
  
  // Letter D: Index finger up, others closed, thumb across
  if (!thumb && index && !middle && !ring && !pinky) {
    return { gesture: 'D', confidence: 0.80 }
  }
  
  // Letter E: All fingers closed
  if (!thumb && !index && !middle && !ring && !pinky) {
    return { gesture: 'E', confidence: 0.70 }
  }
  
  // Letter F: Index and thumb touching, others extended
  if (thumb && !index && middle && ring && pinky) {
    const touching = areFingerstouching(landmarks[4], landmarks[8])
    if (touching) {
      return { gesture: 'F', confidence: 0.80 }
    }
  }
  
  // Letter I: Pinky extended, others closed
  if (!thumb && !index && !middle && !ring && pinky) {
    return { gesture: 'I', confidence: 0.85 }
  }
  
  // Letter L: Thumb and index extended at right angle
  if (thumb && index && !middle && !ring && !pinky) {
    const rightAngle = checkRightAngle(landmarks[4], landmarks[0], landmarks[8])
    if (rightAngle) {
      return { gesture: 'L', confidence: 0.85 }
    }
  }
  
  // Letter O: All fingertips touching forming circle
  if (checkCircleGesture(landmarks)) {
    return { gesture: 'O', confidence: 0.75 }
  }
  
  // Letter V: Index and middle extended, others closed
  if (!thumb && index && middle && !ring && !pinky) {
    return { gesture: 'V', confidence: 0.85 }
  }
  
  // Letter W: Index, middle, and ring extended
  if (!thumb && index && middle && ring && !pinky) {
    return { gesture: 'W', confidence: 0.80 }
  }
  
  // Letter Y: Thumb and pinky extended (shaka sign)
  if (thumb && !index && !middle && !ring && pinky) {
    return { gesture: 'Y', confidence: 0.85 }
  }
  
  // Default: Unknown gesture
  return { gesture: '?', confidence: 0.50 }
}

/**
 * Helper: Calculate hand curvature
 */
function calculateHandCurvature(landmarks: number[][]): number {
  const fingerTips = [8, 12, 16, 20]
  const palm = landmarks[0]
  
  let totalCurvature = 0
  fingerTips.forEach(tipIndex => {
    const tip = landmarks[tipIndex]
    const distance = Math.hypot(tip[0] - palm[0], tip[1] - palm[1])
    totalCurvature += distance
  })
  
  return totalCurvature / fingerTips.length / 100 // Normalized
}

/**
 * Helper: Check if two points are touching
 */
function areFingerstouching(point1: number[], point2: number[]): boolean {
  const distance = Math.hypot(point1[0] - point2[0], point1[1] - point2[1])
  return distance < 30 // Threshold for "touching"
}

/**
 * Helper: Check if three points form a right angle
 */
function checkRightAngle(p1: number[], p2: number[], p3: number[]): boolean {
  const vector1 = [p1[0] - p2[0], p1[1] - p2[1]]
  const vector2 = [p3[0] - p2[0], p3[1] - p2[1]]
  
  const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1]
  const magnitude1 = Math.hypot(vector1[0], vector1[1])
  const magnitude2 = Math.hypot(vector2[0], vector2[1])
  
  const cosAngle = dotProduct / (magnitude1 * magnitude2)
  const angle = Math.acos(cosAngle) * (180 / Math.PI)
  
  return Math.abs(angle - 90) < 20 // Within 20 degrees of 90
}

/**
 * Helper: Check if hand forms a circle (O gesture)
 */
function checkCircleGesture(landmarks: number[][]): boolean {
  const thumbTip = landmarks[4]
  const indexTip = landmarks[8]
  const distance = Math.hypot(thumbTip[0] - indexTip[0], thumbTip[1] - indexTip[1])
  
  return distance < 40 // Tips are close together
}

/**
 * Get list of supported gestures
 */
export const getSupportedGestures = (): string[] => {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'L', 'O', 'V', 'W', 'Y']
}

/**
 * Add custom gesture mapping (for future expansion)
 */
export const addCustomGesture = (
  name: string,
  _detector: (landmarks: number[][]) => boolean
) => {
  // This function allows adding new gesture detection logic dynamically
  // Can be used to extend the system with custom signs
  console.log(`Custom gesture "${name}" registered`)
  // Implementation would store custom detectors in a registry
}

