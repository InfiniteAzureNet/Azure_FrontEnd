<?php
require_once 'koneksidb.php';
include('fungsi.php');
$sql = "SELECT * FROM artikel";
$all = $koneksi->query($sql);
$sql1 = "SELECT nama_kategori FROM kategori";
$all1 = $koneksi->query($sql1);
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
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="admin/css/styles1.css" rel="stylesheet" />
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

</head>

<body>
    <!-- Responsive navbar-->
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
    <!-- Page content-->
    <div class="container">
        <div class="text-center my-5">
            <h1 class="fw-bolder">Kategori</h1>
        </div>
        <div class="row">
            <?php
            $kategori = isset($_GET['kategori']) ? $_GET['kategori'] : 'all';

            if ($kategori === 'all') {
                $query = "SELECT * FROM artikel ORDER BY tanggal_upload DESC";
            } else {
                $query = "SELECT * FROM artikel WHERE kategori='$kategori' ORDER BY tanggal_upload DESC";
            }

            $result = mysqli_query($koneksi, $query);

            while ($data = mysqli_fetch_array($result)) {
            ?>
                <div class="col-lg-4 mb-4">
                    <div class="card h-100 d-flex flex-column">
                        <div class="position-relative">
                            <a href="post.php?myid=<?= $data['id_artikel'] ?>">
                                <img style="height: 350px; object-fit: cover;" class="card-img-top" src="image_view.php?id=<?= $data['id_artikel']; ?>" />
                            </a>
                            <!-- Badge kategori -->
                            <span class="badge bg-success position-absolute top-0 end-0 m-2">
                                <?= htmlspecialchars($data['kategori']) ?>
                            </span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <div class="small text-muted mb-1">
                                <?= ubahtanggal1($data["tanggal_upload"]) ?>
                            </div>
                            <h5 class="card-title"><?= htmlspecialchars($data["judul"]) ?></h5>
                            <!-- deskripsi bisa HTML -->
                            <div class="card-text mb-3" style="flex-grow:1;">
                                <?= tampiltext($data["deskripsi"], true) ?>
                            </div>
                            <a class="btn btn-outline-primary mt-auto" href="post.php?myid=<?= $data['id_artikel'] ?>">
                                Read more →
                            </a>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>

    </div>
    <!-- Footer-->
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