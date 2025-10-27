# Vercel Deployment Guide for M-Hub AI

This guide will help you deploy the M-Hub AI backend to Vercel for secure API calls.

---

## ⚠️ SECURITY FIRST - REGENERATE YOUR API KEY

**IMPORTANT**: Your OpenAI API key was shared in the chat. You MUST regenerate it:

1. Go to https://platform.openai.com/api-keys
2. Find your current key
3. Click "Revoke" or "Delete"
4. Create a new key
5. Use the NEW key in the steps below

---

## 🎯 Why You Need This

GitHub Pages is **client-side only**, which means:
- ❌ Can't securely store API keys
- ❌ Keys would be exposed in browser
- ❌ Anyone could steal and use your key

**Solution**: Vercel serverless functions act as a secure backend proxy.

---

## 📦 What's Been Set Up

I've created these files for you:

```
M-hub/
├── api/
│   ├── generate-text.js      # Secure OpenAI text generation
│   └── generate-image.js     # Secure DALL-E image generation
├── vercel.json               # Vercel configuration
└── .env                      # Local development (DO NOT COMMIT!)
```

---

## 🚀 Step 1: Test Locally

Your `.env` file is already set up. Let's test it:

```bash
# Start the development server
npm run dev
```

Visit `http://localhost:5173/M-hub/mhub-ai` and try:

1. **Text Generator**: Enter a prompt and click "Generate Content"
2. **Image Generator**: Describe an image and click "Generate Image"

**Note**: This uses your API key directly (local dev only). For production, we'll use Vercel.

---

## 🌐 Step 2: Deploy to Vercel (Production)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Deploy Your Backend

```bash
# From your project root
cd "M-hub 2"

# Deploy to Vercel
vercel
```

