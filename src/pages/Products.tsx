import { useState } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts, categories } from '@/data/mockData';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
                        (!priceRange.max || product.price <= parseInt(priceRange.max));
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-elegant font-bold text-foreground mb-4">
          Our Jewelry Collection
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover handcrafted pieces that reflect your unique style
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search jewelry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all"
                  checked={selectedCategory === 'all'}
                  onCheckedChange={() => setSelectedCategory('all')}
                />
                <label htmlFor="all" className="text-sm">All Products</label>
              </div>
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategory === category.id}
                    onCheckedChange={() => setSelectedCategory(category.id)}
                  />
                  <label htmlFor={category.id} className="text-sm">
                    {category.name} ({category.count})
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Price Range */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Price Range (TShs)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                />
                <Input
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPriceRange({ min: '', max: '' })}
                className="w-full"
              >
                Clear
              </Button>
            </CardContent>
          </Card>

          {/* Materials Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Gold', 'Silver', 'Rose Gold', 'Pearls', 'Diamonds'].map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox id={material} />
                  <label htmlFor={material} className="text-sm">{material}</label>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {sortedProducts.length} of {mockProducts.length} products
            </p>
            
            {/* Active Filters */}
            <div className="flex gap-2">
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory('all')}>
                  {categories.find(c => c.id === selectedCategory)?.name} ×
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm('')}>
                  "{searchTerm}" ×
                </Badge>
              )}
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No products found</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange({ min: '', max: '' });
              }}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;