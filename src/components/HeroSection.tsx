import { Button } from "@/components/ui/button";

interface Language {
  heroTitle: string;
  heroSubtitle: string;
  shopNow: string;
  [key: string]: string;
}

interface HeroSectionProps {
  t: Language;
}

export default function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="py-16 lg:py-20 pt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-6xl font-normal text-foreground mb-6 tracking-tight">
          {t.heroTitle}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto font-light">
          {t.heroSubtitle}
        </p>
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium tracking-wider"
        >
          {t.shopNow}
        </Button>
      </div>
    </section>
  );
}