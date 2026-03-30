type Food = {
  id: number;
  name: string;
  price: string;
  foodCategoryId: number;
  createdAt: string;
  updatedAt: string;
};

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  foods: Food[];
};
