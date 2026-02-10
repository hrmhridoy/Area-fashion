# 📍 Netlify Deployment Guide for Aria Fashion

This guide covers everything needed to deploy Aria Fashion to Netlify.

## What is Netlify?

Netlify is a modern platform for hosting:
- ✅ Frontend applications (Next.js, React, Vue, etc.)
- ✅ Serverless functions (APIs, webhooks, etc.)
- ✅ Static files and assets
- ✅ Automatic HTTPS and CDN

## Why Netlify?

1. **Jamstack Native** - Built for decoupled architecture
2. **Auto Scaling** - Handles traffic automatically
3. **Global CDN** - Fast delivery worldwide
4. **Free SSL** - HTTPS automatic
5. **Git Integration** - Deploy on every push
6. **Serverless Functions** - No server management
7. **Great DX** - Simple deployment workflow

## Architecture on Netlify

```
Browser
  ↓
Netlify CDN (Edge)
  ↓
  ├→ Static Assets (_next, public)
  └→ Functions (/.netlify/functions/*)
      ↓
      ├→ Supabase (Database)
      ├→ Stripe (Payments)
      └→ External APIs
```

## Quick Start (10 minutes)

### Step 1: Prepare Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/aria-fashion.git
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions`

### Step 3: Add Environment Variables

In Netlify Dashboard → Site settings → Build & deploy → Environment:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://your-site.netlify.app
```

### Step 4: Deploy

Click "Deploy" - that's it!

## File Structure for Netlify

```
aria-fashion/
├── netlify.toml              ← Main config (IMPORTANT)
├── netlify/
│   ├── functions/            ← Serverless functions
│   │   ├── create-order.ts
│   │   └── stripe-webhook.ts
│   └── edge-functions/       ← Edge routing (optional)
├── public/
│   ├── _redirects            ← URL redirects
│   └── _headers              ← HTTP headers
├── .env.example
├── package.json
└── src/
    └── app/
```

## Configuration Files

### netlify.toml

Main Netlify configuration:
- Build settings
- Environment variables
- Redirects and headers
- Context-specific configs

Already configured! ✅

### public/_redirects

URL redirects for Netlify:
- HTTP → HTTPS
- Old URLs → New URLs
- API routes pass-through

Already configured! ✅

### public/_headers

HTTP headers for Netlify:
- Cache-Control
- Security headers
- CORS
- Custom headers

Already configured! ✅

## Netlify Functions

### What Are They?

Serverless functions run backend code without managing servers.

### Our Functions

1. **create-order.ts**
   - Creates orders
   - Handles payments with Stripe
   - Saves to Supabase

2. **stripe-webhook.ts**
   - Listens for Stripe events
   - Updates order status
   - Sends notifications

### Deployed Automatically

Functions in `netlify/functions/` are automatically:
- Zipped and deployed
- Available at `/.netlify/functions/function-name`
- Scaled automatically by Netlify

## Environment Variables

### Public Variables (frontend)

Visible in browser - OK for non-secrets:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL
```

### Secret Variables (backend only)

Hidden from browser - for secrets:
```
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXTAUTH_SECRET
```

### Setting in Netlify

1. Dashboard → Site settings → Build & deploy → Environment
2. Add variable
3. Name and value
4. Save
5. Rebuild site for changes to take effect

## Deployment Workflow

```
┌─ Push to GitHub
│
├─ Netlify detects change
│
├─ Runs: npm install
│
├─ Runs: npm run build
│
├─ Builds Next.js app
│
├─ Packages functions
│
├─ Uploads to Netlify
│
├─ Configures edge nodes
│
└─ Live at your domain!
```

Takes ~2-5 minutes.

## Custom Domain

### Option 1: Netlify DNS
1. Buy domain
2. Point to Netlify nameservers
3. Add in Netlify dashboard
4. Automatic HTTPS

### Option 2: External DNS
1. Buy domain elsewhere
2. Add CNAME record pointing to Netlify
3. Add in Netlify dashboard

### SSL Certificate
Netlify provides free SSL certificates automatically ✅

## Monitoring & Logs

### Production Logs
- Dashboard → Functions → Logs
- Real-time function output
- Error tracking
- Performance metrics

### Build Logs
- Dashboard → Deploys
- Click on deploy to see full logs
- Helpful for debugging issues

### Performance
- Dashboard → Analytics (beta)
- Track usage
- Monitor performance

## Debugging

### Function Not Working

```bash
# Test locally
netlify dev

# Check logs
netlify logs functions

# Verify environment variables
netlify env:list

