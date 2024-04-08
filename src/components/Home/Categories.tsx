import CategoryItem from "../shared/CategoryItem";
import { Category } from "../../types/Category";

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/categories`);
  const data: Category[] = await res.json();
  return data;
};

export default async function Categories() {
  const categories = await getCategories();
  const availableTurn =
    new Date().toLocaleTimeString(["en-GB"], {
      hour: "2-digit",
      minute: "2-digit",
    }) >= "17:00";
  return (
    <>
      {availableTurn && (
        <h4 className="text-red-600 text-center font-semibold px-1 mb-2 text-2xl">
          No hay turnos disponibles
        </h4>
      )}
      <h3 className="text-fontColor font-semibold px-1 mb-2">Categorias</h3>
      {categories.map((category) => {
        if (!category.services.length) return null;
        return <CategoryItem category={category} key={category.id} />;
      })}
    </>
  );
}
