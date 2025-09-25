import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <DialogContent className="max-w-sm p-0 border-0 bg-white shadow-lg">
        <div className="p-8">

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-50 p-1 rounded-none border-b border-gray-100">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:rounded-none font-medium text-sm uppercase tracking-wide"
              >
                ВХОД
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:rounded-none font-medium text-sm uppercase tracking-wide"
              >
                РЕГИСТРАЦИЯ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="EMAIL ИЛИ ТЕЛЕФОН"
                    value={loginForm.identifier}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, identifier: e.target.value })
                    }
                    className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                  />
                </div>
                
                <div>
                  <Input
                    type="password"
                    placeholder="ПАРОЛЬ"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                  />
                </div>
                
                <div className="pt-4">
                  <Button
                    onClick={handleLogin}
                    disabled={!loginForm.identifier || !loginForm.password}
                    className="w-full h-12 bg-black hover:bg-gray-800 disabled:bg-gray-200 text-white font-medium text-sm uppercase tracking-wide rounded-none"
                  >
                    ВОЙТИ
                  </Button>
                </div>
                
                <div className="text-center pt-2">
                  <Button variant="link" className="text-xs text-gray-500 hover:text-black p-0 h-auto font-normal uppercase tracking-wide">
                    ЗАБЫЛИ ПАРОЛЬ?
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "email" })}
                    className={`h-10 text-xs font-medium uppercase tracking-wide transition-colors ${
                      authForm.registrationMethod === "email" 
                        ? "bg-black text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    EMAIL
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "phone" })}
                    className={`h-10 text-xs font-medium uppercase tracking-wide transition-colors ${
                      authForm.registrationMethod === "phone" 
                        ? "bg-black text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    ТЕЛЕФОН
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "telegram" })}
                    className={`h-10 text-xs font-medium uppercase tracking-wide transition-colors ${
                      authForm.registrationMethod === "telegram" 
                        ? "bg-black text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    TG
                  </button>
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="ИМЯ"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                  />
                </div>

                {authForm.registrationMethod === "email" && (
                  <div>
                    <Input
                      type="email"
                      placeholder="EMAIL"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                    />
                  </div>
                )}

                {authForm.registrationMethod === "phone" && (
                  <div>
                    <Input
                      type="tel"
                      placeholder="ТЕЛЕФОН"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                      className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                    />
                  </div>
                )}

                {authForm.registrationMethod === "telegram" && (
                  <div>
                    <Input
                      type="text"
                      placeholder="TELEGRAM"
                      value={authForm.telegram}
                      onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                      className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                    />
                  </div>
                )}

                <div>
                  <Input
                    type="password"
                    placeholder="ПАРОЛЬ"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="ПОВТОРИТЕ ПАРОЛЬ"
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    className="h-12 border-0 border-b border-gray-200 rounded-none bg-transparent px-0 focus:border-black focus:ring-0 placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-wide font-light"
                  />
                  {authForm.confirmPassword && (
                    <div className="text-xs mt-1 text-right">
                      {authForm.password === authForm.confirmPassword && authForm.password.length >= 6 ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4">
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
                    className="w-full h-12 bg-black hover:bg-gray-800 disabled:bg-gray-200 text-white font-medium text-sm uppercase tracking-wide rounded-none"
                  >
                    СОЗДАТЬ АККАУНТ
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}