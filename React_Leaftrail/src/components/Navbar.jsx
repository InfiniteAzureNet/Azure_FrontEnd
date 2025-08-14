import { images } from "../constants/images";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <div className="container">
        {/* Logo + Teks */}
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img
            src={images.logoNav}
            alt="Leaf Trail"
            width="60"
            height="60"
            className="me-2"
          />
          <span className="fw-bold">Leaftrail</span>
        </a>

        {/* CTA Button */}
        <a
          href="#harga"
          className="btn btn-outline-primary ms-lg-3 order-lg-3 ms-auto me-2">
          <span className="d-none d-lg-inline">Beli Sekarang</span>
          <i className="d-lg-none bi bi-bag"></i>
        </a>

        {/* Toggle Button (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0 order-lg-2 gap-lg-4 gap-sm-2">
            <li className="nav-item">
              <a className="nav-link active" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#fitur">
                Fitur
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#galeri">
                Galeri
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#harga">
                Harga
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#testimoni">
                Testimoni
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#kontak">
                Kontak
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
