import { images } from "../constants/images";
export default function Hero() {
  return (
    <section className="hero py-lg-5 bg-light" id="home">
      <div className="container">
        <div className="row align-items-center">
          {/* KIRI: Teks & CTA */}
          <div className="col-lg-5 mb-4 mb-lg-0 mb-5">
            <div className="fade-in-left delay-1 me-auto">
              <h1 className="display-5 fw-bold mb-3">
                Nikmati Perjalanan Alammu -{" "}
                <span className="text-primary">Bersama Leaftrail.</span>
              </h1>
              <p className="lead text-muted mb-4">
                Leaftrail menawarkan tenda berkualitas tinggi untuk setiap
                petualang. Desain fungsional, bahan tahan lama, dan kenyamanan
                yang bisa Anda andalkan — di mana pun jejak alam membawa Anda.
              </p>
            </div>
            <div className="cta">
              <a
                href="#harga"
                className="btn btn-primary me-3 slide-up delay-2">
                Beli Sekarang
              </a>
              <a
                href="#fitur"
                className="btn btn-outline-secondary slide-right delay-2">
                Lihat Fitur
              </a>
            </div>
          </div>

          {/* KANAN: Gambar */}
          <div className="col-lg-7 text-center fade-in-right delay-1">
            <img
              src={images.hero}
              alt="Hero Leaftrail"
              className="img-fluid"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