# Pull env to local
netlify env:pull
```

### Build Fails

1. Check build logs
2. Common issues:
   - Missing env vars
   - TypeScript error
   - Missing dependency
   - Node version

Solutions:
```bash
# Test locally first
npm run build

# Check TypeScript
npm run type-check

# Check dependencies
npm install

# Verify Node version
node --version  # Should be 18+
```

### CORS Issues

Already configured in `netlify.toml`. If issues:
1. Check headers section in netlify.toml
2. Verify endpoint is correct
3. Test with curl command

## Stripe Webhook Setup

After deployment:

1. Get webhook URL from Netlify:
   - `https://your-site.netlify.app/.netlify/functions/stripe-webhook`

2. Add to Stripe:
   - Dashboard → Developers → Webhooks
   - Add endpoint
   - Enter function URL
   - Select events:
     - payment_intent.succeeded
     - payment_intent.payment_failed
     - charge.refunded

3. Copy signing secret

4. Add to Netlify:
   - Environment → STRIPE_WEBHOOK_SECRET
   - Value: signing secret
   - Redeploy

## Best Practices

✅ **DO:**
- Use environment variables for secrets
- Test locally with `netlify dev`
- Use meaningful commit messages
- Monitor Netlify dashboard
- Set up build notifications
- Use git branches for features

❌ **DON'T:**
- Commit .env files
- Hardcode API keys
- Ignore build errors
- Deploy without testing
- Use old Node versions
- Mix localhost and production URLs

## Performance Tips

### HTML/CSS/JS
- Minified automatically ✅
- Code split automatically ✅
- Cached automatically ✅

### Images
- Next.js optimizes ✅
- WebP conversion ✅
- Lazy loading ready ✅

### Database Queries
- Optimize at Supabase level
- Use proper indexes
- Cache responses

## Analytics & Monitoring

### Enable Netlify Analytics
- Dashboard → Analytics
- See traffic stats
- Track key pages

### Google Analytics
```tsx
// In layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'
<GoogleAnalytics gaId="GA_ID" />
```

### Error Tracking
- Sentry integration (optional)
- Custom error logging
- Email alerts

## Rollback & Deploy History

### View Previous Deploys
- Dashboard → Deploys tab
- See all deployments
- Rollback to any version

### Rollback Steps
1. Go to Deploys
2. Find previous deploy
3. Click "Publish"
4. Instant rollback ⚡

## Preview Deployments

### Automatic PRs
- Every PR gets preview URL
- `https://deploy-xxx--your-site.netlify.app`
- Share before merging
- Delete automatically

### Manual Preview
```bash
netlify deploy
# Returns preview URL

# Deploy to production
netlify deploy --prod
```

## Cost Planning

### Free Tier ✅
- Unlimited sites
- Free CDN
- Netlify Functions: 125,000 invocations/month
- 100GB/month bandwidth
- Perfect for starting!

### Pro Plan
- For growth
- More function invocations
- Priority support

## Helpful Links

- **Netlify Docs**: https://docs.netlify.com
- **Next.js on Netlify**: https://docs.netlify.com/frameworks/next-js/
- **Functions Guide**: https://docs.netlify.com/functions/overview
- **Status Page**: https://status.netlify.com

## Support

**Netlify Issues:**
- Check their docs first
- Netlify support email
- Community forums

**Our App Issues:**
- Check our repo docs
- Search issues
- Create detailed issue

## Checklist Before Production

- [ ] Domain configured
- [ ] SSL certificate shows (check browser)
- [ ] Environment variables set
- [ ] Build passes
- [ ] No errors in logs
- [ ] Functions responding
- [ ] Database connected
- [ ] Payments working
- [ ] Analytics configured
- [ ] Monitoring setup

## What Happens on Deploy

1. **Build Phase**
   - Install dependencies
   - Run tests/linting
   - Build Next.js
   - Package functions
   - Minify & optimize
   - ~2-5 minutes

2. **Deploy Phase**
   - Upload to Netlify servers
   - Configure edge nodes
   - Set up redirects
   - Enable functions
   - Immediate HTTPS
   - ~30 seconds

3. **Live**
   - Site available worldwide
   - Auto-scaling active
   - Monitoring enabled
   - Logs streaming

## Disaster Recovery

### If Site Goes Down
1. Check Netlify status
2. Review recent deploys
3. Check build logs
4. Rollback if needed

### Backup Strategy
- GitHub is backup ✅
- All code version controlled ✅
- Database separate ✅
- Functions versioned ✅

---

**Ready to deploy?** Start with the [NETLIFY_CHECKLIST.md](./NETLIFY_CHECKLIST.md)

Good luck! 🚀
"""
