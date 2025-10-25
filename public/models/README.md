# 3D Avatar Models for Sign-Language Mode

This folder contains 3D models used by the Sign-Language accessibility feature.

---

## 📁 Expected Files

### `sign-avatar.glb`
- **Format**: GLTF/GLB (Binary GLTF)
- **Purpose**: Main avatar model for sign language animations
- **Requirements**:
  - Rigged humanoid model
  - Separate hand/finger bones for detailed signing
  - Optimized for web (< 5MB recommended)
  - PBR materials for realistic rendering

---

## 🎨 Model Specifications

### Recommended Properties

```
Format: GLB (Binary GLTF 2.0)
Polygons: 10,000 - 50,000 triangles
Textures: 
  - Base Color: 1024x1024 or 2048x2048
  - Normal Map: Optional
  - Roughness/Metallic: Optional
Bones: 50-100 (including finger bones)
Animations: Embedded or separate
File Size: < 5MB (< 2MB ideal)
```

---

## 🔧 Creating Your Own Avatar

### Option 1: Use Ready-Made Models

**Free Sources:**
- [Ready Player Me](https://readyplayer.me/) - Customizable avatars
- [Mixamo](https://www.mixamo.com/) - Adobe's character library
- [Sketchfab](https://sketchfab.com/) - 3D model marketplace (CC licensed)

**Steps:**
1. Download model in FBX or OBJ format
2. Import into Blender
3. Rig with humanoid skeleton (if not already rigged)
4. Add hand bones for finger control
5. Export as GLB format

### Option 2: Commission Custom Model

**Recommended Platforms:**
- Fiverr
- Upwork
- ArtStation Marketplace

**Specifications to provide:**
- Humanoid character
- Neutral pose (T-pose or A-pose)
- Detailed hand rigging
- Web-optimized topology
- GLTF/GLB export

### Option 3: Create in Blender

```
1. Model humanoid character
2. UV unwrap and texture
3. Create armature:
   - Spine bones
   - Arm bones
   - Individual finger bones (important!)
4. Weight paint
5. Create base animations
6. Export: File > Export > glTF 2.0 (.glb)
```

---

## 🎬 Animation Setup

### Required Animations

The avatar should support these animations:

```javascript
{
  "idle": "Standing relaxed, subtle breathing",
  "hello": "Wave gesture",
  "thankyou": "Hand to chest, then outward",
  "goodbye": "Wave goodbye",
  "welcome": "Arms open wide gesture",
  "gesture": "Generic sign language movement"
}
```

### Animation Format

- Embedded in GLB file, or
- Separate animation files loaded dynamically

---

## 🚀 Implementation

### Loading the Model

In `SignAvatar.tsx`:

```typescript
import { useGLTF, useAnimations } from '@react-three/drei'

function AvatarModel({ animation }) {
  const { scene, animations } = useGLTF('/models/sign-avatar.glb')
  const { actions } = useAnimations(animations, scene)
  
  useEffect(() => {
    if (actions[animation]) {
      actions[animation].play()
    }
  }, [animation])
  
  return <primitive object={scene} />
}

// Preload
useGLTF.preload('/models/sign-avatar.glb')
```

---

## 🎨 Styling Tips

### Material Setup

- Use PBR materials for realistic lighting
- Keep textures compressed (use tools like [Texture Packer](https://www.codeandweb.com/texturepacker))
- Consider using vertex colors instead of textures for simpler models

### Color Scheme

To match M-Hub design:
- Primary: `#38bdf8` (cyan blue)
- Secondary: `#f59e0b` (amber)
- Accent: Gradient between colors

### Performance

- LOD (Level of Detail) models for different distances
- Draco compression for smaller file sizes
- Lazy loading to not impact initial page load

---

## 🔧 Blender Export Settings

When exporting from Blender to GLB:

```
Format: glTF Binary (.glb)
☑ Include:
  ☑ Selected Objects (or All)
  ☑ Custom Properties
  ☑ Cameras
  ☑ Punctual Lights
☑ Transform:
  ☑ +Y Up
☑ Data:
  ☑ UVs
  ☑ Normals
  ☑ Vertex Colors
  ☑ Materials: Export
  ☑ Images: Automatic
☑ Compression:
  ☑ Draco (optional, reduces size)
☑ Animation:
  ☑ Use Current Frame
  ☑ Animations
  ☑ Limit to Playback Range
  ☑ Sampling Rate: 1
  ☑ Always Sample Animations
```

---

## 📦 Current Status

**Status**: Using geometric placeholder

The current implementation uses a simple geometric representation (spheres, cylinders) as a placeholder. This is functional but not realistic.

To upgrade to a full 3D model:

1. Add `sign-avatar.glb` to this folder
2. Update `SignAvatar.tsx` to use `useGLTF` hook
3. Map animations to gesture types
4. Test and optimize

---

## 🧪 Testing Your Model

### Quick Test

```bash
# Start dev server
npm run dev

# Navigate to Ask M-Hub
# Enable Sign-Language Mode
# Check avatar renders correctly
# Test animations play smoothly
```

### Performance Benchmarks

- Load time: < 2 seconds
- FPS: 60 (on average hardware)
- Memory usage: < 100MB
- File size: < 5MB

---

## 🎓 Resources

### GLTF/GLB Format
- [GLTF Official Site](https://www.khronos.org/gltf/)
- [GLTF Validator](https://github.khronos.org/glTF-Validator/)
- [GLTF Viewer](https://gltf-viewer.donmccurdy.com/)

### Blender Tutorials
- [Blender Guru - Character Modeling](https://www.youtube.com/c/BlenderGuruOfficial)
- [Grant Abbitt - Character Creation](https://www.youtube.com/c/GrantAbbitt)
- [CG Geek - GLTF Export](https://www.youtube.com/c/CGGeek)

### Three.js Resources
- [Three.js GLTF Loading](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)

---

## 💡 Pro Tips

1. **Optimize Early**: Start with low-poly and optimize throughout
2. **Test on Mobile**: Ensure model runs smoothly on phones
3. **Use Mixamo**: Great for quick rigging and animations
4. **Compress Textures**: Use WebP or compressed PNG
5. **Version Control**: Keep source Blender files separate from exported GLB

---

## 📧 Need Help?

If you need assistance with:
- Model creation
- Animation setup
- GLTF export
- Performance optimization

Contact: accessibility@mhub.digital

---

**Current Model**: Geometric Placeholder
**Ready for**: Production GLTF model integration
**Next Step**: Add sign-avatar.glb to this folder

