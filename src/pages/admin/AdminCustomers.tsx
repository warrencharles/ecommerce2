import { useState } from 'react';
import { Search, Filter, Eye, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockUsers, mockOrders, formatPrice } from '@/data/mockData';

// Mock extended customer data
const mockCustomers = [
  {
    id: 'user1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+255 123 456 789',
    location: 'Dar es Salaam, Tanzania',
    joinDate: '2024-01-15',
    totalOrders: 3,
    totalSpent: 295000,
    lastOrder: '2024-01-20',
    status: 'active'
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+255 987 654 321',
    location: 'Arusha, Tanzania',
    joinDate: '2023-12-10',
    totalOrders: 5,
    totalSpent: 450000,
    lastOrder: '2024-01-18',
    status: 'active'
  },
  {
    id: 'user3',
    name: 'Maria Rodriguez',
    email: 'maria.r@example.com',
    phone: '+255 456 789 123',
    location: 'Mwanza, Tanzania',
    joinDate: '2023-11-22',
    totalOrders: 2,
    totalSpent: 180000,
    lastOrder: '2024-01-10',
    status: 'active'
  },
  {
    id: 'user4',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    phone: '+255 321 654 987',
    location: 'Dodoma, Tanzania',
    joinDate: '2024-01-05',
    totalOrders: 1,
    totalSpent: 85000,
    lastOrder: '2024-01-08',
    status: 'new'
  },
  {
    id: 'user5',
    name: 'Anna Williams',
    email: 'anna.w@example.com',
    phone: '+255 789 123 456',
    location: 'Dar es Salaam, Tanzania',
    joinDate: '2023-10-15',
    totalOrders: 8,
    totalSpent: 720000,
    lastOrder: '2024-01-22',
    status: 'vip'
  }
];

const AdminCustomers = () => {
  const [customers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip':
        return 'default';
      case 'active':
        return 'secondary';
      case 'new':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const customerStats = {
    total: customers.length,
    new: customers.filter(c => c.status === 'new').length,
    active: customers.filter(c => c.status === 'active').length,
    vip: customers.filter(c => c.status === 'vip').length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  };

  const getCustomerOrders = (customerId: string) => {
    return mockOrders.filter(order => order.userId === customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers Management</h1>
          <p className="text-muted-foreground">Manage and view customer information</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customerStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{customerStats.new}</p>
              <p className="text-sm text-muted-foreground">New Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
              <p className="text-sm text-muted-foreground">Active Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{customerStats.vip}</p>
              <p className="text-sm text-muted-foreground">VIP Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">{formatPrice(customerStats.totalRevenue)}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/api/placeholder/40/40?seed=${customer.id}`} />
                        <AvatarFallback>
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined {customer.joinDate}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">{customer.totalOrders}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(customer.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(customer.status) as any}>
                      {customer.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowCustomerDialog(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Complete customer information and order history
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/api/placeholder/64/64?seed=${selectedCustomer.id}`} />
                  <AvatarFallback className="text-lg">
                    {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedCustomer.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedCustomer.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedCustomer.location}
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusColor(selectedCustomer.status) as any}>
                  {selectedCustomer.status.toUpperCase()}
                </Badge>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">{formatPrice(selectedCustomer.totalSpent)}</p>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">
                    {Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Order</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h4 className="font-semibold mb-3">Recent Orders</h4>
                <div className="space-y-2">
                  {getCustomerOrders(selectedCustomer.id).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(order.total)}</p>
                        <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomers;