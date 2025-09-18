import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-vintage-dark-brown text-vintage-wheat py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">ВИНТАЖНАЯ МЕБЕЛЬ</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Уникальные предметы мебели с богатой историей, тщательно
              отреставрированные для современного дома.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  Кресла и стулья
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Столы и комоды
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Шкафы и витрины
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Аксессуары
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  О компании
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Возврат и обмен
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>+7 (495) 123-45-67</p>
              <p>info@vintage-furniture.ru</p>
              <div className="flex space-x-4 mt-4">
                <Icon
                  name="Instagram"
                  size={20}
                  className="hover:opacity-100 cursor-pointer"
                />
                <Icon
                  name="Facebook"
                  size={20}
                  className="hover:opacity-100 cursor-pointer"
                />
                <Icon
                  name="Twitter"
                  size={20}
                  className="hover:opacity-100 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-vintage-chocolate mt-8 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2024 Vintage Furniture. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}