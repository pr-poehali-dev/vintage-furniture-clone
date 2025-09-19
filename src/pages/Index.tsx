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

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  style: string;
  material: string;
  size: string;
  image: string;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  telegram?: string;
  registrationMethod: 'email' | 'phone' | 'telegram';
  createdAt: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Винтажное кресло Windsor",
    price: 45000,
    originalPrice: 55000,
    category: "Кресла",
    style: "Английский",
    material: "Дуб",
    size: "Средний",
    image: "/img/a5e41cb3-6702-483d-aaf0-a74525f501f4.jpg",
    description: "Изысканное кресло в английском стиле с резными деталями",
  },
  {
    id: 2,
    name: "Обеденный стол Барокко",
    price: 95000,
    category: "Столы",
    style: "Барокко",
    material: "Махагон",
    size: "Большой",
    image: "/img/7e1fe342-e594-48cf-80f5-71532bf4176e.jpg",
    description: "Роскошный обеденный стол с орнаментальными ножками",
  },
  {
    id: 3,
    name: "Витрина Ампир",
    price: 75000,
    category: "Шкафы",
    style: "Ампир",
    material: "Орех",
    size: "Средний",
    image: "/img/1a00855f-281f-4bf0-ac99-bd24c51b1e7e.jpg",
    description:
      "Элегантная витрина со стеклянными дверцами и латунной фурнитурой",
  },
  {
    id: 4,
    name: "Письменный стол Викторианский",
    price: 65000,
    category: "Столы",
    style: "Викторианский",
    material: "Дуб",
    size: "Средний",
    image: "/img/a5e41cb3-6702-483d-aaf0-a74525f501f4.jpg",
    description: "Изящный письменный стол с множеством ящиков",
  },
  {
    id: 5,
    name: "Комод Людовик XVI",
    price: 85000,
    category: "Комоды",
    style: "Людовик XVI",
    material: "Орех",
    size: "Средний",
    image: "/img/1a00855f-281f-4bf0-ac99-bd24c51b1e7e.jpg",
    description: "Роскошный комод с бронзовой отделкой",
  },
  {
    id: 6,
    name: "Кресло Шиппендейл",
    price: 55000,
    category: "Кресла",
    style: "Шиппендейл",
    material: "Махагон",
    size: "Средний",
    image: "/img/7e1fe342-e594-48cf-80f5-71532bf4176e.jpg",
    description: "Элегантное кресло с характерными изогнутыми линиями",
  },
];

