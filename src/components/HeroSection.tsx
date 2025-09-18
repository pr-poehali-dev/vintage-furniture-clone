import { Button } from "@/components/ui/button";
import { Language } from "@/types";

interface HeroSectionProps {
  t: Language;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const scrollToProducts = () => {
    const productsSection = document.querySelector("#products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-vintage-wheat to-vintage-cream">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/img/a5e41cb3-6702-483d-aaf0-a74525f501f4.jpg')",
        }}
      />
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-vintage-dark-brown tracking-wider">
          {t.heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-vintage-brown max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>
        <Button
          size="lg"
          className="bg-vintage-dark-brown hover:bg-vintage-brown text-vintage-wheat px-8 py-4 text-lg font-medium tracking-wide transition-all duration-300"
          onClick={scrollToProducts}
        >
          {t.shopNow}
        </Button>
      </div>
    </section>
  );
}