import { CategoryCard } from "../components/categoryCard";
import DishesCategory from "../components/dishesCategories";

export default function FoodMenuPage() {
  return (
    <div className="flex">
      <main className="mx-6">
        <DishesCategory />
        <CategoryCard />
      </main>
    </div>
  );
}
