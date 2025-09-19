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
    <section className="py-8 bg-gradient-to-r from-vintage-wheat/10 to-vintage-tan/10 border-y border-vintage-chocolate/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-vintage-dark-brown tracking-wide mb-2">
            НАЙТИ ИДЕАЛЬНУЮ МЕБЕЛЬ
          </h2>
          <div className="w-24 h-0.5 bg-vintage-chocolate mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
          {/* Search */}
          <div className="group">
            <label className="text-sm font-serif font-semibold mb-3 block text-vintage-dark-brown tracking-wider uppercase">
              🔍 Поиск
            </label>
            <div className="relative">
              <Input
                placeholder="Найти мебель..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="border-2 border-vintage-tan/40 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm 
                           focus:border-vintage-chocolate focus:ring-2 focus:ring-vintage-chocolate/20 
                           transition-all duration-300 hover:border-vintage-chocolate/60 
                           font-serif placeholder:text-vintage-tan placeholder:font-light"
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-vintage-chocolate/0 via-vintage-chocolate/40 to-vintage-chocolate/0 
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>

          {/* Style */}
          <div className="group">
            <label className="text-sm font-serif font-semibold mb-3 block text-vintage-dark-brown tracking-wider uppercase">
              🎨 Стиль
            </label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="border-2 border-vintage-tan/40 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm 
                                       focus:border-vintage-chocolate hover:border-vintage-chocolate/60 
                                       transition-all duration-300 font-serif">
                <SelectValue placeholder="Все стили" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-vintage-tan/40 bg-white/95 backdrop-blur-md">
                <SelectItem value="all" className="font-serif hover:bg-vintage-wheat/20">Все стили</SelectItem>
                <SelectItem value="Английский" className="font-serif hover:bg-vintage-wheat/20">🇬🇧 Английский</SelectItem>
                <SelectItem value="Барокко" className="font-serif hover:bg-vintage-wheat/20">👑 Барокко</SelectItem>
                <SelectItem value="Ампир" className="font-serif hover:bg-vintage-wheat/20">⚜️ Ампир</SelectItem>
                <SelectItem value="Викторианский" className="font-serif hover:bg-vintage-wheat/20">🎩 Викторианский</SelectItem>
                <SelectItem value="Людовик XVI" className="font-serif hover:bg-vintage-wheat/20">👸 Людовик XVI</SelectItem>
                <SelectItem value="Шиппендейл" className="font-serif hover:bg-vintage-wheat/20">🪑 Шиппендейл</SelectItem>
              </SelectContent>
            </Select>
            <div className="h-0.5 bg-gradient-to-r from-vintage-chocolate/0 via-vintage-chocolate/40 to-vintage-chocolate/0 
                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1"></div>
          </div>

          {/* Material */}
          <div className="group">
            <label className="text-sm font-serif font-semibold mb-3 block text-vintage-dark-brown tracking-wider uppercase">
              🌳 Материал
            </label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger className="border-2 border-vintage-tan/40 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm 
                                       focus:border-vintage-chocolate hover:border-vintage-chocolate/60 
                                       transition-all duration-300 font-serif">
                <SelectValue placeholder="Все материалы" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-vintage-tan/40 bg-white/95 backdrop-blur-md">
                <SelectItem value="all" className="font-serif hover:bg-vintage-wheat/20">Все материалы</SelectItem>
                <SelectItem value="Дуб" className="font-serif hover:bg-vintage-wheat/20">🌰 Дуб</SelectItem>
                <SelectItem value="Махагон" className="font-serif hover:bg-vintage-wheat/20">🍂 Махагон</SelectItem>
                <SelectItem value="Орех" className="font-serif hover:bg-vintage-wheat/20">🥜 Орех</SelectItem>
              </SelectContent>
            </Select>
            <div className="h-0.5 bg-gradient-to-r from-vintage-chocolate/0 via-vintage-chocolate/40 to-vintage-chocolate/0 
                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1"></div>
          </div>

          {/* Size */}
          <div className="group">
            <label className="text-sm font-serif font-semibold mb-3 block text-vintage-dark-brown tracking-wider uppercase">
              📏 Размер
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="border-2 border-vintage-tan/40 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm 
                                       focus:border-vintage-chocolate hover:border-vintage-chocolate/60 
                                       transition-all duration-300 font-serif">
                <SelectValue placeholder="Все размеры" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-vintage-tan/40 bg-white/95 backdrop-blur-md">
                <SelectItem value="all" className="font-serif hover:bg-vintage-wheat/20">Все размеры</SelectItem>
                <SelectItem value="Малый" className="font-serif hover:bg-vintage-wheat/20">📦 Малый</SelectItem>
                <SelectItem value="Средний" className="font-serif hover:bg-vintage-wheat/20">📋 Средний</SelectItem>
                <SelectItem value="Большой" className="font-serif hover:bg-vintage-wheat/20">📊 Большой</SelectItem>
              </SelectContent>
            </Select>
            <div className="h-0.5 bg-gradient-to-r from-vintage-chocolate/0 via-vintage-chocolate/40 to-vintage-chocolate/0 
                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1"></div>
          </div>

          {/* Price Range */}
          <div className="group">
            <label className="text-sm font-serif font-semibold mb-3 block text-vintage-dark-brown tracking-wider uppercase">
              💰 Цена (₽)
            </label>
            <div className="bg-white/80 backdrop-blur-sm border-2 border-vintage-tan/40 rounded-xl p-4 
                            hover:border-vintage-chocolate/60 transition-all duration-300">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                min={0}
                step={5000}
                className="w-full mb-3"
              />
              <div className="flex justify-between items-center text-xs font-serif font-medium">
                <div className="bg-vintage-chocolate/10 px-2 py-1 rounded-lg">
                  <span className="text-vintage-dark-brown">{priceRange[0].toLocaleString()}</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-vintage-tan to-vintage-chocolate mx-2"></div>
                <div className="bg-vintage-chocolate/10 px-2 py-1 rounded-lg">
                  <span className="text-vintage-dark-brown">{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-vintage-chocolate/0 via-vintage-chocolate/40 to-vintage-chocolate/0 
                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1"></div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={resetFilters} 
              className="border-2 border-vintage-chocolate/60 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 
                         hover:bg-vintage-chocolate hover:text-white hover:border-vintage-chocolate 
                         transition-all duration-300 font-serif font-semibold tracking-wide
                         transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Icon name="RotateCcw" size={18} className="mr-2" />
              ✨ Сбросить фильтры
            </Button>
          </div>
        </div>

        {/* Filter Status Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-vintage-chocolate/10 px-4 py-2 rounded-full">
            <Icon name="Filter" size={16} className="text-vintage-chocolate" />
            <span className="text-sm font-serif text-vintage-dark-brown">
              Активные фильтры: {[
                searchTerm && 'поиск',
                selectedStyle !== 'all' && 'стиль',
                selectedMaterial !== 'all' && 'материал',
                selectedSize !== 'all' && 'размер',
                (priceRange[0] > 0 || priceRange[1] < 100000) && 'цена'
              ].filter(Boolean).length || 'нет'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}