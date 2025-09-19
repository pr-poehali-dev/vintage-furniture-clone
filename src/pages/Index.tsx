import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/AuthDialog";
import ProfileDialog from "@/components/ProfileDialog";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FiltersSection from "@/components/FiltersSection";
import ProductsGrid from "@/components/ProductsGrid";
import CartSheet from "@/components/CartSheet";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import Footer from "@/components/Footer";

import { translations, languages } from "@/data/translations";
import { useShop } from "@/hooks/useShop";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

function Index() {
  const [language, setLanguage] = useState<string>("ru");
  const searchRef = useRef<HTMLDivElement>(null);

  // Custom hooks for business logic
  const shopLogic = useShop();
  const cartLogic = useCart();
  const authLogic = useAuth();

  // Закрытие поиска при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        shopLogic.setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shopLogic]);

  const t = translations[language as keyof typeof translations] || translations.ru;

  const handleOrderSubmit = () => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      total: cartLogic.getTotalPrice(),
      status: "pending",
      items: [...cartLogic.cart],
    };

    const updatedOrderHistory = [...authLogic.orderHistory, newOrder];
    authLogic.setOrderHistory(updatedOrderHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));

    alert(
      `Спасибо за заказ, ${cartLogic.orderForm.name}! Мы свяжемся с вами в ближайшее время.`,
    );
    cartLogic.setCart([]);
    cartLogic.setIsOrderDialogOpen(false);
    cartLogic.setIsCartOpen(false);
    cartLogic.setOrderForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    });
  };

  const handleLogout = () => {
    authLogic.handleLogout();
    cartLogic.setCart([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        languages={languages}
        searchTerm={shopLogic.searchTerm}
        handleSearchChange={shopLogic.handleSearchChange}
        searchSuggestions={shopLogic.searchSuggestions}
        isSearchOpen={shopLogic.isSearchOpen}
        setIsSearchOpen={shopLogic.setIsSearchOpen}
        setSearchTerm={shopLogic.setSearchTerm}
        setSearchSuggestions={shopLogic.setSearchSuggestions}
        handleSearchSelect={shopLogic.handleSearchSelect}
        user={authLogic.user}
        setIsProfileDialogOpen={authLogic.setIsProfileDialogOpen}
        setIsAuthDialogOpen={authLogic.setIsAuthDialogOpen}
        getTotalItems={cartLogic.getTotalItems}
        setIsCartOpen={cartLogic.setIsCartOpen}
        searchRef={searchRef}
      />

      <HeroSection t={t} />

      <FiltersSection
        searchTerm={shopLogic.searchTerm}
        handleSearchChange={shopLogic.handleSearchChange}
        selectedStyle={shopLogic.selectedStyle}
        setSelectedStyle={shopLogic.setSelectedStyle}
        selectedMaterial={shopLogic.selectedMaterial}
        setSelectedMaterial={shopLogic.setSelectedMaterial}
        selectedSize={shopLogic.selectedSize}
        setSelectedSize={shopLogic.setSelectedSize}
        priceRange={shopLogic.priceRange}
        setPriceRange={shopLogic.setPriceRange}
        resetFilters={shopLogic.resetFilters}
      />

      <ProductsGrid
        filteredProducts={shopLogic.filteredProducts}
        t={t}
        sortBy={shopLogic.sortBy}
        setSortBy={shopLogic.setSortBy}
        openProductDetails={shopLogic.openProductDetails}
        addToCart={cartLogic.addToCart}
      />

      <Footer />

      <CartSheet
        isCartOpen={cartLogic.isCartOpen}
        setIsCartOpen={cartLogic.setIsCartOpen}
        cart={cartLogic.cart}
        setCart={cartLogic.setCart}
        t={t}
        getTotalItems={cartLogic.getTotalItems}
        getTotalPrice={cartLogic.getTotalPrice}
        updateCartQuantity={cartLogic.updateCartQuantity}
        removeFromCart={cartLogic.removeFromCart}
        isOrderDialogOpen={cartLogic.isOrderDialogOpen}
        setIsOrderDialogOpen={cartLogic.setIsOrderDialogOpen}
        orderForm={cartLogic.orderForm}
        setOrderForm={cartLogic.setOrderForm}
        handleOrderSubmit={handleOrderSubmit}
      >
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 p-0 hover:bg-transparent"
        >
        </Button>
      </CartSheet>

      <ProductDetailDialog
        isProductDialogOpen={shopLogic.isProductDialogOpen}
        setIsProductDialogOpen={shopLogic.setIsProductDialogOpen}
        selectedProduct={shopLogic.selectedProduct}
        t={t}
        addToCart={cartLogic.addToCart}
        setIsOrderDialogOpen={cartLogic.setIsOrderDialogOpen}
      />

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={authLogic.isAuthDialogOpen}
        onOpenChange={authLogic.setIsAuthDialogOpen}
        onLogin={authLogic.handleLogin}
        t={t}
      />

      {/* Profile Dialog */}
      <ProfileDialog
        isOpen={authLogic.isProfileDialogOpen}
        onOpenChange={authLogic.setIsProfileDialogOpen}
        user={authLogic.user}
        onUpdateUser={authLogic.handleUpdateUser}
        onLogout={handleLogout}
        orderHistory={authLogic.orderHistory}
        t={t}
      />
    </div>
  );
}

export default Index;