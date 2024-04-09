'use client';
import ProductTable from '@/components/admin/products';
import { AdminApiContext } from '@/context/admin-api-provider';
import { Column, Query } from '@/types';
import { ProductListItem } from '@/types/product';
import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';

const columns: Column<ProductListItem>[] = [
  { name: 'ID', uid: 'id', sortable: true },
  // { name: 'IMAGE', uid: 'image', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PRICE', uid: 'price', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const ProductsPage: NextPage = () => {
  const { getProductsWithQuery } = useContext(AdminApiContext);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [query, setQuery] = useState<Query>({ query: {} });
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async (q: Query) => {
    setLoading(true);
    const data = await getProductsWithQuery(q);
    if (data) {
      setProducts(data.products);
      setCount(data._count);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(query);
  }, [query]);

  return (
    <>
      <ProductTable
        data={products}
        setData={setProducts}
        loading={loading}
        columns={columns}
        count={count}
        query={query}
        setQuery={setQuery}
      />
    </>
  );
};

export default ProductsPage;
