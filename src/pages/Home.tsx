import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, RotateCcw, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts, categories } from '@/data/mockData';
import heroJewelry1 from '@/assets/hero-jewelry-1.jpg';
import heroJewelry2 from '@/assets/hero-jewelry-2.jpg';
import heroJewelry3 from '@/assets/hero-jewelry-3.jpg';
import categoryNecklaces from '@/assets/category-necklaces.jpg';
import categoryEarrings from '@/assets/category-earrings.jpg';
import categoryRings from '@/assets/category-rings.jpg';
import categoryBracelets from '@/assets/category-bracelets.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProducts = mockProducts.filter(product => product.featured);
  
  const heroSlides = [
    {
      title: "Elegant Handcrafted Jewelry",
      subtitle: "Discover timeless pieces that tell your unique story",
      image: heroJewelry1,
      cta: "Shop Collection"
    },
    {
      title: "New Pearl Collection",
      subtitle: "Lustrous pearls meet contemporary design",
      image: heroJewelry2,
      cta: "View Pearls"
    },
    {
      title: "Wedding & Engagement",
      subtitle: "Make your special day unforgettable",
      image: heroJewelry3,
      cta: "Bridal Collection"
    }
  ];

  const categoryImages = {
    necklaces: categoryNecklaces,
    earrings: categoryEarrings,
    rings: categoryRings,
    bracelets: categoryBracelets
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const features = [
    {
      icon: Crown,
      title: "Premium Quality",
      description: "Handcrafted with finest materials"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders over TShs 50,000"
    },
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "Guarantee on all our jewelry pieces"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-gradient-hero">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="grid lg:grid-cols-2 h-full">
                {/* Content */}
                <div className="flex items-center justify-center p-8 lg:p-16">
                  <div className="text-center lg:text-left space-y-6 max-w-lg">
                    <h1 className="text-4xl lg:text-6xl font-elegant font-bold text-foreground leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 shadow-elegant"
                      asChild
                    >
                      <Link to="/products">{slide.cta}</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Image */}
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20"></div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-background/50 hover:bg-background/70'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-border hover:shadow-soft transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-elegant font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections of handcrafted jewelry
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <Card className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={categoryImages[category.id as keyof typeof categoryImages]}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} items</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-elegant font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked pieces that showcase our finest craftsmanship
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-soft py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-elegant font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "Absolutely stunning necklace! The quality is exceptional and it arrived beautifully packaged.",
                rating: 5
              },
              {
                name: "Maria Rodriguez",
                text: "I've received so many compliments on my earrings. The craftsmanship is incredible.",
                rating: 5
              },
              {
                name: "Emily Chen",
                text: "Perfect engagement ring! The service was outstanding and delivery was so fast.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;