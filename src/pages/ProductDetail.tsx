import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Shield, Truck, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts, formatPrice } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = mockProducts.find(p => p.id === id);
  const relatedProducts = mockProducts.filter(p => p.category === product?.category && p.id !== id).slice(0, 3);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-primary hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-elegant font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(24 reviews)</span>
              </div>
              <Badge variant={product.inStock ? "secondary" : "destructive"}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Materials</h3>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((material, index) => (
                <Badge key={index} variant="outline">
                  {material}
                </Badge>
              ))}
            </div>
          </div>

          {product.dimensions && (
            <div>
              <h3 className="font-semibold mb-2">Dimensions</h3>
              <p className="text-muted-foreground">{product.dimensions}</p>
            </div>
          )}

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-semibold">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-primary hover:opacity-90"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Lifetime Warranty</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Category:</strong> {product.category}
                  </div>
                  <div>
                    <strong>Materials:</strong> {product.materials.join(', ')}
                  </div>
                  {product.dimensions && (
                    <div>
                      <strong>Dimensions:</strong> {product.dimensions}
                    </div>
                  )}
                  <div>
                    <strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Care Instructions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Store in a dry, cool place away from direct sunlight</li>
                  <li>• Clean gently with a soft cloth after each wear</li>
                  <li>• Avoid contact with perfumes, lotions, and chemicals</li>
                  <li>• Remove before swimming, exercising, or sleeping</li>
                  <li>• For deeper cleaning, use warm soapy water and a soft brush</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {[
                    { name: "Sarah K.", rating: 5, review: "Absolutely beautiful piece! Exactly as shown in the photos." },
                    { name: "Maria L.", rating: 5, review: "Amazing quality and fast shipping. Will definitely order again!" },
                    { name: "Emma D.", rating: 4, review: "Lovely jewelry, very well made. Perfect for special occasions." }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.review}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-elegant font-bold text-foreground mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;