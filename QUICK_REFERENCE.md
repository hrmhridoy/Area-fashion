# ⚡ Quick Reference Guide

## 🚀 Get Started in 5 Minutes

```bash
# 1. Install Node.js 18.17+ from https://nodejs.org/

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Add your keys to .env.local (Supabase, Stripe)

# 5. Start development server
npm run dev

# 6. Open http://localhost:3000
```

## 📋 Common Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Check code quality
npm run type-check       # Check TypeScript errors
npm run format           # Auto-format code

# Database
npm run db:push          # Push schema to database (Prisma)
npm run db:studio        # Open Supabase studio

# Deployment
git push                 # Auto-deploy to Netlify
netlify deploy --prod    # Manual production deploy
```

## 🎯 Project Structure Quick Map

```
src/
├── app/              👈 Pages & routes
│   ├── page.tsx         (home page)
│   ├── shop/page.tsx     (products)
│   ├── cart/page.tsx     (cart)
│   └── api/             (API routes)
│
├── components/       👈 Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
│
├── store/           👈 State management
│   └── cart.ts
│
├── lib/             👈 Utilities
│   ├── api-client.ts
│   └── utils.ts
│
├── hooks/           👈 Custom hooks
│   └── index.ts
│
├── types/           👈 TypeScript types
│   └── index.ts
│
└── styles/          👈 CSS
    └── globals.css
```

## 🛠️ Common Tasks

### Add a New Page
```bash
# Create file: src/app/[route]/page.tsx
# Example: src/app/about/page.tsx

export default function AboutPage() {
  return <h1>About</h1>
}

# Route automatically created: /about
```

### Add a New Component
```bash
# Create file: src/components/MyComponent.tsx
'use client';

export const MyComponent = () => {
  return <div>My Component</div>
}

# Export in src/components/index.ts
export { MyComponent } from './MyComponent'

# Use in pages
import { MyComponent } from '@/components'
```

### Use State Management
```typescript
// In a component
import { useCartStore } from '@/store/cart'

export default function MyComponent() {
  const cart = useCartStore((state) => state.cart)
  const addItem = useCartStore((state) => state.addItem)
  
  return (
    <button onClick={() => addItem(product, 1)}>
      Add to Cart
    </button>
  )
}
```

### Call API
```typescript
import { apiClient } from '@/lib/api-client'

// GET request
const { data } = await apiClient.get('/api/products')

// POST request
const { data } = await apiClient.post('/api/orders', {
  items: cartItems,
  totalPrice: 99.99
})
```

### Style Components
```tsx
// Use Tailwind classes
<div className="bg-white p-6 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-accent-600">
    Title
  </h1>
  <button className="btn btn-accent">
    Click Me
  </button>
</div>
```

### Add Custom Hook
```typescript
// src/hooks/useMyHook.ts
import { useState } from 'react'

export const useMyHook = () => {
  const [value, setValue] = useState('')
  
  return { value, setValue }
}

// Use in component
import { useMyHook } from '@/hooks'

export default function MyComponent() {
  const { value, setValue } = useMyHook()
  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```

## 🔧 Environment Variables

```env
# Copy .env.example to .env.local
cp .env.example .env.local

# Edit with your values
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 🚀 Deployment Checklist

- [ ] Node.js installed
- [ ] Dependencies installed: `npm install`
- [ ] Environment variables set in `.env.local`
- [ ] Database connected (Supabase)
- [ ] Build passes: `npm run build`
- [ ] No type errors: `npm run type-check`
- [ ] No lint errors: `npm run lint`
- [ ] Tested locally: `npm run dev`
- [ ] Repository pushed to GitHub
- [ ] Connected to Netlify
- [ ] Environment variables added to Netlify
- [ ] Build test on Netlify passes

## 📚 Documentation Map

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Setup & installation | 5 min |
| [README.md](./README.md) | Project overview | 10 min |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design | 15 min |
| [SETUP_DATABASE.md](./SETUP_DATABASE.md) | Database config | 20 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to Netlify | 15 min |

## 🎨 Tailwind Classes Quick Reference

```tsx
// Colors
className="bg-white text-gray-900 border-gray-200"
className="bg-accent-600 text-white hover:bg-accent-700"
className="bg-primary-800 text-primary-50"

// Spacing (p=padding, m=margin)
className="p-4 mb-6 space-y-2"

// Display & Layout
className="flex items-center justify-between"
className="grid grid-cols-3 gap-4"

// Typography
className="text-2xl font-bold uppercase"
className="line-clamp-2 text-ellipsis"

// Sizing
className="w-full h-64 max-w-2xl"

// Responsive
className="block md:hidden lg:flex"

// Hover & Active
className="hover:bg-gray-100 active:scale-95 transition-all"

// Borders & Shadows
className="rounded-lg border-2 shadow-md"

// Animations
className="animate-fadeIn focus:ring-4"
```

## 🐛 Quick Troubleshooting

### Problem: "Cannot find module"
```bash
# Solution: Reinstall dependencies
npm install

# Clear cache
rm -rf .next node_modules
npm install
```

### Problem: TypeScript errors
```bash
# Check all errors
npm run type-check

# Fix automatically (some)
npm run lint -- --fix
```

### Problem: Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problem: Supabase connection error
```bash
# Check credentials
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Verify in Supabase dashboard
# Settings → API → Project URL & Anon Key

# Update .env.local if incorrect
```

### Problem: Build fails
```bash
# Check build log
npm run build

# Try clean build
rm -rf .next
npm run build

# Check for errors
npm run type-check
npm run lint
```

## 💡 Tips & Tricks

### Fast Development
```bash
# Use Ctrl+C to stop, up arrow to rerun
npm run dev

# Auto-reload components in browser
# Already enabled with Next.js Fast Refresh
```

### Better Developer Experience
```bash
# Format code before committing
npm run format

# Run type check in watch mode
npm run type-check:watch
```

### Debugging
```typescript
// Add console logs
console.log('Debug:', variable)

// Use debugger statement
debugger;

// Check browser DevTools (F12)
// Network tab → API calls
// Console tab → Errors
// Application tab → LocalStorage/SessionStorage
```

### Testing Stripe Locally
```typescript
// Use test card numbers
// 4242 4242 4242 4242 - Visa
// 5555 5555 5555 4444 - Mastercard
// 378282246310005 - Amex

// Any future expiration date
// Any 3-digit CVC
```

## 🔗 Useful Links

- **Running Locally**: http://localhost:3000
- **Netlify Dashboard**: https://app.netlify.com
- **Supabase Dashboard**: https://app.supabase.com
- **Stripe Dashboard**: https://dashboard.stripe.com
- **GitHub**: https://github.com

## 📞 Need Help?

1. **Check docs** - Read the relevant documentation file
2. **Search online** - Google the error message
3. **Check logs** - Browser console (F12) or terminal
4. **Create issue** - GitHub issues with details

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `npm run dev` | Start dev server |
| `Ctrl+C` | Stop server |
| `Ctrl+L` | Clear terminal |
| `F12` | Open browser DevTools |
| `Ctrl+Shift+R` | Hard refresh browser |

## 🎯 Quick Wins (Easy to implement)

1. ✅ Change brand colors in `tailwind.config.ts`
2. ✅ Update logo in `Header.tsx`
3. ✅ Add footer links
4. ✅ Create FAQ page
5. ✅ Add blog section
6. ✅ Implement search
7. ✅ Add product filters
8. ✅ Create about page

---

**Remember:** This project is scaffolded and ready. Start with [GETTING_STARTED.md](./GETTING_STARTED.md) for detailed setup instructions.

**Good luck!** 🚀
