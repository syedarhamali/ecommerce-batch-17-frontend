import axios from "axios";
import { notFound } from "next/navigation";
import api from "../../services/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getProduct(id: string) {
  try {
    const res = api.get(`/products?/${id}`)
    // const res = await axios.get(
    //   `https://dummyjson.com/products/${id}`
    // );

    return res.data;
  } catch (error) {
    return null;
  }
}

export default async function ProductDetail({
  params,
}: Props) {

  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-10 p-8">

        {/* IMAGE */}

        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[450px] object-cover rounded-2xl"
          />
        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-center">

          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full w-fit capitalize">
            {product.category}
          </span>

          <h1 className="text-5xl font-extrabold text-gray-900 mt-5">
            {product.title}
          </h1>

          <p className="text-gray-500 mt-5 leading-8">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="text-4xl font-bold text-emerald-600">
              ${product.price}
            </h2>
          </div>

          <div className="mt-8 flex gap-4">

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold">
              Buy Now
            </button>

            <button className="border border-gray-300 hover:border-black px-8 py-4 rounded-2xl font-semibold">
              Chat Seller
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}