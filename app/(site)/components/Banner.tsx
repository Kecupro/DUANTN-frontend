"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/banner1.jpg",
    title: "Đồng hồ cao cấp",
    desc: "Khám phá bộ sưu tập đồng hồ sang trọng, đẳng cấp quốc tế.",
  },
  {
    image: "/banner3.jpg",
    title: "Bảo hành chính hãng",
    desc: "Cam kết bảo hành 5 năm cho mọi sản phẩm tại cửa hàng.",
  },
   {
    image: "/banner4.jpg",
    title: "Đồng hồ cao cấp",
    desc: "Giảm giá lên đến 30% cho các mẫu mới nhất trong tháng này.",
  },
   {
    image: "/banner8.jpg",
    title: "Ưu đãi đặc biệt",
    desc: "Giảm giá lên đến 30% cho các mẫu mới nhất trong tháng này.",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTransitioning) {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, isTransitioning]);

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== current) {
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  return (
    <div className="relative w-full h-96 md:h-[750px] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            idx === current 
              ? "opacity-100 z-10 scale-100" 
              : "opacity-0 z-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              idx === current ? "animate-zoom" : ""
            }`}
          />
          <div className="absolute inset-0 bg-opacity-10 bg-black/50 backdrop-blur-sm opacity-30"></div>
          <div 
            className={`absolute inset-0 flex flex-col justify-center items-start text-left text-white z-10 pl-10 md:pl-20
              transition-all duration-700 ease-out
              ${idx === current 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-10"
              }
            `}
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-2 px-15 animate-slide-up">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg bg-opacity-50 rounded mx-15 py-2 max-w-xl md:max-w-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
              {slide.desc}
            </p>
            <button
              className="bg-black border-2 border-red-700 hover:bg-red-700 text-white font-semibold mx-15 px-6 py-2 rounded transition-all duration-300 mt-4 hover-lift hover-glow animate-slide-up"
              style={{animationDelay: '0.4s'}}
              onClick={() => window.location.href = "/shop"}
            >
              MUA NGAY 
            </button>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full p-2 z-20 text-2xl transition-all duration-300 hover-scale disabled:opacity-50"
        aria-label="Trước"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full p-2 z-20 text-2xl transition-all duration-300 hover-scale disabled:opacity-50"
        aria-label="Sau"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover-scale ${
              idx === current 
                ? "bg-white scale-125" 
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Chọn slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}