import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProducts, mockOrders, formatPrice } from '@/data/mockData';

const AdminDashboard = () => {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = mockProducts.length;
  const totalCustomers = 156; // Mock data
  
  const recentOrders = mockOrders.slice(0, 5);
  const topProducts = mockProducts.filter(p => p.featured).slice(0, 4);

  const stats = [
    {
      title: 'Total Revenue',
      value: formatPrice(totalRevenue),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Products',
      value: totalProducts.toString(),
      change: '+2.1%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Customers',
      value: totalCustomers.toString(),
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome to your jewelry store admin panel</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Eye className="h-4 w-4 mr-2" />
          View Store
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-elegant transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ml-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">#{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.createdAt}</p>
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
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Products</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{120 - index * 20} sold</p>
                    <p className="text-xs text-muted-foreground">this month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Month</span>
                <span className="text-sm text-muted-foreground">{formatPrice(totalRevenue)}</span>
              </div>
              <Progress value={75} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Month</span>
                <span className="text-sm text-muted-foreground">{formatPrice(totalRevenue * 0.85)}</span>
              </div>
              <Progress value={60} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Goal</span>
                <span className="text-sm text-muted-foreground">{formatPrice(500000)}</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Package className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Process Orders
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              View Customers
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;