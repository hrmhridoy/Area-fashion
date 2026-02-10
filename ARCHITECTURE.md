# Aria Fashion - Architecture Documentation

## 🏗️ System Architecture

This document provides a detailed overview of the Aria Fashion e-commerce platform's architecture and design patterns.

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                 CLIENT LAYER                         │
│  ┌─────────────────────────────────────────────┐   │
│  │  Browser (Chrome, Safari, Firefox, etc.)    │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │  Next.js React Application          │    │   │
│  │  │  - UI Components                    │    │   │
│  │  │  - State Management (Zustand)       │    │   │
│  │  │  - Hooks & Utilities                │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ HTTP/S, WebSocket
                   │
┌──────────────────▼──────────────────────────────────┐
│            NETLIFY EDGE LAYER                        │
│  - Global CDN                                        │
│  - Static asset caching                             │
│  - Request routing                                   │
│  - DDoS protection                                   │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼──────┐       ┌──────▼───────┐
│ NEXT.JS      │       │  NETLIFY     │
│ APP LAYER    │       │  FUNCTIONS   │
│              │       │              │
│ - SSR/SSG    │       │ - APIs       │
│ - Routing    │       │ - Webhooks   │
│ - Auth       │       │ - Cron Jobs  │
└───────┬──────┘       └──────┬───────┘
        │                     │
        └──────────┬──────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼──────┐       ┌──────▼───────────┐
│  SUPABASE    │       │  EXTERNAL APIs   │
│  PostgreSQL  │       │                  │
│              │       │ - Stripe         │
│ - Products   │       │ - SendGrid       │
│ - Orders     │       │ - Analytics      │
│ - Users      │       └──────────────────┘
│ - Reviews    │
└──────────────┘
```

## 🎯 Design Patterns

### 1. Jamstack Architecture

**Benefits:**
- **Decoupled**: Frontend and backend are independent
- **Scalable**: Serverless functions auto-scale
- **Fast**: Static assets served from CDN
- **Secure**: No direct database access from client

**Component Interaction:**
```
User Action → React Component
    ↓
State Update (Zustand)
    ↓
API Call (axios/fetch)
    ↓
Netlify Function
    ↓
Database/Third-party Service
    ↓
Response → Component Update
```

### 2. Component Architecture

**Atomic Design Pattern:**

```
atoms/           (Basic building blocks)
├── Button
├── Input
├── Badge

molecules/       (Component groups)
├── ProductCard
├── CartItem
├── Header

organisms/       (Complex sections)
├── ProductGrid
├── Checkout
├── UserProfile
```

### 3. State Management (Zustand)

```
┌─────────────────────────┐
│   Application State     │
├─────────────────────────┤
│ - Cart (Zustand)        │
│ - User (LocalStorage)   │
│ - UI (React Context)    │
└─────────────────────────┘
         ↓
    React Components
         ↓
    User Interactions
```

## 🔄 Data Flow

### Product Display

```
1. User visits /shop
2. Next.js renders page (SSG/SSR)
3. Component fetches products from Supabase
4. Images optimized via Next.js Image
5. Displayed in responsive grid
6. User filters/searches (client-side or API)
```

### Shopping Flow

```
1. User adds product to cart
2. Zustand store updated
3. Cart state persisted to localStorage
4. Cart badge updated
5. Toast notification shown
6. User navigates to cart page
7. Cart displayed from Zustand store (fast!)
```

### Checkout Flow

```
1. User enters shipping address
2. Form validated client-side
3. User reviews order
4. User enters payment details (Stripe)
5. Submit checkout
6. Create order via Netlify Function
7. Function calls Stripe API
8. Create order record in Supabase
9. Send confirmation email (SendGrid)
10. Redirect to success page
11. Webhook updates order status
```

## 🗄️ Database Schema

### Tables Overview

```
categories (1) ──→ (M) products
   ├── id                  ├── id
   ├── name                ├── category_id
   ├── slug                ├── name
   └── description         ├── price
                           └── stock

users (1) ──→ (M) orders
   ├── id         ├── id
   ├── email      ├── user_id
   └── name       ├── total
                  └── status

orders (1) ──→ (M) order_items
   └── id         ├── order_id
                  ├── product_id
                  └── quantity

products (1) ──→ (M) reviews
   └── id         ├── product_id
                  ├── rating
                  └── comment
```

## 🔐 Security Layers

### 1. Client-Side Security
- XSS prevention via React escaping
- CORS headers configured
- Secure cookies (HttpOnly, Secure, SameSite)

### 2. Backend Security
- Row Level Security (RLS) in Supabase
- API key rotation
- Environment variable encryption
- Rate limiting on functions

### 3. Payment Security
- PCI compliance (Stripe handles)
- Webhook signature verification
- SSL/TLS encryption
- Secure checkout flow

### 4. Authentication
- JWT tokens (NextAuth recommended)
- Secure session management
- OAuth 2.0 for social login
- Role-based access control

## 📊 API Endpoints

### REST API Routes

```
GET    /api                      → API info
GET    /api/products             → List products
GET    /api/products/:id         → Product details
GET    /api/categories           → List categories
GET    /api/cart                 → Get cart (session-based)
POST   /api/cart                 → Update cart

