import {getProductById, Product} from '@/services/fakestore';
import Link from 'next/link';
import {notFound} from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetail({params}: Props) {
  const {id} = params;

  // Check if the ID is a valid number
  if (!/^\d+$/.test(id)) {
    return notFound();
  }

  const product = await getProductById(parseInt(id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="mx-4 md:mx-16 lg:mx-32 xl:mx-64 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-muted-foreground mb-4">${product.price}</p>
          <p className="text-muted-foreground mb-4">Category: {product.category}</p>
          <p className="text-foreground mb-4">{product.description}</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
