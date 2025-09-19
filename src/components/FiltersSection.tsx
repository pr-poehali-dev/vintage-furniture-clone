import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface FiltersSectionProps {
  searchTerm: string;
  handleSearchChange: (value: string) => void;
  selectedStyle: string;
  setSelectedStyle: (value: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (value: string) => void;
  selectedSize: string;
  setSelectedSize: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  resetFilters: () => void;
}

export default function FiltersSection({
  searchTerm,
  handleSearchChange,
  selectedStyle,
  setSelectedStyle,
  selectedMaterial,
  setSelectedMaterial,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  resetFilters,
}: FiltersSectionProps) {
  return (
    <section className="py-6 border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div>
            <label className="text-sm font-medium mb-2 block">Поиск</label>
            <Input
              placeholder="Найти мебель..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
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
                <SelectItem value="Викторианский">Викторианский</SelectItem>
                <SelectItem value="Людовик XVI">Людовик XVI</SelectItem>
                <SelectItem value="Шиппендейл">Шиппендейл</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Материал</label>
            <Select
              value={selectedMaterial}
              onValueChange={setSelectedMaterial}
            >
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