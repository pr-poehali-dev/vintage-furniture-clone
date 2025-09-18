import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { Language, CartItem } from "@/types";

interface HeaderProps {
  t: Language;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsOrderDialogOpen: (open: boolean) => void;
}

export default function Header({
  t,
  currentLanguage,
  setCurrentLanguage,
  searchQuery,
  setSearchQuery,
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen,
  setIsOrderDialogOpen,
}: HeaderProps) {
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.product.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.product.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.product.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-serif font-bold tracking-wide">
              {t.siteName}
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t.shop}
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t.collections}
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t.about}
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t.contact}
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 text-sm border border-border rounded-none bg-background"
              />
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={currentLanguage === "ru" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentLanguage("ru")}
                className="text-xs"
              >
                RU
              </Button>
              <Button
                variant={currentLanguage === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentLanguage("en")}
                className="text-xs"
              >
                EN
              </Button>
              <Button
                variant={currentLanguage === "fr" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentLanguage("fr")}
                className="text-xs"
              >
                FR
              </Button>
              <Button
                variant={currentLanguage === "es" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentLanguage("es")}
                className="text-xs"
              >
                ES
              </Button>
              <Button
                variant={currentLanguage === "it" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentLanguage("it")}
                className="text-xs"
              >
                IT
              </Button>
            </div>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{t.cart}</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? t.emptyCart : `${getTotalItems()} ${t.items}`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-4 p-4 border border-border rounded"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.product.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
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
                {cart.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.total}:</span>
                        <span className="font-bold text-lg">
                          {getTotalPrice().toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsOrderDialogOpen(true);
                      }}
                    >
                      {t.checkout}
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}