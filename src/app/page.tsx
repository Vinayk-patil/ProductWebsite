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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const sortedProducts = sortProducts(products, sortField, sortOrder);
    const searchedProducts = filterProducts(sortedProducts, searchQuery);
    setFilteredProducts(searchedProducts);
  }, [products, sortOrder, sortField, searchQuery]);

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

  const filterProducts = (products: Product[], query: string): Product[] => {
    if (!query) {
      return products;
    }

    const lowerQuery = query.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(lowerQuery)
    );
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value as SortField);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-48 py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4 flex flex-wrap items-center gap-4">
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

        <div>
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            type="text"
            id="search"
            className="border p-2 rounded"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="block rounded-lg bg-card shadow-sm transition-shadow duration-300 hover:shadow-md hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-fit rounded-t-lg p-2"
            />
            <div className="p-4 bg-secondary/20">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-muted-foreground">${product.price}</p>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
