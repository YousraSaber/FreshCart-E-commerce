export async function getProductsOfSpecificBrand(id :string){
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
    const {data} = await res.json()

    return data;
}