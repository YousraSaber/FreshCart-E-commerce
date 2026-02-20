import { Category2 } from "@/types/subCategory";


export async function getSpecificCategory(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  );

  const { data } = await res.json();
  console.log(data)
  
  const filteredData = data.filter((item :Category2) => item.category === id);

  return filteredData;
}
