export default function DishesCard({ food }: { food: Food }) {
  return (
    <div className="w-[270px] h-[240px] rounded-md border  shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{food.name}</h3>
      <p className="text-gray-500 mt-2">{food.price}₮</p>
    </div>
  );
}
