import getCategories from "@/lib/api";

export default async function FoodCategories() {
  const categories = await getCategories();

  return (
    <div>
      {categories?.map((category) => (
        <div key={category.id}>
          <h1>{category.name}</h1>
          <div>
            {category.foods.map((food) => {
              return (
                <div key={food.id}>
                  {food.name} - {food.price}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
