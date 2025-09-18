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
}