<!DOCTYPE html>
<html lang="en">
<?php
session_start();
include("koneksidb.php");
include("aksi_crud.php");
if ($_SESSION['nama']) {
} else {
    header("location:login.php");
}

?>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Dashboard - SB Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <script src="https://cdn.ckeditor.com/ckeditor5/38.0.1/classic/ckeditor.js"></script>


</head>

<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="index.html">TraveLink</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <!-- Navbar-->
        <ul class="navbar-nav  ms-auto me-0 me-md-3 my-2 my-md-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="logout.php">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Menu Utama</div>
                        <a class="nav-link" href="index.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </a>
                        <a class="nav-link" href="kategori.php">
                            <div class="sb-nav-link-icon"><i class="fa-solid fa-box"></i></div>
                            Kategori
                        </a>
                        <a class="nav-link" href="artikel.php">
                            <div class="sb-nav-link-icon"><i class="fa-solid fa-newspaper"></i></div>
                            Artikel
                        </a>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    <?php echo $_SESSION['nama']; ?>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Artikel</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Data Posting Artkikel</li>
                    </ol>
                    <div class="card mb-4">
                        <div class="card-header">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPostModal"><span class="fa-solid fa-plus"></span> Post Artikel Baru</button>
                            <!-- Button trigger modal -->
                        </div>
                        <div class="card-body">
                            <table id="datatablesSimple" class="table table-responsive table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Penulis</th>
                                        <th>Judul</th>
                                        <th>Kategori</th>
                                        <th>Tanggal Upload</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $no = 1;
                                    $tampil = mysqli_query($koneksi, "SELECT * FROM artikel ORDER BY tanggal_upload ASC");
                                    while ($data = mysqli_fetch_array($tampil)) :
                                    ?>

                                        <tr>
                                            <td><?= $no++ ?></td>
                                            <td><?= $data['penulis'] ?></td>
                                            <td><?= $data['judul'] ?></td>
                                            <td><?= $data['kategori'] ?></td>
                                            <td><?= ubahtanggal1($data['tanggal_upload']) ?></td>
                                            <td>
                                                <a href="#" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#EditPostModal<?= $no ?>">
                                                    <span class="fa-solid fa-recycle"></span> Ubah
                                                </a>
                                            </td>
                                            <td>
                                                <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalHapusArtikel<?= $no ?>"><span class="fa-solid fa-trash"></span>Hapus</a>

                                            </td>
                                        </tr>
                                        <!-- Ubah POST MODAL -->
                                        <div class="modal fade" id="EditPostModal<?= $no ?>">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header bg-warning">
                                                        <h5 class="modal-title ">Edit Artikel</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <form action="aksi_crud.php" method="post">
                                                        <input type="hidden" name="id" value="<?= $data['id_artikel'] ?>">
                                                        <div class="modal-body">
                                                            <div class="form-group mb-3">
                                                                <label for="title">Penulis</label>
                                                                <input type="text" class="form-control" name="penulis" value="<?= $data['penulis'] ?>" readonly>
                                                            </div>
                                                            <div class="form-group mb-3">
                                                                <label for="title">Title</label>
                                                                <input type="text" class="form-control" name="judul" id="postTitle" value="<?= $data['judul'] ?>">
                                                            </div>
                                                            <div class="form-group mb-3">
                                                                <label for="category">Category</label>
                                                                <select class="form-control" id="postCategory" name="kategori">
                                                                    <option value="<?= $data['kategori'] ?>"><?= $data['kategori'] ?> </option>
                                                                    <?php
                                                                    $sql = mysqli_query($koneksi, "SELECT * FROM kategori");
                                                                    while ($data1 = mysqli_fetch_array($sql)) {
                                                                    ?>
                                                                        <option value="<?= $data1['nama_kategori'] ?>"><?= $data1['nama_kategori'] ?></option>
                                                                    <?php
                                                                    }
                                                                    ?>
                                                                </select>
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="formFile" class="form-label">Upload File</label>
                                                                <input class="form-control" type="file" id="formFile" name="file">
                                                                <label for=" image" class="custom-file-label">Choose File</label>
                                                                <small class="form-text text-muted mb-3">Max Size 3Mb</small>
                                                            </div>
                                                            <div class="form-group mu-10">
                                                                <label for="body">Body</label>
                                                                <textarea class="text-center" name="deskripsi" id="editor<?= $no ?>">
                                                                <?= $data['deskripsi'] ?>
                                                                </textarea>
                                                                <script>
                                                                    ClassicEditor
                                                                        .create(document.querySelector('#editor<?= $no ?>'))
                                                                        .catch(error => {
                                                                            console.error(error);
                                                                        });
                                                                </script>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="submit" class="btn btn-primary" data-dismiss="modal" name="bubahartikel" id="bubahartikel">Update Post</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- END POST MODAL -->
                                        <!-- Awal Modal Hapus-->
                                        <div class="modal fade" id="modalHapusArtikel<?= $no ?>" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="staticBackdropLabel">Konfirmasi Hapus Data</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <form action="aksi_crud.php" method="post">
                                                        <input type="hidden" name="id" value="<?= $data['id_artikel'] ?>">
                                                        <div class="modal-body">
                                                            <h5 class="text-center">Apakah Anda yakin menghapus data ini?</h5>
                                                            <span class="text-danger"><?= $data['judul'] ?> - <?= $data['kategori'] ?></span>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="submit" class="btn btn-primary" name="bhapusartikel">Ya, Hapus saja</button>
                                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Akhir Modal Hapus -->
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- ADD POST MODAL -->
    <div class="modal fade" id="addPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-warning">
                    <h5 class="modal-title ">Tambahkan Artikel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="aksi_crud.php" method="post" enctype="multipart/form-data">
                    <div class="modal-body">
                        <div class="form-group mb-3">
                            <label for="title">Penulis</label>
                            <input type="text" class="form-control" name="penulis" value="<?php echo $_SESSION['nama']; ?>" readonly>
                        </div>
                        <div class="form-group mb-3">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="postTitle" name="judul">
                        </div>
                        <div class="form-group mb-3">
                            <label for="category">Category</label>
                            <select class="form-control" id="postCategory" name="kategori">
                                <option disabled selected> Pilih Kategori </option>
                                <?php
                                $sql = mysqli_query($koneksi, "SELECT * FROM kategori");
                                while ($data = mysqli_fetch_array($sql)) {
                                ?>
                                    <option value="<?= $data['nama_kategori'] ?>"><?= $data['nama_kategori'] ?></option>
                                <?php
                                }
                                ?>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">Upload File</label>
                            <input class="form-control" type="file" id="file" name="file">
                            <label for="image" class="custom-file-label">Choose File</label>
                            <small class="form-text text-muted mb-3">Max Size 3Mb</small>
                        </div>
                        <div class="form-group mu-10">
                            <label for="body">Body</label>
                            <textarea name="deskripsi" id="editor1">
                                 </textarea>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" data-dismiss="modal" name="bsimpanArtikel">Add Post</button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    </div>
    <!-- END POST MODAL -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="js/scripts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
    <script src="assets/demo/chart-area-demo.js"></script>
    <script src="assets/demo/chart-bar-demo.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
    <script src="js/datatables-simple-demo.js"></script>

    <script>
        ClassicEditor
            .create(document.querySelector('#editor1'))
            .catch(error => {
                console.error(error);
            });
    </script>
</body>

</html>