import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { Language } from "@/types";

interface FiltersProps {
  t: Language;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (material: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  resetFilters: () => void;
}

export default function Filters({
  t,
  selectedCategory,
  setSelectedCategory,
  selectedStyle,
  setSelectedStyle,
  selectedMaterial,
  setSelectedMaterial,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  resetFilters,
}: FiltersProps) {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Категория</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Все категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="Кресла">Кресла</SelectItem>
                <SelectItem value="Столы">Столы</SelectItem>
                <SelectItem value="Шкафы">Шкафы</SelectItem>
                <SelectItem value="Комоды">Комоды</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Стиль</label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Все стили" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все стили</SelectItem>
                <SelectItem value="Английский">Английский</SelectItem>
                <SelectItem value="Барокко">Барокко</SelectItem>
                <SelectItem value="Ампир">Ампир</SelectItem>
                <SelectItem value="Рококо">Рококо</SelectItem>
                <SelectItem value="Чиппендейл">Чиппендейл</SelectItem>
                <SelectItem value="Модерн">Модерн</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Материал</label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Все материалы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все материалы</SelectItem>
                <SelectItem value="Дуб">Дуб</SelectItem>
                <SelectItem value="Махагон">Махагон</SelectItem>
                <SelectItem value="Орех">Орех</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Размер</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Все размеры" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все размеры</SelectItem>
                <SelectItem value="Малый">Малый</SelectItem>
                <SelectItem value="Средний">Средний</SelectItem>
                <SelectItem value="Большой">Большой</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Цена (₽)</label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{priceRange[0].toLocaleString()}</span>
                <span>{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={resetFilters} size="sm">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}