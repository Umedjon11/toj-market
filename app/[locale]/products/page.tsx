import Filters from "@/components/products/filters"
import ProductsList from "@/components/products/productsList"

const Products = () => {
  return (
    <main className="flex flex-col sm:flex-row sm:gap-[2%] gap-y-[4vh] items-start w-[95%] m-[0_auto] pb-[15vh] bg-[#F7F8F9] dark:bg-black">
        <Filters />
        <ProductsList />
    </main>
  )
}

export default Products