"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState, useRef } from "react";
import { IBrand } from "../cautrucdata";

export default function Categories() {
	const [brands, setBrands] = useState<IBrand[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const API_URL = process.env.NEXT_PUBLIC_API_URL;

	// Fetch danh sách thương hiệu
	useEffect(() => {
		fetch(`${API_URL}/api/brand`)
			.then((res) => res.json())
			.then((data) => setBrands(data))
			.catch((err) => console.error("Lỗi fetch brand:", err));
	}, []);

	// Intersection Observer for staggered animations
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const items = entry.target.querySelectorAll('.stagger-item');
						items.forEach((item, index) => {
							setTimeout(() => {
								item.classList.add('animate-in');
							}, index * 100);
						});
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div className="w-full py-8" ref={containerRef}>
			<h3 className="text-center font-bold text-2xl mb-3 animate-section">
				THƯƠNG HIỆU SẢN PHẨM
			</h3>
			<div className="mx-auto mb-8 w-30 h-1 bg-red-700 rounded animate-section"></div>
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
					{brands.map((cat, idx) => (
						<SwiperSlide key={idx}>
							<div className="w-full h-full p-2 stagger-item animate-stagger">
								<Link
									href={'/'}
									className="flex flex-col items-center text-center bg-white rounded shadow hover:shadow-lg transition-all duration-500 group w-full h-full hover-lift "
								>
									<div className="overflow-hidden w-full h-full">
										<img
											src={`/upload/brand/${cat.image}.webp`}
											alt={cat.name}
											className="w-full h-full object-contain mb-3 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2"
										/>
									</div>
									<div className="w-full px-2 py-2 transition-all duration-500 group-hover:bg-gray-900 group-hover:text-white group-hover:-translate-y-2">
										<span className="block font-semibold text-base text-gray-800 group-hover:text-white transition-colors duration-300">
											{cat.name}
										</span>
										<span className="block text-[10px] text-gray-500 group-hover:text-white transition-colors duration-300">
											{cat.productCount} SẢN PHẨM
										</span>
									</div>
								</Link>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}