**Follow the prompts:**
1. Set up and deploy? → **Y**
2. Which scope? → Choose your account
3. Link to existing project? → **N**
4. Project name? → **mhub-api** (or your choice)
5. Directory? → **./** (press Enter)
6. Override settings? → **N**

Vercel will:
- Build your API functions
- Deploy them to a URL like `https://mhub-api-xxxxx.vercel.app`
- Give you the live URL

---

## 🔐 Step 3: Add API Key to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Find your project `mhub-api`
3. Click **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-YOUR-NEW-KEY-HERE` (your NEW regenerated key)
   - **Environment**: Production, Preview, Development (check all)
5. Click **Save**

### Option B: Vercel CLI

```bash
vercel env add OPENAI_API_KEY
```

When prompted:
- Value: `sk-proj-YOUR-NEW-KEY-HERE`
- Environment: Production (select with space, confirm with Enter)

---

## 🔗 Step 4: Update Your Frontend

### Update `.env` file:

```env
# Your Vercel API URL (from deployment)
VITE_API_BASE_URL=https://mhub-api-xxxxx.vercel.app

# Remove or comment out the direct API key
# VITE_OPENAI_API_KEY=...
```

### Rebuild and Deploy:

```bash
npm run build
npm run deploy
```

---

## ✅ Step 5: Test Production

1. Visit your live site: `https://etiditalex.github.io/M-hub/mhub-ai`
2. Try the **Text Generator**:
   - Enter: "Write a tagline for a digital marketing agency"
   - Click "Generate Content"
   - Should receive real AI-generated text!
3. Try the **Image Generator**:
   - Enter: "A modern digital office with AI technology"
   - Click "Generate Image"
   - Should receive a DALL-E generated image!

---

## 🐛 Troubleshooting

### Issue: "Failed to generate text"

**Check Browser Console:**
```javascript
// You should see the API call going to:
// https://mhub-api-xxxxx.vercel.app/api/generate-text
```

**Solutions:**
1. Verify Vercel deployment: `vercel ls`
2. Check environment variables in Vercel dashboard
3. Check Vercel logs: `vercel logs`

### Issue: CORS errors

The API functions already include CORS headers. If you still see errors:
1. Redeploy: `vercel --prod`
2. Clear browser cache
3. Try incognito mode

### Issue: "Rate limit exceeded"

OpenAI has usage limits:
- Free tier: Very limited
- Pay-as-you-go: Based on your plan

**Solution**: Check your OpenAI usage at https://platform.openai.com/usage

### Issue: Images taking too long

DALL-E generation takes 10-30 seconds. This is normal. The loading spinner will show while generating.

---

## 💰 Cost Considerations

### OpenAI Pricing (as of 2024):

**GPT-4 (Text Generation):**
- ~$0.03 per 1K tokens (~750 words)
- 500 generations ≈ $15

**DALL-E 3 (Image Generation):**
- 1024x1024: $0.040 per image
- 512x512: $0.018 per image
- 100 images (512x512) ≈ $1.80

### Vercel Pricing:

**Hobby Plan (Free):**
- 100 GB bandwidth/month
- 100 hours serverless execution
- Perfect for testing and small projects

**Pro Plan ($20/month):**
- Unlimited bandwidth
- 1000 hours execution
- Better for production

---

## 🔒 Security Best Practices

### ✅ DO:
- Use environment variables for API keys
- Deploy backend on Vercel/Cloudflare
- Regenerate keys if exposed
- Monitor API usage regularly
- Set spending limits in OpenAI dashboard

### ❌ DON'T:
- Commit `.env` files to Git
- Share API keys publicly
- Use API keys directly in frontend code
- Expose keys in client-side code
- Skip regenerating compromised keys

---

## 📊 Monitor Your API Usage

### OpenAI Dashboard:
https://platform.openai.com/usage

Track:
- Requests per day
- Token usage
- Costs

### Vercel Dashboard:
https://vercel.com/dashboard

Track:
- Function invocations
- Execution time
- Bandwidth usage

---

## 🎨 Customize API Functions

### Adjust Text Generation Model:

Edit `api/generate-text.js`:

```javascript
// Change model
model: 'gpt-3.5-turbo',  // Cheaper, faster
// or
model: 'gpt-4',           // Better quality, more expensive

// Adjust creativity
temperature: 0.7,  // Default
temperature: 0.3,  // More focused
temperature: 1.0,  // More creative
```

### Adjust Image Generation:

Edit `api/generate-image.js`:

```javascript
// Change quality
quality: 'standard',  // Faster, cheaper
quality: 'hd',        // Better quality, more expensive

// Change style
style: 'vivid',    // Hyper-realistic
style: 'natural',  // More natural, less dramatic
```

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push:

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Git**
4. Connect your GitHub repository
5. Enable **Production Branch**: `main`

Now every push to `main` will:
- ✅ Auto-deploy API functions to Vercel
- ✅ Update your backend automatically

---

## 📝 Quick Commands Reference

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# Check environment variables
vercel env ls
```

---

## 🆘 Need Help?

### Vercel Support:
- Documentation: https://vercel.com/docs
- Discord: https://vercel.com/discord

### OpenAI Support:
- Documentation: https://platform.openai.com/docs
- Community: https://community.openai.com/

---

## ✅ Deployment Checklist

- [ ] Regenerate OpenAI API key (if exposed)
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`
- [ ] Deploy backend: `vercel`
- [ ] Add API key to Vercel environment variables
- [ ] Update `VITE_API_BASE_URL` in `.env`
- [ ] Rebuild frontend: `npm run build`
- [ ] Deploy to GitHub Pages: `npm run deploy`
- [ ] Test text generation in production
- [ ] Test image generation in production
- [ ] Monitor API usage in OpenAI dashboard
- [ ] Set up spending limits (optional)
- [ ] Enable auto-deploy from GitHub (optional)

---

**🎉 You're All Set!**

Your M-Hub AI is now running securely with:
- ✅ Frontend on GitHub Pages
- ✅ Backend on Vercel
- ✅ API keys secured
- ✅ Real AI generation working

Visit: `https://etiditalex.github.io/M-hub/mhub-ai`

