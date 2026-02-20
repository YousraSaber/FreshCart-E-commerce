export default async function getAllProducts() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");

  //if i need to get error message from backend
  
  // if(!res.ok){
  //   const msg = await res.json()
  //   throw new Error(msg.message)
  // }

  const { data } = await res.json();

  return data;
}
