"use client";
import { useEffect, useRef } from "react";

const features = [
    {
        icon: "/24-hours-phone-service.png",
        title: "Phục vụ 24/7",
        desc: "Hỗ trợ khách hàng mọi lúc, mọi nơi.",
    },
    {
        icon: "/logistics-delivery-truck-in-movement.png",
        title: "Giao hàng tận nơi",
        desc: "Nhanh chóng, an toàn, tiện lợi.",
    },
    {
        icon: "/gift.png",
        title: "Miễn phí vận chuyển",
        desc: "Cam kết chất lượng và bảo hành chính hãng.",
    },
];

export default function ServiceFeatures() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const items = entry.target.querySelectorAll('.feature-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate-in');
                            }, index * 200);
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full bg-white py-8 mt-10" ref={containerRef}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {features.map((f, idx) => (
                    <div 
                        key={idx} 
                        className={`feature-item animate-stagger flex flex-col items-center text-center px-6 py-4 shadow rounded bg-gray-50 hover:bg-gray-100 transition-all duration-500 hover-lift hover-scale`}
                        style={{ transitionDelay: `${idx * 0.1}s` }}
                    >
                        <div className="relative overflow-hidden mb-3">
                            <img 
                                src={f.icon} 
                                alt={f.title} 
                                className="w-14 h-14 transition-transform duration-500 hover:scale-110" 
                            />
                        </div>
                        <h4 className="font-bold text-lg mb-1 transition-colors duration-300">{f.title}</h4>
                        <p className="text-gray-600 text-sm transition-colors duration-300">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}