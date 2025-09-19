import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { User, Language, CartItem } from "@/types";

interface ProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
  orderHistory: Array<{
    id: string;
    date: string;
    total: number;
    status: string;
    items: CartItem[];
  }>;
  t: Language;
}

export default function ProfileDialog({
  isOpen,
  onOpenChange,
  user,
  onUpdateUser,
  onLogout,
  orderHistory,
  t,
}: ProfileDialogProps) {
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    telegram: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        telegram: user.telegram || "",
      });
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      const updatedUser: User = {
        ...user,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        telegram: editForm.telegram,
      };
      onUpdateUser(updatedUser);
      setIsEditing(false);
      alert("Профиль обновлен!");
    }
  };

  const handleLogout = () => {
    onLogout();
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            {t.profile}
          </DialogTitle>
          <DialogDescription>
            Управляйте своими личными данными и просматривайте историю заказов
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">{t.personalInfo}</TabsTrigger>
            <TabsTrigger value="orders">{t.myOrders}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* User Info Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Зарегистрирован {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Badge variant="outline">
                {user.registrationMethod === "email" && <Icon name="Mail" size={14} className="mr-1" />}
                {user.registrationMethod === "phone" && <Icon name="Phone" size={14} className="mr-1" />}
                {user.registrationMethod === "telegram" && <Icon name="MessageCircle" size={14} className="mr-1" />}
                {user.registrationMethod}
              </Badge>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Контактная информация</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Icon name={isEditing ? "X" : "Edit"} size={16} className="mr-2" />
                  {isEditing ? "Отмена" : t.editProfile}
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="profile-name">{t.name}</Label>
                  <Input
                    id="profile-name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="profile-email">{t.email}</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="profile-phone">{t.phone}</Label>
                  <Input
                    id="profile-phone"
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="profile-telegram">{t.telegram}</Label>
                  <Input
                    id="profile-telegram"
                    value={editForm.telegram}
                    onChange={(e) => setEditForm({ ...editForm, telegram: e.target.value })}
                    disabled={!isEditing}
                    placeholder="@username (необязательно)"
                  />
                </div>

                {isEditing && (
                  <Button
                    onClick={handleSave}
                    disabled={!editForm.name || !editForm.email}
                  >
                    <Icon name="Check" size={16} className="mr-2" />
                    {t.save}
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Logout Section */}
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                {t.logout}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">{t.myOrders}</h4>
              
              {orderHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>У вас пока нет заказов</p>
                  <p className="text-sm">Заказы появятся здесь после покупки</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Заказ #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total.toLocaleString()} ₽</p>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "pending"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {order.status === "completed" && "Выполнен"}
                            {order.status === "pending" && "В обработке"}
                            {order.status === "cancelled" && "Отменен"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}