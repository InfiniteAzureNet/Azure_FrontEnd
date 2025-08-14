import { images, features } from "../constants/images";
export default function Features() {
  return (
    // <!-- SECTION: Fitur -->
    <section className="py-lg-5 bg-light-blade px-4 py-5" id="fitur">
      <div className="container">
        {/* <!-- Section Title --> */}
        <div className="section-title text-center mb-4 py-2">
          <div className="d-flex justify-content-center align-item-center mt-3">
            <img
              src={images.fiturStack}
              className="fade-in-left card-stack"></img>
            <h2 className="fw-bold mx-4">
              Dirancang untuk{" "}
              <span className="text-primary">Petualangan Sejati</span>
            </h2>
            <img
              src={images.fiturStack}
              className="fade-in-right card-stack"></img>
          </div>
          <p className="text-muted">
            Setiap tenda Leaftrail dibuat dengan detail dan fungsionalitas
            tinggi — siap menghadapi segala medan, dan tetap nyaman di setiap
            perjalanan. Inilah fitur-fitur utama yang membuat Leaftrail berbeda.
          </p>
        </div>
        {/* <!-- Fitur Cards --> */}
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 slide-up fitur-card">
              <img
                src={features.build}
                alt="Build"
                className="mx-auto mb-3"
                width="64"
              />
              <h5 className="fw-semibold">Kuat & Tahan Segala Cuaca</h5>
              <p className="text-muted small">
                Tenda Leaftrail menggunakan bahan tahan air dan angin, siap
                menghadapi kondisi ekstrem — dari hujan deras hingga angin
                pegunungan.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 slide-up fitur-card">
              <img
                src={features.portable}
                alt="Portable"
                className="mx-auto mb-3"
                width="64"
              />
              <h5 className="fw-semibold">Ringkas & Mudah Dibawa</h5>
              <p className="text-muted small">
                Desain portabel dan ringan, cocok untuk pendakian, camping, atau
                sekadar kabur dari kota. Mudah dilipat, disimpan, dan dibawa ke
                mana saja.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 slide-up fitur-card">
              <img
                src={features.tools}
                alt="Tools"
                className="mx-auto mb-3"
                width="64"
              />
              <h5 className="fw-semibold">Praktis Dipasang</h5>
              <p className="text-muted small">
                Dirancang agar bisa dipasang dalam hitungan menit — bahkan saat
                kondisi tidak ideal. Cocok untuk pemula maupun petualang
                berpengalaman.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 slide-up fitur-card">
              <img
                src={features.leaf}
                alt="Ramah Lingkungan"
                className="mx-auto mb-3"
                width="64"
              />
              <h5 className="fw-semibold">Nyaman & Ramah Lingkungan</h5>
              <p className="text-muted small">
                Ventilasi optimal dan ruang lega untuk tidur nyenyak. Material
                ramah lingkungan untuk jejak yang lebih ringan di alam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
