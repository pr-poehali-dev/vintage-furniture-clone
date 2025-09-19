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
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-end">
          
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Поиск
            </label>
            <Input
              placeholder="Найти мебель..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border border-gray-200 rounded-lg h-11 px-4 
                         focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                         transition-colors duration-200
                         placeholder:text-gray-400"
            />
          </div>

          {/* Style */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Стиль
            </label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="border border-gray-200 rounded-lg h-11 px-4 
                                       focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                                       transition-colors duration-200">
                <SelectValue placeholder="Все стили" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                <SelectItem value="all" className="hover:bg-gray-50">Все стили</SelectItem>
                <SelectItem value="Английский" className="hover:bg-gray-50">Английский</SelectItem>
                <SelectItem value="Барокко" className="hover:bg-gray-50">Барокко</SelectItem>
                <SelectItem value="Ампир" className="hover:bg-gray-50">Ампир</SelectItem>
                <SelectItem value="Викторианский" className="hover:bg-gray-50">Викторианский</SelectItem>
                <SelectItem value="Людовик XVI" className="hover:bg-gray-50">Людовик XVI</SelectItem>
                <SelectItem value="Шиппендейл" className="hover:bg-gray-50">Шиппендейл</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Material */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Материал
            </label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger className="border border-gray-200 rounded-lg h-11 px-4 
                                       focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                                       transition-colors duration-200">
                <SelectValue placeholder="Все материалы" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                <SelectItem value="all" className="hover:bg-gray-50">Все материалы</SelectItem>
                <SelectItem value="Дуб" className="hover:bg-gray-50">Дуб</SelectItem>
                <SelectItem value="Махагон" className="hover:bg-gray-50">Махагон</SelectItem>
                <SelectItem value="Орех" className="hover:bg-gray-50">Орех</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Размер
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="border border-gray-200 rounded-lg h-11 px-4 
                                       focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                                       transition-colors duration-200">
                <SelectValue placeholder="Все размеры" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                <SelectItem value="all" className="hover:bg-gray-50">Все размеры</SelectItem>
                <SelectItem value="Малый" className="hover:bg-gray-50">Малый</SelectItem>
                <SelectItem value="Средний" className="hover:bg-gray-50">Средний</SelectItem>
                <SelectItem value="Большой" className="hover:bg-gray-50">Большой</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Цена (₽)
            </label>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                min={0}
                step={5000}
                className="w-full mb-3"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>{priceRange[0].toLocaleString()}</span>
                <span>{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={resetFilters} 
              className="border border-gray-300 rounded-lg px-4 h-11
                         hover:bg-gray-900 hover:text-white hover:border-gray-900 
                         transition-colors duration-200"
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Сбросить
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}