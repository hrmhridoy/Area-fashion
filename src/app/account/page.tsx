'use client';

export default function AccountPage() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Menu</h3>
            <nav className="space-y-2">
              {[
                { label: 'Dashboard', href: '#' },
                { label: 'Orders', href: '#' },
                { label: 'Addresses', href: '#' },
                { label: 'Settings', href: '#' },
                { label: 'Logout', href: '#' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-gray-700 hover:text-primary-800 hover:bg-gray-100 px-3 py-2 rounded transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="card p-8">
            <h2 className="text-2xl font-serif font-bold mb-6">Dashboard</h2>
            <p className="text-gray-600 mb-4">
              Welcome back! Here's your account overview.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {[
                { label: 'Total Orders', value: '12' },
                { label: 'Pending Orders', value: '2' },
                { label: 'Loyalty Points', value: '850' },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-accent-600 mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
