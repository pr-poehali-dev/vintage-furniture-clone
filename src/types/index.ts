export interface Product {
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

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
}

export interface Language {
  siteName: string;
  shop: string;
  collections: string;
  about: string;
  contact: string;
  heroTitle: string;
  heroSubtitle: string;
  shopNow: string;
  items: string;
  sortBy: string;
  default: string;
  name: string;
  priceLowHigh: string;
  priceHighLow: string;
  addToCart: string;
  quickOrder: string;
  search: string;
  style: string;
  material: string;
  size: string;
  apply: string;
  reset: string;
  cart: string;
  emptyCart: string;
  total: string;
  checkout: string;
  sale: string;
  // Auth related
  login: string;
  register: string;
  profile: string;
  logout: string;
  email: string;
  phone: string;
  telegram: string;
  password: string;
  confirmPassword: string;
  enterEmail: string;
  enterPhone: string;
  enterTelegram: string;
  registerViaEmail: string;
  registerViaPhone: string;
  registerViaTelegram: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  welcomeBack: string;
  createAccount: string;
  myOrders: string;
  personalInfo: string;
  editProfile: string;
  save: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  telegram?: string;
  registrationMethod: 'email' | 'phone' | 'telegram';
  createdAt: string;
}

export interface AuthForm {
  name: string;
  email: string;
  phone: string;
  telegram: string;
  password: string;
  confirmPassword: string;
  registrationMethod: 'email' | 'phone' | 'telegram';
}

export interface LoginForm {
  identifier: string; // email, phone, or telegram
  password: string;
}