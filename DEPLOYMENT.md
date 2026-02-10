# Deployment Guide for Aria Fashion

This guide covers deploying Aria Fashion to Netlify with all services integrated.

## 🚀 Quick Deployment

### 1. Prepare Your Repository

```bash
# Initialize git if needed
git init

# Create .gitignore
echo "node_modules/" >> .gitignore
echo ".env.local" >> .gitignore
echo ".next" >> .gitignore
echo ".netlify" >> .gitignore

# Commit all files
git add .
git commit -m "Initial commit: Aria Fashion e-commerce platform"

# Push to GitHub
git remote add origin https://github.com/yourusername/aria-fashion.git
git branch -M main
git push -u origin main
```

### 2. Set Up Netlify

#### Option A: Connect GitHub (Recommended)

1. Visit [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: `netlify/functions`

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### 3. Configure Environment Variables

In Netlify UI (Site settings → Build & deploy → Environment):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.netlify.app
```

Generate secure secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

### 4. Set Up Webhook Integrations

#### Stripe Webhook

1. Login to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Developers → Webhooks
3. Add endpoint:
   - **URL**: `https://your-domain.netlify.app/.netlify/functions/stripe-webhook`
   - **Events to send**:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
4. Copy "Signing secret" → `STRIPE_WEBHOOK_SECRET`

#### Supabase Webhooks (Optional)

For real-time inventory updates:

1. Supabase Dashboard → Database → Webhooks
2. Create webhook for `products` table
3. Point to your API endpoint

## 📊 Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] Environment variables configured
- [ ] Build succeeds locally: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] ESLint passes: `npm run lint`
- [ ] Database migrations applied
- [ ] Stripe test keys added
- [ ] Git repository initialized
- [ ] GitHub repository created and pushed

## 🔄 CI/CD Pipeline

Netlify automatically:

1. Builds on every push to main branch
2. Runs tests and linting
3. Deploys to production
4. Generates deploy previews for PRs

### Build Configuration (netlify.toml)

Already configured with:
- Node version 18.17.0
- Turbopack for fast builds
- Correct publish directory
- Function directory settings

## 📦 Production Build

```bash
# Local production build
npm run build

# Test production build locally
npm start

# Preview with Netlify
netlify dev --prod
```

## 🔐 Security Checklist

- [ ] All API keys in environment variables (not in code)
- [ ] HTTPS enforced (automatic on Netlify)
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Secrets not in git history
- [ ] `.env.local` in `.gitignore`
- [ ] Regular security updates: `npm audit fix`

## 🚨 Troubleshooting

### Build Fails

1. Check build logs: Netlify Dashboard → Deploy logs
2. Verify Node version: Should be 18.17+
3. Check dependencies: `npm install`
4. Clear cache: Netlify → Builds → Clear cache & redeploy

### Functions Not Working

1. Verify functions in `/netlify/functions/`
2. Check function names match routes
3. Verify environment variables are set
4. Check function logs: Netlify → Functions → Logs

### Database Connection Issues

1. Verify Supabase credentials
2. Check database is active: Supabase Dashboard
3. Verify RLS policies allow access
4. Check firewall/network rules

### Payment Processing Fails

1. Verify Stripe keys are correct (test vs live)
2. Check webhook endpoint is accessible
3. Verify webhook secret is correct
4. Check Stripe dashboard for errors

## 📈 Monitoring & Analytics

### Enable Analytics

1. Netlify Dashboard → Analytics
2. Add Google Analytics:

```tsx
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout() {
  return (
    <html>
      <body>
        <GoogleAnalytics gaId="GA_ID" />
      </body>
    </html>
  )
}
```

### Health Checks

Set up monitoring:

1. Monitors → Add monitor
2. Check `/api` endpoint
3. Alert on failures

## 🔄 Updates & Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions (test first)
npm install package@latest
```

### Deploy Updates

1. Commit changes
2. Push to GitHub
3. Netlify auto-deploys on push to main
4. Review deploy preview
5. Merge PR to trigger production deployment

## 🎯 Performance Optimization

### Already Configured

- ✅ Next.js image optimization
- ✅ CSS/JS compression
- ✅ Edge caching
- ✅ HTTP/2 compression
- ✅ Minification

### Additional Optimizations

```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse https://your-domain.netlify.app

# Check Core Web Vitals
# Use: Google Search Console → Core Web Vitals report
```

## 🎓 Learning Resources

- [Netlify Docs](https://docs.netlify.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Integration](https://stripe.com/docs/development)

## 📞 Support

- **Netlify Support**: support@netlify.com
- **GitHub Issues**: Create issue in repository
- **Community**: Netlify Community Forums

---

**Successfully deployed!** Your site is now live at `https://your-domain.netlify.app`
