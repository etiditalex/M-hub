# ♿ M-Hub Accessibility Features - Quick Start Guide

Welcome to M-Hub's Sign-Language Communication Interface! This guide will help you get started with our inclusive accessibility features.

---

## 🎯 What is Sign-Language Mode?

Sign-Language Mode enables users who communicate using sign language to interact naturally with M-Hub's AI assistant through:

- **Real-Time Gesture Recognition** using your webcam
- **3D Avatar Responses** that sign back to you
- **Voice Output** with live subtitles
- **Complete Privacy** - everything runs locally in your browser

---

## 🚀 Quick Start (5 Steps)

### Step 1: Navigate to AI Chat

1. Go to **https://etiditalex.github.io/M-hub/ask-mhub**
2. You'll see the M-Hub AI chat interface

### Step 2: Enable Accessibility Mode

1. Look for the **♿ floating button** in the bottom-right corner
2. Click it to open the Sign-Language Mode panel

### Step 3: Allow Camera Access

1. Your browser will ask for camera permission
2. Click **Allow** to enable webcam
3. Position yourself so your hand is visible in the frame

### Step 4: Start Signing

1. Make ASL alphabet signs with your hand
2. Watch for the **green border** when a gesture is detected
3. Detected letters appear in the text box automatically

### Step 5: Send Your Message

1. Use **Add Space** button between words
2. Click **Send to AI Assistant** when done
3. Watch the 3D avatar respond with sign language!

---

## 📖 Supported Gestures

Currently supported ASL alphabet letters:

```
A  B  C  D  E  F  I  L  O  V  W  Y
```

More gestures are being added regularly!

---

## 💡 Tips for Best Results

