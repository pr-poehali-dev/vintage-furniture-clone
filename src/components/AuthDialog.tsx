import { useState } from "react";
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
import Icon from "@/components/ui/icon";
import { AuthForm, LoginForm, User, Language } from "@/types";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (user: User) => void;
  t: Language;
}

export default function AuthDialog({
  isOpen,
  onOpenChange,
  onLogin,
  t,
}: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState<LoginForm>({
    identifier: "",
    password: "",
  });
  const [authForm, setAuthForm] = useState<AuthForm>({
    name: "",
    email: "",
    phone: "",
    telegram: "",
    password: "",
    confirmPassword: "",
    registrationMethod: "email",
  });

  const handleLogin = () => {
    // В реальном приложении здесь была бы проверка на сервере
    const mockUser: User = {
      id: "1",
      name: "Пользователь",
      email: loginForm.identifier.includes("@") ? loginForm.identifier : "user@example.com",
      phone: loginForm.identifier.includes("+") ? loginForm.identifier : "+7 900 123-45-67",
      registrationMethod: "email",
      createdAt: new Date().toISOString(),
    };
    
    onLogin(mockUser);
    onOpenChange(false);
    alert("Добро пожаловать!");
  };

  const handleRegister = () => {
    // В реальном приложении здесь была бы отправка на сервер
    const newUser: User = {
      id: Date.now().toString(),
      name: authForm.name,
      email: authForm.email,
      phone: authForm.phone,
      telegram: authForm.telegram,
      registrationMethod: authForm.registrationMethod,
      createdAt: new Date().toISOString(),
    };
    
    onLogin(newUser);
    onOpenChange(false);
    alert("Регистрация успешна! Добро пожаловать!");
  };

  const resetForms = () => {
    setLoginForm({ identifier: "", password: "" });
    setAuthForm({
      name: "",
      email: "",
      phone: "",
      telegram: "",
      password: "",
      confirmPassword: "",
      registrationMethod: "email",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForms();
    }}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-vintage-chocolate/10 rounded-full flex items-center justify-center">
            <Icon 
              name={activeTab === "login" ? "LogIn" : "UserPlus"} 
              size={32} 
              className="text-vintage-chocolate" 
            />
          </div>
          <DialogTitle className="text-2xl font-semibold">
            {activeTab === "login" ? t.welcomeBack : t.createAccount}
          </DialogTitle>
          <DialogDescription className="text-base">
            {activeTab === "login" 
              ? "Войдите в свой аккаунт для продолжения покупок и отслеживания заказов"
              : "Создайте аккаунт для персонализированного опыта покупок"
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-lg">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              {t.login}
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              <Icon name="UserPlus" size={16} className="mr-2" />
              {t.register}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6 mt-6">
            {/* Login Benefits */}
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-sm flex items-center">
                <Icon name="Gift" size={16} className="mr-2 text-vintage-chocolate" />
                Преимущества входа
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="ShoppingCart" size={12} className="mr-2" />
                  Сохранение корзины
                </div>
                <div className="flex items-center">
                  <Icon name="Package" size={12} className="mr-2" />
                  История заказов
                </div>
                <div className="flex items-center">
                  <Icon name="Heart" size={12} className="mr-2" />
                  Список желаний
                </div>
                <div className="flex items-center">
                  <Icon name="Percent" size={12} className="mr-2" />
                  Персональные скидки
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="flex items-center">
                  <Icon name="User" size={16} className="mr-2" />
                  Email, телефон или Telegram
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="user@example.com, +7 900 123-45-67 или @username"
                  value={loginForm.identifier}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, identifier: e.target.value })
                  }
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="flex items-center">
                  <Icon name="Lock" size={16} className="mr-2" />
                  {t.password}
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Введите пароль"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="h-11"
                />
              </div>
              
              <Button
                onClick={handleLogin}
                className="w-full h-12 bg-vintage-chocolate hover:bg-vintage-dark-brown font-medium"
                disabled={!loginForm.identifier || !loginForm.password}
              >
                <Icon name="LogIn" size={18} className="mr-2" />
                {t.login}
              </Button>
              
              <div className="text-center">
                <Button variant="link" className="text-sm text-muted-foreground">
                  Забыли пароль?
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-6 mt-6">
            {/* Registration Benefits */}
            <div className="bg-gradient-to-r from-vintage-chocolate/5 to-vintage-chocolate/10 p-4 rounded-lg border border-vintage-chocolate/20">
              <h4 className="font-medium text-sm flex items-center mb-3">
                <Icon name="Crown" size={16} className="mr-2 text-vintage-chocolate" />
                Создайте аккаунт и получите
              </h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Icon name="Gift" size={14} className="mr-2 text-green-600" />
                  <span className="font-medium text-green-600">5% скидка</span> на первый заказ
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Icon name="Bell" size={14} className="mr-2 text-blue-600" />
                  Уведомления о новых коллекциях и распродажах
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Icon name="Star" size={14} className="mr-2 text-yellow-600" />
                  Система лояльности с накопительными баллами
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              {/* Registration Method Selection */}
              <div className="space-y-3">
                <Label className="flex items-center font-medium">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Выберите способ регистрации
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={authForm.registrationMethod === "email" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "email" })}
                    className={authForm.registrationMethod === "email" ? "bg-vintage-chocolate hover:bg-vintage-dark-brown" : ""}
                  >
                    <Icon name="Mail" size={16} className="mr-1" />
                    Email
                  </Button>
                  <Button
                    variant={authForm.registrationMethod === "phone" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "phone" })}
                    className={authForm.registrationMethod === "phone" ? "bg-vintage-chocolate hover:bg-vintage-dark-brown" : ""}
                  >
                    <Icon name="Phone" size={16} className="mr-1" />
                    {t.phone}
                  </Button>
                  <Button
                    variant={authForm.registrationMethod === "telegram" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "telegram" })}
                    className={authForm.registrationMethod === "telegram" ? "bg-vintage-chocolate hover:bg-vintage-dark-brown" : ""}
                  >
                    <Icon name="MessageCircle" size={16} className="mr-1" />
                    TG
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center font-medium">
                  <Icon name="User" size={16} className="mr-2" />
                  {t.name} <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше полное имя"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  className="h-11"
                />
              </div>

              {/* Dynamic primary field based on registration method */}
              {authForm.registrationMethod === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center font-medium">
                    <Icon name="Mail" size={16} className="mr-2" />
                    {t.email} <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.enterEmail}
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    На этот email будут приходить уведомления о заказах
                  </p>
                </div>
              )}

              {authForm.registrationMethod === "phone" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center font-medium">
                    <Icon name="Phone" size={16} className="mr-2" />
                    {t.phone} <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.enterPhone}
                    value={authForm.phone}
                    onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Для SMS-уведомлений о статусе заказа
                  </p>
                </div>
              )}

              {authForm.registrationMethod === "telegram" && (
                <div className="space-y-2">
                  <Label htmlFor="telegram" className="flex items-center font-medium">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    {t.telegram} <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="telegram"
                    type="text"
                    placeholder={t.enterTelegram}
                    value={authForm.telegram}
                    onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Для быстрых уведомлений в Telegram
                  </p>
                </div>
              )}

              {/* Optional fields */}
              <details className="space-y-2 border border-muted rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium flex items-center">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Дополнительные контакты (необязательно)
                </summary>
                <div className="space-y-3 pt-4">
                  {authForm.registrationMethod !== "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="reg-email" className="flex items-center">
                        <Icon name="Mail" size={14} className="mr-2" />
                        {t.email}
                      </Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder={t.enterEmail}
                        value={authForm.email}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                        className="h-10"
                      />
                    </div>
                  )}
                  {authForm.registrationMethod !== "phone" && (
                    <div className="space-y-2">
                      <Label htmlFor="reg-phone" className="flex items-center">
                        <Icon name="Phone" size={14} className="mr-2" />
                        {t.phone}
                      </Label>
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder={t.enterPhone}
                        value={authForm.phone}
                        onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                        className="h-10"
                      />
                    </div>
                  )}
                  {authForm.registrationMethod !== "telegram" && (
                    <div className="space-y-2">
                      <Label htmlFor="reg-telegram" className="flex items-center">
                        <Icon name="MessageCircle" size={14} className="mr-2" />
                        {t.telegram}
                      </Label>
                      <Input
                        id="reg-telegram"
                        type="text"
                        placeholder={t.enterTelegram}
                        value={authForm.telegram}
                        onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                        className="h-10"
                      />
                    </div>
                  )}
                </div>
              </details>

              {/* Password Section */}
              <div className="bg-muted/20 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-sm flex items-center">
                  <Icon name="Shield" size={16} className="mr-2" />
                  Безопасность аккаунта
                </h4>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center font-medium">
                    <Icon name="Lock" size={16} className="mr-2" />
                    {t.password} <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Создайте надежный пароль"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Минимум 6 символов, используйте буквы и цифры
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center font-medium">
                    <Icon name="ShieldCheck" size={16} className="mr-2" />
                    {t.confirmPassword} <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    className="h-11"
                  />
                  {authForm.confirmPassword && authForm.password !== authForm.confirmPassword && (
                    <p className="text-xs text-red-500 flex items-center">
                      <Icon name="AlertCircle" size={12} className="mr-1" />
                      Пароли не совпадают
                    </p>
                  )}
                  {authForm.confirmPassword && authForm.password === authForm.confirmPassword && (
                    <p className="text-xs text-green-600 flex items-center">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Пароли совпадают
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Register Button */}
              <div className="space-y-4">
                <div className="bg-muted/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    Создавая аккаунт, вы соглашаетесь с{" "}
                    <Button variant="link" className="h-auto p-0 text-xs underline">
                      Пользовательским соглашением
                    </Button>
                    {" "}и{" "}
                    <Button variant="link" className="h-auto p-0 text-xs underline">
                      Политикой конфиденциальности
                    </Button>
                  </p>
                </div>
                
                <Button
                  onClick={handleRegister}
                  className="w-full h-12 bg-vintage-chocolate hover:bg-vintage-dark-brown font-medium"
                  disabled={
                    !authForm.name ||
                    !authForm.password ||
                    authForm.password !== authForm.confirmPassword ||
                    authForm.password.length < 6 ||
                    (authForm.registrationMethod === "email" && !authForm.email) ||
                    (authForm.registrationMethod === "phone" && !authForm.phone) ||
                    (authForm.registrationMethod === "telegram" && !authForm.telegram)
                  }
                >
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  {t.createAccount}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}