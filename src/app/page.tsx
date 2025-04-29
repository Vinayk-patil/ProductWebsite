'use client';

import {getAllProducts, Product} from '@/services/fakestore';
import Link from 'next/link';
import {useEffect, useState} from 'react';

type SortOrder = 'asc' | 'desc';
type SortField = 'price' | 'title';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortField, setSortField] = useState<SortField>('title');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(sortProducts(data, sortField, sortOrder));
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortOrder, sortField]);

  const sortProducts = (
    products: Product[],
    field: SortField,
    order: SortOrder
  ): Product[] => {
    return [...products].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value as SortField);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label htmlFor="sortField" className="mr-2">
            Sort by:
          </label>
          <select
            id="sortField"
            className="border p-2 rounded"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder" className="mr-2">
            Order:
          </label>
          <select
            id="sortOrder"
            className="border p-2 rounded"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="block rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-500">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
