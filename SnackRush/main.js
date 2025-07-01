const url =
  "https://raw.githubusercontent.com/InfiniteAzureNet/My-assets/refs/heads/main/SnackRush/database_snackrush.json";
let allProducts = [];
// Inisialisasi Toast
const toastElement = document.getElementById("cart-toast");
const toast = new bootstrap.Toast(toastElement);

function fetchProducts() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      const selectedCategory = getSelectedCategory();
      const searchKeyword = getKeyword();
      highlightActiveCategory(selectedCategory);
      const filtered = filterProducts(selectedCategory, searchKeyword);
      renderProducts(filtered);
    })
    .catch((err) => {
      console.error("Gagal ambil data:", err);
      document.getElementById("main-content-menu").innerHTML =
        '<p class="text-danger">Gagal memuat data.</p>';
    });
}

function getSelectedCategory() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || "Semua";
}
function getKeyword() {
  const params = new URLSearchParams(window.location.search);
  return params.get("q")?.trim().toLowerCase() || "";
}

function highlightActiveCategory(selectedCategory) {
  const categoryLinks = document.querySelectorAll("[data-category]");
  categoryLinks.forEach((link) => {
    link.classList.remove("active-categories");

    if (link.dataset.category === selectedCategory) {
      link.classList.add("active-categories");
    }

    link.addEventListener("click", function (e) {
      e.preventDefault();
      const kategori = encodeURIComponent(this.dataset.category);
      window.location.href = `?category=${kategori}`;
    });
  });

  if (!selectedCategory) {
    const defaultLink = document.querySelector('[data-category="Semua"]');
    if (defaultLink) defaultLink.classList.add("active-categories");
  }
}
function filterProducts(category, keyword) {
  let filtered = allProducts;

  // Filter kategori
  if (category && category.toLowerCase() !== "semua") {
    if (category.toLowerCase() === "promo") {
      filtered = filtered.filter((p) => p.isFeatured == 1);
    } else {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  // Filter berdasarkan keyword pencarian (multi-kata)
  if (keyword) {
    const keywords = keyword.toLowerCase().split(" ");

    filtered = filtered.filter((p) =>
      keywords.every((kw) =>
        (p.name + " " + p.description + " " + p.category)
          .toLowerCase()
          .includes(kw)
      )
    );
  }

  return filtered;
}

function renderProducts(products) {
  const container = document.getElementById("main-content-menu");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML =
      '<p class="text-muted">Tidak ada produk dalam kategori ini.</p>';
    return;
  }

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${
      product.name_product
    }">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name_product}</h5>
          <p class="text-danger fw-semibold mb-2">Rp ${formatRupiah(
            product.price
          )}</p>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${
            product.id
          }">
            Launch static backdrop modal
          </button>
        
        ${generateBootstrapModalHtml(
          product.id,
          product.category,
          product.image,
          product.name_product,
          product.description,
          product.price
        )}
        
    `;
    container.appendChild(col);
  });
}
function generateBootstrapModalHtml(
  modalId,
  modalCategory,
  modalImage,
  modalNameProduct,
  modalDescription,
  modalPrice,
  isStaticBackdrop = false
) {
  const backdropAttribute = isStaticBackdrop
    ? 'data-bs-backdrop="static" data-bs-keyboard="false"'
    : "";

  return `
      <div class="modal fade" id="${modalId}" ${backdropAttribute} tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title fs-5" id="${modalId}Label">${modalCategory}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                   <div class="modal-body">
                      <div class="row align-items-center mb-4 flex-column">
                              <img src="${modalImage}" class="img-fluid rounded card-UrlImage" alt="Gambar Produk">
                              <h4  class="fw-bold mb-2 card-nameProduct">${modalNameProduct}</h4>
                              <p  class="text-muted product-description-truncate card-descProduct">
                              ${modalDescription}    
                              </p>
                              <a href="#" class="text-decoration-none d-none">Lihat lebih detail</a>
                              <h5 class="text-success fw-bold mt-3 card-priceProduct" >${modalPrice}</h5>
                         
                      </div>

                      <hr>

                      <div class="row align-items-center justify-content-center">
                          <div class="col-auto">
                              <label for="productQuantity${modalId}" class="form-label mb-0 fw-bold">Jumlah:</label>
                          </div>
                          <div class="col-auto">
                              <div class="input-group input-group-sm">
                                    <button class="btn btn-outline-secondary btn-decrement" type="button">-</button>
                                    
                                    <input
                                      id="productQuantity${modalId}" 
                                      type="number" 
                                      class="form-control text-center product-qty" 
                                      value="1" 
                                      min="1" 
                                      max="10"
                                      style="width: 60px;" 
                                      readonly>
                                    
                                    <button class="btn btn-outline-secondary btn-increment" type="button">+</button>
                              </div>
                          </div>
                          <div class="col-auto">
                          <button class="btn btn-danger btn-addCart">Tambahkan ke Keranjang</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;
}

function updateCartUI() {
  let totalHarga = 0;

  // Update badge total item
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.innerText = totalItems;

  // Update isi keranjang
  if (cart.length === 0) {
    emptyCartText.style.display = "block";
    cartList.style.display = "none";
  } else {
    emptyCartText.style.display = "none";
    cartList.style.display = "block";
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
      const subtotal = item.quantity * item.price;
      totalHarga += subtotal;

      const li = document.createElement("li");
      li.className = "list-group-item";

      li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center gap-2">
      <div class="col-2">
          <img src="${item.urlImage}" class="img-fluid cart-img" />
      </div>
      <div class="col d-flex flex-column">
          <span  class="cart-name">${item.name}</span>
          <small class="cart-qty">${item.quantity} × Rp ${formatRupiah(
        item.price
      )} = Rp ${formatRupiah(subtotal)}</small>
      </div>
      <div class="col-1 text-end">
          <button class="btn btn-sm btn-outline-danger btn-delete" data-index="${index}"><i class="bi bi-trash"></i></button>
      </div>
      </div>
  `;

      cartList.appendChild(li);
    });

    // Pasang event listener tombol hapus
    const deleteButtons = cartList.querySelectorAll(".btn-delete");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        cart.splice(index, 1);
        updateCartUI(); // Refresh UI
      });
    });
  }

  // Update total belanja
  const cartTotal = document.getElementById("cart-total");
  const totalAmount = document.getElementById("total-amount");

  if (cart.length === 0) {
    cartTotal.classList.add("d-none");
  } else {
    cartTotal.classList.remove("d-none");
    totalAmount.innerText = `Rp ${formatRupiah(totalHarga)}`;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Tampilkan toast
function showAddToCartToast() {
  toast.show();
}
// Toggle buka/tutup dropdown saat ikon diklik
const basketIcon = document.getElementById("basket-icon");
const cartDropdown = document.getElementById("cart-dropdown");

basketIcon.addEventListener("click", () => {
  cartDropdown.classList.toggle("active");
});

function formatRupiah(number) {
  return number.toLocaleString("id-ID");
}
document.body.addEventListener("click", function (event) {
  // Tombol Increment (+)
  if (event.target.classList.contains("btn-increment")) {
    // Mendapatkan elemen tombol yang diklik
    const btn = event.target;
    // Mendapatkan elemen input kuantitas yang terkait
    // Kita perlu naik ke parent input-group, lalu cari .product-qty di dalamnya
    const input = btn.closest(".input-group").querySelector(".product-qty");

    if (input) {
      let value = parseInt(input.value);
      const max = parseInt(input.max);
      if (value < max) {
        input.value = value + 1;
      }
    }
  }

  // Tombol Decrement (-)
  if (event.target.classList.contains("btn-decrement")) {
    // Mendapatkan elemen tombol yang diklik
    const btn = event.target;
    // Mendapatkan elemen input kuantitas yang terkait
    // Kita perlu naik ke parent input-group, lalu cari .product-qty di dalamnya
    const input = btn.closest(".input-group").querySelector(".product-qty");

    if (input) {
      let value = parseInt(input.value);
      const min = parseInt(input.min);
      if (value > min) {
        input.value = value - 1;
      }
    }
  }
});

// Deklarasi variabel global di bagian paling atas script
// Ambil cart dari localStorage saat halaman dimuat
const savedCart = localStorage.getItem("cart");
const cart = savedCart ? JSON.parse(savedCart) : [];

const cartBadge = document.getElementById("cart-badge");
const cartList = document.getElementById("cart-list");
const emptyCartText = document.getElementById("empty-cart");
document.body.addEventListener("click", function (event) {
  // Periksa apakah elemen yang diklik (event.target) memiliki kelas 'btn-addCart'
  if (event.target.classList.contains("btn-addCart")) {
    // Hentikan perilaku default jika tombol adalah tautan atau memiliki form
    // event.preventDefault(); // Uncomment jika tombol ini adalah <a> atau <button type="submit">

    // Dapatkan tombol yang diklik
    const btn = event.target;
    // Cari modal terdekat dari tombol
    const modalElement = btn.closest(".modal");

    // Dapatkan kartu produk terdekat dari tombol yang diklik
    // Menggunakan .closest('.card') sangat efisien untuk menemukan ancestor terdekat
    const card = btn.closest(".card");

    // Pastikan kartu ditemukan sebelum melanjutkan
    if (card) {
      // Ambil data produk dari elemen-elemen di dalam kartu
      const imgElement = card.querySelector(".card-UrlImage");
      const urlImage = imgElement ? imgElement.src : ""; // Pastikan imgElement ada
      const productName =
        card.querySelector(".card-nameProduct")?.innerText || ""; // Optional chaining dan fallback
      const productdesc =
        card.querySelector(".card-descProduct")?.innerText || "";
      const qtyInput = card.querySelector(".product-qty");
      const quantity = qtyInput ? parseInt(qtyInput.value) : 1; // Default ke 1 jika tidak ditemukan
      const priceText =
        card.querySelector(".card-priceProduct")?.innerText || "";
      const price = parseInt(priceText.replace(/[^\d]/g, "")) || 0; // Pastikan konversi angka

      // Cek apakah produk sudah ada di keranjang
      const existing = cart.find((item) => item.name === productName);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ name: productName, urlImage, quantity, price });
      }

      // Perbarui UI keranjang
      updateCartUI();
      showAddToCartToast(); // Tampilkan notifikasi
      // Jika ada modal ditemukan, tutup
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      // Reset kuantitas input menjadi 1 setelah ditambahkan ke keranjang
      if (qtyInput) {
        qtyInput.value = 1;
      }
    }
  }
});
updateCartUI();
fetchProducts();