### Lighting
- ✅ Use good lighting (natural or bright room light)
- ✅ Avoid backlighting (don't sit with window behind you)
- ❌ Avoid dim or flickering lights

### Hand Position
- ✅ Keep hand flat and fingers visible
- ✅ Position hand in center of camera view
- ✅ Hold gesture steady for 1-2 seconds
- ❌ Avoid fast movements

### Camera Setup
- ✅ Use external webcam for better quality (optional)
- ✅ Clean your camera lens
- ✅ Position camera at eye level

---

## 🎨 Features Overview

### 🎥 Webcam Detection
- Real-time hand tracking
- Visual feedback with colored borders
- Confidence score display
- Live gesture preview

### 🤖 3D Avatar
- Animated sign language responses
- Idle, greeting, thank you, goodbye animations
- Smooth transitions
- Interactive 3D controls

### 🔊 Voice & Subtitles
- Text-to-speech for responses
- Live word highlighting in subtitles
- Pause/resume/stop controls
- Waveform visualization

### ℹ️ Onboarding
- Step-by-step instructions
- Gesture reference guide
- Privacy information
- Pro tips

---

## 🔐 Privacy & Security

### Your Data is Safe

✅ **All processing happens in your browser**
- No video uploaded to servers
- No images stored anywhere
- No external API calls for gesture detection

✅ **Camera stays local**
- Stream never leaves your device
- Can be turned off anytime
- Permissions can be revoked

✅ **No tracking**
- No analytics on your gestures
- No user data collection
- Completely anonymous

---

## 🛠️ Troubleshooting

### Camera Not Working

**Problem**: Camera doesn't turn on

**Solutions**:
1. Check browser permissions (usually top-right camera icon)
2. Try refreshing the page
3. Use Chrome or Edge (best compatibility)
4. Check if another app is using the camera

### Gestures Not Detected

**Problem**: Hand visible but no detection

**Solutions**:
1. Improve lighting conditions
2. Make sure hand is fully in frame
3. Hold gesture steady for 2 seconds
4. Try positioning hand closer/farther from camera
5. Wait for "Model: Loaded ✓" status

### Low Confidence

**Problem**: Gestures detected with low confidence

**Solutions**:
1. Form clearer hand shapes
2. Keep fingers separated and visible
3. Use contrasting background
4. Practice with simple letters first (A, B, V)

### Avatar Not Showing

**Problem**: 3D avatar doesn't appear

**Solutions**:
1. Check if WebGL is enabled in your browser
2. Update your graphics drivers
3. Try a different browser
4. Check console for errors (F12)

### No Voice Output

**Problem**: Avatar doesn't speak

**Solutions**:
1. Check if voice is enabled (speaker icon)
2. Unmute your device
3. Try Chrome or Edge (best speech support)
4. Check browser speech settings

---

## 🎓 Learning ASL

Want to learn more ASL signs? Check these resources:

### Online Courses
- [Gallaudet University](https://www.gallaudet.edu/asl-connect)
- [Start ASL](https://www.startasl.com/)
- [SignSchool](https://www.signschool.com/)

### Dictionaries
- [Lifeprint ASL Dictionary](https://www.lifeprint.com/)
- [HandSpeak](https://www.handspeak.com/)
- [Signing Savvy](https://www.signingsavvy.com/)

### Apps
- **The ASL App** (iOS/Android)
- **SignSchool** (iOS/Android)
- **Marlee Signs** (iOS/Android)

---

## 📱 Mobile Support

Sign-Language Mode works on mobile devices!

### iOS (Safari/Chrome)
- ✅ Camera access supported
- ✅ Gesture recognition works
- ⚠️ Performance may vary
- 💡 Use rear camera for better results

### Android (Chrome)
- ✅ Full support
- ✅ Good performance on modern devices
- 💡 External camera recommended for tablets

### Tips for Mobile
1. Use landscape orientation
2. Prop phone on stable surface
3. Ensure good lighting
4. Keep phone charged (uses more battery)

---

## 🔮 Coming Soon

### Planned Features
- [ ] Full ASL alphabet (26 letters)
- [ ] Common word gestures (hello, thanks, etc.)
- [ ] Two-handed signs
- [ ] Dynamic movement recognition
- [ ] Multiple sign languages (BSL, JSL)
- [ ] Custom gesture training
- [ ] Gesture recording & playback
- [ ] Real-time conversation mode

### Want to Contribute?
- Suggest new features
- Report bugs
- Contribute gesture patterns
- Share feedback

Email: accessibility@mhub.digital

---

## 🆘 Need Help?

### Get Support

**Email**: accessibility@mhub.digital

**GitHub Issues**: [M-Hub Repository](https://github.com/etiditalex/M-hub/issues)

**Documentation**: 
- Main README: [README.md](README.md)
- Technical Docs: [src/accessibility/README.md](src/accessibility/README.md)

### Common Questions

**Q: Is this real ASL?**
A: We support a subset of ASL alphabet signs currently. Full ASL grammar and conversation support is coming!

**Q: Can I use it offline?**
A: After first load, the models are cached. However, you need internet for initial page load.

**Q: Does it work with other sign languages?**
A: Currently ASL only. BSL, JSL, and other sign languages are on the roadmap!

**Q: How accurate is it?**
A: Accuracy depends on lighting and hand position. With good conditions, accuracy is 75-90%.

**Q: Can I train it to recognize my signs?**
A: Custom gesture training is planned for a future update!

---

## 🌟 Share Your Experience

Help us improve! Share your experience:

- **Twitter**: Tag @MHubDigital
- **Email**: feedback@mhub.digital
- **GitHub**: Open an issue or PR

---

## 🙏 Acknowledgments

This feature was built with:
- TensorFlow.js for hand tracking
- Three.js for 3D avatar
- Web Speech API for voice output
- React & TypeScript for the interface

Special thanks to:
- The ASL community
- Open-source contributors
- Accessibility advocates

---

## 📄 License

Same as main M-Hub project (MIT License)

---

**Built with ❤️ by Alex Etidit**

*Making digital communication accessible to everyone*

---

**Ready to start?** 

👉 [Try Sign-Language Mode Now](https://etiditalex.github.io/M-hub/ask-mhub)

