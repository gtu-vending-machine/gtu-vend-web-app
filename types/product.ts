export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export type ProductListItem = Product;

export type ProductQueryResponse = {
  products: ProductListItem[];
  _count: number;
};

export type CreateProductPayload = Pick<Product, 'name' | 'price' | 'image'>;

export type UpdateProductPayload = Partial<CreateProductPayload>;
