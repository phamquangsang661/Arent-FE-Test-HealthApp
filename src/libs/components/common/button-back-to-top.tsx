import { useEffect, useState } from "react";

export function ButtonBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleScroll);
    return () => {
      window.removeEventListener("scroll", toggleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      data-mdb-ripple="true"
      onClick={scrollToTop}
      data-mdb-ripple-color="light"
      className={`${isVisible ? "opacity-100 block" : "opacity-0 hidden"
        } fixed p-3 z-[100] hover:shadow-lg rounded-full  focus:ring-0 active:shadow-lg transition duration-500 ease-in-out md:bottom-[70px] right-[55px] bottom-[100px] md:right-[175px]`}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="component_scroll">
          <path id="&#227;&#131;&#145;&#227;&#130;&#185; 92" d="M24 0.5C36.9787 0.5 47.5 11.0213 47.5 24C47.5 36.9787 36.9787 47.5 24 47.5C11.0213 47.5 0.5 36.9787 0.5 24C0.5 11.0213 11.0213 0.5 24 0.5Z" fill="white" fillOpacity="0.01" stroke="#777777" />
          <path id="&#227;&#131;&#145;&#227;&#130;&#185; 62" d="M30.5853 28.042L24.0002 21.6579L17.4152 28.042L16.539 27.1925L24.0002 19.959L31.4615 27.1925L30.5853 28.042Z" fill="#777777" />
        </g>
      </svg>

    </button>
  );
}
