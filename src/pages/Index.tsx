import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
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
  const [selectedStyle, setSelectedStyle] = useState<string>("")
  const [selectedMaterial, setSelectedMaterial] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  const applyFilters = () => {
    let filtered = products.filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesStyle = !selectedStyle || product.style === selectedStyle
      const matchesMaterial = !selectedMaterial || product.material === selectedMaterial
      const matchesSize = !selectedSize || product.size === selectedSize
      const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesPrice && matchesStyle && matchesMaterial && matchesSize && matchesSearch
    })
    setFilteredProducts(filtered)
  }

  const resetFilters = () => {
    setPriceRange([0, 100000])
    setSelectedStyle("")
    setSelectedMaterial("")
    setSelectedSize("")
    setSearchTerm("")
    setFilteredProducts(products)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">VINTAGE FURNITURE</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Каталог</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Коллекции</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">О нас</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Icon name="Search" size={20} className="text-muted-foreground" />
              <Icon name="ShoppingBag" size={20} className="text-muted-foreground" />
              <Icon name="User" size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-vintage-wheat to-vintage-terracotta py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-vintage-dark-brown mb-6">
            Коллекция Винтажной Мебели
          </h2>
          <p className="text-xl text-vintage-chocolate mb-8 max-w-2xl mx-auto">
            Откройте для себя уникальные предметы мебели с богатой историей. 
            Каждый элемент тщательно отобран и восстановлен с любовью к деталям.
          </p>
          <Button size="lg" className="bg-vintage-chocolate hover:bg-vintage-dark-brown text-white px-8 py-3">
            Посмотреть Каталог
          </Button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
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
                  <SelectItem value="">Все стили</SelectItem>
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
                  <SelectItem value="">Все материалы</SelectItem>
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
                  <SelectItem value="">Все размеры</SelectItem>
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold">Наша Коллекция</h3>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">
                Найдено: {filteredProducts.length} товаров
              </span>
              <div className="flex items-center space-x-2">
                <Icon name="Grid3X3" size={20} className="text-muted-foreground" />
                <Icon name="List" size={20} className="text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      Скидка
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-sm">{product.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{product.style}</Badge>
                    <Badge variant="outline" className="text-xs">{product.material}</Badge>
                    <Badge variant="outline" className="text-xs">{product.size}</Badge>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                  <Button className="bg-vintage-chocolate hover:bg-vintage-dark-brown">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
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
    </div>
  )
}

export default Index