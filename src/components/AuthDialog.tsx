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
      <DialogContent className="max-w-xl border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white">
        <DialogHeader className="text-center space-y-6 pb-8">
          <div className="mx-auto">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-vintage-chocolate to-vintage-dark-brown rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Icon 
                name={activeTab === "login" ? "Crown" : "Sparkles"} 
                size={28} 
                className="text-white" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <DialogTitle className="text-3xl font-light tracking-wide text-gray-800">
              {activeTab === "login" ? "Welcome Back" : "Join Our Exclusive Club"}
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600 font-light leading-relaxed">
              {activeTab === "login" 
                ? "Access your curated collection of luxury furniture"
                : "Experience the finest in European craftsmanship"
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
              <Icon name="KeyRound" size={18} className="mr-2" />
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-gray-200 font-medium text-gray-700 rounded-lg transition-all duration-200"
            >
              <Icon name="Gem" size={18} className="mr-2" />
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-8 mt-8">
            {/* Elegant Login Benefits */}
            <div className="relative overflow-hidden bg-gradient-to-r from-vintage-chocolate/5 via-vintage-chocolate/3 to-vintage-chocolate/5 p-6 rounded-2xl border border-vintage-chocolate/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vintage-chocolate/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <h4 className="font-light text-lg text-gray-800 mb-4 flex items-center">
                  <Icon name="Crown" size={20} className="mr-3 text-vintage-chocolate" />
                  Member Privileges
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vintage-chocolate/10 rounded-full flex items-center justify-center">
                      <Icon name="ShoppingBag" size={14} className="text-vintage-chocolate" />
                    </div>
                    <span className="text-sm text-gray-600">Saved Collections</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vintage-chocolate/10 rounded-full flex items-center justify-center">
                      <Icon name="Clock" size={14} className="text-vintage-chocolate" />
                    </div>
                    <span className="text-sm text-gray-600">Order Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vintage-chocolate/10 rounded-full flex items-center justify-center">
                      <Icon name="Heart" size={14} className="text-vintage-chocolate" />
                    </div>
                    <span className="text-sm text-gray-600">Wishlist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vintage-chocolate/10 rounded-full flex items-center justify-center">
                      <Icon name="Zap" size={14} className="text-vintage-chocolate" />
                    </div>
                    <span className="text-sm text-gray-600">Early Access</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="identifier" className="text-sm font-medium text-gray-700 tracking-wide">
                  Email or Phone
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="Mail" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={loginForm.identifier}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, identifier: e.target.value })
                    }
                    className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="login-password" className="text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="KeyRound" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
                  />
                </div>
              </div>
              
              <Button
                onClick={handleLogin}
                className="w-full h-14 bg-gradient-to-r from-vintage-chocolate to-vintage-dark-brown hover:from-vintage-dark-brown hover:to-vintage-chocolate text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base"
                disabled={!loginForm.identifier || !loginForm.password}
              >
                <Icon name="Sparkles" size={20} className="mr-3" />
                Sign In to Your Account
              </Button>
              
              <div className="text-center pt-4">
                <Button variant="link" className="text-sm text-gray-500 hover:text-vintage-chocolate font-light">
                  Forgot your password?
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-8 mt-8">
            {/* Luxury Registration Benefits */}
            <div className="relative overflow-hidden bg-gradient-to-br from-vintage-chocolate via-vintage-dark-brown to-vintage-chocolate p-8 rounded-3xl text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Icon name="Crown" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-light">Exclusive Membership</h4>
                    <p className="text-white/80 text-sm">Join our distinguished clientele</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <Icon name="Gift" size={18} className="mr-4 text-yellow-300" />
                    <div>
                      <span className="font-medium">Welcome Gift</span>
                      <p className="text-white/80 text-sm">15% off your inaugural purchase</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Sparkles" size={18} className="mr-4 text-blue-300" />
                    <div>
                      <span className="font-medium">VIP Access</span>
                      <p className="text-white/80 text-sm">Exclusive previews & limited editions</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Award" size={18} className="mr-4 text-green-300" />
                    <div>
                      <span className="font-medium">Loyalty Rewards</span>
                      <p className="text-white/80 text-sm">Earn points with every purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Elegant Registration Method */}
              <div className="space-y-4">
                <Label className="text-base font-light text-gray-700 tracking-wide">
                  Preferred Contact Method
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "email" })}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      authForm.registrationMethod === "email"
                        ? "border-vintage-chocolate bg-vintage-chocolate/5 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        authForm.registrationMethod === "email"
                          ? "bg-vintage-chocolate text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon name="Mail" size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "phone" })}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      authForm.registrationMethod === "phone"
                        ? "border-vintage-chocolate bg-vintage-chocolate/5 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        authForm.registrationMethod === "phone"
                          ? "bg-vintage-chocolate text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon name="Phone" size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Phone</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setAuthForm({ ...authForm, registrationMethod: "telegram" })}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      authForm.registrationMethod === "telegram"
                        ? "border-vintage-chocolate bg-vintage-chocolate/5 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        authForm.registrationMethod === "telegram"
                          ? "bg-vintage-chocolate text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon name="MessageCircle" size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Telegram</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="mx-4 text-xs text-gray-400 font-light tracking-widest">PERSONAL DETAILS</div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              {/* Name */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 tracking-wide">
                  Full Name
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="User" size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
                  />
                </div>
              </div>

              {/* Dynamic primary field */}
              {authForm.registrationMethod === "email" && (
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide">
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="Mail" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@domain.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
                    />
                  </div>
                </div>
              )}

              {authForm.registrationMethod === "phone" && (
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 tracking-wide">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="Phone" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                      className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
                    />
                  </div>
                </div>
              )}

              {authForm.registrationMethod === "telegram" && (
                <div className="space-y-3">
                  <Label htmlFor="telegram" className="text-sm font-medium text-gray-700 tracking-wide">
                    Telegram Username
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="MessageCircle" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="telegram"
                      type="text"
                      placeholder="@username"
                      value={authForm.telegram}
                      onChange={(e) => setAuthForm({ ...authForm, telegram: e.target.value })}
                      className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
                    />
                  </div>
                </div>
              )}



              {/* Password Section */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  <div className="mx-4 text-xs text-gray-400 font-light tracking-widest">SECURITY</div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 tracking-wide">
                    Create Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="Lock" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 tracking-wide">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="ShieldCheck" size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={authForm.confirmPassword}
                      onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                      className="h-14 pl-12 rounded-xl border-gray-200 focus:border-vintage-chocolate focus:ring-vintage-chocolate/20 text-base bg-white shadow-sm"
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
              </div>

              {/* Terms and Register Button */}
              <div className="space-y-6 pt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <Button variant="link" className="h-auto p-0 text-xs text-vintage-chocolate hover:text-vintage-dark-brown underline-offset-2">
                      Terms of Service
                    </Button>
                    {" "}and{" "}
                    <Button variant="link" className="h-auto p-0 text-xs text-vintage-chocolate hover:text-vintage-dark-brown underline-offset-2">
                      Privacy Policy
                    </Button>
                  </p>
                </div>
                
                <Button
                  onClick={handleRegister}
                  className="w-full h-16 bg-gradient-to-r from-vintage-chocolate to-vintage-dark-brown hover:from-vintage-dark-brown hover:to-vintage-chocolate text-white font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
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
                  <Icon name="Crown" size={22} className="mr-3" />
                  Join Our Exclusive Club
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}