# 🌐 Netlify Deployment Checklist for Aria Fashion

Quick setup guide for deploying to Netlify (5-10 minutes).

## ✅ Pre-Deployment Checklist

### 1. **GitHub Setup** (5 min)
- [ ] Create GitHub repository
- [ ] Push code to GitHub (all branches)
- [ ] Repository is public or private (your choice)

### 2. **Netlify Account** (2 min)
- [ ] Create account at https://netlify.com
- [ ] Verify email
- [ ] Connect GitHub account

### 3. **Supabase Setup** (10 min - if not already done)
- [ ] Create Supabase project
- [ ] Get project URL and anon key
- [ ] Get service role key
- [ ] Run SQL migrations
- [ ] Set Row Level Security (RLS)

### 4. **Stripe Setup** (10 min - if not already done)
- [ ] Create Stripe account
- [ ] Get test API keys
- [ ] Create webhook endpoint (done during deployment)
- [ ] Test mode enabled

## 🚀 Deploy to Netlify

### Option A: GitHub Integration (Recommended)

1. **Visit Netlify Dashboard**
   - Go to https://app.netlify.com
   - Click "Add new site"
   - Select "Import an existing project"

2. **Connect GitHub**
   - Choose "GitHub"
   - Select your repository
   - Click "Connect & authorize"

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: `netlify/functions`
   - **Build environment variables**: (see next step)

4. **Add Environment Variables**
   - Click "Show advanced"
   - Click "New variable" for each:

   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
   
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_xxx
   STRIPE_SECRET_KEY = sk_test_xxx
   STRIPE_WEBHOOK_SECRET = whsec_xxx (placeholder for now)
   
   NEXT_PUBLIC_APP_URL = https://your-site.netlify.app
   NEXTAUTH_SECRET = your_nextauth_secret
   NEXTAUTH_URL = https://your-site.netlify.app
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (2-5 minutes)
   - Site URL shown: `https://your-site.netlify.app`

### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Connect project
netlify init

# Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_value"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_value"
# ... (repeat for all environment variables)

# Deploy
netlify deploy --prod
```

## 🔗 Post-Deployment Setup

### 1. **Configure Stripe Webhook**

After site is deployed:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy "Signing secret"
6. In Netlify:
   - Go to Site settings → Build & deploy → Environment
   - Update `STRIPE_WEBHOOK_SECRET` with the signing secret
   - Wait for environment rebuild

### 2. **Custom Domain** (Optional)

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Netlify: Domain management → Add custom domain
3. Follow DNS instructions for your registrar

### 3. **SSL Certificate** (Automatic)

- Netlify automatically generates SSL certificate
- ✅ HTTPS enabled for your domain

### 4. **Site Settings**

Netlify Dashboard → Settings:

**Build & Deploy**
- ✓ Verify build command: `npm run build`
- ✓ Verify publish directory: `.next`
- ✓ Verify functions directory: `netlify/functions`

**Deploy Settings** (optional)
- Auto publish: Main branch only
- Deploy notifications: (your preference)
- Automatic deploys: Enable

**Redirects & Headers**
- Already configured in `netlify.toml`
- Review and customize if needed

## 🧪 Test Deployment

After deployment, test:

```bash
# Test API endpoint
curl https://your-site.netlify.app/api

# Test Netlify Function
curl https://your-site.netlify.app/.netlify/functions/create-order

# Visit site
https://your-site.netlify.app
```

Expected results:
- ✅ Site loads (home page)
- ✅ Navigation works
- ✅ Add to cart works
- ✅ API endpoints return JSON
- ✅ No console errors (F12)

## 🚨 Troubleshooting Deployment

### Build Fails

1. **Check build logs**
   - Netlify Dashboard → Deploys → Failed build
   - Click "Failed" to see full logs

2. **Common issues:**
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies
   - Node version mismatch

3. **Solutions:**
   ```bash
   # Local test build
   npm run build
   
   # Check TypeScript
   npm run type-check
   
   # Check dependencies
   npm install --legacy-peer-deps
   
   # Verify Node version
   node --version
   ```

### Functions Not Working

1. Check function in Netlify Dashboard → Functions
2. Verify function names match:
   - `netlify/functions/create-order.ts`
   - `netlify/functions/stripe-webhook.ts`
3. Check function logs for errors
4. Verify environment variables are set

### CORS Errors

- Already configured in `netlify.toml`
- Check headers section
- Update if making cross-origin requests

### Database Connection Failed

1. Verify Supabase credentials in environment
2. Check Supabase project is active
3. Test connection: `npm run dev` locally first
4. Verify network rules in Supabase

### Stripe Webhook Not Firing

1. Verify webhook URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
2. Verify signing secret is correct
3. Check Stripe dashboard for failed attempts
4. Test manually: Stripe → Developers → Events → Resend

## 📊 Configuration Files

Your Netlify setup includes:

- ✅ `netlify.toml` - Main configuration
- ✅ `netlify/functions/*` - Serverless functions
- ✅ `package.json` - Build scripts
- ✅ `.env.example` - Environment template
- ✅ `DEPLOYMENT.md` - Full deployment guide

## 🔐 Security Checklist

After deployment:

- [ ] HTTPS working (check URL bar)
- [ ] No environment variables in code
- [ ] `.env.local` in `.gitignore`
- [ ] Secrets in Netlify environment (not git)
- [ ] Security headers configured (netlify.toml)
- [ ] CORS restricted (configured)

## 📈 Monitoring & Logs

**Netlify Dashboard:**
- Deploys tab: See all builds
- Functions tab: See function logs
- Analytics tab: See traffic (optional)
- Logs tab: Real-time function logs

**Test live features:**

Navigate to `https://your-site.netlify.app`:
- [ ] Home page loads
- [ ] Search works
- [ ] Add to cart updates
- [ ] Cart persists (refresh page)
- [ ] Navigation responsive
- [ ] Images load fast

## 🎉 Deployment Complete!

Your site is now live at: `https://your-site.netlify.app`

**Next steps:**
1. Share your live URL with team
2. Test all features thoroughly
3. Monitor Netlify dashboard
4. Set up analytics (optional)
5. Configure email notifications (optional)

## 📞 Support

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://support.netlify.com
- **GitHub Issues**: Create issue in your repo
- **This Guide**: See `DEPLOYMENT.md` for detailed info

## 🚀 Quick Command Reference

```bash
# Build locally to test
npm run build

# Deploy to production
netlify deploy --prod

# View live site
netlify open:site

# View deploy log
netlify logs functions

# Pull latest env vars
netlify env:pull
```

---

**Congratulations!** Your Aria Fashion site is now deployed on Netlify! 🎉

Questions? See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete documentation.
