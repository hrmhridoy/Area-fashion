# Database & CMS Setup Guide

This guide provides step-by-step instructions for setting up Supabase and Strapi for the Aria Fashion e-commerce platform.

## 📊 Supabase Setup (Database)

### 1. Create Supabase Project

1. Visit [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project:
   - Project name: `aria-fashion`
   - Database password: (secure password)
   - Region: (closest to your users)
   - Click "Create new project"

### 2. Get API Credentials

1. In Project Settings → API, find:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Create Database Tables

Go to SQL Editor and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INT DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  stock_quantity INT DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  tags TEXT[] DEFAULT '{}',
  meta_title VARCHAR(255),
  meta_description TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PRODUCT IMAGES TABLE
-- ============================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(500),
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PRODUCT VARIANTS (Sizes, Colors)
-- ============================================
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(50),
  color VARCHAR(50),
  sku VARCHAR(100) UNIQUE,
  stock_quantity INT DEFAULT 0,
  price_modifier DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  newsletter_subscribed BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  theme VARCHAR(20) DEFAULT 'light',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ADDRESSES TABLE
-- ============================================
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  address_type VARCHAR(20) NOT NULL DEFAULT 'shipping',
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  apartment VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_intent_id VARCHAR(255) UNIQUE,
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  notes TEXT,
  tracking_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255) NOT NULL,
  comment TEXT,
  helpful_count INT DEFAULT 0,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- WISHLIST TABLE
-- ============================================
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);
```

### 4. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (is_active = true);

-- Users can read own orders
CREATE POLICY "Allow users read own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can manage own addresses
CREATE POLICY "Allow users manage own addresses" ON addresses
  FOR ALL USING (auth.uid() = user_id);

-- Anyone can read reviews
CREATE POLICY "Allow public read reviews" ON reviews
  FOR SELECT USING (true);
```

## 🎯 Strapi Setup (Optional CMS)

Strapi provides a GraphQL/REST API for managing products and content.

### 1. Installation

```bash
npx create-strapi-app@latest aria-cms --quickstart
cd aria-cms
```

### 2. Create Content Types

In Strapi Admin (http://localhost:1337/admin):

1. **Products Collection**
   - name (Text)
   - description (Rich Text)
   - price (Number)
   - image (Media)
   - category (Relation)

2. **Categories Collection**
   - name (Text)
   - slug (Text)
   - description (Rich Text)

### 3. Set Public Permissions

Admin → Settings → Roles:
- Public: Can read Products and Categories

### 4. Generate API Token

Admin → Settings → API Tokens:
- Create new token
- Copy token → `CMS_API_TOKEN` in `.env.local`

## 🔄 Data Migration

If migrating from existing system:

```bash
# Export existing data
npm run export-data

# Transform to Supabase format
npm run transform-data

# Import to Supabase
npm run import-data
```

## 🧪 Test Data

Insert sample data:

```sql
-- Insert sample category
INSERT INTO categories (name, slug, description)
VALUES ('Women Fashion', 'women-fashion', 'Clothing and accessories for women');

-- Insert sample product
INSERT INTO products (
  name, slug, description, price, category_id, image_url, is_active, is_featured
)
VALUES (
  'Premium Linen Shirt',
  'premium-linen-shirt',
  'Comfortable and breathable linen shirt',
  89.99,
  (SELECT id FROM categories WHERE slug = 'women-fashion'),
  'https://images.unsplash.com/...',
  TRUE,
  TRUE
);
```

## 🔌 API Integration

### Fetch Products

```typescript
import { supabase } from '@/lib/supabase';

const { data: products } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true)
  .limit(10);
```

### Create Order

```typescript
const { data: order } = await supabase
  .from('orders')
  .insert([{
    user_id: userId,
    total: 99.99,
    status: 'pending',
    shipping_address: { ... }
  }])
  .select();
```

## 📱 Mobile-Friendly Admin

- Supabase Studio: https://app.supabase.com
- Strapi Admin: http://localhost:1337/admin (or deployed URL)

## ⚠️ Backup & Security

1. **Enable automated backups** in Supabase settings
2. **Use service role key** only on server-side
3. **Enable HTTPS** for all connections
4. **Regular security audits**

---

For more details, see the main [README.md](./README.md)
