// src/components/Testimoni.jsx
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { TESTIMONI_DATA } from "../constants/data";

// Fungsi pembantu untuk menampilkan bintang
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
  }

  if (hasHalfStar) {
    stars.push(<i key="half" className="bi bi-star-half"></i>);
  }
  return stars;
};

const Testimoni = () => {
  // State untuk menyimpan data testimoni
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    fetch(TESTIMONI_DATA)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []); // Array kosong berarti useEffect hanya berjalan satu kali

  // Tampilkan loading state atau error message
  if (loading) {
    return <div>Loading testimonials...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="py-5" id="testimoni">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="fw-bold">
            Apa Kata Mereka Tentang{" "}
            <span className="text-primary"> Leaftrail?</span>
          </h2>
          <p className="text-muted">
            Dari solo camper hingga keluarga petualang, inilah cerita mereka
            bersama Leaftrail di tengah alam bebas.
          </p>
        </div>

        <div id="testimoniSplide" className="splide splide-testimoni">
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              focus: "center",
              gap: "1rem",
              arrows: true,
              pagination: false,
              breakpoints: {
                768: {
                  perPage: 1,
                },
                992: {
                  perPage: 2,
                },
              },
            }}
            aria-label="Testimonials">
            {testimonials.map((testimoni, index) => (
              <SplideSlide key={index}>
                <div className="card border-0 shadow-sm p-4 text-center h-100">
                  <img
                    src={testimoni.avatar}
                    alt={`User ${index + 1}`}
                    className="rounded-circle mb-3 align-self-center mb-4"
                    width="80"
                    height="80"
                  />
                  <p className="mb-2 fst-italic text-muted">
                    “{testimoni.comment}”
                  </p>
                  <div className="text-warning mb-2">
                    {renderStars(testimoni.rating)}
                  </div>
                  <h6 className="fw-semibold mb-0">{testimoni.name}</h6>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