const translations = {
  ru: {
    siteName: "ВИНТАЖНАЯ МЕБЕЛЬ",
    shop: "МАГАЗИН",
    collections: "КОЛЛЕКЦИИ",
    about: "О НАС",
    contact: "КОНТАКТЫ",
    heroTitle: "ВИНТАЖНАЯ МЕБЕЛЬ",
    heroSubtitle:
      "Тщательно отобранные предметы с богатой историей, восстановленные с вниманием к деталям.",
    shopNow: "СМОТРЕТЬ КАТАЛОГ",
    items: "ТОВАРОВ",
    sortBy: "СОРТИРОВАТЬ ПО",
    default: "ПО УМОЛЧАНИЮ",
    name: "НАЗВАНИЕ",
    priceLowHigh: "ЦЕНА: ПО ВОЗРАСТАНИЮ",
    priceHighLow: "ЦЕНА: ПО УБЫВАНИЮ",
    addToCart: "ДОБАВИТЬ В КОРЗИНУ",
    quickOrder: "БЫСТРЫЙ ЗАКАЗ",
    search: "ПОИСК",
    style: "СТИЛЬ",
    material: "МАТЕРИАЛ",
    size: "РАЗМЕР",
    apply: "ПРИМЕНИТЬ",
    reset: "СБРОСИТЬ",
    cart: "КОРЗИНА",
    emptyCart: "Ваша корзина пуста",
    total: "ИТОГО",
    checkout: "ОФОРМИТЬ ЗАКАЗ",
    sale: "СКИДКА",
    // Auth related
    login: "Войти",
    register: "Регистрация",
    profile: "Профиль",
    logout: "Выйти",
    email: "Email",
    phone: "Телефон",
    telegram: "Telegram",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    enterEmail: "Введите email",
    enterPhone: "Введите телефон",
    enterTelegram: "Введите @username",
    registerViaEmail: "Регистрация через email",
    registerViaPhone: "Регистрация через телефон",
    registerViaTelegram: "Регистрация через Telegram",
    alreadyHaveAccount: "Уже есть аккаунт?",
    dontHaveAccount: "Нет аккаунта?",
    welcomeBack: "С возвращением!",
    createAccount: "Создать аккаунт",
    myOrders: "Мои заказы",
    personalInfo: "Личные данные",
    editProfile: "Редактировать профиль",
    save: "Сохранить",
  },
  en: {
    siteName: "VINTAGE FURNITURE",
    shop: "SHOP",
    collections: "COLLECTIONS",
    about: "ABOUT",
    contact: "CONTACT",
    heroTitle: "VINTAGE FURNITURE",
    heroSubtitle:
      "Carefully curated pieces with rich history, restored with attention to every detail.",
    shopNow: "SHOP NOW",
    items: "ITEMS",
    sortBy: "SORT BY",
    default: "DEFAULT",
    name: "NAME",
    priceLowHigh: "PRICE: LOW TO HIGH",
    priceHighLow: "PRICE: HIGH TO LOW",
    addToCart: "ADD TO CART",
    quickOrder: "QUICK ORDER",
    search: "SEARCH",
    style: "STYLE",
    material: "MATERIAL",
    size: "SIZE",
    apply: "APPLY",
    reset: "RESET",
    cart: "CART",
    emptyCart: "Your cart is empty",
    total: "TOTAL",
    checkout: "CHECKOUT",
    sale: "SALE",
    // Auth related
    login: "Login",
    register: "Register",
    profile: "Profile",
    logout: "Logout",
    email: "Email",
    phone: "Phone",
    telegram: "Telegram",
    password: "Password",
    confirmPassword: "Confirm Password",
    enterEmail: "Enter email",
    enterPhone: "Enter phone",
    enterTelegram: "Enter @username",
    registerViaEmail: "Register via email",
    registerViaPhone: "Register via phone",
    registerViaTelegram: "Register via Telegram",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    welcomeBack: "Welcome back!",
    createAccount: "Create account",
    myOrders: "My orders",
    personalInfo: "Personal info",
    editProfile: "Edit profile",
    save: "Save",
  },
  de: {
    siteName: "VINTAGE MÖBEL",
    shop: "GESCHÄFT",
    collections: "KOLLEKTIONEN",
    about: "ÜBER UNS",
    contact: "KONTAKT",
    heroTitle: "VINTAGE MÖBEL",
    heroSubtitle:
      "Sorgfältig kuratierte Stücke mit reicher Geschichte, restauriert mit Liebe zum Detail.",
    shopNow: "JETZT KAUFEN",
    items: "ARTIKEL",
    sortBy: "SORTIEREN",
    default: "STANDARD",
    name: "NAME",
    priceLowHigh: "PREIS: NIEDRIG BIS HOCH",
    priceHighLow: "PREIS: HOCH BIS NIEDRIG",
    addToCart: "IN DEN WARENKORB",
    quickOrder: "SCHNELLBESTELLUNG",
    search: "SUCHEN",
    style: "STIL",
    material: "MATERIAL",
    size: "GRÖßE",
    apply: "ANWENDEN",
    reset: "ZURÜCKSETZEN",
    cart: "WARENKORB",
    emptyCart: "Ihr Warenkorb ist leer",
    total: "GESAMT",
    checkout: "KASSE",
    sale: "ANGEBOT",
    // Auth related - simplified for this example
    login: "Einloggen",
    register: "Registrieren",
    profile: "Profil",
    logout: "Ausloggen",
    email: "E-Mail",
    phone: "Telefon",
    telegram: "Telegram",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    enterEmail: "E-Mail eingeben",
    enterPhone: "Telefon eingeben",
    enterTelegram: "@username eingeben",
    registerViaEmail: "Über E-Mail registrieren",
    registerViaPhone: "Über Telefon registrieren",
    registerViaTelegram: "Über Telegram registrieren",
    alreadyHaveAccount: "Bereits ein Konto?",
    dontHaveAccount: "Kein Konto?",
    welcomeBack: "Willkommen zurück!",
    createAccount: "Konto erstellen",
    myOrders: "Meine Bestellungen",
    personalInfo: "Persönliche Daten",
    editProfile: "Profil bearbeiten",
    save: "Speichern",
  },
  fr: {
    siteName: "MOBILIER VINTAGE",
    shop: "BOUTIQUE",
    collections: "COLLECTIONS",
    about: "À PROPOS",
    contact: "CONTACT",
    heroTitle: "MOBILIER VINTAGE",
    heroSubtitle:
      "Pièces soigneusement sélectionnées avec une riche histoire, restaurées avec attention aux détails.",
    shopNow: "ACHETER MAINTENANT",
    items: "ARTICLES",
    sortBy: "TRIER PAR",
    default: "PAR DÉFAUT",
    name: "NOM",
    priceLowHigh: "PRIX: DU PLUS BAS AU PLUS HAUT",
    priceHighLow: "PRIX: DU PLUS HAUT AU PLUS BAS",
    addToCart: "AJOUTER AU PANIER",
    quickOrder: "COMMANDE RAPIDE",
    search: "RECHERCHER",
    style: "STYLE",
    material: "MATÉRIAU",
    size: "TAILLE",
    apply: "APPLIQUER",
    reset: "RÉINITIALISER",
    cart: "PANIER",
    emptyCart: "Votre panier est vide",
    total: "TOTAL",
    checkout: "COMMANDER",
    sale: "SOLDE",
    // Auth related
    login: "Connexion",
    register: "S'inscrire",
    profile: "Profil",
    logout: "Déconnexion",
    email: "Email",
    phone: "Téléphone",
    telegram: "Telegram",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    enterEmail: "Entrez votre email",
    enterPhone: "Entrez votre téléphone",
    enterTelegram: "Entrez @username",
    registerViaEmail: "S'inscrire par email",
    registerViaPhone: "S'inscrire par téléphone",
    registerViaTelegram: "S'inscrire par Telegram",
    alreadyHaveAccount: "Vous avez déjà un compte?",
    dontHaveAccount: "Vous n'avez pas de compte?",
    welcomeBack: "Bon retour!",
    createAccount: "Créer un compte",
    myOrders: "Mes commandes",
    personalInfo: "Informations personnelles",
    editProfile: "Modifier le profil",
    save: "Sauvegarder",
  },
  es: {
    siteName: "MUEBLES VINTAGE",
    shop: "TIENDA",
    collections: "COLECCIONES",
    about: "ACERCA DE",
    contact: "CONTACTO",
    heroTitle: "MUEBLES VINTAGE",
    heroSubtitle:
      "Piezas cuidadosamente seleccionadas con rica historia, restauradas con atención al detalle.",
    shopNow: "COMPRAR AHORA",
    items: "ARTÍCULOS",
    sortBy: "ORDENAR POR",
    default: "PREDETERMINADO",
    name: "NOMBRE",
    priceLowHigh: "PRECIO: DE MENOR A MAYOR",
    priceHighLow: "PRECIO: DE MAYOR A MENOR",
    addToCart: "AÑADIR AL CARRITO",
    quickOrder: "PEDIDO RÁPIDO",
    search: "BUSCAR",
    style: "ESTILO",
    material: "MATERIAL",
    size: "TAMAÑO",
    apply: "APLICAR",
    reset: "RESTABLECER",
    cart: "CARRITO",
    emptyCart: "Tu carrito está vacío",
    total: "TOTAL",
    checkout: "FINALIZAR COMPRA",
    sale: "OFERTA",
    // Auth related
    login: "Iniciar sesión",
    register: "Registrarse",
    profile: "Perfil",
    logout: "Cerrar sesión",
    email: "Email",
    phone: "Teléfono",
    telegram: "Telegram",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    enterEmail: "Ingrese email",
    enterPhone: "Ingrese teléfono",
    enterTelegram: "Ingrese @username",
    registerViaEmail: "Registrarse por email",
    registerViaPhone: "Registrarse por teléfono",
    registerViaTelegram: "Registrarse por Telegram",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    dontHaveAccount: "¿No tienes una cuenta?",
    welcomeBack: "¡Bienvenido de vuelta!",
    createAccount: "Crear cuenta",
    myOrders: "Mis pedidos",
    personalInfo: "Información personal",
    editProfile: "Editar perfil",
    save: "Guardar",
  },
  it: {
    siteName: "MOBILI VINTAGE",
    shop: "NEGOZIO",
    collections: "COLLEZIONI",
    about: "CHI SIAMO",
    contact: "CONTATTO",
    heroTitle: "MOBILI VINTAGE",
    heroSubtitle:
      "Pezzi accuratamente selezionati con una ricca storia, restaurati con attenzione ai dettagli.",
    shopNow: "ACQUISTA ORA",
    items: "ARTICOLI",
    sortBy: "ORDINA PER",
    default: "PREDEFINITO",
    name: "NOME",
    priceLowHigh: "PREZZO: DAL PIÙ BASSO AL PIÙ ALTO",
    priceHighLow: "PREZZO: DAL PIÙ ALTO AL PIÙ BASSO",
    addToCart: "AGGIUNGI AL CARRELLO",
    quickOrder: "ORDINE VELOCE",
    search: "CERCA",
    style: "STILE",
    material: "MATERIALE",
    size: "DIMENSIONE",
    apply: "APPLICA",
    reset: "RIPRISTINA",
    cart: "CARRELLO",
    emptyCart: "Il tuo carrello è vuoto",
    total: "TOTALE",
    checkout: "PROCEDI ALL'ACQUISTO",
    sale: "SALDO",
    // Auth related
    login: "Accedi",
    register: "Registrati",
    profile: "Profilo",
    logout: "Esci",
    email: "Email",
    phone: "Telefono",
    telegram: "Telegram",
    password: "Password",
    confirmPassword: "Conferma password",
    enterEmail: "Inserisci email",
    enterPhone: "Inserisci telefono",
    enterTelegram: "Inserisci @username",
    registerViaEmail: "Registrati via email",
    registerViaPhone: "Registrati via telefono",
    registerViaTelegram: "Registrati via Telegram",
    alreadyHaveAccount: "Hai già un account?",
    dontHaveAccount: "Non hai un account?",
    welcomeBack: "Bentornato!",
    createAccount: "Crea account",
    myOrders: "I miei ordini",
    personalInfo: "Informazioni personali",
    editProfile: "Modifica profilo",
    save: "Salva",
  },
};

