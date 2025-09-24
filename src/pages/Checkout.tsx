import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { mockProducts, formatPrice } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

// Mock cart data (same as Cart page)
const mockCartItems = [
  { id: '1', productId: '1', quantity: 2, product: mockProducts[0] },
  { id: '2', productId: '2', quantity: 1, product: mockProducts[1] }
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/cart">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-elegant font-bold text-foreground mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+255 123 456 789" required />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dar">Dar es Salaam</SelectItem>
                        <SelectItem value="arusha">Arusha</SelectItem>
                        <SelectItem value="mwanza">Mwanza</SelectItem>
                        <SelectItem value="dodoma">Dodoma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Textarea id="instructions" placeholder="Any special instructions for delivery..." />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      <span>Credit/Debit Card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5" />
                      <span>Mobile Money (M-Pesa, Tigo Pesa)</span>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-secondary/20 rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" required />
                    </div>
                  </div>
                )}

                {paymentMethod === 'mobile' && (
                  <div className="space-y-4 p-4 bg-secondary/20 rounded-lg">
                    <div>
                      <Label htmlFor="mobileProvider">Mobile Money Provider</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                          <SelectItem value="tigopesa">Tigo Pesa</SelectItem>
                          <SelectItem value="airtelmoney">Airtel Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <Input id="mobileNumber" placeholder="+255 123 456 789" required />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Complete Order - ${formatPrice(total)}`}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Badges */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>SSL Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Free Shipping on Orders Over TShs 50,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;