import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  items: string;
  sortBy: string;
  default: string;
  name: string;
  priceLowHigh: string;
  priceHighLow: string;
  [key: string]: string;
}

interface ProductsGridProps {
  filteredProducts: Product[];
  t: Language;
  sortBy: string;
  setSortBy: (value: string) => void;
  openProductDetails: (product: Product) => void;
  addToCart: (product: Product) => void;
}

export default function ProductsGrid({
  filteredProducts,
  t,
  sortBy,
  setSortBy,
  openProductDetails,
  addToCart,
}: ProductsGridProps) {
  return (
    <section className="py-16">
      <div className="w-full px-0">
        <div className="flex justify-between items-center mb-12 px-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground tracking-wider">
              {filteredProducts.length} {t.items}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value);
              }}
            >
              <SelectTrigger className="w-40 h-8 text-xs border-none bg-transparent">
                <SelectValue placeholder={t.sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">{t.default}</SelectItem>
                <SelectItem value="name">{t.name}</SelectItem>
                <SelectItem value="price-low">{t.priceLowHigh}</SelectItem>
                <SelectItem value="price-high">{t.priceHighLow}</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Icon
                  name="Grid3X3"
                  size={16}
                  className="text-foreground/60"
                />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Icon name="List" size={16} className="text-foreground/60" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-0">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer border border-border/20 p-3 hover:border-border/40 transition-colors"
              onClick={() => openProductDetails(product)}
            >
              {/* Image Container - Larger Format */}
              <div className="relative overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[4/5] object-cover transition-all duration-500 ease-out group-hover:brightness-95"
                  />

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-foreground text-background text-xs px-2 py-1 font-normal tracking-wide">
                        SALE
                      </div>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="w-8 h-8 bg-background/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon
                        name="Heart"
                        size={14}
                        className="text-foreground"
                      />
                    </button>
                  </div>

                  {/* Quick Add - appears on hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                      className="w-full h-10 bg-foreground text-background text-xs font-normal tracking-wide hover:bg-foreground/90 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      ADD TO BAG
                    </button>
                  </div>

                  {/* Quick View Button */}
                  <div className="absolute inset-x-3 bottom-14 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                      className="w-full h-8 border border-background/60 text-background text-xs font-normal tracking-wide hover:bg-background/10 transition-colors backdrop-blur-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      QUICK VIEW
                    </button>
                  </div>

                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Product Info - Compact */}
              <div className="pt-3 space-y-2">
                <h3 className="text-sm font-light text-foreground tracking-wide leading-tight">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal text-foreground">
                    {product.price.toLocaleString()} ₽
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString()} ₽
                    </span>
                  )}
                </div>

                {/* Product Description - Shorter */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Премиальное качество и элегантный дизайн.
                </p>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}