<?php
require_once 'koneksidb.php';
include('fungsi.php');
$sql = "SELECT * FROM artikel";
$all = $koneksi->query($sql);
$sql1 = "SELECT nama_kategori FROM kategori";
$all1 = $koneksi->query($sql1);
?>
<?php
// Tentukan jumlah artikel per halaman
$per_page = 6;

// Ambil halaman aktif dari URL (default 1)
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page < 1) $page = 1;

// Hitung offset
$offset = ($page - 1) * $per_page;

// Hitung total artikel
$total_query = mysqli_query($koneksi, "SELECT COUNT(*) as total FROM artikel");
$total_data = mysqli_fetch_assoc($total_query)['total'];

// Hitung total halaman
$total_pages = ceil($total_data / $per_page);

// Query artikel dengan pagination
$semua = mysqli_query($koneksi, "
    SELECT * FROM artikel 
    ORDER BY tanggal_upload DESC 
    LIMIT $per_page OFFSET $offset
");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>GoNature</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="admin/assets/img/logo.ico" />
    <link href="admin/css/styles1.css" rel="stylesheet" />
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</head>

<body>
    <!-- Navbar GoNature -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-2 shadow-sm">
        <div class="container">

            <!-- Brand -->
            <a class="navbar-brand fw-bold text-uppercase" href="index.php">
                <img src="admin/assets/img/logo1.png" alt="" width="35" height="35" class="me-2">
                GoNature
            </a>

            <!-- Toggle -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu & Medsos -->
            <div class="collapse navbar-collapse" id="navbarContent">

                <!-- Menu Tengah -->
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.php">Home</a>
                    </li>

                    <!-- Dropdown Destinasi -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="destinasiDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Destinasi
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="destinasiDropdown">
                            <li><a class="dropdown-item" href="kategori.php?kategori=Pantai">🏖️ Pantai</a></li>
                            <li><a class="dropdown-item" href="kategori.php?kategori=Gunung">⛰️ Gunung</a></li>
                            <li><a class="dropdown-item" href="kategori.php?kategori=Hutan">🌳 Hutan</a></li>
                            <li><a class="dropdown-item" href="kategori.php?kategori=Danau">🏞️ Danau</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="index.php#galeri">Galeri</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.php">Tentang Kami</a>
                    </li>
                </ul>

                <!-- Ikon Media Sosial -->
                <div class="d-flex">
                    <a href="https://instagram.com" class="text-white me-3 fs-5" target="_blank"><i class="bi bi-instagram"></i></a>
                    <a href="https://facebook.com" class="text-white me-3 fs-5" target="_blank"><i class="bi bi-facebook"></i></a>
                    <a href="https://twitter.com" class="text-white fs-5" target="_blank"><i class="bi bi-twitter"></i></a>
                </div>
            </div>
        </div>
    </nav>
    <section class="hero d-flex align-items-center text-center text-white">
        <div class="container">
            <h1 class="display-4 fw-bold">Jelajahi Keindahan Alam Indonesia</h1>
            <p class="lead mb-4">Temukan destinasi wisata alam terbaik dari Sabang sampai Merauke</p>
            <a href="#destinasi" class="btn btn-success btn-lg me-3">Lihat Destinasi</a>
            <a href="blog.php" class="btn btn-outline-light btn-lg">Mulai Petualangan</a>
        </div>
    </section>
    <section class="py-5 bg-light" id="destinasi-populer">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="fw-bold">Destinasi Populer</h2>
                <p class="text-muted">Jelajahi destinasi wisata alam terpopuler dari setiap kategori.</p>
            </div>

            <div class="row g-4 justify-content-center">
                <?php
                $query = mysqli_query($koneksi, "
                SELECT a.*
                FROM artikel a
                JOIN (
                    SELECT kategori, MAX(views) AS max_views
                    FROM artikel
                    GROUP BY kategori
                ) b ON a.kategori = b.kategori AND a.views = b.max_views
                ORDER BY views DESC
            ");
                while ($data = mysqli_fetch_assoc($query)) {
                ?>
                    <div class="col-lg-4 col-md-6">
                        <div class="card border-0 shadow-sm h-100">
                            <!-- Gambar + Badge kategori -->
                            <div class="overflow-hidden position-relative" style="max-height: 220px;">
                                <a href="post.php?myid=<?= $data['id_artikel'] ?>">
                                    <img class="card-img-top" src="image_view.php?id=<?= $data['id_artikel'] ?>" alt="<?= htmlspecialchars($data['judul']) ?>">
                                </a>
                                <span class="badge bg-success position-absolute top-0 end-0 m-2 shadow-sm">
                                    <?= htmlspecialchars($data['kategori']) ?>
                                </span>
                            </div>

                            <!-- Body -->
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title"><?= htmlspecialchars($data['destinasi']) ?></h5>
                                <div class="small text-muted mb-2">
                                    <?= number_format($data['views']) ?> views
                                </div>

                                <a class="btn btn-sm btn-outline-primary mt-auto" href="post.php?myid=<?= $data['id_artikel'] ?>">
                                    Lihat Detail →
                                </a>
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </section>

    <section class="py-5" id="artikel">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="fw-bold">Artikel Terbaru</h2>
                <p class="text-muted">Cerita, pengalaman, dan informasi menarik seputar wisata alam.</p>
            </div>

            <div class="row g-4">
                <?php while ($data = mysqli_fetch_array($semua)) { ?>
                    <div class="col-lg-4 col-md-6">
                        <div class="card border-0 shadow-sm h-100 d-flex flex-column">
                            <div class="card-body d-flex flex-column">
                                <div class="overflow-hidden position-relative" style="max-height: 220px;">
                                    <a href="post.php?myid=<?= $data['id_artikel'] ?>">
                                        <img class="card-img-top" src="image_view.php?id=<?= $data['id_artikel'] ?>" alt="<?= htmlspecialchars($data['judul']) ?>">
                                    </a>

                                    <!-- Badge kategori di pojok kanan atas -->
                                    <span class="badge bg-success position-absolute top-0 end-0 m-2 shadow-sm">
                                        <?= htmlspecialchars($data['kategori']) ?>
                                    </span>
                                </div>

                                <!-- Info penulis & tanggal -->
                                <div class="small text-muted mb-2 mt-3">
                                    <span><?= htmlspecialchars($data['penulis']) ?></span> | <?= ubahtanggal1($data["tanggal_upload"]) ?>
                                </div>

                                <!-- Judul -->
                                <h5 class="card-title"><?= htmlspecialchars($data["judul"]) ?></h5>

                                <!-- Deskripsi (HTML asli) -->
                                <div class="card-text mb-3" style="flex-grow:1;">
                                    <?= tampiltext($data["deskripsi"], true) ?>
                                    <!-- asumsi tampiltext($desc, true) akan mengembalikan HTML -->
                                </div>

                                <!-- Tombol di bagian bawah -->
                                <a class="btn btn-sm btn-outline-primary mt-auto" href="post.php?myid=<?= $data['id_artikel'] ?>">
                                    Read more →
                                </a>
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </div>

            <!-- Pagination -->
            <nav class="mt-4">
                <ul class="pagination justify-content-center">
                    <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>">
                        <a class="page-link" href="?page=<?= $page - 1 ?>#artikel">«</a>
                    </li>

                    <?php for ($i = 1; $i <= $total_pages; $i++) { ?>
                        <li class="page-item <?= ($i == $page) ? 'active' : '' ?>">
                            <a class="page-link" href="?page=<?= $i ?>#artikel"><?= $i ?></a>
                        </li>
                    <?php } ?>

                    <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>">
                        <a class="page-link" href="?page=<?= $page + 1 ?>#artikel">»</a>
                    </li>
                </ul>
            </nav>

            <!-- Tombol Lihat Semua Artikel -->
            <div class="text-center mt-4">
                <a href="artikel.php#artikel" class="btn btn-primary px-4">Lihat Semua Artikel</a>
            </div>
        </div>
    </section>

    <section class="py-5 bg-light" id="galeri">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="fw-bold">Galeri Alam</h2>
                <p class="text-muted">Potret keindahan wisata alam yang memanjakan mata.</p>
            </div>

            <div class="row g-3">
                <?php
                $galeri = mysqli_query($koneksi, "SELECT id_artikel, judul, destinasi FROM artikel ORDER BY tanggal_upload DESC LIMIT 12");
                while ($g = mysqli_fetch_assoc($galeri)) {
                ?>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="gallery-item position-relative overflow-hidden">
                            <span data-lightbox="gallery" data-title="<?= htmlspecialchars($g['judul']) ?>">
                                <img src="image_view.php?id=<?= $g['id_artikel'] ?>" class="img-fluid rounded shadow-sm" alt="<?= htmlspecialchars($g['judul']) ?>">
                                <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                                    <span class="text-white fw-bold"><?= htmlspecialchars($g['destinasi']) ?></span>
                                </div>
                            </span>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </section>
    <footer class="bg-dark text-light pt-5 pb-3">
        <div class="container">
            <div class="row">
                <!-- Logo & Deskripsi -->
                <div class="col-md-4 mb-4">
                    <h5 class="fw-bold mb-3">
                        <img src="admin/assets/img/logo1.png" alt="GoNature" width="40" height="40" class="me-2">
                        GoNature
                    </h5>
                    <p class="small text-muted">
                        Menyajikan informasi wisata alam terbaik, dari gunung hingga pantai, untuk perjalanan yang tak terlupakan.
                    </p>
                </div>

                <!-- Navigasi -->
                <div class="col-md-4 mb-4">
                    <h6 class="fw-bold mb-3">Navigasi</h6>
                    <ul class="list-unstyled small">
                        <li><a href="index.php" class="text-light text-decoration-none">Beranda</a></li>
                        <li><a href="index.php#destinasi-populer" class="text-light text-decoration-none">Destinasi</a></li>
                        <li><a href="kategori.php?kategori=all" class="text-light text-decoration-none">Artikel</a></li>
                        <li><a href="about.php" class="text-light text-decoration-none">Tentang Kami</a></li>
                    </ul>
                </div>

                <!-- Kontak & Sosial Media -->
                <div class="col-md-4 mb-4">
                    <h6 class="fw-bold mb-3">Hubungi Kami</h6>
                    <p class="small mb-1"><i class="bi bi-geo-alt"></i> Jl. Wisata Alam No. 10, Indonesia</p>
                    <p class="small mb-1"><i class="bi bi-envelope"></i> info@gonature.com</p>
                    <p class="small"><i class="bi bi-telephone"></i> +62 812-3456-7890</p>

                    <div class="d-flex gap-2 mt-3">
                        <a href="#" class="btn btn-outline-light btn-sm rounded-circle"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="btn btn-outline-light btn-sm rounded-circle"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="btn btn-outline-light btn-sm rounded-circle"><i class="bi bi-twitter"></i></a>
                    </div>
                </div>
            </div>

            <hr class="border-secondary">

            <div class="text-center small">
                &copy; <?= date('Y') ?> GoNature. All rights reserved.
            </div>
        </div>
    </footer>

    <!-- Bootstrap core JS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Core theme JS-->
    <script src="admin/js/scripts1.js"></script>
</body>

</html>