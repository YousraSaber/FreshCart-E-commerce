import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";
import Main from "./_components/Main/Main";
import MainSlider from "./_components/MainSlider/MainSlider";
import Products from "./products/page";

export default function Home() {
  return (
    <>
      <Main />
      <MainSlider />
      <CategoriesSlider />
      <Products />
    </>
  );
}
