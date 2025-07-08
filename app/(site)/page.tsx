"use client";
import { useEffect, useRef } from "react";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import ProductNew from "./components/ProductNew";
import ServiceFeatures from "./components/ServiceFeatures";
import News from "./components/News";
import Feedback from "./components/Feedback";
import ProductSale from "./components/ProductSale";

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="">
      <Banner />
      <section 
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="animate-section"
      >
        <ServiceFeatures />
      </section>
      <section 
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="animate-section"
      >
        <Categories />
      </section>
      <section 
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="animate-section"
      >
        <ProductNew/>
      </section>
      <section 
        ref={(el) => {
          sectionsRef.current[3] = el;
        }}
        className="animate-section"
      >
        <ProductSale />
      </section>
      <section 
        ref={(el) => {
          sectionsRef.current[4] = el;
        }}
        className="animate-section"
      >
        <News />
      </section>
      <section 
        ref={(el) => {
          sectionsRef.current[5] = el;
        }}
        className="animate-section"
      >
        <Feedback />
      </section>
    </div>
  );
}
