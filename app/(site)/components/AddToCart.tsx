"use client";
import { ICart } from "../cautrucdata";
import { toast } from "react-toastify";
import { IProduct } from "../cautrucdata";

export default function AddToCart({ sp }: { sp: IProduct }) {
    const handleAddToCart = () => {
        const storedCart = localStorage.getItem("cart");
        const newCart = storedCart ? JSON.parse(storedCart) : [];
        const index = newCart.findIndex(
            (item:ICart) => item._id === sp._id);
            if (index !== -1) newCart[index].so_luong += 1; // Nếu đã có, tăng số lượng
            else newCart.push( { ...sp, so_luong: 1 } ); // Nếu chưa có, thêm mới
            localStorage.setItem("cart", JSON.stringify(newCart)); // Lưu vào localStorage
            toast.success("Đã thêm vào giỏ hàng!");
    }; 
return (
    <button className="w-full mx-auto font-normal block bg-black text-white p-2 rounded-sm mt-1 hover:bg-red-700"
    onClick={handleAddToCart}>
    MUA NGAY
    </button>
)} 