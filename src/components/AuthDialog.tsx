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
      <DialogContent className="max-w-md border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white">
        <DialogHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-vintage-chocolate to-vintage-dark-brown rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Icon 
                name={activeTab === "login" ? "LogIn" : "UserPlus"} 
                size={24} 
                className="text-white" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-light tracking-wide text-gray-800">
              {activeTab === "login" ? t.welcomeBack : t.createAccount}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 font-light">
              {activeTab === "login" 
                ? "Войдите в свой аккаунт"
                : "Создайте новый аккаунт"
              }
            </DialogDescription>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 p-2 rounded-xl border shadow-inner">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-gray-200 font-medium text-gray-700 rounded-lg transition-all duration-200"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              {t.login}
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-gray-200 font-medium text-gray-700 rounded-lg transition-all duration-200"
            >
              <Icon name="UserPlus" size={16} className="mr-2" />
              {t.register}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                  Email или телефон
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="Mail" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Введите email или телефон"
                    value={loginForm.identifier}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, identifier: e.target.value })
                    }
                    className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                  {t.password}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="Lock" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Введите пароль"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                  />
                </div>
              </div>
              
              <Button
                onClick={handleLogin}
                className="w-full h-12 bg-gradient-to-r from-vintage-chocolate to-vintage-dark-brown hover:from-vintage-dark-brown hover:to-vintage-chocolate text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={!loginForm.identifier || !loginForm.password}
              >
                <Icon name="LogIn" size={18} className="mr-2" />
                {t.login}
              </Button>
              
              <div className="text-center pt-2">
                <Button variant="link" className="text-sm text-gray-500 hover:text-vintage-chocolate">
                  Забыли пароль?
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-6 mt-6">
            <div className="space-y-4">
              {/* Registration Method */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Способ регистрации
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={authForm.registrationMethod === "email" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "email" })}
                    className={authForm.registrationMethod === "email" ? "bg-vintage-chocolate hover:bg-vintage-dark-brown" : ""}
                  >
                    <Icon name="Mail" size={16} className="mr-1" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={authForm.registrationMethod === "phone" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "phone" })}
                    className={authForm.registrationMethod === "phone" ? "bg-vintage-chocolate hover:bg-vintage-dark-brown" : ""}
                  >
                    <Icon name="Phone" size={16} className="mr-1" />
                    Телефон
                  </Button>
                  <Button
                    type="button"
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
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  {t.name}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="User" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Введите ваше имя"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                  />
                </div>
              </div>

              {/* Dynamic primary field */}
              {authForm.registrationMethod === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t.email}
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="Mail" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.enterEmail}
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                    />
                  </div>
                </div>
              )}

              {authForm.registrationMethod === "phone" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    {t.phone}
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="Phone" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t.enterPhone}
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                      className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                    />
                  </div>
                </div>
              )}

              {authForm.registrationMethod === "telegram" && (
                <div className="space-y-2">
                  <Label htmlFor="telegram" className="text-sm font-medium text-gray-700">
                    {t.telegram}
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="MessageCircle" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="telegram"
                      type="text"
                      placeholder={t.enterTelegram}
                      value={authForm.telegram}
                      onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                      className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t.password}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="Lock" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Создайте пароль"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  {t.confirmPassword}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="ShieldCheck" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    className="h-12 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 bg-white shadow-sm"
                  />
                  {authForm.confirmPassword && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      {authForm.password === authForm.confirmPassword ? (
                        <Icon name="CheckCircle" size={18} className="text-green-500" />
                      ) : (
                        <Icon name="XCircle" size={18} className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleRegister}
                className="w-full h-12 bg-gradient-to-r from-vintage-chocolate to-vintage-dark-brown hover:from-vintage-dark-brown hover:to-vintage-chocolate text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}