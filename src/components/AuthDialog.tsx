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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{activeTab === "login" ? t.welcomeBack : t.createAccount}</DialogTitle>
          <DialogDescription>
            {activeTab === "login" 
              ? "Войдите в свой аккаунт для продолжения покупок"
              : "Создайте аккаунт для отслеживания заказов"
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t.login}</TabsTrigger>
            <TabsTrigger value="register">{t.register}</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Email, телефон или Telegram</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="user@example.com, +7 900 123-45-67 или @username"
                  value={loginForm.identifier}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, identifier: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">{t.password}</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Введите пароль"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full"
                disabled={!loginForm.identifier || !loginForm.password}
              >
                {t.login}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-4">
              {/* Registration Method Selection */}
              <div className="space-y-3">
                <Label>Способ регистрации</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={authForm.registrationMethod === "email" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "email" })}
                  >
                    <Icon name="Mail" size={16} className="mr-1" />
                    Email
                  </Button>
                  <Button
                    variant={authForm.registrationMethod === "phone" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "phone" })}
                  >
                    <Icon name="Phone" size={16} className="mr-1" />
                    {t.phone}
                  </Button>
                  <Button
                    variant={authForm.registrationMethod === "telegram" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "telegram" })}
                  >
                    <Icon name="MessageCircle" size={16} className="mr-1" />
                    TG
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                />
              </div>

              {/* Dynamic primary field based on registration method */}
              {authForm.registrationMethod === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.enterEmail}
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  />
                </div>
              )}

              {authForm.registrationMethod === "phone" && (
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.enterPhone}
                    value={authForm.phone}
                    onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                  />
                </div>
              )}

              {authForm.registrationMethod === "telegram" && (
                <div className="space-y-2">
                  <Label htmlFor="telegram">{t.telegram}</Label>
                  <Input
                    id="telegram"
                    type="text"
                    placeholder={t.enterTelegram}
                    value={authForm.telegram}
                    onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                  />
                </div>
              )}

              {/* Optional fields */}
              <details className="space-y-2">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Дополнительные контакты (необязательно)
                </summary>
                <div className="space-y-3 pt-2">
                  {authForm.registrationMethod !== "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">{t.email}</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder={t.enterEmail}
                        value={authForm.email}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      />
                    </div>
                  )}
                  {authForm.registrationMethod !== "phone" && (
                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">{t.phone}</Label>
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder={t.enterPhone}
                        value={authForm.phone}
                        onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                      />
                    </div>
                  )}
                  {authForm.registrationMethod !== "telegram" && (
                    <div className="space-y-2">
                      <Label htmlFor="reg-telegram">{t.telegram}</Label>
                      <Input
                        id="reg-telegram"
                        type="text"
                        placeholder={t.enterTelegram}
                        value={authForm.telegram}
                        onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              </details>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Создайте пароль"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={authForm.confirmPassword}
                  onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                />
              </div>

              <Button
                onClick={handleRegister}
                className="w-full"
                disabled={
                  !authForm.name ||
                  !authForm.password ||
                  authForm.password !== authForm.confirmPassword ||
                  (authForm.registrationMethod === "email" && !authForm.email) ||
                  (authForm.registrationMethod === "phone" && !authForm.phone) ||
                  (authForm.registrationMethod === "telegram" && !authForm.telegram)
                }
              >
                {t.createAccount}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}