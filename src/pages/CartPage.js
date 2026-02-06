import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
  const discount = totalAmount * 0.1;
  const finalAmount = totalAmount - discount;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded flex items-center gap-6"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain border"
                />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p>Price: ₹ {item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      −
                    </button>

                    <span className="font-bold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-4 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total */}
                  <p className="mt-2 font-medium">
                    Item Total: ₹ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 border-t pt-4 text-right">
            <p className="text-lg">
              Subtotal: ₹ {totalAmount.toFixed(2)}
            </p>
            <p className="text-green-600">
              Discount (10%): − ₹ {discount.toFixed(2)}
            </p>
            <p className="text-2xl font-bold mt-2">
              Total Payable: ₹ {finalAmount.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
