import { useState } from "react";
import {
  PRODUCT_BASIC_1,
  PRODUCT_BASIC_2,
  PRODUCT_BASIC_3,
  PRODUCT_PRO_1,
  PRODUCT_PRO_2,
  PRODUCT_PRO_3,
  PRODUCT_PREMIUM_1,
  PRODUCT_PREMIUM_2,
  PRODUCT_PREMIUM_3,
  images,
} from "../constants/images";

const productData = [
  {
    type: "basic",
    title: "CampGo Lite",
    defaultImage: PRODUCT_BASIC_1,
    colors: [
      { id: "paket-basic-1", hex: "#192c33", img: PRODUCT_BASIC_1 },
      { id: "paket-basic-2", hex: "#ceb386", img: PRODUCT_BASIC_2 },
      { id: "paket-basic-3", hex: "#3f423b", img: PRODUCT_BASIC_3 },
    ],
    price: "Rp400K",
    features: [
      "Desain ringkas dan mudah dibawa",
      "Cocok untuk solo camping atau perjalanan singkat",
      "Struktur dasar, tanpa sistem ventilasi lanjutan",
      "Material tahan air ringan (level dasar)",
    ],
    btnClass: "btn-outline-secondary",
    btnText: "Pilih Paket",
  },
  {
    type: "pro",
    title: "CampGo Plus",
    defaultImage: PRODUCT_PRO_1,
    colors: [
      { id: "paket-pro-1", hex: "#103753", img: PRODUCT_PRO_1 },
      { id: "paket-pro-2", hex: "#4e4a49", img: PRODUCT_PRO_2 },
      { id: "paket-pro-3", hex: "#f4866f", img: PRODUCT_PRO_3 },
    ],
    price: "Rp1.400K",
    features: [
      "Material rainproof tahan hujan sedang hingga lebat",
      "Sistem ventilasi ganda untuk sirkulasi udara optimal",
      "Ruang tambahan untuk 2–3 orang",
      "Cocok untuk camping multi-hari & cuaca tidak menentu",
    ],
    badge: "Paling Populer",
    btnClass: "btn-primary",
    btnText: "Pilih Paket Ini",
  },
  {
    type: "premium",
    title: "CampGo Ultra",
    defaultImage: PRODUCT_PREMIUM_1,
    colors: [
      { id: "paket-premium-1", hex: "#081333", img: PRODUCT_PREMIUM_1 },
      { id: "paket-premium-2", hex: "#ddc390", img: PRODUCT_PREMIUM_2 },
      { id: "paket-premium-3", hex: "#4e6869", img: PRODUCT_PREMIUM_3 },
    ],
    price: "Rp3.200K",
    features: [
      "Material teknologi tinggi — anti air & isolasi suhu",
      "Sistem Quick Setup – tenda berdiri dalam hitungan menit",
      "Ventilasi 360° dengan jaring anti-serangga",
      "Ruang ekstra luas & fitur tambahan untuk kenyamanan maksimal",
    ],
    btnClass: "btn-outline-warning",
    btnText: "Pilih Paket",
  },
];

export default function PriceProduct() {
  const [selectedImages, setSelectedImages] = useState({
    basic: PRODUCT_BASIC_1,
    pro: PRODUCT_PRO_1,
    premium: PRODUCT_PREMIUM_1,
  });

  const handleColorChange = (type, img) => {
    setSelectedImages((prev) => ({ ...prev, [type]: img }));
  };

  return (
    <section className="py-5 bg-light-blade px-3" id="harga">
      <div className="container">
        <div className="section-title text-center mb-lg-5 mb-2">
          <div className="d-flex justify-content-center align-item-center mt-3 mb-3">
            <img
              src={images.hargaStack}
              className="fade-in-left card-stack"
              alt=""
            />
            <h2 className="fw-bold mx-4">
              Pilih <span className="text-primary">Paket</span> Anda
            </h2>
            <img
              src={images.hargaStack}
              className="fade-in-right card-stack"
              alt=""
            />
          </div>
          <p className="text-muted">
            Temukan paket yang paling sesuai dengan kebutuhan dan gaya hidup
            Anda.
          </p>
        </div>

        <div className="row justify-content-center py-3">
          {productData.map((product) => (
            <div key={product.type} className="col-md-6 col-lg-4 mb-4">
              <div
                className={`card h-100 border-0 ${
                  product.badge ? "shadow-glow position-relative" : "shadow-sm"
                } text-center bg-white`}>
                {product.badge && (
                  <div className="position-absolute top-0 start-50 translate-middle badge bg-primary px-4 py-2 text-white">
                    {product.badge}
                  </div>
                )}
                <img
                  src={selectedImages[product.type]}
                  alt={`${product.title} Plan`}
                  className="w-50 mx-auto mt-4"
                />
                <h5 className="fw-bold text-primary mb-2">{product.title}</h5>
                <div className="container mt-3">
                  <div className="d-flex gap-4 align-items-center justify-content-center">
                    {product.colors.map((color) => (
                      <div key={color.id}>
                        <input
                          type="radio"
                          name={`color-${product.type}`}
                          id={color.id}
                          hidden
                          onChange={() =>
                            handleColorChange(product.type, color.img)
                          }
                        />
                        <label
                          htmlFor={color.id}
                          className={`btn-color-option-${product.type}`}
                          style={{ backgroundColor: color.hex }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-body px-4">
                  <h6 className="text-primary display-6 fw-bold">
                    {product.price}
                  </h6>
                  <ul className="list-unstyled my-4 text-muted small text-start">
                    {product.features.map((feature, i) => (
                      <li key={i}>✔ {feature}</li>
                    ))}
                  </ul>
                  <a href="#kontak" className={`btn ${product.btnClass} w-100`}>
                    {product.btnText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
