import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { mockProducts, formatPrice } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    productId: '1',
    quantity: 2,
    product: mockProducts[0]
  },
  {
    id: '2',
    productId: '2',
    quantity: 1,
    product: mockProducts[1]
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const { toast } = useToast();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal > 50000 ? 0 : 5000; // Free shipping over 50,000 TShs
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some beautiful jewelry pieces to get started!</p>
        <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-elegant font-bold text-foreground">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          <Link to={`/product/${item.product.id}`} className="hover:text-primary">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.product.materials.join(', ')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(item.product.price)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
              
              <div className="space-y-3">
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
              
              {subtotal < 50000 && (
                <div className="mt-4 p-3 bg-secondary rounded-lg">
                  <p className="text-sm text-center">
                    Add {formatPrice(50000 - subtotal)} more for free shipping!
                  </p>
                </div>
              )}
              
              <Button 
                size="lg" 
                className="w-full mt-6 bg-gradient-primary hover:opacity-90"
                asChild
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Promo Code</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline">Apply</Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>30-day return guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Lifetime warranty included</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;