function Index() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");
  const [language, setLanguage] = useState<string>("ru");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<Array<{
    id: string;
    date: string;
    total: number;
    status: string;
    items: CartItem[];
  }>>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedOrderHistory = localStorage.getItem('orderHistory');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCart([]);
    setOrderHistory([]);
    localStorage.removeItem('orderHistory');
  };

  // Закрытие поиска при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const t =
    translations[language as keyof typeof translations] || translations.ru;

  const languages = [
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
  });

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
      .slice(0, 6); // Показываем максимум 6 результатов

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

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderSubmit = () => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      total: getTotalPrice(),
      status: "pending",
      items: [...cart],
    };

    const updatedOrderHistory = [...orderHistory, newOrder];
    setOrderHistory(updatedOrderHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));

    alert(
      `Спасибо за заказ, ${orderForm.name}! Мы свяжемся с вами в ближайшее время.`,
    );
    setCart([]);
    setIsOrderDialogOpen(false);
    setIsCartOpen(false);
    setOrderForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        languages={languages}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        searchSuggestions={searchSuggestions}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        setSearchTerm={setSearchTerm}
        setSearchSuggestions={setSearchSuggestions}
        handleSearchSelect={handleSearchSelect}
        user={user}
        setIsProfileDialogOpen={setIsProfileDialogOpen}
        setIsAuthDialogOpen={setIsAuthDialogOpen}
        getTotalItems={getTotalItems}
        setIsCartOpen={setIsCartOpen}
        searchRef={searchRef}
      />

      <HeroSection t={t} />

      <FiltersSection
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
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

      <ProductsGrid
        filteredProducts={filteredProducts}
        t={t}
        sortBy={sortBy}
        setSortBy={setSortBy}
        openProductDetails={openProductDetails}
        addToCart={addToCart}
      />

      <Footer />

      <CartSheet
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        setCart={setCart}
        t={t}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        isOrderDialogOpen={isOrderDialogOpen}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
        orderForm={orderForm}
        setOrderForm={setOrderForm}
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
        isProductDialogOpen={isProductDialogOpen}
        setIsProductDialogOpen={setIsProductDialogOpen}
        selectedProduct={selectedProduct}
        t={t}
        addToCart={addToCart}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
      />

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onLogin={handleLogin}
        t={t}
      />

      {/* Profile Dialog */}
      <ProfileDialog
        isOpen={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        user={user}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
        orderHistory={orderHistory}
        t={t}
      />
    </div>
  );
}

export default Index;