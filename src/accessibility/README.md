# Sign-Language Accessibility Mode for M-Hub

A comprehensive, client-side accessibility feature that enables sign-language communication through real-time gesture recognition, 3D avatar responses, and voice output.

---

## 🌟 Features

### ✅ Core Capabilities

1. **Real-Time Hand Gesture Recognition**
   - Uses TensorFlow.js and Handpose model for client-side detection
   - Supports ASL alphabet letters (A-Z subset currently implemented)
   - Live detection with confidence scoring
   - Visual feedback with colored borders and gesture labels

2. **Webcam Integration**
   - React-Webcam for camera access
   - Privacy-first: all processing happens locally
   - No video upload or storage
   - Graceful fallback if camera unavailable

3. **3D Avatar Sign Output**
   - Three.js powered 3D avatar
   - Animated responses for common phrases
   - Idle, greeting, thank you, goodbye animations
   - Smooth transitions and realistic movement

4. **Voice & Subtitle System**
   - Web Speech API for text-to-speech
   - Live word highlighting in subtitles
   - Pause/resume/stop controls
   - Visual waveform feedback

5. **Onboarding & Instructions**
   - Comprehensive modal guide
   - Step-by-step setup instructions
   - Supported gesture reference
   - Privacy and security information

---

## 📁 File Structure

```
src/accessibility/
├── SignLanguageMode.tsx        # Main component with toggle button
├── SignDetector.tsx            # Webcam & gesture detection
├── SignAvatar.tsx              # 3D avatar with animations
├── SpeechOutput.tsx            # Voice output & subtitles
├── InstructionsModal.tsx       # Onboarding guide
├── utils/
│   └── gestureDetection.ts     # TensorFlow.js gesture logic
└── README.md                   # This file
```

---

## 🚀 Installation & Setup

### 1. Dependencies

Already included in `package.json`:

```json
{
  "@tensorflow/tfjs": "^4.15.0",
  "@tensorflow-models/handpose": "^0.1.0",
  "@mediapipe/hands": "^0.4.1675469240",
  "@mediapipe/camera_utils": "^0.3.1675466862",
  "react-webcam": "^7.2.0"
}
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Usage

The Sign-Language Mode is automatically integrated into the **Ask M-Hub** page:

```tsx
import SignLanguageMode from './accessibility/SignLanguageMode'

<SignLanguageMode onSendMessage={handleMessage} />
```

The component appears as a floating accessibility button in the bottom-right corner.

---

## 🎯 How It Works

### Gesture Detection Pipeline

1. **Webcam Capture**
   - User enables camera through browser permissions
   - Video stream captured at 640x480 resolution
   - Displayed in real-time preview

2. **Hand Landmark Detection**
   - TensorFlow.js Handpose model detects 21 hand landmarks
   - Runs inference every 500ms for performance
   - Returns 3D coordinates for each landmark

3. **Gesture Classification**
   - Custom algorithm analyzes landmark positions
   - Calculates finger extension states
   - Maps patterns to ASL alphabet letters
   - Returns gesture with confidence score

4. **Text Accumulation**
   - High-confidence gestures (>70%) added to text
   - User can manually add spaces or delete characters
   - Accumulated text sent to AI chat when ready

5. **Avatar Response**
   - AI response triggers avatar animation
   - 3D model performs corresponding sign
   - Animation runs for 1.5-2 seconds

6. **Voice Output**
   - Web Speech API speaks the response
   - Subtitles display with word highlighting
   - User can pause/resume/stop playback

---

## 🔧 Customization

### Adding New Gestures

Edit `src/accessibility/utils/gestureDetection.ts`:

```typescript
// Add to mapToASLAlphabet function
if (fingerPattern === YOUR_PATTERN) {
  return { gesture: 'X', confidence: 0.85 }
}
```

### Custom Avatar Model

Replace the geometric avatar with a GLTF model:

```typescript
// In SignAvatar.tsx
const { scene } = useGLTF('/models/sign-avatar.glb')

return <primitive object={scene} />
```

### Avatar Animations

Add new animations in `SignAvatar.tsx`:

```typescript
if (lowerMessage.includes('custom')) {
  setCurrentAnimation('custom-animation')
  setTimeout(() => setCurrentAnimation('idle'), 2000)
}
```

### Voice Settings

Adjust speech parameters in `SpeechOutput.tsx`:

```typescript
utterance.rate = 0.9  // Speed (0.1 - 10)
utterance.pitch = 1.0 // Pitch (0 - 2)
utterance.volume = 1.0 // Volume (0 - 1)
```

---

## 🎨 Styling

All components use Tailwind CSS and follow M-Hub's design system:

- **Primary Color**: `#38bdf8` (cyan)
- **Accent Color**: `#f59e0b` (amber)
- **Background**: `#0f172a` (dark navy)
- **Glassmorphism**: `bg-white/5 backdrop-blur-xl`

