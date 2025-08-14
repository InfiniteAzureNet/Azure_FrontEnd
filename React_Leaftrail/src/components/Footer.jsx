import React from "react";

const Footer = () => {
  return (
    <footer className="text-dark py-5 mt-5 border-top px-4">
      <div className="container">
        <div className="row gy-4 justify-content-between">
          {/* Branding */}
          <div className="col-lg-4">
            <h5 className="fw-bold mb-2">Leaftrail</h5>
            <p className="text-muted small">
              Tenda berkualitas untuk menemani camping selama perjalanan anda
              menjelajahi alam. Leaftrail hadir untuk membuat kesan di setiap
              momen anda menikmati alam yang indah.
            </p>
          </div>

          {/* Navigasi */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-semibold mb-3">Navigasi</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#home" className="text-muted text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#fitur" className="text-muted text-decoration-none">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#galeri" className="text-muted text-decoration-none">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#harga" className="text-muted text-decoration-none">
                  Harga
                </a>
              </li>
              <li>
                <a
                  href="#testimoni"
                  className="text-muted text-decoration-none">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-muted text-decoration-none">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak & Sosial */}
          <div className="col-lg-4">
            <h6 className="fw-semibold">Hubungi Kami</h6>
            <p className="text-muted small mb-1">
              Email: support@vortexvibe.com
            </p>
            <p className="text-muted small mb-2">WhatsApp: +62 812-3456-7890</p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted fs-5">
                <i className="bi bi-instagram instagram"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted fs-5">
                <i className="bi bi-facebook facebook"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted fs-5">
                <i className="bi bi-twitter-x twitter"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted fs-5">
                <i className="bi bi-youtube youtube"></i>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 mt-4 border-top small text-muted">
            © 2025 Leaftrail. All rights reserved.
          </div>
          <div className="text-center mt-2 small text-muted">
            Property by Human and AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
