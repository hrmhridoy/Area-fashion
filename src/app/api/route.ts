import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      message: 'Aria Fashion API v1',
      version: '1.0.0',
      endpoints: {
        products: '/api/products',
        categories: '/api/categories',
        cart: '/api/cart',
        orders: '/api/orders',
      },
    },
  });
}
