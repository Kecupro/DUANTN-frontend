"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { IProduct } from "../cautrucdata";
import AddToCart from "../components/AddToCart";
import { useEffect, useState  } from "react";
import WishlistButton from "../components/WishlistButton";
import { useAuth } from "../context/AuthContext";

interface WishlistItem {
    _id: string;
    product_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SPLienQuan({id} : {id:string}) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [wishlistStatus, setWishlistStatus] = useState<{[key: string]: boolean}>({});
    const { user } = useAuth();

    // Fetch danh sách sản phẩm liên quan
    useEffect(() => {
        // Dữ liệu giả cho sản phẩm liên quan
        const mockRelatedProducts: IProduct[] = [
            {
                _id: "related_1",
                brand: { name: "Patek Philippe" },
                name: "Patek Philippe Nautilus 5711/1A - Đồng hồ thể thao cao cấp",
                description: "Đồng hồ Patek Philippe Nautilus với thiết kế độc đáo, máy tự động 26-330 S C, vỏ thép không gỉ 40.5mm. Sản phẩm limited edition, rất hiếm trên thị trường.",
                price: 120000000,
                sale_price: 0,
                status: 1,
                quantity: 2,
                views: 2100,
                sex: "Nam",
                case_diameter: 40.5,
                style: "Thể thao",
                features: "Lịch ngày, Chống nước",
                water_resistance: "120m",
                thickness: 8.3,
                color: "Xanh dương",
                machine_type: "Tự động",
                strap_material: "Dây đeo thép",
                case_material: "Thép không gỉ",
                sold: 3,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm1.jpg.webp", 
                    alt: "Patek Philippe Nautilus 5711/1A" 
                },
                images: [],
                created_at: "2024-01-05T12:00:00Z",
                updated_at: "2024-01-15T16:30:00Z"
            },
            {
                _id: "related_2",
                brand: { name: "Audemars Piguet" },
                name: "Audemars Piguet Royal Oak 15500ST - Đồng hồ thể thao",
                description: "Đồng hồ Audemars Piguet Royal Oak với thiết kế octagonal bezel độc đáo, máy tự động 4302, vỏ thép không gỉ 41mm. Biểu tượng của luxury sports watch.",
                price: 95000000,
                sale_price: 76000000,
                status: 1,
                quantity: 4,
                views: 1800,
                sex: "Nam",
                case_diameter: 41,
                style: "Thể thao",
                features: "Lịch ngày, Chống nước",
                water_resistance: "50m",
                thickness: 10.4,
                color: "Xanh dương",
                machine_type: "Tự động",
                strap_material: "Dây đeo thép",
                case_material: "Thép không gỉ",
                sold: 7,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "bulova-accutron-2es8a001-accutron-dna-watch-45mm1.png.webp", 
                    alt: "Audemars Piguet Royal Oak 15500ST" 
                },
                images: [],
                created_at: "2024-01-08T09:30:00Z",
                updated_at: "2024-01-18T14:20:00Z"
            },
            {
                _id: "related_3",
                brand: { name: "Vacheron Constantin" },
                name: "Vacheron Constantin Overseas 4500V - Đồng hồ thể thao",
                description: "Đồng hồ Vacheron Constantin Overseas với thiết kế thanh lịch, máy tự động 5100, vỏ thép không gỉ 41mm. Kết hợp hoàn hảo giữa thể thao và sang trọng.",
                price: 88000000,
                sale_price: 0,
                status: 1,
                quantity: 3,
                views: 950,
                sex: "Nam",
                case_diameter: 41,
                style: "Thể thao",
                features: "Lịch ngày, Chống nước",
                water_resistance: "150m",
                thickness: 11,
                color: "Xanh dương",
                machine_type: "Tự động",
                strap_material: "Dây đeo thép",
                case_material: "Thép không gỉ",
                sold: 5,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "bulova-surveyor-watch-41mm1.png.webp", 
                    alt: "Vacheron Constantin Overseas 4500V" 
                },
                images: [],
                created_at: "2024-01-12T11:15:00Z",
                updated_at: "2024-01-20T13:45:00Z"
            },
            {
                _id: "related_4",
                brand: { name: "IWC" },
                name: "IWC Portugieser Chronograph - Đồng hồ chronograph",
                description: "Đồng hồ IWC Portugieser Chronograph với thiết kế cổ điển, máy tự động 69355, vỏ thép không gỉ 41mm. Phù hợp cho cả công sở và các dịp trang trọng.",
                price: 65000000,
                sale_price: 52000000,
                status: 1,
                quantity: 6,
                views: 1200,
                sex: "Nam",
                case_diameter: 41,
                style: "Cổ điển",
                features: "Chronograph, Lịch ngày",
                water_resistance: "30m",
                thickness: 13,
                color: "Trắng",
                machine_type: "Tự động",
                strap_material: "Dây đeo da",
                case_material: "Thép không gỉ",
                sold: 9,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp", 
                    alt: "IWC Portugieser Chronograph" 
                },
                images: [],
                created_at: "2024-01-10T10:45:00Z",
                updated_at: "2024-01-17T15:30:00Z"
            },
            {
                _id: "related_5",
                brand: { name: "Jaeger-LeCoultre" },
                name: "Jaeger-LeCoultre Reverso Classic - Đồng hồ cổ điển",
                description: "Đồng hồ Jaeger-LeCoultre Reverso với thiết kế mặt số có thể lật, máy tự động 822A/2, vỏ thép không gỉ 45.6mm x 27.4mm. Biểu tượng của Art Deco.",
                price: 75000000,
                sale_price: 0,
                status: 1,
                quantity: 2,
                views: 800,
                sex: "Nam",
                case_diameter: 45.6,
                style: "Cổ điển",
                features: "Mặt số lật, Lịch ngày",
                water_resistance: "30m",
                thickness: 9.5,
                color: "Bạc",
                machine_type: "Tự động",
                strap_material: "Dây đeo da",
                case_material: "Thép không gỉ",
                sold: 4,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp", 
                    alt: "Jaeger-LeCoultre Reverso Classic" 
                },
                images: [],
                created_at: "2024-01-06T08:20:00Z",
                updated_at: "2024-01-14T12:10:00Z"
            },
            {
                _id: "related_6",
                brand: { name: "Breguet" },
                name: "Breguet Classique 7147 - Đồng hồ cổ điển",
                description: "Đồng hồ Breguet Classique với thiết kế tối giản, máy tự động 502.3 SD, vỏ vàng 18k 40mm. Thể hiện sự tinh tế và đẳng cấp của thương hiệu Breguet.",
                price: 110000000,
                sale_price: 88000000,
                status: 1,
                quantity: 1,
                views: 1500,
                sex: "Nam",
                case_diameter: 40,
                style: "Cổ điển",
                features: "Lịch ngày, Mặt số guilloché",
                water_resistance: "30m",
                thickness: 6.1,
                color: "Vàng",
                machine_type: "Tự động",
                strap_material: "Dây đeo da",
                case_material: "Vàng 18k",
                sold: 2,
                categories: [{ name: "Đồng hồ nam" }],
                main_image: { 
                    image: "breguet-reine-de-naples-9835-limited-edition-36-5x28-45mm.png_980_980.webp", 
                    alt: "Breguet Classique 7147" 
                },
                images: [],
                created_at: "2024-01-03T14:30:00Z",
                updated_at: "2024-01-12T09:45:00Z"
            }
        ];

        setProducts(mockRelatedProducts);
    }, [id]);
    
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
				SẢN PHẨM LIÊN QUAN
			</h3>
			<div className="mx-auto mb-8 w-30 h-1  bg-red-700 rounded"></div>
			<div className="max-w-6xl mx-auto">
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
                                        alt={sp.main_image?.image}
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
					color: #6b7280 !important; /* gray-500 */
				}
				.swiper-button-next {
					right: -32px;
				}
				.swiper-button-prev {
					left: -32px;
				}
			`}</style>
		</div>
    );
}