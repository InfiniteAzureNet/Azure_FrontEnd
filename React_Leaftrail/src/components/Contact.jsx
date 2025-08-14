import React, { useState } from "react";
import { e_commerce } from "../constants/images";
const Contact = () => {
  // State untuk mengelola input formulir
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  // State untuk validasi formulir (jika diperlukan)
  const [isValidated, setIsValidated] = useState(false);

  // Handler untuk setiap perubahan input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handler saat formulir disubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman default

    // Logika validasi
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Lakukan sesuatu dengan formData, misalnya kirim ke API
      console.log("Formulir berhasil disubmit:", formData);
      alert("Pesan Anda telah dikirim!");
      // Reset formulir setelah dikirim
      setFormData({ nama: "", email: "", pesan: "" });
      setIsValidated(false);
    }
    setIsValidated(true);
  };

  return (
    <section className="py-5 bg-light-blade" id="kontak">
      <div className="container px-5">
        {/* Section Title */}
        <div className="section-title text-center mb-5">
          <h2 className="fw-bold">
            Hubungi <span className="text-primary">Kami</span>
          </h2>
          <p className="text-muted">
            Ada pertanyaan seputar produk? Tim kami siap membantu kapan pun kamu
            butuh.
          </p>
        </div>

        {/* Card Wrapper */}
        <div className="row justify-content-center shadow rounded py-5 px-2 gap-4 text-white bg-dark">
          {/* Formulir Kontak */}
          <div className="col-lg-6">
            <form
              id="kontakForm"
              noValidate
              onSubmit={handleSubmit}
              className={isValidated ? "was-validated" : ""}>
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nama"
                  placeholder="Masukkan nama kamu"
                  required
                  value={formData.nama}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">Nama wajib diisi.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Alamat Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="nama@email.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">Email wajib diisi.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="pesan" className="form-label">
                  Pesan
                </label>
                <textarea
                  className="form-control"
                  id="pesan"
                  rows="4"
                  placeholder="Tulis pertanyaan kamu di sini..."
                  required
                  value={formData.pesan}
                  onChange={handleInputChange}></textarea>
                <div className="invalid-feedback">
                  Pesan tidak boleh kosong.
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Info & Icon E-commerce */}
          <div className="col-lg-5 mt-5 mt-lg-0 text-center">
            <img
              src={e_commerce.kontak}
              alt="Hubungi Kami"
              className="img-fluid mb-3"
            />
            <h5 className="fw-semibold mb-3">Tersedia di</h5>
            <div className="d-flex justify-content-center gap-5 align-items-center mb-4">
              <a
                href="https://www.tokopedia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-ecommerce">
                <img
                  src={e_commerce.tokopedia}
                  alt="Tokopedia"
                  width="40"
                  height="40"
                />
              </a>
              <a
                href="https://shopee.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-ecommerce">
                <img
                  src={e_commerce.shopee}
                  alt="Shopee"
                  width="40"
                  height="40"
                />
              </a>
              <a
                href="https://www.bukalapak.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-ecommerce">
                <img
                  src={e_commerce.bukalapak}
                  alt="Bukalapak"
                  width="40"
                  height="40"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
