import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <DialogContent className="max-w-lg border-0 p-0 bg-transparent shadow-none overflow-hidden">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Декоративный фон */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* Контент */}
          <div className="relative z-10 p-8">
            {/* Заголовок с иконкой */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
                <Icon 
                  name={activeTab === "login" ? "Crown" : "Sparkles"} 
                  size={32} 
                  className="text-white" 
                />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-2">
                ВИНТАЖНАЯ КОЛЛЕКЦИЯ
              </h2>
              <p className="text-gray-600 font-light">
                {activeTab === "login" ? "Войти в аккаунт" : "Создать аккаунт"}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/50 backdrop-blur-sm p-2 rounded-2xl border shadow-sm">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-0 font-semibold rounded-xl transition-all duration-300 data-[state=active]:scale-105"
                >
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Вход
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-0 font-semibold rounded-xl transition-all duration-300 data-[state=active]:scale-105"
                >
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Регистрация
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <div className="space-y-5">
                  <div className="group">
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Email или телефон
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon name="User" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Введите email или телефон"
                        value={loginForm.identifier}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, identifier: e.target.value })
                        }
                        className="h-14 pl-14 pr-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder:text-gray-400 transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Пароль
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon name="Lock" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                      </div>
                      <Input
                        type="password"
                        placeholder="Введите пароль"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, password: e.target.value })
                        }
                        className="h-14 pl-14 pr-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder:text-gray-400 transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleLogin}
                    disabled={!loginForm.identifier || !loginForm.password}
                    className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Icon name="Sparkles" size={20} className="mr-3" />
                    Войти в коллекцию
                  </Button>
                  
                  <div className="text-center">
                    <Button variant="link" className="text-amber-600 hover:text-orange-600 font-medium">
                      Забыли пароль?
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <div className="space-y-5">
                  {/* Способ регистрации */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Способ регистрации
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { key: "email", icon: "Mail", label: "Email" },
                        { key: "phone", icon: "Phone", label: "Телефон" },
                        { key: "telegram", icon: "MessageCircle", label: "Telegram" }
                      ].map(({ key, icon, label }) => (
                        <Button
                          key={key}
                          type="button"
                          variant={authForm.registrationMethod === key ? "default" : "outline"}
                          onClick={() => setAuthForm({ ...authForm, registrationMethod: key as any })}
                          className={`h-12 font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
                            authForm.registrationMethod === key 
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
                              : "border-2 border-gray-200 hover:border-amber-300"
                          }`}
                        >
                          <Icon name={icon as any} size={16} className="mr-2" />
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Имя */}
                  <div className="group">
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Ваше имя
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon name="User" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Как к вам обращаться?"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                        className="h-14 pl-14 pr-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder:text-gray-400 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Динамическое поле */}
                  {authForm.registrationMethod === "email" && (
                    <div className="group">
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Email адрес
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icon name="Mail" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        </div>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={authForm.email}
                          onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                          className="h-14 pl-14 pr-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder:text-gray-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}

                  {authForm.registrationMethod === "phone" && (
                    <div className="group">
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Номер телефона
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icon name="Phone" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        </div>
                        <Input
                          type="tel"
                          placeholder="+7 900 123-45-67"
                          value={authForm.phone}
                          onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                          className="h-14 pl-14 pr-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder:text-gray-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}

                  {authForm.registrationMethod === "telegram" && (
                    <div className="group">
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Telegram
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icon name="MessageCircle" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        </div>
                        <Input
                          type="text"
                          placeholder="@username"
                          value={authForm.telegram}
                          onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                          className="h-14 pl-14 pr-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder:text-gray-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}

                  {/* Пароли */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Пароль
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icon name="Lock" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        </div>
                        <Input
                          type="password"
                          placeholder="Минимум 6 символов"
                          value={authForm.password}
                          onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                          className="h-14 pl-14 pr-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm font-medium placeholder:text-gray-400 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Повторите пароль
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icon name="Shield" size={20} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        </div>
                        <Input
                          type="password"
                          placeholder="Повторите пароль"
                          value={authForm.confirmPassword}
                          onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                          className="h-14 pl-14 pr-12 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-white/80 backdrop-blur-sm font-medium placeholder:text-gray-400 transition-all duration-200"
                        />
                        {authForm.confirmPassword && (
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            {authForm.password === authForm.confirmPassword && authForm.password.length >= 6 ? (
                              <Icon name="CheckCircle" size={20} className="text-green-500" />
                            ) : (
                              <Icon name="XCircle" size={20} className="text-red-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={
                      !authForm.name ||
                      !authForm.password ||
                      authForm.password !== authForm.confirmPassword ||
                      authForm.password.length < 6 ||
                      (authForm.registrationMethod === "email" && !authForm.email) ||
                      (authForm.registrationMethod === "phone" && !authForm.phone) ||
                      (authForm.registrationMethod === "telegram" && !authForm.telegram)
                    }
                    className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Icon name="Crown" size={20} className="mr-3" />
                    Присоединиться к коллекции
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}