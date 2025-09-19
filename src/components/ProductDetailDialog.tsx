import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  sale: string;
  addToCart: string;
  quickOrder: string;
  [key: string]: string;
}

interface ProductDetailDialogProps {
  isProductDialogOpen: boolean;
  setIsProductDialogOpen: (value: boolean) => void;
  selectedProduct: Product | null;
  t: Language;
  addToCart: (product: Product) => void;
  setIsOrderDialogOpen: (value: boolean) => void;
}

export default function ProductDetailDialog({
  isProductDialogOpen,
  setIsProductDialogOpen,
  selectedProduct,
  t,
  addToCart,
  setIsOrderDialogOpen,
}: ProductDetailDialogProps) {
  return (
    <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {selectedProduct && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedProduct.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large Product Image */}
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 md:h-[500px] object-cover rounded-lg"
                />
                {selectedProduct.originalPrice && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    {t.sale}
                  </Badge>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-bold text-vintage-red">
                      {selectedProduct.price.toLocaleString()} ₽
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {selectedProduct.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {selectedProduct.description}
                  </p>
                </div>

                <Separator />

                {/* Product Specifications */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Характеристики</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Категория:</span>
                      <p className="text-muted-foreground">
                        {selectedProduct.category}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Стиль:</span>
                      <p className="text-muted-foreground">
                        {selectedProduct.style}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Материал:</span>
                      <p className="text-muted-foreground">
                        {selectedProduct.material}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Размер:</span>
                      <p className="text-muted-foreground">
                        {selectedProduct.size}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(selectedProduct);
                      setIsProductDialogOpen(false);
                    }}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    {t.addToCart}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(selectedProduct);
                      setIsProductDialogOpen(false);
                      setIsOrderDialogOpen(true);
                    }}
                  >
                    <Icon name="Zap" size={20} className="mr-2" />
                    {t.quickOrder}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}