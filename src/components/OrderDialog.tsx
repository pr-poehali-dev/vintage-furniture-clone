import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { OrderForm, CartItem, Language } from "@/types";

interface OrderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  orderForm: OrderForm;
  setOrderForm: (form: OrderForm) => void;
  cart: CartItem[];
  t: Language;
  handleSubmitOrder: () => void;
}

export default function OrderDialog({
  isOpen,
  onOpenChange,
  orderForm,
  setOrderForm,
  cart,
  t,
  handleSubmitOrder,
}: OrderDialogProps) {
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
          <DialogDescription>
            Заполните форму для оформления заказа
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-medium">Ваш заказ</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>
                    {(item.product.price * item.quantity).toLocaleString()} ₽
                  </span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between items-center font-medium">
              <span>Итого:</span>
              <span>{getTotalPrice().toLocaleString()} ₽</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="font-medium">Контактная информация</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={orderForm.name}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, name: e.target.value })
                  }
                  placeholder="Введите ваше имя"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={orderForm.email}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, email: e.target.value })
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
                    setOrderForm({ ...orderForm, phone: e.target.value })
                  }
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Адрес доставки</Label>
                <Textarea
                  id="address"
                  value={orderForm.address}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, address: e.target.value })
                  }
                  placeholder="Введите полный адрес доставки"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  value={orderForm.comment}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, comment: e.target.value })
                  }
                  placeholder="Дополнительные пожелания (необязательно)"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmitOrder}
            className="w-full"
            disabled={!orderForm.name || !orderForm.phone}
          >
            Оформить заказ на {getTotalPrice().toLocaleString()} ₽
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}