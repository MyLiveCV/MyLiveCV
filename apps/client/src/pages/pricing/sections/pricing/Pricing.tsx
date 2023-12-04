import { useProducts } from "@/client/services/stripe/product";

import { SingleProduct } from "../cards/SingleProduct";

export const Pricing = () => {
  const { products, error, loading } = useProducts();

  if (!products || products.length === 0) {
    return null;
  }

  return <SingleProduct product={products[0]} />;
};