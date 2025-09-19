import { useState, useEffect } from "react";
import { Product, CartItem, User, OrderForm } from "@/types";
import { products } from "@/data/products";

export function useShop() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  // Функция поиска товаров в реальном времени
  const searchProducts = (query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      setIsSearchOpen(false);
      return;
    }

    const suggestions = products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.style.toLowerCase().includes(query.toLowerCase()) ||
          product.material.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 6);

    setSearchSuggestions(suggestions);
    setIsSearchOpen(suggestions.length > 0);
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    searchProducts(value);
  };

  // Выбор товара из поисковых подсказок
  const handleSearchSelect = (product: Product) => {
    setSearchTerm(product.name);
    setIsSearchOpen(false);
    setSearchSuggestions([]);
    openProductDetails(product);
  };

  const applyFilters = () => {
    let filtered = products.filter((product) => {
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStyle =
        !selectedStyle ||
        selectedStyle === "all" ||
        product.style === selectedStyle;
      const matchesMaterial =
        !selectedMaterial ||
        selectedMaterial === "all" ||
        product.material === selectedMaterial;
      const matchesSize =
        !selectedSize ||
        selectedSize === "all" ||
        product.size === selectedSize;
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesPrice &&
        matchesStyle &&
        matchesMaterial &&
        matchesSize &&
        matchesSearch
      );
    });

    // Apply sorting
    if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedStyle("all");
    setSelectedMaterial("all");
    setSelectedSize("all");
    setSearchTerm("");
    setFilteredProducts(products);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  // Автоматическое применение фильтров при изменении любого параметра
  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    selectedStyle,
    selectedMaterial,
    selectedSize,
    priceRange,
    sortBy,
  ]);

  return {
    filteredProducts,
    priceRange,
    setPriceRange,
    selectedStyle,
    setSelectedStyle,
    selectedMaterial,
    setSelectedMaterial,
    selectedSize,
    setSelectedSize,
    searchTerm,
    setSearchTerm,
    searchSuggestions,
    setSearchSuggestions,
    isSearchOpen,
    setIsSearchOpen,
    sortBy,
    setSortBy,
    selectedProduct,
    setSelectedProduct,
    isProductDialogOpen,
    setIsProductDialogOpen,
    searchProducts,
    handleSearchChange,
    handleSearchSelect,
    applyFilters,
    resetFilters,
    openProductDetails,
  };
}