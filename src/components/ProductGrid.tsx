import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ProductCard from "./ProductCard";
import { Product, Language } from "@/types";

interface ProductGridProps {
  t: Language;
  filteredProducts: Product[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  addToCart: (product: Product) => void;
  openProductDetails: (product: Product) => void;
}

export default function ProductGrid({
  t,
  filteredProducts,
  sortBy,
  setSortBy,
  addToCart,
  openProductDetails,
}: ProductGridProps) {
  return (
    <section className="py-16" id="products">
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
                <SelectItem value="price-low-high">{t.priceLowHigh}</SelectItem>
                <SelectItem value="price-high-low">{t.priceHighLow}</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
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
            <ProductCard
              key={product.id}
              product={product}
              t={t}
              addToCart={addToCart}
              openProductDetails={openProductDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}