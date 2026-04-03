export async function getCategories(): Promise<Category[]> {
  const res = await fetch("https://foodelivery-3w6c.vercel.app/categories");
  const data = await res.json();
  return data;
}
export async function createCategory(name: string): Promise<Category> {
  const res = await fetch("https://foodelivery-3w6c.vercel.app/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return data;
}
