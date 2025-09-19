import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import AuthDialog from "@/components/AuthDialog";
import ProfileDialog from "@/components/ProfileDialog";

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
  const [priceRange, setPriceRange] = useState([0, 100000]);
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
    setPriceRange([0, 100000]);
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
      {/* Header */}
      <header className="border-b border-border/20 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <h1 className="text-xl font-normal tracking-wider text-foreground">
                {t.siteName}
              </h1>
              <nav className="hidden lg:flex space-x-8">
                <a
                  href="#"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
                >
                  {t.shop}
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
                >
                  {t.collections}
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
                >
                  {t.about}
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
                >
                  {t.contact}
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-5">
              {/* Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-16 h-8 border-none bg-transparent p-0 focus:ring-0">
                  <SelectValue>
                    <span className="text-lg">
                      {languages.find((lang) => lang.code === language)?.flag}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="flex items-center"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Smart Search with Autocomplete */}
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Поиск мебели..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => searchTerm && setIsSearchOpen(true)}
                    className="w-64 h-8 pl-8 pr-4 border-border/20 rounded-full text-sm placeholder:text-muted-foreground/60"
                  />
                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-2.5 top-2 text-muted-foreground/60"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-0.5 h-6 w-6 p-0 hover:bg-muted/50"
                      onClick={() => {
                        setSearchTerm("");
                        setSearchSuggestions([]);
                        setIsSearchOpen(false);
                      }}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  )}
                </div>

                {/* Search Suggestions Dropdown */}
                {isSearchOpen && searchSuggestions.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-background border border-border/20 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    <div className="p-2 text-xs text-muted-foreground border-b border-border/10">
                      Найдено {searchSuggestions.length} товаров
                    </div>
                    {searchSuggestions.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer border-b border-border/5 last:border-b-0"
                        onClick={() => handleSearchSelect(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {product.category} • {product.style}
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-1">
                            {product.price.toLocaleString()} ₽
                          </p>
                        </div>
                        <Icon
                          name="ArrowRight"
                          size={14}
                          className="text-muted-foreground"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile/Auth Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => user ? setIsProfileDialogOpen(true) : setIsAuthDialogOpen(true)}
                className="relative h-8 w-8 p-0 hover:bg-transparent"
              >
                <Icon
                  name="User"
                  size={18}
                  className="text-foreground/80"
                />
                {user && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500">
                  </span>
                )}
              </Button>

              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative h-8 w-8 p-0 hover:bg-transparent"
                  >
                    <Icon
                      name="ShoppingBag"
                      size={18}
                      className="text-foreground/80"
                    />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>{t.cart}</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0
                        ? t.emptyCart
                        : `${getTotalItems()} товар(ов) на сумму ${getTotalPrice().toLocaleString()} ₽`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon
                          name="ShoppingBag"
                          size={48}
                          className="mx-auto text-muted-foreground mb-4"
                        />
                        <p className="text-muted-foreground">
                          Добавьте товары в корзину
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                          {cart.map((item) => (
                            <div
                              key={item.product.id}
                              className="border border-border/20 rounded-lg p-4 hover:bg-muted/20 transition-colors"
                            >
                              <div className="flex items-start space-x-4">
                                {/* Product Image */}
                                <div className="relative">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="h-20 w-20 object-cover rounded-lg"
                                  />
                                  {item.product.originalPrice && (
                                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0">
                                      SALE
                                    </Badge>
                                  )}
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                                    {item.product.name}
                                  </h4>
                                  
                                  {/* Product Details */}
                                  <div className="text-xs text-muted-foreground space-y-1 mb-2">
                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                      <span>Категория: {item.product.category}</span>
                                      <span>Стиль: {item.product.style}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                      <span>Материал: {item.product.material}</span>
                                      <span>Размер: {item.product.size}</span>
                                    </div>
                                  </div>

                                  {/* Price Section */}
                                  <div className="flex items-center space-x-2 mb-3">
                                    <span className="text-sm font-bold text-foreground">
                                      {item.product.price.toLocaleString()} ₽
                                    </span>
                                    {item.product.originalPrice && (
                                      <span className="text-xs text-muted-foreground line-through">
                                        {item.product.originalPrice.toLocaleString()} ₽
                                      </span>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                      за штуку
                                    </span>
                                  </div>

                                  {/* Quantity Controls & Total */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-muted-foreground">Количество:</span>
                                      <div className="flex items-center space-x-1">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-7 w-7 p-0"
                                          onClick={() =>
                                            updateCartQuantity(
                                              item.product.id,
                                              item.quantity - 1,
                                            )
                                          }
                                        >
                                          <Icon name="Minus" size={12} />
                                        </Button>
                                        <span className="w-8 text-center text-sm font-medium">
                                          {item.quantity}
                                        </span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-7 w-7 p-0"
                                          onClick={() =>
                                            updateCartQuantity(
                                              item.product.id,
                                              item.quantity + 1,
                                            )
                                          }
                                        >
                                          <Icon name="Plus" size={12} />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    {/* Remove Button */}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                      onClick={() => removeFromCart(item.product.id)}
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>

                                  {/* Subtotal */}
                                  <div className="mt-2 pt-2 border-t border-border/10">
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs text-muted-foreground">
                                        Сумма за {item.quantity} шт.:
                                      </span>
                                      <span className="text-sm font-bold text-foreground">
                                        {(item.product.price * item.quantity).toLocaleString()} ₽
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-6" />
                        
                        {/* Cart Summary */}
                        <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                          <h3 className="font-medium text-sm text-foreground">Итоги заказа</h3>
                          
                          {/* Items breakdown */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Товары ({getTotalItems()} шт.):
                              </span>
                              <span className="font-medium">
                                {getTotalPrice().toLocaleString()} ₽
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Доставка:</span>
                              <span className="font-medium text-green-600">Бесплатно</span>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between text-lg font-bold">
                            <span>К оплате:</span>
                            <span className="text-lg">{getTotalPrice().toLocaleString()} ₽</span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-3 mt-6">
                          {/* Clear Cart Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              if (confirm('Очистить корзину? Все товары будут удалены.')) {
                                setCart([]);
                              }
                            }}
                          >
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Очистить корзину
                          </Button>
                          
                          {/* Checkout Button */}
                          <Dialog
                            open={isOrderDialogOpen}
                            onOpenChange={setIsOrderDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button className="w-full bg-vintage-chocolate hover:bg-vintage-dark-brown h-12">
                                <Icon name="ShoppingCart" size={18} className="mr-2" />
                                {t.checkout} • {getTotalPrice().toLocaleString()} ₽
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Оформление заказа</DialogTitle>
                                <DialogDescription>
                                  Заполните данные для доставки вашего заказа
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="name">Имя</Label>
                                  <Input
                                    id="name"
                                    value={orderForm.name}
                                    onChange={(e) =>
                                      setOrderForm({
                                        ...orderForm,
                                        name: e.target.value,
                                      })
                                    }
                                    placeholder="Ваше имя"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={orderForm.email}
                                    onChange={(e) =>
                                      setOrderForm({
                                        ...orderForm,
                                        email: e.target.value,
                                      })
                                    }
                                    placeholder="your@email.com"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="phone">Телефон</Label>
                                  <Input
                                    id="phone"
                                    value={orderForm.phone}
                                    onChange={(e) =>
                                      setOrderForm({
                                        ...orderForm,
                                        phone: e.target.value,
                                      })
                                    }
                                    placeholder="+7 (___) ___-__-__"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="address">
                                    Адрес доставки
                                  </Label>
                                  <Textarea
                                    id="address"
                                    value={orderForm.address}
                                    onChange={(e) =>
                                      setOrderForm({
                                        ...orderForm,
                                        address: e.target.value,
                                      })
                                    }
                                    placeholder="Введите полный адрес доставки"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="comment">
                                    Комментарий к заказу
                                  </Label>
                                  <Textarea
                                    id="comment"
                                    value={orderForm.comment}
                                    onChange={(e) =>
                                      setOrderForm({
                                        ...orderForm,
                                        comment: e.target.value,
                                      })
                                    }
                                    placeholder="Дополнительные пожелания (необязательно)"
                                  />
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <div className="flex justify-between font-bold text-lg">
                                  <span>К оплате:</span>
                                  <span>
                                    {getTotalPrice().toLocaleString()} ₽
                                  </span>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={handleOrderSubmit}
                                  className="bg-vintage-chocolate hover:bg-vintage-dark-brown"
                                  disabled={
                                    !orderForm.name ||
                                    !orderForm.email ||
                                    !orderForm.phone ||
                                    !orderForm.address
                                  }
                                >
                                  Подтвердить заказ
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-6xl font-normal text-foreground mb-6 tracking-tight">
            {t.heroTitle}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto font-light">
            {t.heroSubtitle}
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium tracking-wider"
          >
            {t.shopNow}
          </Button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div>
              <label className="text-sm font-medium mb-2 block">Поиск</label>
              <Input
                placeholder="Найти мебель..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Стиль</label>
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Все стили" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все стили</SelectItem>
                  <SelectItem value="Английский">Английский</SelectItem>
                  <SelectItem value="Барокко">Барокко</SelectItem>
                  <SelectItem value="Ампир">Ампир</SelectItem>
                  <SelectItem value="Викторианский">Викторианский</SelectItem>
                  <SelectItem value="Людовик XVI">Людовик XVI</SelectItem>
                  <SelectItem value="Шиппендейл">Шиппендейл</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Материал</label>
              <Select
                value={selectedMaterial}
                onValueChange={setSelectedMaterial}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Все материалы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все материалы</SelectItem>
                  <SelectItem value="Дуб">Дуб</SelectItem>
                  <SelectItem value="Махагон">Махагон</SelectItem>
                  <SelectItem value="Орех">Орех</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Размер</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Все размеры" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все размеры</SelectItem>
                  <SelectItem value="Малый">Малый</SelectItem>
                  <SelectItem value="Средний">Средний</SelectItem>
                  <SelectItem value="Большой">Большой</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Цена (₽)</label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={resetFilters} size="sm">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сбросить фильтры
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="w-full px-0">
          <div className="flex justify-between items-center mb-12 px-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground tracking-wider">
                {filteredProducts.length} {t.items}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                }}
              >
                <SelectTrigger className="w-40 h-8 text-xs border-none bg-transparent">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{t.default}</SelectItem>
                  <SelectItem value="name">{t.name}</SelectItem>
                  <SelectItem value="price-low">{t.priceLowHigh}</SelectItem>
                  <SelectItem value="price-high">{t.priceHighLow}</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Icon
                    name="Grid3X3"
                    size={16}
                    className="text-foreground/60"
                  />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Icon name="List" size={16} className="text-foreground/60" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-0">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer border border-border/20 p-3 hover:border-border/40 transition-colors"
                onClick={() => openProductDetails(product)}
              >
                {/* Image Container - Larger Format */}
                <div className="relative overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[4/5] object-cover transition-all duration-500 ease-out group-hover:brightness-95"
                    />

                    {/* Sale Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3">
                        <div className="bg-foreground text-background text-xs px-2 py-1 font-normal tracking-wide">
                          SALE
                        </div>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="w-8 h-8 bg-background/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon
                          name="Heart"
                          size={14}
                          className="text-foreground"
                        />
                      </button>
                    </div>

                    {/* Quick Add - appears on hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button
                        className="w-full h-10 bg-foreground text-background text-xs font-normal tracking-wide hover:bg-foreground/90 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        ADD TO BAG
                      </button>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-x-3 bottom-14 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button
                        className="w-full h-8 border border-background/60 text-background text-xs font-normal tracking-wide hover:bg-background/10 transition-colors backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        QUICK VIEW
                      </button>
                    </div>

                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Product Info - Compact */}
                <div className="pt-3 space-y-2">
                  <h3 className="text-sm font-light text-foreground tracking-wide leading-tight">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-normal text-foreground">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>

                  {/* Product Description - Shorter */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Премиальное качество и элегантный дизайн.
                  </p>

                  {/* Color Options - Compact */}
                  <div className="space-y-1 pt-1">
                    <span className="text-xs text-muted-foreground tracking-wider">
                      ЦВЕТА
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-4 h-4 bg-neutral-800 rounded-full border border-border/40 hover:scale-110 transition-transform cursor-pointer"></div>
                      <div className="w-4 h-4 bg-neutral-600 rounded-full border border-border/40 hover:scale-110 transition-transform cursor-pointer"></div>
                      <div className="w-4 h-4 bg-neutral-400 rounded-full border border-border/40 hover:scale-110 transition-transform cursor-pointer"></div>
                      <span className="text-xs text-muted-foreground ml-1">
                        +2
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-vintage-dark-brown text-vintage-wheat py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">VINTAGE FURNITURE</h3>
              <p className="text-sm opacity-80">
                Ваш надежный партнер в мире винтажной мебели. Качество,
                проверенное временем.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Кресла
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Столы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Шкафы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Комоды
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Оплата
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>+7 (495) 123-45-67</p>
                <p>info@vintage-furniture.ru</p>
                <div className="flex space-x-4 mt-4">
                  <Icon
                    name="Instagram"
                    size={20}
                    className="hover:opacity-100 cursor-pointer"
                  />
                  <Icon
                    name="Facebook"
                    size={20}
                    className="hover:opacity-100 cursor-pointer"
                  />
                  <Icon
                    name="Twitter"
                    size={20}
                    className="hover:opacity-100 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-vintage-chocolate mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 Vintage Furniture. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Product Details Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Large Product Image */}
                <div className="relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 md:h-[500px] object-cover rounded-lg"
                  />
                  {selectedProduct.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      {t.sale}
                    </Badge>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-3xl font-bold text-vintage-red">
                        {selectedProduct.price.toLocaleString()} ₽
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {selectedProduct.originalPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Product Specifications */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Характеристики</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Категория:</span>
                        <p className="text-muted-foreground">
                          {selectedProduct.category}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Стиль:</span>
                        <p className="text-muted-foreground">
                          {selectedProduct.style}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Материал:</span>
                        <p className="text-muted-foreground">
                          {selectedProduct.material}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Размер:</span>
                        <p className="text-muted-foreground">
                          {selectedProduct.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(selectedProduct);
                        setIsProductDialogOpen(false);
                      }}
                    >
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      {t.addToCart}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(selectedProduct);
                        setIsProductDialogOpen(false);
                        setIsOrderDialogOpen(true);
                      }}
                    >
                      <Icon name="Zap" size={20} className="mr-2" />
                      {t.quickOrder}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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