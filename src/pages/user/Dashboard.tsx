import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  MapPin, 
  CreditCard,
  Bell,
  LogOut,
  Package,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockOrders, formatPrice } from '@/data/mockData';

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems = [
    { name: 'Overview', href: '/dashboard', icon: User },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
    { name: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
    { name: 'Payment Methods', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-elegant font-bold text-foreground">Welcome back, Jane!</h1>
        <p className="text-muted-foreground">Manage your account and track your orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{mockOrders.length}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatPrice(mockOrders.reduce((sum, order) => sum + order.total, 0))}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Wishlist Items</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <Badge variant={
                    order.status === 'delivered' ? 'default' :
                    order.status === 'processing' ? 'secondary' : 'outline'
                  }>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard/orders">View All Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const OrdersPage = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-elegant font-bold text-foreground">My Orders</h1>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">Placed on {order.createdAt}</p>
                </div>
                <Badge variant={
                  order.status === 'delivered' ? 'default' :
                  order.status === 'processing' ? 'secondary' : 'outline'
                }>
                  {order.status}
                </Badge>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total: {formatPrice(order.total)}</span>
                <Button variant="outline" size="sm">Track Order</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const WishlistPage = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-elegant font-bold text-foreground">My Wishlist</h1>
      <div className="text-center py-12">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-4">Save items you love to your wishlist</p>
        <Button asChild>
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-elegant font-bold text-foreground">Account Settings</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Account settings functionality would be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              {/* User Profile */}
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/60/60" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">customer@example.com</p>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Navigation */}
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentPath === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <Separator className="my-4" />
                
                <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/addresses" element={<SettingsPage />} />
            <Route path="/payments" element={<SettingsPage />} />
            <Route path="/notifications" element={<SettingsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;