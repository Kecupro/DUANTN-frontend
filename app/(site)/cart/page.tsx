"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ICart } from "../cautrucdata";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cart, setCart] = useState<ICart[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  const calculateTotal = (cartItems: ICart[]) => {
    const sum = cartItems.reduce(
      (acc, item) => acc + (item.sale_price > 0 ? item.sale_price : item.price) * item.so_luong,
      0
    );
    setTotal(sum);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, so_luong: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-gray-50 pt-42 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Giỏ hàng của bạn</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <i className="fas fa-shopping-cart text-6xl"></i>
            </div>
            <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
            <Link
              href="/"
              className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item._id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="w-full sm:w-20 h-20 flex-shrink-0">
                          <div className="relative w-full h-full">
                            <img
                              src={`/upload/product/${item.main_image.image}`}
                              alt={item.name}
                              className="w-full h-full object-contain rounded-lg bg-gray-50"
                            />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                {item.name}
                              </h3>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {(item.sale_price > 0 ? item.sale_price : item.price).toLocaleString("vi-VN")}đ
                              </p>
                              {item.sale_price > 0 && (
                                <p className="text-xs text-gray-500 line-through">
                                  {item.price.toLocaleString("vi-VN")}đ
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item._id, item.so_luong - 1)}
                                className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                <i className="fas fa-minus text-xs"></i>
                              </button>
                              <span className="px-2 text-sm text-gray-900">{item.so_luong}</span>
                              <button
                                onClick={() => updateQuantity(item._id, item.so_luong + 1)}
                                className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                <i className="fas fa-plus text-xs"></i>
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="text-red-600 hover:text-red-700 transition-colors"
                            >
                              <i className="fas fa-trash-alt text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Tổng đơn hàng</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{total.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-medium text-gray-900">
                      <span>Tổng cộng</span>
                      <span>{total.toLocaleString("vi-VN")}đ</span>
                    </div>
                  </div>
                  <button onClick={handleCheckout}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {/* {user ? "Thanh toán" : "Đăng nhập để thanh toán"} */}
                    Thanh toán
                  </button>
                  <Link
                    href="/"
                    className="block text-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}