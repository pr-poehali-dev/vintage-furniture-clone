import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Product, Language } from "@/types";

interface ProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  t: Language;
  addToCart: (product: Product) => void;
  setIsOrderDialogOpen: (open: boolean) => void;
}

export default function ProductDialog({
  isOpen,
  onOpenChange,
  product,
  t,
  addToCart,
  setIsOrderDialogOpen,
}: ProductDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded"
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString()} ₽
                    </span>
                    <Badge variant="destructive">{t.sale}</Badge>
                  </>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">
                  Категория:
                </span>
                <p>{product.category}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Стиль:
                </span>
                <p>{product.style}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Материал:
                </span>
                <p>{product.material}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Размер:
                </span>
                <p>{product.size}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => {
                  addToCart(product);
                  onOpenChange(false);
                }}
              >
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                {t.addToCart}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  onOpenChange(false);
                  setIsOrderDialogOpen(true);
                }}
              >
                <Icon name="Zap" size={16} className="mr-2" />
                {t.quickOrder}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}