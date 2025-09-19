import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

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

interface Language {
  cart: string;
  emptyCart: string;
  total: string;
  checkout: string;
  [key: string]: string;
}

interface CartSheetProps {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  cart: CartItem[];
  setCart: (value: CartItem[]) => void;
  t: Language;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  isOrderDialogOpen: boolean;
  setIsOrderDialogOpen: (value: boolean) => void;
  orderForm: OrderForm;
  setOrderForm: (value: OrderForm) => void;
  handleOrderSubmit: () => void;
  children: React.ReactNode;
}

export default function CartSheet({
  isCartOpen,
  setIsCartOpen,
  cart,
  setCart,
  t,
  getTotalItems,
  getTotalPrice,
  updateCartQuantity,
  removeFromCart,
  isOrderDialogOpen,
  setIsOrderDialogOpen,
  orderForm,
  setOrderForm,
  handleOrderSubmit,
  children,
}: CartSheetProps) {
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        {children}
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
  );
}