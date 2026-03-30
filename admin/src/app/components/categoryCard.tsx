import { getCategories } from "@/lib/api";
import DishesCard from "./dishCard";

export const CategoryCard = async () => {
  const categories = await getCategories();
  console.log(categories);

  // const MongolianCategory = categories.find((cat: any) => cat.id === 2);

  return (
    <div className="flex flex-col gap-5">
      {categories.map((category) => {
        return (
          <div key={category.id} className="w-[1171px] rounded-md bg-white">
            <p>{category.name}</p>
            <div className=" p-4  flex gap-2 items-center " key={category.id}>
              {category.foods.map((food) => {
                return <DishesCard key={food.id} food={food} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