### Custom Styles

Modify in component files or extend Tailwind config:

```javascript
// tailwind.config.js
extend: {
  colors: {
    accessibility: {
      primary: '#10b981', // Green for accessibility
    }
  }
}
```

---

## 🔐 Privacy & Security

### Client-Side Only

- ✅ All processing happens in the browser
- ✅ No video or images uploaded
- ✅ No external API calls for gesture detection
- ✅ Camera stream never leaves the device

### Permissions

- Camera access required for gesture detection
- User must explicitly grant permission
- Can be revoked anytime through browser settings

### Data Storage

- No persistent data storage
- Detected text lives only in component state
- Session cleared when mode is closed

---

## 📊 Performance Optimization

### Lazy Loading

Heavy libraries loaded only when accessibility mode is activated:

```typescript
const SignDetector = lazy(() => import('./SignDetector'))
const SignAvatar = lazy(() => import('./SignAvatar'))
```

### Detection Rate

- Inference runs every 500ms (2 FPS)
- Balances accuracy vs. performance
- Adjustable in `SignDetector.tsx`

### Model Size

- TensorFlow.js Handpose: ~12MB
- Loaded on-demand, not on initial page load
- Cached by browser for subsequent uses

---

## 🧪 Testing

### Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Edge | ✅ Full | Chromium-based |
| Firefox | ⚠️ Partial | No MediaPipe, use TF.js |
| Safari | ⚠️ Partial | Limited WebGL features |
| Mobile | ✅ Good | iOS Safari & Chrome Android |

### Test Checklist

- [ ] Camera permissions granted
- [ ] Hand detected in webcam
- [ ] Gestures recognized with >70% confidence
- [ ] Text accumulated correctly
- [ ] Message sent to AI chat
- [ ] Avatar animates on response
- [ ] Voice speaks response (if enabled)
- [ ] Subtitles display correctly
- [ ] Instructions modal opens/closes

---

## 🚧 Known Limitations

1. **Gesture Recognition**
   - Current implementation supports limited ASL subset
   - Static signs only (no dynamic/movement-based signs)
   - Requires good lighting for accuracy

2. **Avatar**
   - Geometric placeholder (not realistic human model)
   - Basic animations (not full ASL signing)
   - GLTF model recommended for production

3. **Browser Constraints**
   - Requires modern browser with WebGL
   - Camera access mandatory
   - Performance varies by device

---

## 🛣️ Roadmap

### Short Term
- [ ] Add remaining ASL alphabet letters
- [ ] Implement common word gestures
- [ ] Replace geometric avatar with realistic GLTF model
- [ ] Add more avatar animations

### Medium Term
- [ ] Dynamic gesture recognition (movement-based)
- [ ] ASL grammar support
- [ ] Multi-hand detection
- [ ] Gesture recording & playback

### Long Term
- [ ] Full ASL sentence support
- [ ] Multiple sign languages (BSL, JSL, etc.)
- [ ] Real-time translation both ways
- [ ] Machine learning model training on user data (opt-in)

---

## 📚 Resources

### ASL Learning
- [Lifeprint ASL Dictionary](https://www.lifeprint.com/)
- [HandSpeak ASL Dictionary](https://www.handspeak.com/)
- [Signing Savvy](https://www.signingsavvy.com/)

### Technical Documentation
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Handpose Model](https://github.com/tensorflow/tfjs-models/tree/master/handpose)
- [Three.js](https://threejs.org/docs/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## 🤝 Contributing

### Adding New Features

1. Create new component in `/accessibility`
2. Follow existing naming conventions
3. Use TypeScript for type safety
4. Add documentation in this README

### Improving Gesture Detection

1. Train ML model on ASL dataset
2. Export to TensorFlow.js format
3. Replace handpose model
4. Update `gestureDetection.ts`

### Reporting Issues

Open GitHub issue with:
- Browser and version
- Steps to reproduce
- Expected vs. actual behavior
- Console errors (if any)

---

## 📝 License

Same as main M-Hub project (MIT License)

---

## 👏 Acknowledgments

- **TensorFlow.js Team** for handpose model
- **Three.js Team** for 3D rendering library
- **ASL Community** for sign language resources
- **Web Speech API** for voice synthesis

---

## 📧 Support

For questions or issues with accessibility features:
- Email: accessibility@mhub.digital
- GitHub: [M-Hub Repository](https://github.com/etiditalex/M-hub)
- Documentation: This README

---

**Built with ❤️ for inclusive digital access**

*Making technology accessible to everyone, regardless of ability.*

