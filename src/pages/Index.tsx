import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  style: string
  material: string
  size: string
  image: string
  description: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface OrderForm {
  name: string
  email: string
  phone: string
  address: string
  comment: string
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
    description: "Изысканное кресло в английском стиле с резными деталями"
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
    description: "Роскошный обеденный стол с орнаментальными ножками"
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
    description: "Элегантная витрина со стеклянными дверцами и латунной фурнитурой"
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
    description: "Изящный письменный стол с множеством ящиков"
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
    description: "Роскошный комод с бронзовой отделкой"
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
    description: "Элегантное кресло с характерными изогнутыми линиями"
  }
]

function Index() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedStyle, setSelectedStyle] = useState<string>("all")
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all")
  const [selectedSize, setSelectedSize] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string>("default")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
  })

  const applyFilters = () => {
    let filtered = products.filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesStyle = !selectedStyle || selectedStyle === 'all' || product.style === selectedStyle
      const matchesMaterial = !selectedMaterial || selectedMaterial === 'all' || product.material === selectedMaterial
      const matchesSize = !selectedSize || selectedSize === 'all' || product.size === selectedSize
      const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesPrice && matchesStyle && matchesMaterial && matchesSize && matchesSearch
    })
    
    // Apply sorting
    if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
    }
    
    setFilteredProducts(filtered)
  }

  const resetFilters = () => {
    setPriceRange([0, 100000])
    setSelectedStyle("all")
    setSelectedMaterial("all")
    setSelectedSize("all")
    setSearchTerm("")
    setFilteredProducts(products)
  }

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product)
    setIsProductDialogOpen(true)
  }

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleOrderSubmit = () => {
    // Здесь можно добавить отправку заказа на сервер
    alert(`Спасибо за заказ, ${orderForm.name}! Мы свяжемся с вами в ближайшее время.`)
    setCart([])
    setIsOrderDialogOpen(false)
    setIsCartOpen(false)
    setOrderForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      comment: ''
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <h1 className="text-xl font-normal tracking-wider text-foreground">VINTAGE FURNITURE</h1>
              <nav className="hidden lg:flex space-x-8">
                <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide">SHOP</a>
                <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide">COLLECTIONS</a>
                <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide">ABOUT</a>
                <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide">CONTACT</a>
              </nav>
            </div>
            <div className="flex items-center space-x-5">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-transparent">
                <Icon name="Search" size={18} className="text-foreground/80" />
              </Button>
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0 hover:bg-transparent">
                    <Icon name="ShoppingBag" size={18} className="text-foreground/80" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Корзина покупок</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? "Ваша корзина пуста" : `${getTotalItems()} товар(ов) на сумму ${getTotalPrice().toLocaleString()} ₽`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Добавьте товары в корзину</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex items-center space-x-4 bg-card p-4 rounded-lg">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-16 w-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.product.name}</h4>
                                <p className="text-vintage-chocolate font-bold">
                                  {item.product.price.toLocaleString()} ₽
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={16} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.product.id)}
                                >
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span>{getTotalPrice().toLocaleString()} ₽</span>
                          </div>
                          <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                            <DialogTrigger asChild>
                              <Button className="w-full bg-vintage-chocolate hover:bg-vintage-dark-brown">
                                Оформить заказ
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
                                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                                    placeholder="Ваше имя"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={orderForm.email}
                                    onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                                    placeholder="your@email.com"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="phone">Телефон</Label>
                                  <Input
                                    id="phone"
                                    value={orderForm.phone}
                                    onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                                    placeholder="+7 (___) ___-__-__"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="address">Адрес доставки</Label>
                                  <Textarea
                                    id="address"
                                    value={orderForm.address}
                                    onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                                    placeholder="Введите полный адрес доставки"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="comment">Комментарий к заказу</Label>
                                  <Textarea
                                    id="comment"
                                    value={orderForm.comment}
                                    onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                                    placeholder="Дополнительные пожелания (необязательно)"
                                  />
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <div className="flex justify-between font-bold text-lg">
                                  <span>К оплате:</span>
                                  <span>{getTotalPrice().toLocaleString()} ₽</span>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={handleOrderSubmit}
                                  className="bg-vintage-chocolate hover:bg-vintage-dark-brown"
                                  disabled={!orderForm.name || !orderForm.email || !orderForm.phone || !orderForm.address}
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
              <Icon name="User" size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-6xl font-normal text-foreground mb-6 tracking-tight">
            VINTAGE FURNITURE
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto font-light">
            Carefully curated pieces with rich history, 
            restored with attention to every detail.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium tracking-wider"
          >
            SHOP NOW
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
              <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
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
            <div className="flex space-x-2">
              <Button onClick={applyFilters} className="flex-1">
                <Icon name="Filter" size={16} className="mr-2" />
                Применить
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-sm font-medium text-muted-foreground tracking-wider">
                {filteredProducts.length} ITEMS
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={(value) => { setSortBy(value); applyFilters(); }}>
                <SelectTrigger className="w-40 h-8 text-xs border-none bg-transparent">
                  <SelectValue placeholder="SORT BY" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">DEFAULT</SelectItem>
                  <SelectItem value="name">NAME</SelectItem>
                  <SelectItem value="price-low">PRICE: LOW TO HIGH</SelectItem>
                  <SelectItem value="price-high">PRICE: HIGH TO LOW</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Icon name="Grid3X3" size={16} className="text-foreground/60" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Icon name="List" size={16} className="text-foreground/60" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => openProductDetails(product)}>
                <div className="relative overflow-hidden bg-white rounded-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-black text-white text-xs px-2 py-1 font-medium">
                        SALE
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="Heart" size={14} />
                    </Button>
                  </div>
                  
                  {/* Quick Add Button - appears on hover */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      className="w-full bg-black hover:bg-gray-800 text-white h-10 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>
                
                <div className="pt-3 space-y-1">
                  <h3 className="font-medium text-sm leading-tight group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
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
                Ваш надежный партнер в мире винтажной мебели. 
                Качество, проверенное временем.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Кресла</a></li>
                <li><a href="#" className="hover:opacity-100">Столы</a></li>
                <li><a href="#" className="hover:opacity-100">Шкафы</a></li>
                <li><a href="#" className="hover:opacity-100">Комоды</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">О нас</a></li>
                <li><a href="#" className="hover:opacity-100">Доставка</a></li>
                <li><a href="#" className="hover:opacity-100">Оплата</a></li>
                <li><a href="#" className="hover:opacity-100">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>+7 (495) 123-45-67</p>
                <p>info@vintage-furniture.ru</p>
                <div className="flex space-x-4 mt-4">
                  <Icon name="Instagram" size={20} className="hover:opacity-100 cursor-pointer" />
                  <Icon name="Facebook" size={20} className="hover:opacity-100 cursor-pointer" />
                  <Icon name="Twitter" size={20} className="hover:opacity-100 cursor-pointer" />
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
                <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
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
                      Скидка
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
                    <p className="text-muted-foreground text-lg">{selectedProduct.description}</p>
                  </div>
                  
                  <Separator />
                  
                  {/* Product Specifications */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Характеристики</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Категория:</span>
                        <p className="text-muted-foreground">{selectedProduct.category}</p>
                      </div>
                      <div>
                        <span className="font-medium">Стиль:</span>
                        <p className="text-muted-foreground">{selectedProduct.style}</p>
                      </div>
                      <div>
                        <span className="font-medium">Материал:</span>
                        <p className="text-muted-foreground">{selectedProduct.material}</p>
                      </div>
                      <div>
                        <span className="font-medium">Размер:</span>
                        <p className="text-muted-foreground">{selectedProduct.size}</p>
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
                        e.stopPropagation()
                        addToCart(selectedProduct)
                        setIsProductDialogOpen(false)
                      }}
                    >
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Добавить в корзину
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(selectedProduct)
                        setIsProductDialogOpen(false)
                        setIsOrderDialogOpen(true)
                      }}
                    >
                      <Icon name="Zap" size={20} className="mr-2" />
                      Быстрый заказ
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Index