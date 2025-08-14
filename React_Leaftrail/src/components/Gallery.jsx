import { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import GLightbox from "glightbox";

import "@splidejs/react-splide/css";
import "glightbox/dist/css/glightbox.min.css";

import {
  GALLERY_1_1,
  GALLERY_1_2,
  GALLERY_2_1,
  GALLERY_2_2,
  GALLERY_3_1,
  GALLERY_3_2,
  GALLERY_4_1,
  GALLERY_4_2,
  GALLERY_5_1,
  GALLERY_5_2,
} from "../constants/images";

export default function Gallery() {
  useEffect(() => {
    const lightbox = GLightbox({ selector: ".glightbox" });
    return () => lightbox.destroy();
  }, []);

  const gallerySlides = [
    [GALLERY_1_1, GALLERY_1_2],
    [GALLERY_2_1, GALLERY_2_2],
    [GALLERY_3_1, GALLERY_3_2],
    [GALLERY_4_1, GALLERY_4_2],
    [GALLERY_5_1, GALLERY_5_2],
  ];

  return (
    <section className="py-5" id="galeri">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="fw-bold">
            Temukan Leaftrail di{" "}
            <span className="text-primary">Alam Bebas</span>
          </h2>
          <p className="text-muted">
            Lihat bagaimana pengguna Leaftrail menjelajah, berkemah, dan
            menemukan rumah mereka di tengah alam.
          </p>
        </div>
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            focus: "center",
            gap: "1rem",
            autoplay: true,
            interval: 3000,
            speed: 600,
            arrows: true,
            breakpoints: {
              768: {
                perPage: 1,
                padding: { left: 50, right: 75 },
                trimSpace: false,
              },
              992: { perPage: 2 },
            },
          }}>
          {gallerySlides.map((slidePair, i) => (
            <SplideSlide key={i}>
              <div className="d-flex flex-column align-items-center justify-content-center">
                {slidePair.map((imgSrc, j) => (
                  <img
                    key={j}
                    src={imgSrc}
                    className="img-fluid rounded mb-3 glightbox"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      padding: "0 auto",
                    }}
                  />
                ))}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
