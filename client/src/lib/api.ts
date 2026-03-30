export default async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:3001/categories");
  const data = await res.json();
  return data;
}
