import getAllCategories from "@/APIs/AllCategories.api";
import CategoriesSwipper from "../CategoriesSwipper/CategoriesSwipper";

export default async function CategoriesSlider() {
  const data = await getAllCategories();
  return (
    <>
      <CategoriesSwipper categories={data} />
    </>
  );
}
