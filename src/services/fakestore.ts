/**
 * Represents a product from the FakeStore API.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Asynchronously retrieves all products from the FakeStore API.
 *
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as Product[];
  } catch (e: any) {
    console.error('Failed to fetch products:', e);
    throw e;
  }
}

/**
 * Asynchronously retrieves a single product from the FakeStore API by its ID.
 *
 * @param id The ID of the product to retrieve.
 * @returns A promise that resolves to a Product object or undefined if not found.
 */
export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as Product;
  } catch (e: any) {
    console.error(`Failed to fetch product with ID ${id}:`, e);
    return undefined;
  }
}
