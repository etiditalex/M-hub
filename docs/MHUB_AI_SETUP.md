# M-Hub AI - Setup Guide

**M-Hub AI** is a generative AI module integrated into the M-Hub platform that enables users to create marketing content, generate images, and design interactive 3D scenes.

---

## 🎯 Features

### 1. **AI Text Generator** (`/mhub-ai/text`)
- Generate marketing copy, blog posts, and content
- **4 Tone Options**: Professional, Friendly, Creative, Technical
- Instant preview with copy and download functionality
- Built-in example prompts

### 2. **AI Image Generator** (`/mhub-ai/image`)
- Create visuals from text descriptions
- **Powered by OpenAI DALL-E**
- **3 Size Options**: 256x256, 512x512, 1024x1024
- Download generated images
- Neon-glow loading animation

### 3. **3D Creative Studio** (`/mhub-ai/3d`)
- Interactive Three.js-powered 3D canvas
- **4 Scene Types**:
  - Glowing Orbs (distorted spheres)
  - Wave Grid (animated wireframe)
  - Cube Matrix (3D grid formation)
  - Abstract Torus (distorted ring)
- Real-time controls: rotate, zoom, pan
- Screenshot export functionality
- 60 FPS WebGL rendering

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (for text and image generation)
- Git

### Step 1: Clone and Install
```bash
cd M-hub
npm install
```

### Step 2: Environment Configuration
Create a `.env` file in the project root:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` and add your API keys:

```env
# OpenAI API Key (required for text and image generation)
VITE_OPENAI_API_KEY=sk-your-openai-key-here

# API Base URL (optional - for backend proxy)
VITE_API_BASE_URL=https://your-api-proxy.com

# Brave Search API (optional - for research mode)
VITE_BRAVE_API_KEY=your-brave-key-here
```

**Get your OpenAI API key:**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file

---

## 🚀 Running Locally

### Development Mode
```bash
npm run dev
```

Visit `http://localhost:5173/M-hub/mhub-ai`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment

### GitHub Pages (Current Setup)
The M-Hub AI module is deployed alongside the main M-Hub platform:

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build the production bundle
2. Deploy to `gh-pages` branch
3. Available at: `https://yourusername.github.io/M-hub/mhub-ai`

### API Key Security (Important!)

⚠️ **For production, DO NOT expose API keys in client-side code!**

Since GitHub Pages is **client-side only**, you need a **backend proxy** for secure API calls.

#### Option 1: Vercel Serverless Functions (Recommended)

1. Create a Vercel account at https://vercel.com
2. Create a new project and link your GitHub repo
3. Add API keys to Vercel environment variables
4. Create serverless functions:

**`/api/generate-text.js`:**
```javascript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, maxTokens } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens || 500,
    })

    res.status(200).json({
      text: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error('OpenAI Error:', error)
    res.status(500).json({ error: 'Failed to generate text' })
  }
}
```

**`/api/generate-image.js`:**
```javascript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, size, n } = req.body

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: size || '1024x1024',
      n: n || 1,
    })

    res.status(200).json({
      images: response.data.map(img => img.url),
    })
  } catch (error) {
    console.error('OpenAI Error:', error)
    res.status(500).json({ error: 'Failed to generate images' })
  }
}
```

5. Update `VITE_API_BASE_URL` in your `.env`:
```env
VITE_API_BASE_URL=https://your-vercel-app.vercel.app
```

#### Option 2: Cloudflare Workers

Similar setup to Vercel, but using Cloudflare's edge functions.

#### Option 3: Your Own Backend

Deploy a simple Express.js server with OpenAI integration and CORS enabled.

---

## 🧪 Development Mode (Mock Data)

For local development **without an API key**, the module includes **mock data fallbacks**.

When `import.meta.env.DEV` is true and API calls fail, the system automatically uses:
- **Text Generator**: Pre-written sample responses for each tone
- **Image Generator**: Placeholder images via placeholder services

This allows you to:
- Test UI/UX without API costs
- Demo the platform to clients
- Develop new features locally

---

## 📁 File Structure

