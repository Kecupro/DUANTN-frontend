"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { IProduct } from "../cautrucdata";
import AddToCart from "./AddToCart";
import WishlistButton from "./WishlistButton";
import { useAuth } from "../context/AuthContext";

interface WishlistItem {
    _id: string;
    product_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export default function ProductSale() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [wishlistStatus, setWishlistStatus] = useState<{[key: string]: boolean}>({});
    const { user } = useAuth();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        // Dữ liệu giả cho sản phẩm sale
        const mockProducts: IProduct[] = [
            {
                _id: "mock_sale_1",
                brand: { name: "Rolex" },
                name: "Rolex Submariner Date 126610LN - Đồng hồ lặn cao cấp",
                description: "Đồng hồ Rolex Submariner Date với thiết kế cổ điển, khả năng chống nước 300m, máy tự động 3235, vỏ thép không gỉ 41mm. Sản phẩm chính hãng 100%, bảo hành toàn cầu 5 năm.",
                price: 85000000,
                sale_price: 72000000,
                status: 1,
                quantity: 5,
                views: 1250,
                sex: "Nam",
                case_diameter: 41,
                style: "Thể thao",
                features: "Chronograph, Lịch ngày, Chống nước",
                water_resistance: "300m",
                thickness: 12.5,
                color: "Đen",
                machine_type: "Tự động",
                strap_material: "Dây đeo thép",
                case_material: "Thép không gỉ",
                sold: 12,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "breguet-classique-quantieme-perpetuel-7327br-11-9vu-39mm.jpg.webp", 
                    alt: "Rolex Submariner Date 126610LN" 
                },
                images: [
                    { _id: "img1", is_main: true, image: "breguet-classique-quantieme-perpetuel-7327br-11-9vu-39mm.jpg.webp", alt: "Rolex Submariner Date 126610LN" },
                    { _id: "img2", is_main: false, image: "breguet-classique-7145br-15-9wu-snake-limited-40mm1.png.webp", alt: "Rolex Submariner Date 126610LN - Góc nghiêng" },
                    { _id: "img3", is_main: false, image: "breguet-classique-7145br-15-9wu-snake-limited-40mm2.png.webp", alt: "Rolex Submariner Date 126610LN - Mặt sau" }
                ],
                created_at: "2024-01-15T10:30:00Z",
                updated_at: "2024-01-20T14:45:00Z"
            },
            {
                _id: "mock_sale_2",
                brand: { name: "Omega" },
                name: "Omega Seamaster Planet Ocean 600M Co-Axial Master Chronometer",
                description: "Đồng hồ Omega Seamaster Planet Ocean với khả năng chống nước 600m, máy Co-Axial Master Chronometer 8900, vỏ thép 43.5mm. Thiết kế hiện đại, phù hợp cho các hoạt động thể thao dưới nước.",
                price: 65000000,
                sale_price: 52000000,
                status: 1,
                quantity: 3,
                views: 890,
                sex: "Nam",
                case_diameter: 43.5,
                style: "Thể thao",
                features: "Chronograph, Lịch ngày, Chống nước cao",
                water_resistance: "600m",
                thickness: 14.5,
                color: "Xanh dương",
                machine_type: "Tự động",
                strap_material: "Dây đeo cao su",
                case_material: "Thép không gỉ",
                sold: 8,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp", 
                    alt: "Omega Seamaster Planet Ocean" 
                },
                images: [
                    { _id: "img4", is_main: true, image: "bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp", alt: "Omega Seamaster Planet Ocean" },
                    { _id: "img5", is_main: false, image: "bulova-accu-swiss-tellaro-automatic-watch-43mm3.jpg_980_980.webp", alt: "Omega Seamaster Planet Ocean - Góc nghiêng" }
                ],
                created_at: "2024-01-10T09:15:00Z",
                updated_at: "2024-01-18T16:20:00Z"
            },
            {
                _id: "mock_sale_3",
                brand: { name: "Cartier" },
                name: "Cartier Tank Solo Automatic - Đồng hồ thanh lịch",
                description: "Đồng hồ Cartier Tank Solo với thiết kế hình chữ nhật độc đáo, máy tự động 1847 MC, vỏ thép 27.4mm x 34.8mm. Phù hợp cho phong cách công sở và các dịp trang trọng.",
                price: 45000000,
                sale_price: 36000000,
                status: 1,
                quantity: 7,
                views: 650,
                sex: "Nữ",
                case_diameter: 27.4,
                style: "Cổ điển",
                features: "Lịch ngày, Dây đeo da",
                water_resistance: "30m",
                thickness: 6.6,
                color: "Bạc",
                machine_type: "Tự động",
                strap_material: "Dây đeo da",
                case_material: "Thép không gỉ",
                sold: 15,
                categories: [{ name: "Đồng hồ nữ" }],
                main_image: { 
                    image: "baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp", 
                    alt: "Cartier Tank Solo Automatic" 
                },
                images: [
                    { _id: "img6", is_main: true, image: "baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp", alt: "Cartier Tank Solo Automatic" },
                    { _id: "img7", is_main: false, image: "baume--mercier-hampton-10709-blue-watch-35-x-22mm2.png.webp", alt: "Cartier Tank Solo Automatic - Góc nghiêng" }
                ],
                created_at: "2024-01-12T11:45:00Z",
                updated_at: "2024-01-19T13:30:00Z"
            },
            {
                _id: "mock_sale_4",
                brand: { name: "Longines" },
                name: "Longines Heritage Classic - Đồng hồ cổ điển",
                description: "Đồng hồ Longines Heritage Classic với thiết kế retro, máy tự động L888, vỏ thép 40mm. Lấy cảm hứng từ những mẫu đồng hồ cổ điển của thập niên 1940-1950.",
                price: 28000000,
                sale_price: 22400000,
                status: 1,
                quantity: 10,
                views: 420,
                sex: "Nam",
                case_diameter: 40,
                style: "Cổ điển",
                features: "Lịch ngày, Dây đeo da",
                water_resistance: "30m",
                thickness: 11.5,
                color: "Trắng",
                machine_type: "Tự động",
                strap_material: "Dây đeo da",
                case_material: "Thép không gỉ",
                sold: 6,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "bulova-sutton-automatic-34-5mm1.png.webp", 
                    alt: "Longines Heritage Classic" 
                },
                images: [
                    { _id: "img8", is_main: true, image: "bulova-sutton-automatic-34-5mm1.png.webp", alt: "Longines Heritage Classic" },
                    { _id: "img9", is_main: false, image: "bulova-sutton-automatic-34-5mm2.png.webp", alt: "Longines Heritage Classic - Góc nghiêng" }
                ],
                created_at: "2024-01-08T08:30:00Z",
                updated_at: "2024-01-16T15:45:00Z"
            }
        ];

        setProducts(mockProducts);
    }, []);

    // Fetch wishlist status for all products
    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/user/wishlist`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data: WishlistItem[] = await res.json();
                    const statusMap: {[key: string]: boolean} = {};
                    data.forEach((item) => {
                        statusMap[item.product_id] = true;
                    });
                    setWishlistStatus(statusMap);
                } catch (err) {
                    console.error("Lỗi fetch wishlist:", err);
                }
            } else {
                setWishlistStatus({});
            }
        };

        fetchWishlist();
    }, [user]); // Re-fetch when user state changes

    return (
        <div className="w-full bg-gray-50 py-8">
            <h3 className="text-center font-bold text-2xl mb-3">
                SẢN PHẨM GIẢM GIÁ
            </h3>
            <div className="mx-auto mb-8 w-30 h-1 bg-red-700 rounded"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={2}
                    navigation
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 4 },
                        480: { slidesPerView: 3 },
                    }}
                    loop
                >
                    {products.map((sp, idx) => (
                        <SwiperSlide key={sp._id || idx}>
                            <div className="relative flex flex-col bg-white rounded shadow hover:shadow-lg transition p-4 group h-full">
                                <Link href={`/product/${sp._id}`} className="flex-shrink-0 flex items-center justify-center h-48 mb-3 overflow-hidden">
                                    <img
                                        src={`/upload/product/${sp.main_image?.image}`}
                                        alt={sp.name}
                                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition duration-300"
                                    />
                                </Link>

                                <div className="flex flex-col flex-grow min-h-[60px]">
                                    <div className="flex justify-between items-start mb-1">
                                        <h6 className="font-semibold text-base text-gray-800 flex-grow mr-2 line-clamp-2">
                                            {sp.name}
                                        </h6>
                                        <div className="flex-shrink-0 text-gray-500 text-[12px] flex items-center">
                                            <i className="fa-solid fa-star text-orange-400 mr-1"></i>4.0
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-gray-600 mb-2 truncate">
                                        {sp.brand.name ?? "Không rõ thương hiệu"}
                                    </p>
                                </div>

                                <div className="mt-auto flex flex-col">
                                    {sp.sale_price > 0 && (
                                        <>
                                            <span className="text-[14px] font-bold text-gray-500 absolute top-2 left-2 bg-red-600 text-white px-1 py-2 rounded-sm z-10">
                                                {Math.round(((sp.price - sp.sale_price) / sp.price) * 100)}%
                                            </span>
                                            <div className="flex flex-wrap items-center gap-1">
                                                <span className="text-gray-600 font-normal line-through text-sm">
                                                    {sp.price.toLocaleString("vi-VN")}đ
                                                </span>
                                                <span className="text-red-600 font-bold text-[16px]">
                                                    {sp.sale_price.toLocaleString("vi-VN")}đ
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {sp.sale_price === 0 && (
                                        <div>
                                            <span className="text-gray-900 font-bold text-[16px]">
                                                {sp.price.toLocaleString("vi-VN")}đ
                                            </span>
                                        </div>
                                    )}
                                    <div className="mt-2">
                                        <AddToCart sp={sp} />
                                    </div>
                                </div>

                                <div className="absolute top-2 right-2 z-10">
                                    <WishlistButton 
                                        productId={sp._id} 
                                        initialIsWishlisted={wishlistStatus[sp._id] || false}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                    color: #6b7280 !important;
                }
                .swiper-button-next {
                    right: -32px;
                }
                .swiper-button-prev {
                    left: -32px;
                }
                .swiper-button-prev,
                .swiper-button-next {
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 10;
                }
                @media (max-width: 767px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}