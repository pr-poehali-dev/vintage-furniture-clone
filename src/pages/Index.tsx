import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Filters from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import ProductDialog from "@/components/ProductDialog";
import OrderDialog from "@/components/OrderDialog";
import { products } from "@/data/products";
import { translations } from "@/data/translations";
import { Product, CartItem, OrderForm } from "@/types";

export default function Index() {
  const [currentLanguage, setCurrentLanguage] = useState("ru");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("default");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
  });

  const t = translations[currentLanguage];

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleSubmitOrder = () => {
    alert(
      `Заказ оформлен! Общая сумма: ${cart
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toLocaleString()} ₽`
    );
    setCart([]);
    setOrderForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    });
    setIsOrderDialogOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedStyle("all");
    setSelectedMaterial("all");
    setSelectedSize("all");
    setPriceRange([0, 100000]);
    setSortBy("default");
    setSearchQuery("");
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesStyle =
        selectedStyle === "all" || product.style === selectedStyle;
      const matchesMaterial =
        selectedMaterial === "all" || product.material === selectedMaterial;
      const matchesSize =
        selectedSize === "all" || product.size === selectedSize;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStyle &&
        matchesMaterial &&
        matchesSize &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header
        t={t}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
      />

      <HeroSection t={t} />

      <Filters
        t={t}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        resetFilters={resetFilters}
      />

      <ProductGrid
        t={t}
        filteredProducts={filteredProducts}
        sortBy={sortBy}
        setSortBy={setSortBy}
        addToCart={addToCart}
        openProductDetails={openProductDetails}
      />

      <Footer />

      <ProductDialog
        isOpen={isProductDialogOpen}
        onOpenChange={setIsProductDialogOpen}
        product={selectedProduct}
        t={t}
        addToCart={addToCart}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
      />

      <OrderDialog
        isOpen={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
        orderForm={orderForm}
        setOrderForm={setOrderForm}
        cart={cart}
        t={t}
        handleSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
}