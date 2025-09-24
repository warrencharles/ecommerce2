import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product, formatPrice } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        
        {/* Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur hover:bg-background"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.featured && (
            <Badge className="bg-gradient-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            <Button 
              size="sm" 
              className="bg-gradient-primary hover:opacity-90"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;