POST   /.netlify/functions/create-order
       → Create new order with payment

POST   /.netlify/functions/stripe-webhook
       → Handle Stripe events
```

## 🚀 Performance Optimizations

### Frontend Optimization

1. **Code Splitting**
   - Next.js automatic route splitting
   - Dynamic imports for heavy components
   - Tree shaking for unused code

2. **Image Optimization**
   - Next.js Image component
   - WebP format for modern browsers
   - Responsive image sizes
   - Lazy loading

3. **Caching Strategy**
   - Static assets: 1 year
   - HTML: No cache (always fresh)
   - API responses: SWR with revalidation

### Backend Optimization

1. **Database Queries**
   - Indexed columns for fast lookups
   - Connection pooling
   - Query optimization

2. **Function Optimization**
   - Minimal dependencies
   - Fast cold start times
   - Memory optimization

3. **CDN Caching**
   - Static files: Long TTL
   - Dynamic content: Short TTL
   - Cache headers:
     ```
     Cache-Control: public, max-age=31536000, immutable
     ```

## 🔍 Scalability Considerations

### Current Architecture

- **Database**: Supabase handles auto-scaling
- **Functions**: Netlify scales to 1000s of concurrent executions
- **CDN**: Netlify edge nodes in 200+ locations
- **Storage**: Supabase PostgreSQL (start small, scale as needed)

### Scaling Limits

- Database connections: ~100 concurrent
- Function execution: 15 minute max
- Payload size: 6MB max
- Storage: Unlimited

### When to Scale Further

1. **Read-heavy**: Add Redis cache
2. **Write-heavy**: Consider queue system (SQS)
3. **Large files**: Use S3 for media storage
4. **Analytics**: Add data warehouse (BigQuery)

## 🧪 Testing Strategy

### Frontend Testing

```typescript
// Unit tests for utilities
describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(99.99)).toBe('$99.99');
  });
});

// Component tests
describe('<ProductCard />', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });
});

// E2E tests
describe('Checkout Flow', () => {
  it('completes purchase', () => {
    cy.visit('/shop');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.goto('/cart');
    cy.get('[data-testid="checkout-btn"]').click();
    // ...
  });
});
```

### Backend Testing

- Function unit tests
- Integration tests with Supabase
- Webhook payload verification
- Stripe test mode

## 📈 Monitoring & Observability

### Logging

```
Client Errors → Sentry
Function Logs → Netlify
Database Logs → Supabase
```

### Metrics

- Response times
- Error rates
- Database query performance
- Function execution time

### Alerts

- High error rate (>1%)
- Function timeout
- Payment processing failures
- Database connection issues

## 🔄 CI/CD Pipeline

```
Git Push
    ↓
GitHub Actions / Netlify
    ↓
↓→ Lint Check
↓→ Type Check
↓→ Build Test
↓→ Deploy Preview (PR)
    ↓
Manual Review
    ↓
Merge to Main
    ↓
Production Deploy
    ↓
Smoke Tests
    ↓
✅ Live on Production
```

## 📚 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Forms**: React Hook Form
- **HTTP**: Axios
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js 18+
- **Functions**: Netlify Functions
- **Database**: Supabase (PostgreSQL)
- **Cache**: Redis (optional)
- **Auth**: NextAuth.js

### DevOps
- **Deployment**: Netlify
- **CDN**: Netlify Edge
- **Version Control**: Git/GitHub
- **Monitoring**: Sentry, LogRocket

### External Services
- **Payments**: Stripe
- **Email**: SendGrid
- **SMS**: Twilio
- **Analytics**: Google Analytics
- **CMS**: Strapi (optional)

## 🎓 Development Workflow

```
1. Clone repository
2. Install dependencies: npm install
3. Copy env vars: cp .env.example .env.local
4. Start dev server: npm run dev
5. Make changes, test locally
6. Run linting: npm run lint
7. Commit and push to GitHub
8. Netlify auto-deploys
9. Review in production
```

## 🔗 Related Documentation

- [README.md](./README.md) - Project overview
- [SETUP_DATABASE.md](./SETUP_DATABASE.md) - Database setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

---

This architecture is designed for:
- ✅ Fast initial load times (CDN + SSG)
- ✅ Real-time updates (dynamic rendering)
- ✅ Secure payments (Stripe integration)
- ✅ Easy scaling (serverless architecture)
- ✅ Developer experience (Next.js, TypeScript)
- ✅ Maintainability (modular design)
