export async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:3001/categories");
  const data = await res.json();
  return data;
}
export async function createCategory(name: string): Promise<Category> {
  const res = await fetch("http://localhost:3001/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return data;
}
