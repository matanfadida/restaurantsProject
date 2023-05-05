import Cookies from "js-cookie";

export async function fetchProductFromCookie() {
  const cartCookie = JSON.parse(Cookies.get("cart"));
  let newArrayItems = [];
  let updateTotalAmount = 0;

  const response = await fetch("/api");
  if (!response.ok) {
    throw new Error("Request failed!");
  }
  const result = await response.json();
  cartCookie.forEach((item) => {
    let productExisting = result.find((product) => product._id === item.id);
    if (productExisting !== undefined) {
      newArrayItems = [
        ...newArrayItems.concat({
          id: item.id,
          guid_id: item.guid_id,
          detail: productExisting.detail,
          image: productExisting.image,
          name: productExisting.name,
          price: productExisting.price,
          rating: productExisting.rating,
          remark: item.remark,
          amount: item.amount,
          status:"נשלח לטבח",
          counterRating: productExisting.counterRating,
          category: productExisting.category,
        }),
      ];
      updateTotalAmount += productExisting.price * item.amount;
    }
  });

  return { newArrayItems, updateTotalAmount };
}