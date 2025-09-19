import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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

interface Language {
  siteName: string;
  shop: string;
  collections: string;
  about: string;
  contact: string;
  [key: string]: string;
}

interface HeaderProps {
  t: Language;
  language: string;
  setLanguage: (value: string) => void;
  languages: Array<{ code: string; name: string; flag: string }>;
  searchTerm: string;
  handleSearchChange: (value: string) => void;
  searchSuggestions: Product[];
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  setSearchTerm: (value: string) => void;
  setSearchSuggestions: (value: Product[]) => void;
  handleSearchSelect: (product: Product) => void;
  user: any;
  setIsProfileDialogOpen: (value: boolean) => void;
  setIsAuthDialogOpen: (value: boolean) => void;
  getTotalItems: () => number;
  setIsCartOpen: (value: boolean) => void;
  searchRef: React.RefObject<HTMLDivElement>;
}

export default function Header({
  t,
  language,
  setLanguage,
  languages,
  searchTerm,
  handleSearchChange,
  searchSuggestions,
  isSearchOpen,
  setIsSearchOpen,
  setSearchTerm,
  setSearchSuggestions,
  handleSearchSelect,
  user,
  setIsProfileDialogOpen,
  setIsAuthDialogOpen,
  getTotalItems,
  setIsCartOpen,
  searchRef,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/20 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <h1 className="text-xl font-normal tracking-wider text-foreground">
              {t.siteName}
            </h1>
            <nav className="hidden lg:flex space-x-8">
              <a
                href="#"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
              >
                {t.shop}
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
              >
                {t.collections}
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
              >
                {t.about}
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
              >
                {t.contact}
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-5">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-16 h-8 border-none bg-transparent p-0 focus:ring-0">
                <SelectValue>
                  <span className="text-lg">
                    {languages.find((lang) => lang.code === language)?.flag}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem
                    key={lang.code}
                    value={lang.code}
                    className="flex items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Smart Search with Autocomplete */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск мебели..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchTerm && setIsSearchOpen(true)}
                  className="w-64 h-8 pl-8 pr-4 border-border/20 rounded-full text-sm placeholder:text-muted-foreground/60"
                />
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-2.5 top-2 text-muted-foreground/60"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-0.5 h-6 w-6 p-0 hover:bg-muted/50"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchSuggestions([]);
                      setIsSearchOpen(false);
                    }}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {isSearchOpen && searchSuggestions.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-background border border-border/20 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  <div className="p-2 text-xs text-muted-foreground border-b border-border/10">
                    Найдено {searchSuggestions.length} товаров
                  </div>
                  {searchSuggestions.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer border-b border-border/5 last:border-b-0"
                      onClick={() => handleSearchSelect(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {product.category} • {product.style}
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-1">
                          {product.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <Icon
                        name="ArrowRight"
                        size={14}
                        className="text-muted-foreground"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile/Auth Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => user ? setIsProfileDialogOpen(true) : setIsAuthDialogOpen(true)}
              className="relative h-8 w-8 p-0 hover:bg-transparent"
            >
              <Icon
                name="User"
                size={18}
                className="text-foreground/80"
              />
              {user && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500">
                </span>
              )}
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative h-8 w-8 p-0 hover:bg-transparent"
            >
              <Icon
                name="ShoppingBag"
                size={18}
                className="text-foreground/80"
              />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}