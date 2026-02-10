'use client';

import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  if (cart.items.length === 0) {
    return (
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-lg text-gray-600 mb-8">Your cart is empty</p>
          <Link href="/shop" className="btn btn-accent inline-flex items-center gap-2">
            <FiArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="card p-6 flex gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-2">Product Name</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Qty: {item.quantity} × {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 border-l border-r">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-serif font-bold text-lg mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium">{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax</span>
                <span className="font-medium">{formatCurrency(cart.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping</span>
                <span className="font-medium">
                  {cart.shipping === 0 ? 'FREE' : formatCurrency(cart.shipping)}
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-serif font-bold text-lg text-accent-600">
                  {formatCurrency(cart.total)}
                </span>
              </div>
            </div>

            <button className="w-full btn btn-accent mb-3">Proceed to Checkout</button>
            <button
              onClick={() => clearCart()}
              className="w-full btn btn-secondary"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
