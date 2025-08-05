const url =
  "https://raw.githubusercontent.com/InfiniteAzureNet/My-assets/refs/heads/main/SnackRush/database_snackrush.json";
let allProducts = [];
// Inisialisasi Toast
const toastElement = document.getElementById("cart-toast");
const toast = new bootstrap.Toast(toastElement);
// Toggle buka/tutup dropdown saat ikon diklik
const basketIcon = document.getElementById("basket-icon");
const cartDropdown = document.getElementById("cart-dropdown");

const savedCart = localStorage.getItem("cart");
const cart = savedCart ? JSON.parse(savedCart) : [];

function fetchProducts() {
  fetch(url)
    .then((res) => {
      console.log("↪️  Response status:", res.status, res.statusText);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      allProducts = data;

      const selectedCategory = getSelectedCategory(); // misal: "snack"
      const searchKeyword = getKeyword(); // misal: "keripik"

      highlightActiveCategory(selectedCategory);

      const filtered = filterProducts(selectedCategory, searchKeyword);
      renderProducts(filtered); // tampilkan semua produk yang sesuai
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

  const cat = category?.toLowerCase();
  const key = keyword?.toLowerCase();

  // Filter berdasarkan kategori
  if (cat && cat !== "semua") {
    if (cat === "promo") {
      filtered = filtered.filter((p) => p.isFeatured == 1);
    } else {
      filtered = filtered.filter((p) => p.category?.toLowerCase() === cat);
    }
  }

  // Filter berdasarkan keyword pencarian (multi-kata)
  if (key) {
    const keywords = key.split(" ");

    filtered = filtered.filter((p) => {
      const searchTarget = [p.name_product, p.description, p.category]
        .join(" ")
        .toLowerCase();

      return keywords.every((kw) => searchTarget.includes(kw));
    });
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
        <div class="card-body text-center d-flex flex-column">
          <h5 class="card-title">${product.name_product}</h5>
          <p class="text-danger fw-semibold">Rp ${formatRupiah(
            product.price
          )}</p>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary w-100 mt-auto" data-bs-toggle="modal" data-bs-target="#${
            product.id
          }">
            Pesan Sekarang
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
function renderRekomendasiProduk(products) {
  const menuContainer = document.getElementById("recommendation-list");
  menuContainer.innerHTML = "";

  if (products.length === 0) {
    menuContainer.innerHTML =
      '<p class="text-muted">Tidak ada produk dalam kategori ini.</p>';
    return;
  }

  products.forEach(({ image, name_product, price }) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center gap-3 list-group-item-recom";
    li.innerHTML = `
      <img src="${image}" class="img-fluid cart-img rounded col-2 recom-img" alt="${name_product}">
      <div class="flex-grow-1">
        <strong class="recom-name">${name_product}</strong>
        <div class="text-muted small recom-price">Rp ${price.toLocaleString()}</div>
      </div>
      <button class="btn btn-sm btn-outline-primary btn-addCartRecom">
      +
        <i class="bi bi-cart-plus"></i>
      </button>
    `;
    menuContainer.appendChild(li);
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
                              <h4  class="fw-bold mb-2 card-nameProduct mt-3">${modalNameProduct}</h4>
                              <p  class="text-muted product-description-truncate card-descProduct">
                              ${modalDescription}    
                              </p>
                              <a href="#" class="text-decoration-none d-none">Lihat lebih detail</a>
                              <h5 class="text-danger fw-bold mt-3 card-priceProduct" >Rp ${modalPrice}</h5>
                         
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
                          <button class="btn btn-danger btn-addCart"><i class="bi bi-cart-plus-fill"></i></button>
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

  const cartBadge = document.getElementById("cart-badge");
  const cartList = document.getElementById("cart-list");
  const cartCheckout = document.getElementById("cart-checkout");
  const emptyCartText = document.getElementById("empty-cart");

  if (cartBadge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalItems;
  }

  // Pilih list target aktif
  const activeCartList = cartList || cartCheckout;

  if (!activeCartList) return;

  if (cart.length === 0) {
    if (emptyCartText) emptyCartText.style.display = "block";
    activeCartList.style.display = "none";
  } else {
    if (emptyCartText) emptyCartText.style.display = "none";
    activeCartList.style.display = "block";
    activeCartList.innerHTML = "";

    cart.forEach((item, index) => {
      const subtotal = item.quantity * item.price;
      totalHarga += subtotal;

      const li = document.createElement("li");
      li.className = "list-group-item";

      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center gap-2">
          <div class="col-3">
              <img src="${item.urlImage}" class="img-fluid cart-img" />
          </div>
          <div class="col d-flex flex-column">
              <span class="cart-name">${item.name}</span>
              <small class="cart-qty">${item.quantity} × Rp ${formatRupiah(
        item.price
      )} = Rp ${formatRupiah(subtotal)}</small>
          </div>
          <div class="col-1 text-end">
              <button class="btn btn-sm btn-outline-danger btn-delete" data-index="${index}"><i class="bi bi-trash"></i></button>
          </div>
        </div>`;

      activeCartList.appendChild(li);
    });

    // Event listener tombol hapus
    const deleteButtons = activeCartList.querySelectorAll(".btn-delete");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        cart.splice(index, 1);
        updateCartUI(); // Refresh ulang UI
      });
    });
  }

  // Update total belanja (opsional, kalau ada di checkout)
  const cartTotal = document.getElementById("cart-total");
  const totalAmount = document.getElementById("total-amount");

  if (cartTotal && totalAmount) {
    if (cart.length === 0) {
      cartTotal.classList.add("d-none");
    } else {
      cartTotal.classList.remove("d-none");
      totalAmount.innerText = `Rp ${formatRupiah(totalHarga)}`;
    }
  }

  // Simpan cart ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Tampilkan toast
function showAddToCartToast() {
  toast.show();
}

function initBasketToggle() {
  document.body.addEventListener("click", function (event) {
    const target = event.target;

    // Periksa apakah yang diklik adalah basketIcon atau elemen di dalamnya
    if (target.closest("#basket-icon")) {
      const cartDropdown = document.querySelector("#cart-dropdown");
      cartDropdown?.classList.toggle("active");
    } else {
      // Tutup dropdown jika klik di luar
      const cartDropdown = document.querySelector("#cart-dropdown");
      const isClickInsideDropdown = target.closest("#cart-dropdown");
      if (!isClickInsideDropdown) {
        cartDropdown?.classList.remove("active");
      }
    }
  });
}

function formatRupiah(number) {
  return number.toLocaleString("id-ID");
}

function initAddToCartHandler() {
  document.body.addEventListener("click", function (event) {
    const btn = event.target.closest(".btn-addCart");
    const btnRecom = event.target.closest(".btn-addCartRecom");

    if (!btn && !btnRecom) return;

    let product = null;

    // 🔍 Jika tombol dari Card
    if (btn) {
      const card = btn.closest(".card");
      const modalElement = btn.closest(".modal");

      if (!card) return;

      product = getProductFromCard(card);
      console.log("Dari Card");

      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
      }

      const qtyInput = card.querySelector(".product-qty");
      if (qtyInput) qtyInput.value = 1;
      showAddToCartToast();
    }

    // 🔍 Jika tombol dari List Rekomendasi
    else if (btnRecom) {
      const listItem = btnRecom.closest(".list-group-item-recom");
      if (!listItem) return;

      product = getProductFromRecom(listItem);
    }

    if (!product) return;

    const existing = cart.find((item) => item.name === product.name);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    updateCartUI();
    renderCartTo();
    showAddToCartToast();
  });
}

function getProductFromCard(card) {
  const imgElement = card.querySelector(".card-UrlImage");
  const name = card.querySelector(".card-nameProduct")?.innerText || "";
  const description = card.querySelector(".card-descProduct")?.innerText || "";
  const qtyInput = card.querySelector(".product-qty");
  const priceText = card.querySelector(".card-priceProduct")?.innerText || "";

  const urlImage = imgElement ? imgElement.src : "";
  const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
  const price = parseInt(priceText.replace(/[^\d]/g, "")) || 0;

  if (!name) return null;

  return { name, description, urlImage, quantity, price };
}
function getProductFromRecom(list) {
  const imgElement = list.querySelector(".recom-img");
  const name = list.querySelector(".recom-name")?.innerText || "";
  const priceText = list.querySelector(".recom-price")?.innerText || "";

  const urlImage = imgElement?.src || "";
  const price = parseInt(priceText.replace(/[^\d]/g, "")) || 0;

  // Karena qty tidak diinput user, kita set langsung
  const quantity = 1;

  if (!name) return null;

  return { name, urlImage, quantity, price };
}

function initQtyButtons() {
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-increment")) {
      handleQuantityChange(event.target, "increment");
    }

    if (event.target.classList.contains("btn-decrement")) {
      handleQuantityChange(event.target, "decrement");
    }
  });
}

function handleQuantityChange(button, type) {
  const input = button.closest(".input-group").querySelector(".product-qty");
  if (!input) return;

  let value = parseInt(input.value);
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 99;

  if (type === "increment" && value < max) {
    input.value = value + 1;
  }

  if (type === "decrement" && value > min) {
    input.value = value - 1;
  }

  input.dispatchEvent(new Event("change")); // Optional trigger
}

function renderCartTo() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-checkout");
  const totalAmount = document.getElementById("total-amount");
  let totalHarga = 0;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<li class="list-group-item text-muted">Keranjang kosong</li>`;
    if (totalAmount) totalAmount.textContent = "Rp 0";
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    totalHarga += subtotal;

    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center gap-2";
    li.innerHTML = `
      <img src="${item.urlImage}" class="img-fluid cart-img col-2" />
      <div class="col">
        <strong>${item.name}</strong>
        <div class="small text-muted">Qty: ${item.quantity}</div>
        <span class="text-end col">Rp ${subtotal.toLocaleString()}</span>
      </div>
      <div class="col-1 text-end">
        <button class="btn btn-sm btn-outline-danger btn-delete" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    cartList.appendChild(li);
  });

  if (totalAmount) {
    totalAmount.textContent = `Rp ${formatRupiah(totalHarga)}`;
  }

  // Handler tombol hapus
  cartList.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartTo(); // render ulang halaman checkout
    });
  });
}
function fetchProductRecommendation() {
  const url =
    "https://raw.githubusercontent.com/InfiniteAzureNet/My-assets/refs/heads/main/SnackRush/database_snackrush.json";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Filter hanya yang promo / isFeatured === 1
      const shuffled = data
        .filter((p) => p.isFeatured == 1)
        .sort(() => 0.5 - Math.random()) // acak urutan
        .slice(0, 4);

      renderRekomendasiProduk(shuffled);
    })
    .catch((err) => {
      console.error("❌ Gagal memuat rekomendasi:", err);
      const list = document.getElementById("recommendation-list");
      if (list) {
        list.innerHTML =
          '<li class="list-group-item text-danger">Gagal memuat rekomendasi produk.</li>';
      }
    });
}

initBasketToggle();
initAddToCartHandler();
initQtyButtons();
updateCartUI();