```
M-hub/
├── src/
│   ├── services/
│   │   └── openai.ts              # OpenAI API service layer
│   ├── pages/
│   │   ├── MHubAI.tsx              # AI Dashboard landing page
│   │   ├── TextGenerator.tsx      # Text generation interface
│   │   ├── ImageGenerator.tsx     # Image generation interface
│   │   └── ThreeDStudio.tsx       # 3D creative studio
│   └── App.tsx                    # Updated with new routes
├── docs/
│   └── MHUB_AI_SETUP.md           # This file
└── env.example                    # Environment variables template
```

---

## 🎨 Customization

### Adding New Scene Types to 3D Studio

Edit `src/pages/ThreeDStudio.tsx`:

```typescript
const scenes = [
  { value: 'orbs', label: 'Glowing Orbs', description: '...' },
  { value: 'waves', label: 'Wave Grid', description: '...' },
  // Add your new scene here
  { value: 'galaxy', label: 'Galaxy', description: 'Starfield simulation' },
]

// Create your scene component
function GalaxyScene() {
  // Your Three.js implementation
  return (
    <group>
      {/* Your 3D objects */}
    </group>
  )
}

// Add to Scene component
function Scene({ type }: { type: SceneType }) {
  return (
    <>
      {type === 'orbs' && <AnimatedOrbs />}
      {type === 'waves' && <AnimatedWaves />}
      {type === 'galaxy' && <GalaxyScene />}
      {/* ... */}
    </>
  )
}
```

### Customizing Text Generation Tones

Edit `src/services/openai.ts`:

```typescript
const toneContext = {
  professional: 'Write in a professional tone...',
  friendly: 'Write in a friendly tone...',
  // Add your custom tone
  humorous: 'Write with humor and wit...',
}
```

Then update the UI in `src/pages/TextGenerator.tsx`.

---

## 🐛 Troubleshooting

### Issue: "Failed to generate text"
**Cause**: Missing or invalid OpenAI API key

**Solution**:
1. Check your `.env` file
2. Verify the API key is correct
3. Ensure you have API credits in your OpenAI account
4. Check browser console for detailed errors

### Issue: CORS errors in production
**Cause**: Trying to call OpenAI API directly from client

**Solution**: Use a backend proxy (Vercel, Cloudflare, etc.)

### Issue: Images take too long to generate
**Cause**: DALL-E generation time (10-30 seconds)

**Solution**: This is normal. Display a loading indicator.

### Issue: 3D scenes lag or stutter
**Cause**: GPU performance limitations

**Solution**:
- Reduce particle count
- Lower geometry complexity
- Disable auto-rotate
- Use simpler materials

---

## 📚 API Documentation

### Text Generation Service

```typescript
import { generateText } from '../services/openai'

const result = await generateText({
  prompt: 'Write a product description',
  tone: 'professional',
  maxTokens: 500,
})
```

**Parameters:**
- `prompt` (string, required): The text generation prompt
- `tone` (string, optional): 'professional' | 'friendly' | 'creative' | 'technical'
- `maxTokens` (number, optional): Max response length (default: 500)

**Returns:** `Promise<string>`

### Image Generation Service

```typescript
import { generateImage } from '../services/openai'

const images = await generateImage({
  prompt: 'A futuristic office space',
  size: '512x512',
  n: 1,
})
```

**Parameters:**
- `prompt` (string, required): The image description
- `size` (string, optional): '256x256' | '512x512' | '1024x1024'
- `n` (number, optional): Number of images to generate (default: 1)

**Returns:** `Promise<string[]>` (array of image URLs)

---

## 🤝 Contributing

To add new features to M-Hub AI:

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`
4. Follow existing design patterns (Tailwind, Framer Motion)
5. Test both with and without API keys
6. Update this documentation

---

## 📄 License

Part of the M-Hub platform. See main project LICENSE.

---

## 🆘 Support

For issues or questions:
1. Check this documentation
2. Review the code comments in `src/services/openai.ts`
3. Check the browser console for errors
4. Verify environment variables are set correctly

---

## 🎉 Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] Project dependencies installed (`npm install`)
- [ ] `.env` file created with API keys
- [ ] OpenAI API key added to `.env`
- [ ] Run `npm run dev` to test locally
- [ ] Access `http://localhost:5173/M-hub/mhub-ai`
- [ ] Try all three AI tools (Text, Image, 3D)
- [ ] Set up backend proxy for production
- [ ] Deploy with `npm run deploy`
- [ ] Test live at your GitHub Pages URL

---

**Built with ❤️ by M-Hub Team**

