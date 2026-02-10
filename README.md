# Aria Fashion - Jamstack E-Commerce Platform

A modern, production-ready fashion e-commerce platform built with Jamstack architecture. Designed for Netlify deployment with a headless CMS, serverless functions, and a beautiful minimalist UI inspired by contemporary fashion brands.

## 🎯 Project Overview

Aria Fashion is a complete e-commerce solution featuring:

- **Frontend**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Backend**: Netlify Functions (serverless) for business logic
- **Database**: Supabase (PostgreSQL) for data persistence
- **CMS**: Strapi (optional) for product and content management
- **Payments**: Stripe integration for secure transactions
- **Hosting**: Netlify with automatic CI/CD pipeline
- **Design**: Clean, minimalist aesthetic with modern UX patterns

## 📋 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS / WebSocket
                     │
┌────────────────────▼────────────────────────────────────────┐
│              Netlify CDN & Edge                              │
│         (Next.js Static + Dynamic Routes)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼──────┐         ┌──────▼────┐
    │  Next.js  │         │  Netlify   │
    │  App      │         │  Functions │
    │  (SSG/SSR)│         │  (APIs)    │
    └────┬──────┘         └──────┬────┘
         │                       │
         └───────────┬───────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼──────┐         ┌──────▼────┐
    │  Supabase │         │  Stripe   │
    │  (Data)   │         │  (Payments)│
    └───────────┘         └───────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+ and npm
- Git
- Netlify CLI (optional, for local development)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/aria-fashion.git
   cd aria-fashion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   STRIPE_SECRET_KEY=your_stripe_secret
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   
   Visit `http://localhost:3000`

## 📁 Project Structure

```
aria-fashion/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/             # API routes
│   │   ├── shop/            # Shop pages
│   │   ├── product/         # Product detail pages
│   │   ├── cart/            # Shopping cart
│   │   ├── account/         # User account
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & helpers
│   │   ├── api-client.ts   # API client
│   │   └── utils.ts        # Utility functions
│   ├── store/               # Zustand stores
│   │   └── cart.ts         # Cart state management
│   ├── styles/              # Global styles
│   │   └── globals.css     # Tailwind CSS
│   └── types/               # TypeScript types
│       └── index.ts
├── netlify/
│   └── functions/           # Serverless functions
│       ├── create-order.ts
│       └── stripe-webhook.ts
├── public/                  # Static assets
├── .eslintrc.json          # ESLint config
├── netlify.toml            # Netlify configuration
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── package.json
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options. Key variables:

- **Supabase**: Database and authentication
- **Stripe**: Payment processing
- **NextAuth**: User authentication (optional)
- **Cloudinary**: Image hosting (optional)

### Database Setup

1. **Create Supabase project** at https://supabase.com
2. **Run migrations** (create tables):
   ```sql
   -- Products table
   CREATE TABLE products (
     id UUID PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     price DECIMAL(10, 2) NOT NULL,
     image TEXT,
     category_id UUID,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Orders table
   CREATE TABLE orders (
     id UUID PRIMARY KEY,
     user_id UUID NOT NULL,
     total DECIMAL(10, 2) NOT NULL,
     status TEXT DEFAULT 'pending',
     payment_intent_id TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Stripe Setup

1. Create Stripe account at https://stripe.com
2. Get API keys from dashboard
3. Set up webhook: `https://your-domain.netlify.app/.netlify/functions/stripe-webhook`

## 🎨 Design System

### Colors

- **Primary**: Gray palette for neutral elements
- **Accent**: Warm brown/tan for calls-to-action
- **Semantic**: Red (errors), Green (success), Blue (info)

### Components

All components are built with Tailwind CSS and support:
- Dark mode (configurable)
- Responsive design
- Accessibility (WCAG 2.1 AA)
- Animation & transitions

## 💳 Features

### Implemented ✅
- Product listing with filtering
- Shopping cart with Zustand state management
- Product details page
- Responsive design
- Mobile navigation
- Toast notifications

### In Development 🔄
- Complete checkout flow
- Payment processing
- User authentication
- Order history
- Wishlist functionality
- Product reviews
- Admin dashboard

### Planned 📋
- Inventory management
- Analytics integration
- Email notifications
- SMS notifications
- Subscription products
- Gift cards
- Loyalty program

## 🚀 Deployment

### Deploy to Netlify

1. **Connect GitHub repository:**
   - Push code to GitHub
   - Connect repo to Netlify

2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions`

3. **Set environment variables:**
   - Add all `.env.local` variables to Netlify Site settings

4. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Using Netlify CLI

```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 📚 API Documentation

### GET `/api`
Returns API information and available endpoints

### POST `/.netlify/functions/create-order`
Creates a new order with payment processing

**Request:**
```json
{
  "userId": "user-id",
  "cartItems": [
    {
      "productId": "product-id",
      "quantity": 1,
      "price": 99.99,
      "name": "Product Name"
    }
  ],
  "total": 99.99,
  "paymentMethodId": "pm_stripe_id"
}
```

### POST `/.netlify/functions/stripe-webhook`
Handles Stripe webhook events

## 📦 Dependencies

### Core
- `next`: React framework
- `react`: UI library
- `typescript`: Type safety

### State Management
- `zustand`: Lightweight state management
- `swr`: Data fetching

### UI & Styling
- `tailwindcss`: Utility-first CSS
- `react-icons`: Icon library
- `framer-motion`: Animations

### Payments & Database
- `stripe`: Payment processing
- `@supabase/supabase-js`: Database client
- `axios`: HTTP client

### Development
- `eslint`: Code linting
- `prettier`: Code formatting
- `typescript-eslint`: TypeScript linting

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env.local`
2. **API Keys**: Use service role keys server-side only
3. **CORS**: Configured for Netlify deployment
4. **Payment**: Stripe handles PCI compliance
5. **HTTPS**: Enforced by Netlify

## 📊 Performance

- **Next.js Optimization**: Image optimization, code splitting
- **CDN**: Netlify edge caching
- **Compression**: Gzip enabled
- **Fonts**: Google Fonts with `font-display: swap`
- **Metrics**: Optimized for Core Web Vitals

## 🧪 Testing

```bash
# Run ESLint
npm run lint

# Type check
npm run type-check

# Run tests (when added)
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

- **Email**: support@ariafashion.com
- **Issues**: GitHub Issues
- **Documentation**: https://docs.ariafashion.com

## 🙏 Credits

- Inspired by saraemart.com design aesthetics
- Built with Next.js, Netlify, and modern web technologies
- Icons by React Icons

---

**Made with ❤️ by the Aria Fashion Team**

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
