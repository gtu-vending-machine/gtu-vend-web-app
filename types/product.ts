export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export type ProductListItem = Product;

export type ProductQueryResponse = {
  products: ProductListItem[];
  count: number;
};
