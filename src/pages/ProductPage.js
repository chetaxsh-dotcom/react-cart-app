import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductPage() {
  
  const [products, setProducts] = useState([]);

  
  const { cart, addToCart, removeFromCart } = useCart();

  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  
  const isInCart = (id) => {
    return cart.find((item) => item.id === id);
  };

  return (
    <div className="p-6">
      {/* Cart link */}
      <Link to="/cart" className="text-blue-600 font-bold">
        Go to Cart 🛒
      </Link>

      <h1 className="text-3xl font-bold my-4">Products</h1>

      {/* Loading state */}
      {products.length === 0 && (
        <p className="text-gray-500">Loading products...</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-3"
            />

            <h2 className="font-bold text-sm mb-1">
              {product.title}
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              {product.description.slice(0, 80)}...
            </p>

            <p className="font-bold mb-2">₹ {product.price}</p>

            {isInCart(product.id) ? (
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-white py-1 rounded"
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white py-1 rounded"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;

