"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddToCart from "../components/AddToCart";
import WishlistButton from "../components/WishlistButton";
import { IProduct } from "../cautrucdata";
import { IBrand } from "../cautrucdata";
import { FaThLarge } from 'react-icons/fa';


// Định nghĩa type cho item trong wishlist
interface WishlistItem {
  _id: string;
  product_id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}


function formatMoney(num: number | undefined) {
  if (!num && num !== 0) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

export default function ShopPage() {
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const limit = 12;
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [wishlistMap, setWishlistMap] = useState<{ [key: string]: boolean }>({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const maxBrandInRow = 14;
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortLabel = sort === 'default' ? 'Thứ tự mặc định' : sort === 'price-asc' ? 'Giá tăng dần' : 'Giá giảm dần';
  const [brandSearch, setBrandSearch] = useState('');
  const [bestSellers, setBestSellers] = useState<IProduct[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch categories
  useEffect(() => {
    // Dữ liệu giả cho categories
    const mockCategories = [
      "Tất cả",
      "Đồng hồ nam",
      "Đồng hồ nữ", 
      "Đồng hồ thể thao",
      "Đồng hồ cổ điển",
      "Đồng hồ chronograph",
      "Đồng hồ lặn",
      "Đồng hồ bỏ túi",
      "Đồng hồ smartwatch",
      "Đồng hồ luxury"
    ];
    setCategories(mockCategories);
  }, []);

  // Fetch brands
  useEffect(() => {
    // Dữ liệu giả cho brands
    const mockBrands: IBrand[] = [
      {
        _id: 1,
        name: "Rolex",
        image: "luxury-shopping-1",
        alt: "Rolex",
        description: "Thương hiệu đồng hồ cao cấp hàng đầu thế giới",
        brand_status: 1,
        productCount: 25,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 2, 
        name: "Omega",
        image: "luxury-shopping-watch1-1",
        alt: "Omega",
        description: "Đồng hồ chính thức của NASA và James Bond",
        brand_status: 1,
        productCount: 18,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 3,
        name: "Cartier",
        image: "cartier-luxshopping4",
        alt: "Cartier", 
        description: "Thương hiệu đồng hồ và trang sức cao cấp",
        brand_status: 1,
        productCount: 15,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 4,
        name: "Patek Philippe",
        image: "patek-philippe-logo1-1",
        alt: "Patek Philippe",
        description: "Đồng hồ cao cấp nhất thế giới",
        brand_status: 1,
        productCount: 8,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 5,
        name: "Audemars Piguet",
        image: "luxury-shopping3-1",
        alt: "Audemars Piguet",
        description: "Thương hiệu đồng hồ thể thao cao cấp",
        brand_status: 1,
        productCount: 12,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 6,
        name: "Breguet",
        image: "breguet-luxshopping-1",
        alt: "Breguet",
        description: "Đồng hồ cổ điển với lịch sử hơn 200 năm",
        brand_status: 1,
        productCount: 10,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 7,
        name: "Longines",
        image: "logo-longines-full",
        alt: "Longines",
        description: "Đồng hồ cổ điển với giá cả hợp lý",
        brand_status: 1,
        productCount: 22,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 8,
        name: "IWC",
        image: "luxury-shopping8-1",
        alt: "IWC",
        description: "Đồng hồ kỹ thuật cao của Thụy Sĩ",
        brand_status: 1,
        productCount: 14,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 9,
        name: "Jaeger-LeCoultre",
        image: "jaeger-lecoultre-luxshopping1",
        alt: "Jaeger-LeCoultre",
        description: "Nhà sản xuất đồng hồ phức tạp",
        brand_status: 1,
        productCount: 9,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 10,
        name: "Vacheron Constantin",
        image: "vacheron-constantin-luxshopping2-0",
        alt: "Vacheron Constantin",
        description: "Đồng hồ cao cấp với lịch sử lâu đời",
        brand_status: 1,
        productCount: 6,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 11,
        name: "Hublot",
        image: "hublot-luxshopping2-1",
        alt: "Hublot",
        description: "Đồng hồ thể thao hiện đại",
        brand_status: 1,
        productCount: 11,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 12,
        name: "Tag Heuer",
        image: "tag-heuer-9",
        alt: "Tag Heuer",
        description: "Đồng hồ thể thao và chronograph",
        brand_status: 1,
        productCount: 16,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 13,
        name: "Tissot",
        image: "luxshopping41-1",
        alt: "Tissot",
        description: "Đồng hồ Thụy Sĩ với giá cả phải chăng",
        brand_status: 1,
        productCount: 20,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 14,
        name: "Seiko",
        image: "luxshopping46-1",
        alt: "Seiko",
        description: "Đồng hồ Nhật Bản chất lượng cao",
        brand_status: 1,
        productCount: 28,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 15,
        name: "Citizen",
        image: "luxshopping45-1",
        alt: "Citizen",
        description: "Đồng hồ công nghệ Eco-Drive",
        brand_status: 1,
        productCount: 24,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 16,
        name: "Chanel",
        image: "chanel-luxshoppping1-1",
        alt: "Chanel",
        description: "Thương hiệu thời trang cao cấp",
        brand_status: 1,
        productCount: 8,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 17,
        name: "Dior",
        image: "dior-luxshopping1-1",
        alt: "Dior",
        description: "Thương hiệu thời trang xa xỉ",
        brand_status: 1,
        productCount: 6,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 18,
        name: "Chopard",
        image: "chopard-luxshopping-20231",
        alt: "Chopard",
        description: "Đồng hồ và trang sức cao cấp",
        brand_status: 1,
        productCount: 9,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 19,
        name: "Piaget",
        image: "piaget-luxury-shopping1-1",
        alt: "Piaget",
        description: "Đồng hồ mỏng và trang sức",
        brand_status: 1,
        productCount: 7,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        _id: 20,
        name: "Panerai",
        image: "panerai-luxshopping2-1",
        alt: "Panerai",
        description: "Đồng hồ thể thao Ý",
        brand_status: 1,
        productCount: 11,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      }
    ];
    setBrands(mockBrands);
  }, []);

  // Reset page về 1 khi filter thay đổi
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, priceRange, sort, selectedBrand]);

  // Fetch products (có filter theo brand)
  useEffect(() => {
    setLoading(true);
    
    // Dữ liệu giả cho products
    const mockProducts: IProduct[] = [
      {
        _id: "shop_1",
        brand: { name: "Rolex" },
        name: "Rolex Submariner Date 126610LN - Đồng hồ lặn cao cấp",
        description: "Đồng hồ Rolex Submariner Date với thiết kế cổ điển, khả năng chống nước 300m, máy tự động 3235, vỏ thép không gỉ 41mm.",
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
        images: [],
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-20T14:45:00Z"
      },
      {
        _id: "shop_2",
        brand: { name: "Omega" },
        name: "Omega Seamaster Planet Ocean 600M Co-Axial Master Chronometer",
        description: "Đồng hồ Omega Seamaster Planet Ocean với khả năng chống nước 600m, máy Co-Axial Master Chronometer 8900.",
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
        images: [],
        created_at: "2024-01-10T09:15:00Z",
        updated_at: "2024-01-18T16:20:00Z"
      },
      {
        _id: "shop_3",
        brand: { name: "Cartier" },
        name: "Cartier Tank Solo Automatic - Đồng hồ thanh lịch",
        description: "Đồng hồ Cartier Tank Solo với thiết kế hình chữ nhật độc đáo, máy tự động 1847 MC.",
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
        images: [],
        created_at: "2024-01-12T11:45:00Z",
        updated_at: "2024-01-19T13:30:00Z"
      },
      {
        _id: "shop_4",
        brand: { name: "Longines" },
        name: "Longines Heritage Classic - Đồng hồ cổ điển",
        description: "Đồng hồ Longines Heritage Classic với thiết kế retro, máy tự động L888, vỏ thép 40mm.",
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
        images: [],
        created_at: "2024-01-08T08:30:00Z",
        updated_at: "2024-01-16T15:45:00Z"
      },
      {
        _id: "shop_5",
        brand: { name: "Patek Philippe" },
        name: "Patek Philippe Nautilus 5711/1A - Đồng hồ thể thao cao cấp",
        description: "Đồng hồ Patek Philippe Nautilus với thiết kế độc đáo, máy tự động 26-330 S C, vỏ thép không gỉ 40.5mm.",
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
        _id: "shop_6",
        brand: { name: "Audemars Piguet" },
        name: "Audemars Piguet Royal Oak 15500ST - Đồng hồ thể thao",
        description: "Đồng hồ Audemars Piguet Royal Oak với thiết kế octagonal bezel độc đáo, máy tự động 4302.",
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
        _id: "shop_7",
        brand: { name: "IWC" },
        name: "IWC Portugieser Chronograph - Đồng hồ chronograph",
        description: "Đồng hồ IWC Portugieser Chronograph với thiết kế cổ điển, máy tự động 69355, vỏ thép không gỉ 41mm.",
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
        _id: "shop_8",
        brand: { name: "Breguet" },
        name: "Breguet Classique 7147 - Đồng hồ cổ điển",
        description: "Đồng hồ Breguet Classique với thiết kế tối giản, máy tự động 502.3 SD, vỏ vàng 18k 40mm.",
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
      },
      {
        _id: "shop_9",
        brand: { name: "Vacheron Constantin" },
        name: "Vacheron Constantin Overseas 4500V - Đồng hồ thể thao",
        description: "Đồng hồ Vacheron Constantin Overseas với thiết kế thanh lịch, máy tự động 5100, vỏ thép không gỉ 41mm.",
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
        _id: "shop_10",
        brand: { name: "Jaeger-LeCoultre" },
        name: "Jaeger-LeCoultre Reverso Classic - Đồng hồ cổ điển",
        description: "Đồng hồ Jaeger-LeCoultre Reverso với thiết kế mặt số có thể lật, máy tự động 822A/2, vỏ thép không gỉ 45.6mm x 27.4mm.",
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
        _id: "shop_11",
        brand: { name: "Hublot" },
        name: "Hublot Big Bang Unico - Đồng hồ thể thao",
        description: "Đồng hồ Hublot Big Bang Unico với thiết kế hiện đại, máy tự động HUB1242, vỏ thép không gỉ 45mm.",
        price: 55000000,
        sale_price: 44000000,
        status: 1,
        quantity: 8,
        views: 1100,
        sex: "Nam",
        case_diameter: 45,
        style: "Thể thao",
        features: "Chronograph, Lịch ngày, Chống nước",
        water_resistance: "100m",
        thickness: 14.5,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo cao su",
        case_material: "Thép không gỉ",
        sold: 11,
        categories: [{ name: "Đồng hồ nam" }],
        main_image: { 
          image: "bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp", 
          alt: "Hublot Big Bang Unico" 
        },
        images: [],
        created_at: "2024-01-09T13:45:00Z",
        updated_at: "2024-01-17T10:20:00Z"
      },
      {
        _id: "shop_12",
        brand: { name: "Tag Heuer" },
        name: "Tag Heuer Carrera Chronograph - Đồng hồ chronograph",
        description: "Đồng hồ Tag Heuer Carrera Chronograph với thiết kế thể thao, máy tự động Calibre 16, vỏ thép không gỉ 41mm.",
        price: 35000000,
        sale_price: 28000000,
        status: 1,
        quantity: 12,
        views: 750,
        sex: "Nam",
        case_diameter: 41,
        style: "Thể thao",
        features: "Chronograph, Lịch ngày",
        water_resistance: "100m",
        thickness: 14.5,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 18,
        categories: [{ name: "Đồng hồ nam" }],
        main_image: { 
          image: "bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp", 
          alt: "Tag Heuer Carrera Chronograph" 
        },
        images: [],
        created_at: "2024-01-11T16:30:00Z",
        updated_at: "2024-01-19T09:15:00Z"
      },
      {
        _id: "shop_13",
        brand: { name: "Tissot" },
        name: "Tissot T-Touch Connect Solar - Đồng hồ smartwatch",
        description: "Đồng hồ Tissot T-Touch Connect Solar với công nghệ cảm ứng, năng lượng mặt trời, vỏ thép không gỉ 45mm.",
        price: 18000000,
        sale_price: 14400000,
        status: 1,
        quantity: 15,
        views: 600,
        sex: "Nam",
        case_diameter: 45,
        style: "Thể thao",
        features: "Cảm ứng, Năng lượng mặt trời, GPS",
        water_resistance: "100m",
        thickness: 13.5,
        color: "Đen",
        machine_type: "Quartz",
        strap_material: "Dây đeo cao su",
        case_material: "Thép không gỉ",
        sold: 25,
        categories: [{ name: "Đồng hồ smartwatch" }],
        main_image: { 
          image: "bulova-accutron-2es8a001-accutron-dna-watch-45mm1.png.webp", 
          alt: "Tissot T-Touch Connect Solar" 
        },
        images: [],
        created_at: "2024-01-07T12:20:00Z",
        updated_at: "2024-01-15T14:30:00Z"
      },
      {
        _id: "shop_14",
        brand: { name: "Seiko" },
        name: "Seiko Prospex Diver - Đồng hồ lặn",
        description: "Đồng hồ Seiko Prospex Diver với khả năng chống nước 200m, máy tự động 4R36, vỏ thép không gỉ 42.5mm.",
        price: 12000000,
        sale_price: 9600000,
        status: 1,
        quantity: 20,
        views: 450,
        sex: "Nam",
        case_diameter: 42.5,
        style: "Thể thao",
        features: "Lịch ngày, Chống nước cao",
        water_resistance: "200m",
        thickness: 13.4,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo cao su",
        case_material: "Thép không gỉ",
        sold: 30,
        categories: [{ name: "Đồng hồ lặn" }],
        main_image: { 
          image: "bulova-surveyor-watch-41mm1.png.webp", 
          alt: "Seiko Prospex Diver" 
        },
        images: [],
        created_at: "2024-01-04T10:15:00Z",
        updated_at: "2024-01-13T11:45:00Z"
      },
      {
        _id: "shop_15",
        brand: { name: "Citizen" },
        name: "Citizen Eco-Drive Promaster - Đồng hồ thể thao",
        description: "Đồng hồ Citizen Eco-Drive Promaster với công nghệ Eco-Drive, khả năng chống nước 200m, vỏ thép không gỉ 44mm.",
        price: 8000000,
        sale_price: 6400000,
        status: 1,
        quantity: 25,
        views: 380,
        sex: "Nam",
        case_diameter: 44,
        style: "Thể thao",
        features: "Eco-Drive, Lịch ngày, Chống nước",
        water_resistance: "200m",
        thickness: 12.5,
        color: "Xanh dương",
        machine_type: "Quartz",
        strap_material: "Dây đeo cao su",
        case_material: "Thép không gỉ",
        sold: 35,
        categories: [{ name: "Đồng hồ thể thao" }],
        main_image: { 
          image: "bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp", 
          alt: "Citizen Eco-Drive Promaster" 
        },
        images: [],
        created_at: "2024-01-02T09:30:00Z",
        updated_at: "2024-01-11T16:20:00Z"
      },
      {
        _id: "shop_16",
        brand: { name: "Cartier" },
        name: "Cartier Ballon Bleu - Đồng hồ nữ thanh lịch",
        description: "Đồng hồ Cartier Ballon Bleu với thiết kế tròn thanh lịch, máy tự động 076, vỏ thép không gỉ 36mm.",
        price: 38000000,
        sale_price: 30400000,
        status: 1,
        quantity: 6,
        views: 520,
        sex: "Nữ",
        case_diameter: 36,
        style: "Cổ điển",
        features: "Lịch ngày, Dây đeo da",
        water_resistance: "30m",
        thickness: 12.1,
        color: "Bạc",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 8,
        categories: [{ name: "Đồng hồ nữ" }],
        main_image: { 
          image: "baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp", 
          alt: "Cartier Ballon Bleu" 
        },
        images: [],
        created_at: "2024-01-14T14:20:00Z",
        updated_at: "2024-01-21T10:30:00Z"
      },
      {
        _id: "shop_17",
        brand: { name: "Chanel" },
        name: "Chanel J12 - Đồng hồ nữ cao cấp",
        description: "Đồng hồ Chanel J12 với thiết kế hiện đại, vỏ gốm đen, máy tự động, vỏ 38mm.",
        price: 42000000,
        sale_price: 33600000,
        status: 1,
        quantity: 4,
        views: 680,
        sex: "Nữ",
        case_diameter: 38,
        style: "Hiện đại",
        features: "Lịch ngày, Chống nước",
        water_resistance: "200m",
        thickness: 12.5,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo gốm",
        case_material: "Gốm",
        sold: 6,
        categories: [{ name: "Đồng hồ nữ" }],
        main_image: { 
          image: "bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp", 
          alt: "Chanel J12" 
        },
        images: [],
        created_at: "2024-01-13T15:30:00Z",
        updated_at: "2024-01-20T12:45:00Z"
      },
      {
        _id: "shop_18",
        brand: { name: "Dior" },
        name: "Dior VIII Grand Bal - Đồng hồ nữ",
        description: "Đồng hồ Dior VIII Grand Bal với thiết kế độc đáo, máy tự động với rotor trang trí, vỏ 36mm.",
        price: 35000000,
        sale_price: 28000000,
        status: 1,
        quantity: 3,
        views: 420,
        sex: "Nữ",
        case_diameter: 36,
        style: "Cổ điển",
        features: "Lịch ngày, Rotor trang trí",
        water_resistance: "50m",
        thickness: 11.5,
        color: "Trắng",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 4,
        categories: [{ name: "Đồng hồ nữ" }],
        main_image: { 
          image: "baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp", 
          alt: "Dior VIII Grand Bal" 
        },
        images: [],
        created_at: "2024-01-16T11:20:00Z",
        updated_at: "2024-01-22T09:15:00Z"
      },
      {
        _id: "shop_19",
        brand: { name: "Chopard" },
        name: "Chopard Happy Sport - Đồng hồ nữ",
        description: "Đồng hồ Chopard Happy Sport với thiết kế vui tươi, kim cương di chuyển, vỏ thép 36mm.",
        price: 28000000,
        sale_price: 22400000,
        status: 1,
        quantity: 8,
        views: 350,
        sex: "Nữ",
        case_diameter: 36,
        style: "Hiện đại",
        features: "Kim cương di chuyển, Lịch ngày",
        water_resistance: "30m",
        thickness: 10.5,
        color: "Bạc",
        machine_type: "Tự động",
        strap_material: "Dây đeo thép",
        case_material: "Thép không gỉ",
        sold: 12,
        categories: [{ name: "Đồng hồ nữ" }],
        main_image: { 
          image: "bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp", 
          alt: "Chopard Happy Sport" 
        },
        images: [],
        created_at: "2024-01-10T13:45:00Z",
        updated_at: "2024-01-18T16:30:00Z"
      },
      {
        _id: "shop_20",
        brand: { name: "Piaget" },
        name: "Piaget Altiplano - Đồng hồ siêu mỏng",
        description: "Đồng hồ Piaget Altiplano với thiết kế siêu mỏng, máy tự động 1200P, vỏ vàng 18k 40mm.",
        price: 95000000,
        sale_price: 76000000,
        status: 1,
        quantity: 2,
        views: 1200,
        sex: "Nam",
        case_diameter: 40,
        style: "Cổ điển",
        features: "Siêu mỏng, Lịch ngày",
        water_resistance: "20m",
        thickness: 3.65,
        color: "Vàng",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Vàng 18k",
        sold: 3,
        categories: [{ name: "Đồng hồ nam" }],
        main_image: { 
          image: "breguet-reine-de-naples-9835-limited-edition-36-5x28-45mm.png_980_980.webp", 
          alt: "Piaget Altiplano" 
        },
        images: [],
        created_at: "2024-01-05T10:15:00Z",
        updated_at: "2024-01-14T13:20:00Z"
      },
      {
        _id: "shop_21",
        brand: { name: "Panerai" },
        name: "Panerai Luminor Marina - Đồng hồ lặn",
        description: "Đồng hồ Panerai Luminor Marina với thiết kế độc đáo, máy tự động P.9010, vỏ thép 44mm.",
        price: 45000000,
        sale_price: 36000000,
        status: 1,
        quantity: 7,
        views: 850,
        sex: "Nam",
        case_diameter: 44,
        style: "Thể thao",
        features: "Lịch ngày, Chống nước cao",
        water_resistance: "300m",
        thickness: 15.6,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo cao su",
        case_material: "Thép không gỉ",
        sold: 9,
        categories: [{ name: "Đồng hồ lặn" }],
        main_image: { 
          image: "bulova-surveyor-watch-41mm1.png.webp", 
          alt: "Panerai Luminor Marina" 
        },
        images: [],
        created_at: "2024-01-08T14:30:00Z",
        updated_at: "2024-01-17T11:45:00Z"
      },
      {
        _id: "shop_22",
        brand: { name: "Rolex" },
        name: "Rolex Daytona 116500LN - Đồng hồ chronograph",
        description: "Đồng hồ Rolex Daytona với thiết kế chronograph huyền thoại, máy tự động 4130, vỏ thép 40mm.",
        price: 150000000,
        sale_price: 0,
        status: 1,
        quantity: 1,
        views: 2500,
        sex: "Nam",
        case_diameter: 40,
        style: "Thể thao",
        features: "Chronograph, Lịch ngày",
        water_resistance: "100m",
        thickness: 12.5,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo thép",
        case_material: "Thép không gỉ",
        sold: 1,
        categories: [{ name: "Đồng hồ chronograph" }],
        main_image: { 
          image: "breguet-classique-quantieme-perpetuel-7327br-11-9vu-39mm.jpg.webp", 
          alt: "Rolex Daytona 116500LN" 
        },
        images: [],
        created_at: "2024-01-01T08:00:00Z",
        updated_at: "2024-01-10T15:30:00Z"
      },
      {
        _id: "shop_23",
        brand: { name: "Omega" },
        name: "Omega Speedmaster Professional - Đồng hồ chronograph",
        description: "Đồng hồ Omega Speedmaster Professional với lịch sử lên mặt trăng, máy thủ công 1861, vỏ thép 42mm.",
        price: 55000000,
        sale_price: 44000000,
        status: 1,
        quantity: 5,
        views: 1100,
        sex: "Nam",
        case_diameter: 42,
        style: "Thể thao",
        features: "Chronograph, Lịch ngày",
        water_resistance: "50m",
        thickness: 13.2,
        color: "Đen",
        machine_type: "Thủ công",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 7,
        categories: [{ name: "Đồng hồ chronograph" }],
        main_image: { 
          image: "bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp", 
          alt: "Omega Speedmaster Professional" 
        },
        images: [],
        created_at: "2024-01-12T09:45:00Z",
        updated_at: "2024-01-19T14:20:00Z"
      },
      {
        _id: "shop_24",
        brand: { name: "Longines" },
        name: "Longines Master Collection - Đồng hồ cổ điển",
        description: "Đồng hồ Longines Master Collection với thiết kế cổ điển, máy tự động L888, vỏ thép 40mm.",
        price: 22000000,
        sale_price: 17600000,
        status: 1,
        quantity: 12,
        views: 380,
        sex: "Nam",
        case_diameter: 40,
        style: "Cổ điển",
        features: "Lịch ngày, Dây đeo da",
        water_resistance: "30m",
        thickness: 9.5,
        color: "Trắng",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 15,
        categories: [{ name: "Đồng hồ cổ điển" }],
        main_image: { 
          image: "bulova-sutton-automatic-34-5mm1.png.webp", 
          alt: "Longines Master Collection" 
        },
        images: [],
        created_at: "2024-01-06T16:20:00Z",
        updated_at: "2024-01-15T12:10:00Z"
      },
      {
        _id: "shop_25",
        brand: { name: "IWC" },
        name: "IWC Pilot's Watch - Đồng hồ phi công",
        description: "Đồng hồ IWC Pilot's Watch với thiết kế phi công, máy tự động 32110, vỏ thép 40mm.",
        price: 48000000,
        sale_price: 38400000,
        status: 1,
        quantity: 6,
        views: 720,
        sex: "Nam",
        case_diameter: 40,
        style: "Thể thao",
        features: "Lịch ngày, Chống nước",
        water_resistance: "60m",
        thickness: 11.4,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 8,
        categories: [{ name: "Đồng hồ thể thao" }],
        main_image: { 
          image: "bulova-accutron-2es8a001-accutron-dna-watch-45mm1.png.webp", 
          alt: "IWC Pilot's Watch" 
        },
        images: [],
        created_at: "2024-01-09T13:15:00Z",
        updated_at: "2024-01-18T10:45:00Z"
      },
      {
        _id: "shop_26",
        brand: { name: "Breguet" },
        name: "Breguet Marine - Đồng hồ thể thao",
        description: "Đồng hồ Breguet Marine với thiết kế thể thao, máy tự động 777A, vỏ thép 40mm.",
        price: 85000000,
        sale_price: 68000000,
        status: 1,
        quantity: 3,
        views: 950,
        sex: "Nam",
        case_diameter: 40,
        style: "Thể thao",
        features: "Lịch ngày, Chống nước",
        water_resistance: "100m",
        thickness: 11.8,
        color: "Bạc",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 5,
        categories: [{ name: "Đồng hồ thể thao" }],
        main_image: { 
          image: "breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm1.jpg.webp", 
          alt: "Breguet Marine" 
        },
        images: [],
        created_at: "2024-01-11T12:30:00Z",
        updated_at: "2024-01-20T09:15:00Z"
      },
      {
        _id: "shop_27",
        brand: { name: "Vacheron Constantin" },
        name: "Vacheron Constantin Patrimony - Đồng hồ cổ điển",
        description: "Đồng hồ Vacheron Constantin Patrimony với thiết kế tối giản, máy tự động 2450, vỏ vàng 18k 40mm.",
        price: 120000000,
        sale_price: 96000000,
        status: 1,
        quantity: 2,
        views: 1800,
        sex: "Nam",
        case_diameter: 40,
        style: "Cổ điển",
        features: "Lịch ngày, Siêu mỏng",
        water_resistance: "30m",
        thickness: 8.4,
        color: "Vàng",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Vàng 18k",
        sold: 2,
        categories: [{ name: "Đồng hồ cổ điển" }],
        main_image: { 
          image: "breguet-reine-de-naples-9835-limited-edition-36-5x28-45mm.png_980_980.webp", 
          alt: "Vacheron Constantin Patrimony" 
        },
        images: [],
        created_at: "2024-01-04T11:45:00Z",
        updated_at: "2024-01-13T16:20:00Z"
      },
      {
        _id: "shop_28",
        brand: { name: "Jaeger-LeCoultre" },
        name: "Jaeger-LeCoultre Master Ultra Thin - Đồng hồ siêu mỏng",
        description: "Đồng hồ Jaeger-LeCoultre Master Ultra Thin với thiết kế siêu mỏng, máy tự động 896, vỏ thép 39mm.",
        price: 68000000,
        sale_price: 54400000,
        status: 1,
        quantity: 4,
        views: 650,
        sex: "Nam",
        case_diameter: 39,
        style: "Cổ điển",
        features: "Siêu mỏng, Lịch ngày",
        water_resistance: "50m",
        thickness: 7.8,
        color: "Bạc",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 6,
        categories: [{ name: "Đồng hồ cổ điển" }],
        main_image: { 
          image: "bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp", 
          alt: "Jaeger-LeCoultre Master Ultra Thin" 
        },
        images: [],
        created_at: "2024-01-07T14:20:00Z",
        updated_at: "2024-01-16T11:30:00Z"
      },
      {
        _id: "shop_29",
        brand: { name: "Hublot" },
        name: "Hublot Classic Fusion - Đồng hồ thể thao",
        description: "Đồng hồ Hublot Classic Fusion với thiết kế hiện đại, máy tự động HUB1112, vỏ thép 42mm.",
        price: 42000000,
        sale_price: 33600000,
        status: 1,
        quantity: 9,
        views: 580,
        sex: "Nam",
        case_diameter: 42,
        style: "Thể thao",
        features: "Lịch ngày, Chống nước",
        water_resistance: "50m",
        thickness: 9.1,
        color: "Đen",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 11,
        categories: [{ name: "Đồng hồ thể thao" }],
        main_image: { 
          image: "bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp", 
          alt: "Hublot Classic Fusion" 
        },
        images: [],
        created_at: "2024-01-14T10:15:00Z",
        updated_at: "2024-01-21T13:45:00Z"
      },
      {
        _id: "shop_30",
        brand: { name: "Tag Heuer" },
        name: "Tag Heuer Monaco - Đồng hồ chronograph",
        description: "Đồng hồ Tag Heuer Monaco với thiết kế hình vuông độc đáo, máy tự động Calibre 11, vỏ thép 39mm.",
        price: 32000000,
        sale_price: 25600000,
        status: 1,
        quantity: 10,
        views: 480,
        sex: "Nam",
        case_diameter: 39,
        style: "Thể thao",
        features: "Chronograph, Lịch ngày",
        water_resistance: "100m",
        thickness: 14.7,
        color: "Xanh dương",
        machine_type: "Tự động",
        strap_material: "Dây đeo da",
        case_material: "Thép không gỉ",
        sold: 14,
        categories: [{ name: "Đồng hồ chronograph" }],
        main_image: { 
          image: "bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp", 
          alt: "Tag Heuer Monaco" 
        },
        images: [],
        created_at: "2024-01-15T16:40:00Z",
        updated_at: "2024-01-22T08:30:00Z"
      }
    ];

    // Filter products based on selected criteria
    let filteredProducts = mockProducts;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'Tất cả') {
      filteredProducts = filteredProducts.filter(p => 
        p.categories.some(cat => cat.name === selectedCategory)
      );
    }

    // Filter by brand
    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(p => p.brand.name === selectedBrand);
    }

    // Filter by price
    filteredProducts = filteredProducts.filter(p => p.price <= priceRange[1]);

    // Sort products
    if (sort === 'price-asc') {
      filteredProducts.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
    } else if (sort === 'price-desc') {
      filteredProducts.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
    }

    // Pagination
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    setProducts(paginatedProducts);
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    setLoading(false);
  }, [selectedCategory, priceRange, sort, page, selectedBrand]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
      fetch(`${API_URL}/user/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then((data: WishlistItem[]) => {
          const map: { [key: string]: boolean } = {};
          data.forEach((item) => { map[item.product_id] = true; });
          setWishlistMap(map);
        });
    } else {
      setWishlistMap({});
    }
  }, []);

  useEffect(() => {
    // Dữ liệu giả cho best sellers
    const mockBestSellers: IProduct[] = [
      {
        _id: "best_1",
        brand: { name: "Rolex" },
        name: "Rolex Submariner Date 126610LN",
        description: "Đồng hồ lặn cao cấp",
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
        images: [],
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-20T14:45:00Z"
      },
      {
        _id: "best_2",
        brand: { name: "Omega" },
        name: "Omega Seamaster Planet Ocean",
        description: "Đồng hồ thể thao dưới nước",
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
        images: [],
        created_at: "2024-01-10T09:15:00Z",
        updated_at: "2024-01-18T16:20:00Z"
      },
      {
        _id: "best_3",
        brand: { name: "Cartier" },
        name: "Cartier Tank Solo Automatic",
        description: "Đồng hồ thanh lịch",
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
        images: [],
        created_at: "2024-01-12T11:45:00Z",
        updated_at: "2024-01-19T13:30:00Z"
      },
      {
        _id: "best_4",
        brand: { name: "Longines" },
        name: "Longines Heritage Classic",
        description: "Đồng hồ cổ điển",
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
        images: [],
        created_at: "2024-01-08T08:30:00Z",
        updated_at: "2024-01-16T15:45:00Z"
      }
    ];
    setBestSellers(mockBestSellers);
  }, []);

  // Tính toán danh mục hiển thị
  const displayedCategories = showAllCategories 
    ? categories 
    : [...categories.slice(0, 1), ...categories.slice(1, 6)]; // "Tất cả" + 5 danh mục đầu tiên

  const filteredBrands = brands.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()));

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 pt-40">
      {/* BRAND LIST */}
      <div className="mb-8">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
            alignItems: 'center',
          }}
        >
          {brands.slice(0, maxBrandInRow).map((brand) => (
            <button
              key={brand._id}
              className={`flex flex-col items-center min-w-[70px] px-2 py-1 bg-white rounded-lg transition-all duration-200 \
                ${selectedBrand === brand.name ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-400 hover:bg-gray-50"}
              `}
              style={{ width: 60, minHeight: 75 }}
              onClick={() => setSelectedBrand(brand.name === selectedBrand ? null : brand.name)}
            >
              <div className={`flex items-center justify-center rounded-full bg-white border transition-all duration-200
                ${selectedBrand === brand.name ? "border-red-500 shadow-md" : "border-gray-200 group-hover:border-red-400"}
              `}
                style={{ width: 50, height: 50, marginBottom: 2 }}
              >
                <img
                  src={`/upload/brand/${brand.image}.png.webp`}
                  alt={brand.name}
                  className="object-contain transition-transform duration-200 group-hover:scale-110"
                  style={{ width: 50, height: 50 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && parent.querySelector('.brand-initial') === null) {
                      const span = document.createElement('span');
                      span.className = 'brand-initial text-base font-bold text-gray-600';
                      span.style.display = 'flex';
                      span.style.alignItems = 'center';
                      span.style.justifyContent = 'center';
                      span.style.height = '100%';
                      span.style.width = '100%';
                      span.innerText = brand.name?.charAt(0).toUpperCase() || '';
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
              <span
                className="text-[11px] mt-1 text-center text-gray-500 font-medium break-words"
                style={{ maxWidth: 60, lineHeight: '13px', whiteSpace: 'normal', overflow: 'visible', display: 'block' }}
              >
                {brand.name.split(' ')[0]}
              </span>
            </button>
          ))}
          {brands.length > maxBrandInRow && (
            <button
              className="flex flex-col items-center justify-center w-[70px] h-[80px] rounded-xl border border-red-200 bg-gradient-to-b from-white via-red-50 to-white shadow-sm hover:shadow-lg hover:border-red-500 transition-all duration-200 group relative"
              onClick={() => setShowBrandModal(true)}
              type="button"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-red-200 group-hover:border-red-500 shadow transition-all duration-200 mb-1">
                <FaThLarge className="text-2xl text-red-400 group-hover:text-red-600 transition-all duration-200" />
              </span>
              <span className="text-xs text-red-500 font-semibold mt-1">Xem tất cả</span>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg z-20">
                Tất cả thương hiệu
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Modal hiển thị tất cả brand */}
      {showBrandModal && (
        <div className="fixed left-1/2 top-33 z-50 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4" style={{maxWidth:1250, width:'100%'}}>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
            style={{right: 16, top: 8, position: 'absolute'}}
            onClick={() => setShowBrandModal(false)}
            aria-label="Đóng"
          >
            ×
          </button>
          <h3 className="text-lg font-bold mb-3 text-center">Chọn thương hiệu đồng hồ </h3>
          <div className="relative flex justify-center mb-3">
            <input
              type="text"
              placeholder="Tìm kiếm thương hiệu..."
              className="pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-red-400 focus:shadow-lg text-sm w-[320px] max-w-full transition-all duration-200"
              value={brandSearch}
              onChange={e => setBrandSearch(e.target.value)}
              autoFocus
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 group-focus-within:text-red-400">
            
            </span>
            {brandSearch && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                onClick={() => setBrandSearch('')}
                tabIndex={-1}
                type="button"
                aria-label="Xóa tìm kiếm"
              >
                <i className="fa fa-times-circle"></i>
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center overflow-y-auto" style={{maxHeight: '60vh'}}>
            {filteredBrands.map((brand) => (
              <button
                key={brand._id}
                className={`flex flex-col items-center min-w-[70px] px-2 py-1 bg-white transition-all duration-200 \
                  ${selectedBrand === brand.name ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-400 hover:bg-gray-50"}
                `}
                style={{ width: 60, minHeight: 75 }}
                
                onClick={() => {
                  setSelectedBrand(brand.name === selectedBrand ? null : brand.name);
                  setShowBrandModal(false);
                }}
              >
                <div className={`flex items-center justify-center rounded-full bg-white border transition-all duration-200
                  ${selectedBrand === brand.name ? "border-red-500 shadow-md" : "border-gray-200 group-hover:border-red-400"}
                `}
                  style={{ width: 50, height: 50, marginBottom: 2 }}
                >
                  <img
                    src={`/upload/brand/${brand.image}.png.webp`}
                    alt={brand.name}
                    className="object-contain transition-transform duration-200 group-hover:scale-110"
                    style={{ width: 50, height: 50 }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent && parent.querySelector('.brand-initial') === null) {
                        const span = document.createElement('span');
                        span.className = 'brand-initial text-base font-bold text-gray-600';
                        span.style.display = 'flex';
                        span.style.alignItems = 'center';
                        span.style.justifyContent = 'center';
                        span.style.height = '100%';
                        span.style.width = '100%';
                        span.innerText = brand.name?.charAt(0).toUpperCase() || '';
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
                <span
                  className="text-[11px] mt-1 text-center text-gray-500 font-medium break-words"
                  style={{ maxWidth: 60, lineHeight: '13px', whiteSpace: 'normal', overflow: 'visible', display: 'block' }}
                >
                  {brand.name}
                </span>
              </button>
            ))}
            {filteredBrands.length === 0 && (
              <div className="text-center text-gray-400 py-8 flex flex-col items-center">
                <i className="fa fa-search-minus text-3xl mb-2"></i>
                <span>Không tìm thấy thương hiệu nào</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-md p-6 mb-8">
            <h2 className="font-bold text-xl flex items-center gap-2 mb-5 text-gray-800">
              <i className="fa-solid fa-list text-red-600"></i> Danh mục
            </h2>
            <ul className="flex flex-col gap-2">
              {displayedCategories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition font-medium text-sm
                      ${selectedCategory === cat
                        ? "bg-red-600 text-white shadow"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <i className={`fa-solid fa-tag ${selectedCategory === cat ? "text-white" : "text-red-400"}`}></i>
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Nút Xem thêm/Thu gọn */}
            {categories.length > 6 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition"
              >
                {showAllCategories ? (
                  <>
                    <i className="fa-solid fa-chevron-up text-red-400"></i>
                    Thu gọn
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-chevron-down text-red-400"></i>
                    Xem thêm ({categories.length - 6})
                  </>
                )}
              </button>
            )}
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-6 mb-8">
            <h2 className="font-bold text-xl flex items-center gap-2 mb-5 text-gray-800">
              <i className="fa-solid fa-filter text-red-600"></i> Lọc theo giá
            </h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-500">0đ</span>
              <input
                type="range"
                min={0}
                max={20000000}
                step={1000000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-red-600 h-3"
                style={{ minHeight: 16 }}
              />
              <span className="text-sm text-gray-700 font-semibold">{formatMoney(priceRange[1])}</span>
            </div>
            <button
              className="mt-2 w-full py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium border border-gray-200 transition"
              onClick={() => setPriceRange([0, 20000000])}
              disabled={priceRange[1] === 20000000}
            >
              Đặt lại khoảng giá
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="font-bold text-xl flex items-center gap-2 mb-5 text-gray-800">
              <i className="fa-solid fa-fire text-red-600"></i> Sản phẩm bán chạy
            </h2>
            <ul className="flex flex-col gap-4">
              {bestSellers.map((p) => (
                <li key={p._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group">
                  <Link href={`/product/${p._id}`} className="flex-shrink-0">
                    <img src={`/upload/product/${p.main_image?.image}`}
                      alt={p.main_image?.alt || p.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm group-hover:scale-105 transition" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${p._id}`} className="font-semibold text-sm text-gray-800 group-hover:text-red-600 truncate max-w-[120px] flex items-center">
                      <span className="inline-block bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded mr-1">Bán chạy</span>
                      {p.name}
                    </Link>
                    <div className="text-red-600 text-xs font-bold">{formatMoney(p.sale_price || p.price)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section className="md:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-sm text-gray-600">
              Hiển thị {products.length > 0 ? 1 : 0} - {products.length} trong {products.length} kết quả
            </div>
            <div className="relative inline-block">
              <button
                className="flex items-center border border-gray-200 rounded px-3 py-2 text-sm bg-white hover:border-red-400 transition"
                onClick={() => setShowSortDropdown((v) => !v)}
                type="button"
              >
                <i className="fa-solid fa-sort mr-2"></i>
                {sortLabel}
                <i className="fa-solid fa-chevron-down ml-2"></i>
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-[220px] bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center whitespace-nowrap" onClick={() => { setSort('default'); setShowSortDropdown(false); }}>
                    {sort === 'default' && <i className="fa-solid fa-check text-red-500 mr-2"></i>}
                    Thứ tự mặc định
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center whitespace-nowrap" onClick={() => { setSort('price-asc'); setShowSortDropdown(false); }}>
                    {sort === 'price-asc' && <i className="fa-solid fa-check text-red-500 mr-2"></i>}
                    Giá tăng dần
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center whitespace-nowrap" onClick={() => { setSort('price-desc'); setShowSortDropdown(false); }}>
                    {sort === 'price-desc' && <i className="fa-solid fa-check text-red-500 mr-2"></i>}
                    Giá giảm dần
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading && (
              <div className="col-span-full text-center text-gray-500 py-10">
                Đang tải dữ liệu sản phẩm...
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                Không tìm thấy sản phẩm phù hợp.
              </div>
            )}
            {!loading && products.map((sp) => (
              <div
                key={sp._id}
                className="relative flex flex-col bg-white rounded shadow hover:shadow-lg transition p-4 group h-full"
              >
                <Link href={`/product/${sp._id}`} className="flex-shrink-0 flex items-center justify-center h-48 mb-3 overflow-hidden">
                  <img
                    src={`/upload/product/${sp.main_image?.image}`}
                    alt={sp.main_image?.alt || sp.name}
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
                <div className="mt-auto flex flex-col gap-1">
                  {sp.sale_price && sp.sale_price > 0 ? (
                    <>
                      <span className="text-[14px] font-bold text-gray-500 absolute top-2 left-2 bg-red-600 text-white px-1 py-2 rounded-sm z-10">
                        {sp.price && sp.sale_price ? Math.round(((sp.price - sp.sale_price) / sp.price) * 100) : 0}%
                      </span>
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-gray-400 font-normal line-through text-xs">
                          {formatMoney(sp.price)}
                        </span>
                        <span className="text-red-600 font-bold text-lg">
                          {formatMoney(sp.sale_price)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div>
                      <span className="text-gray-800 font-bold text-lg">
                        {formatMoney(sp.price)}
                      </span>
                    </div>
                  )}
                  <div className="mt-2">
                    <AddToCart sp={sp} />
                  </div>
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <WishlistButton productId={sp._id} initialIsWishlisted={wishlistMap[sp._id] || false} />
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-2">
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold shadow-sm transition hover:bg-red-600 hover:text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <i className="fa-solid fa-chevron-left mr-1"></i> Trước
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`w-9 h-9 rounded-lg border text-base font-bold transition
                    ${page === i + 1
                      ? "bg-red-600 text-white border-red-600 shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"}
                  `}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold shadow-sm transition hover:bg-red-600 hover:text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Sau <i className="fa-solid fa-chevron-right ml-1"></i>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}