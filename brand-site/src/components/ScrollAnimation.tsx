"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const animateElements = document.querySelectorAll("[data-animate]");

    animateElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute("data-animate-delay") || "0");

      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: el as HTMLElement,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
