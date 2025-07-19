"use client";
import { IStats, IProduct } from "../../cautrucdata";
import { useState, useEffect, useRef   } from "react";
import { usePathname } from "next/navigation";
import SPLienQuan from "../SPLienQuan";
import HienBinhLuanSP from "../HienBinhLuanSP";
import StarRating from "../../components/StarRating";
import Image from "next/image";
import AddToCart from "../../components/AddToCart";

interface IRawImage { is_main: boolean; image: string , alt?: string; }

export default function ProductDetail() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [tab, setTab] = useState<"desc" | "review">("desc");
  const [stats, setStats] = useState<IStats | null>(null);

  const refetchBinhLuan = useRef<() => void>(() => {});

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Lấy Stats
  useEffect(() => {
    fetch(`${API_URL}/api/reviews/stats/${id}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Lỗi fetch stats:", err));
  }, []);

  // Lấy id từ URL (ví dụ URL: /product/abc-def)
  const pathname = usePathname(); 
  // Giả sử id luôn là phần cuối của path
  const id = pathname?.split("/").pop();

  useEffect(() => {
    if (!id) return;

    // Dữ liệu giả cho sản phẩm
    const mockProducts: { [key: string]: IProduct } = {
      "mock_sale_1": {
        _id: "mock_sale_1",
        brand: { name: "Rolex" },
        name: "Rolex Submariner Date 126610LN - Đồng hồ lặn cao cấp",
        description: "Đồng hồ Rolex Submariner Date với thiết kế cổ điển, khả năng chống nước 300m, máy tự động 3235, vỏ thép không gỉ 41mm. Sản phẩm chính hãng 100%, bảo hành toàn cầu 5 năm.\n\nĐặc điểm nổi bật:\n• Máy tự động Rolex 3235 với độ chính xác cao\n• Khả năng chống nước 300m (1000ft)\n• Vỏ thép không gỉ Oystersteel 41mm\n• Mặt số màu đen với kim và vạch số phát sáng\n• Dây đeo Oyster với khóa Oysterlock\n• Chức năng lịch ngày với kính lúp Cyclops\n• Bảo hành toàn cầu 5 năm",
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
          { _id: "img1", is_main: true, image: "/upload/product/breguet-classique-quantieme-perpetuel-7327br-11-9vu-39mm.jpg.webp", alt: "Rolex Submariner Date 126610LN" },
          { _id: "img2", is_main: false, image: "/upload/product/breguet-classique-7145br-15-9wu-snake-limited-40mm1.png.webp", alt: "Rolex Submariner Date 126610LN - Góc nghiêng" },
          { _id: "img3", is_main: false, image: "/upload/product/breguet-classique-7145br-15-9wu-snake-limited-40mm2.png.webp", alt: "Rolex Submariner Date 126610LN - Mặt sau" },
          { _id: "img4", is_main: false, image: "/upload/product/breguet-classique-7145br-15-9wu-snake-limited-40mm3.png.webp", alt: "Rolex Submariner Date 126610LN - Chi tiết" }
        ],
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-20T14:45:00Z"
      },
      "mock_sale_2": {
        _id: "mock_sale_2",
        brand: { name: "Omega" },
        name: "Omega Seamaster Planet Ocean 600M Co-Axial Master Chronometer",
        description: "Đồng hồ Omega Seamaster Planet Ocean với khả năng chống nước 600m, máy Co-Axial Master Chronometer 8900, vỏ thép 43.5mm. Thiết kế hiện đại, phù hợp cho các hoạt động thể thao dưới nước.\n\nĐặc điểm nổi bật:\n• Máy Co-Axial Master Chronometer 8900\n• Khả năng chống nước 600m (2000ft)\n• Vỏ thép không gỉ 43.5mm với khung bezel ceramic\n• Mặt số màu xanh dương với kim và vạch số phát sáng\n• Dây đeo cao su với khóa gập\n• Chức năng chronograph và lịch ngày\n• Bảo hành chính hãng 5 năm",
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
          { _id: "img4", is_main: true, image: "/upload/product/bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp", alt: "Omega Seamaster Planet Ocean" },
          { _id: "img5", is_main: false, image: "/upload/product/bulova-accu-swiss-tellaro-automatic-watch-43mm3.jpg_980_980.webp", alt: "Omega Seamaster Planet Ocean - Góc nghiêng" },
          { _id: "img6", is_main: false, image: "/upload/product/bulova-accu-swiss-a-15-mechanical-watch-40mm1.jpg_980_980.webp", alt: "Omega Seamaster Planet Ocean - Mặt sau" }
        ],
        created_at: "2024-01-10T09:15:00Z",
        updated_at: "2024-01-18T16:20:00Z"
      },
      "mock_sale_3": {
        _id: "mock_sale_3",
        brand: { name: "Cartier" },
        name: "Cartier Tank Solo Automatic - Đồng hồ thanh lịch",
        description: "Đồng hồ Cartier Tank Solo với thiết kế hình chữ nhật độc đáo, máy tự động 1847 MC, vỏ thép 27.4mm x 34.8mm. Phù hợp cho phong cách công sở và các dịp trang trọng.\n\nĐặc điểm nổi bật:\n• Máy tự động Cartier 1847 MC\n• Vỏ thép không gỉ hình chữ nhật 27.4mm x 34.8mm\n• Mặt số màu bạc với kim và vạch số thanh lịch\n• Dây đeo da với khóa gập\n• Thiết kế cổ điển, phù hợp mọi dịp\n• Bảo hành chính hãng 2 năm",
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
          { _id: "img6", is_main: true, image: "/upload/product/baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp", alt: "Cartier Tank Solo Automatic" },
          { _id: "img7", is_main: false, image: "/upload/product/baume--mercier-hampton-10709-blue-watch-35-x-22mm2.png.webp", alt: "Cartier Tank Solo Automatic - Góc nghiêng" },
          { _id: "img8", is_main: false, image: "/upload/product/baume--mercier-hampton-10709-blue-watch-35-x-22mm.png.webp", alt: "Cartier Tank Solo Automatic - Chi tiết" }
        ],
        created_at: "2024-01-12T11:45:00Z",
        updated_at: "2024-01-19T13:30:00Z"
      },
      "mock_sale_4": {
        _id: "mock_sale_4",
        brand: { name: "Longines" },
        name: "Longines Heritage Classic - Đồng hồ cổ điển",
        description: "Đồng hồ Longines Heritage Classic với thiết kế retro, máy tự động L888, vỏ thép 40mm. Lấy cảm hứng từ những mẫu đồng hồ cổ điển của thập niên 1940-1950.\n\nĐặc điểm nổi bật:\n• Máy tự động Longines L888\n• Vỏ thép không gỉ 40mm\n• Mặt số màu trắng với kim và vạch số cổ điển\n• Dây đeo da với khóa gập\n• Thiết kế retro, phù hợp phong cách vintage\n• Bảo hành chính hãng 2 năm",
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
          { _id: "img8", is_main: true, image: "/upload/product/bulova-sutton-automatic-34-5mm1.png.webp", alt: "Longines Heritage Classic" },
          { _id: "img9", is_main: false, image: "/upload/product/bulova-sutton-automatic-34-5mm2.png.webp", alt: "Longines Heritage Classic - Góc nghiêng" },
          { _id: "img10", is_main: false, image: "/upload/product/bulova-sutton-automatic-34-5mm.png.webp", alt: "Longines Heritage Classic - Chi tiết" }
        ],
        created_at: "2024-01-08T08:30:00Z",
        updated_at: "2024-01-16T15:45:00Z"
      }
    };

    // Kiểm tra nếu là sản phẩm giả
    if (mockProducts[id]) {
      setProduct(mockProducts[id]);
      setCurrentImg(0);
      return;
    }

    // Nếu không phải sản phẩm giả, fetch từ API như bình thường
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_URL}/api/product/${id}`);
        if (!res.ok) throw new Error("Lấy sản phẩm thất bại");
        const data = await res.json(); 

        /* ---------- NORMALIZE ---------- */
        // 1. Sắp xếp: ảnh chính lên đầu
        const imgObjects = [...data.images].sort(
          (a: IRawImage, b: IRawImage) => (b.is_main ? 1 : 0) - (a.is_main ? 1 : 0)
        ).map((i: IRawImage) => ({
          image: `/upload/product/${i.image}`,
          alt: i.alt || data.name
        }));

        // 3. Trả về object mới, trong đó images là string[]
        const cleanProduct: IProduct = {
          ...data,
          images: imgObjects,
          brand_id: data.brand._id // vì bạn đang dùng brand_id là string để map
        };

        setProduct(cleanProduct);
        setCurrentImg(0);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);


  if (!product) return <div>Đang tải sản phẩm...</div>;

  const handlePrev = () => {
    setCurrentImg((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImg((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="w-full mx-auto py-10 px-[10%] pt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <Image
            src={product.images[currentImg].image}
            alt={product.images[currentImg].alt || product.name}
            className="w-full h-116 object-cover rounded-xl cursor-zoom-in"
            width={800}
            height={464}
            onClick={() => setShowZoom(true)}
            style={{ objectFit: "cover", borderRadius: "0.75rem", cursor: "zoom-in" }}
            priority
          />
          {showZoom && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={() => setShowZoom(false)}
            >
              <Image
                src={product.images[currentImg].image}
                alt={product.images[currentImg].alt || product.name}
                className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl cursor-zoom-out"
                width={800}
                height={464}
                onClick={() => setShowZoom(false)}
                style={{ objectFit: "contain", borderRadius: "0.75rem", cursor: "zoom-out" }}
                priority
              />
            </div>
          )}
          <button
            onClick={handlePrev}
            className="absolute top-60 left-2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black z-10"
            aria-label="Ảnh trước"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-60 right-2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black z-10"
            aria-label="Ảnh sau"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className="grid grid-cols-4 gap-0.5 mt-4">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className={`overflow-hidden rounded cursor-pointer flex items-center justify-center h-24 transition
                  ${currentImg === idx ? "border-red-600" : "border-transparent"}
                  hover:border-red-400`}
                onClick={() => setCurrentImg(idx)}
              >
                <Image
                  src={img.image}
                  alt={img.alt || `Ảnh phụ ${idx + 1}`}
                  className={`h-full w-auto object-contain mx-auto transition-transform duration-200 hover:scale-105
                    ${currentImg === idx ? "opacity-100" : "opacity-60"}
                  `}
                  width={120}
                  height={96}
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="mb-2 flex items-center gap-3">
									

            {product.sale_price > 0 && (
						<>
              <span className="text-red-600 text-2xl font-semibold">
                {product.sale_price.toLocaleString("vi-VN")}đ
              </span>
              <span className="text-gray-400 line-through text-lg">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              {Math.round(((product.price - product.sale_price) / product.price) * 100)}%
              </span>
            </>
						)}

            {product.sale_price === 0 && (
              <span className="text-red-600 text-2xl font-semibold">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
          <p className="mb-2 text-gray-700 font-medium">{product.brand.name ?? "Không rõ thương hiệu"}</p>
          <div className="mb-6">
            {/* <h2 className="font-semibold mb-2 text-base text-black">Bộ sản phẩm gồm:</h2> */}
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 w-100">
              <AddToCart sp={product}/>
              {/* {product.included.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
        <h2 className="font-semibold mb-3 text-base text-black text-center">Thông số sản phẩm</h2>
        <div className="w-full bg-gray-100 rounded-xl px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Bộ sưu tập</span>
              <span className="font-medium">PORTOFINO</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Mã sản phẩm</span>
              <span className="font-medium">{product._id}</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Giới tính</span>
              <span className="font-medium">{product.sex}</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Loại máy</span>
              <span className="font-medium">{product.machine_type}</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Đường kính</span>
              <span className="font-medium">{product.case_diameter}mm</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Màu sắc</span>
              <span className="font-medium">{product.color}</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Phong cách</span>
              <span className="font-medium">{product.style}</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Chất liệu dây</span>
              <span className="font-medium">{product.strap_material}</span>
            </div>
            <div className="flex py-2 border-b border-gray-200">
              <span className="w-40 text-gray-500">Tính năng</span>
              <span className="font-medium">{product.features}</span>
            </div>
            <div className="flex py-2">
              <span className="w-40 text-gray-500">Độ chịu nước</span>
              <span className="font-medium">{product.water_resistance} ATM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
        <div className="flex justify-center gap-2 mb-6">
          <button
            className={`px-6 py-2 rounded-t font-semibold transition border-b-2 ${
              tab === "desc"
                ? "border-black text-black bg-white"
                : "border-transparent text-gray-500 bg-gray-100 hover:text-black"
            }`}
            onClick={() => setTab("desc")}
          >
            Mô tả sản phẩm
          </button>
          <button
            className={`px-6 py-2 rounded-t font-semibold transition border-b-2 ${
              tab === "review"
                ? "border-black text-black bg-white"
                : "border-transparent text-gray-500 bg-gray-100 hover:text-black"
            }`}
            onClick={() => setTab("review")}
          >
            Đánh giá
          </button>
        </div>
        <div className="w-full bg-white border border-gray-300  px-6 py-8">
          {tab === "desc" && (
            <div>
              <h3 className="font-bold text-text-lg mb-2">Mô tả sản phẩm</h3>
              <p className="text-gray-700 text-base mb-4">
                {product.description}
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Thiết kế mặt số tối giản, sang trọng, phù hợp cả nam và nữ.</li>
                <li>Dây da thật mềm mại, màu sắc trẻ trung, dễ phối đồ.</li>
                <li>Máy Thụy Sĩ Automatic, vận hành bền bỉ, chính xác.</li>
                <li>Có chống nước, thoải mái rửa tay, đi mưa nhỏ.</li>
                <li>Tính năng Moon phase độc đáo, tạo điểm nhấn cho cổ tay.</li>
                <li>Bảo hành chính hãng 1-2 năm, hỗ trợ trọn đời tại GWatch.</li>
              </ul>
              <p className="text-gray-700 text-base mb-2">
                Sản phẩm phù hợp cho mọi dịp: đi làm, dự tiệc, gặp gỡ bạn bè hoặc làm quà tặng ý nghĩa cho người thân, đối tác.
              </p>
              <p className="text-gray-700 text-base">
                <b>Lưu ý:</b> Hình ảnh sản phẩm có thể chênh lệch nhẹ do ánh sáng và màn hình hiển thị. Vui lòng liên hệ tư vấn để chọn Sản phẩm phù hợp nhất với bạn!
              </p>
            </div>
          )}
          {tab === "review" && (
            <div>
              <div className="flex items-center justify-center gap-2 mb-8 w-full">
                <StarRating rating={stats?.averageRating || 0} className="text-red-500 text-3xl" />
                <span className="ml-2 font-semibold text-lg text-gray-800">{stats?.averageRating}</span>
                <span className="text-gray-500 text-sm">({stats?.totalReviews} đánh giá)</span>
              </div>

              {/* Form bình luận */}
              {/* <form className="w-full flex flex-col gap-3 mb-10">
                <label className="font-medium text-sm w-full">Đánh giá của bạn</label>
                <div className="flex gap-1 text-red-500 text-xl w-full">
                  <i className="fa-regular fa-star cursor-pointer hover:text-red-400"></i>
                  <i className="fa-regular fa-star cursor-pointer hover:text-red-400"></i>
                  <i className="fa-regular fa-star cursor-pointer hover:text-red-400"></i>
                  <i className="fa-regular fa-star cursor-pointer hover:text-red-400"></i>
                  <i className="fa-regular fa-star cursor-pointer hover:text-red-400"></i>
                </div>
                <textarea
                  className="border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-red-200 w-full"
                  rows={3}
                  placeholder="Nhận xét của bạn..."
                />
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition w-full"
                >
                  Gửi đánh giá
                </button>
              </form> */}
              {/* <ReviewForm productId={product._id} onSuccess={() => { refetchBinhLuan.current(); // gọi lại fetch khi bình luận mới
              }}
              /> */}
              {/* Hiện bình luận */}
              {/* <div className="w-full space-y-8">
                <div className="flex gap-4 items-start w-full">
                      <img
                    src="/avatar1.jpg"
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <span className="font-semibold">Kế Cư</span>
                      <span className="text-red-500 text-sm flex gap-0.5">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </span>
                      <span className="text-gray-400 text-xs ml-2">2 ngày trước</span>
                    </div>
                    <div className="text-gray-700 text-sm w-full">
                      Sản phẩm đẹp, giao hàng nhanh, đóng gói cẩn thận.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start w-full">
                <img
  src="/avatar2.jpg"
  alt="avatar"
  className="w-10 h-10 rounded-full object-cover"
/>
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <span className="font-semibold">Lan Hương</span>
                      <span className="text-red-500 text-sm flex gap-0.5">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </span>
                      <span className="text-gray-400 text-xs ml-2">5 ngày trước</span>
                    </div>
                    <div className="text-gray-700 text-sm w-full">
                      Đồng hồ đẹp, đúng mô tả, sẽ ủng hộ lần sau.
                    </div>
                  </div>
                </div>
              </div> */}

              <HienBinhLuanSP productId={product._id} onRefetchReady={(fn) => { refetchBinhLuan.current = fn; }} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full mt-10">
        <SPLienQuan id={product._id} />
      </div>
    </main>
  );
}