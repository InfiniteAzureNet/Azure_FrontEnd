<?php
include("koneksidb.php");

// Awal CRUD User

if (isset($_POST['bsimpan'])) {


    $simpan = mysqli_query($koneksi, "INSERT INTO data_pengguna(nama,email,password) VALUES('$_POST[nama]','$_POST[email]','$_POST[password]')");

    if ($simpan) {
        echo "<script>
        alert('Simpan data sukses!');
        document.location='index.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal di simpan!');
        document.location='index.php';
        </script>";
    }
}
if (isset($_POST['bubah'])) {
    $ubah = mysqli_query($koneksi, "UPDATE data_pengguna SET nama='$_POST[nama]',email='$_POST[email]',password='$_POST[password]' WHERE id_pengguna='$_POST[id]'");

    if ($ubah) {
        echo "<script>
        alert('Ubah data sukses!');
        document.location='index.php';
        </script>";
    } else {
        echo "<script>
        alert('Data Gagal diubah!');
        document.location='index.php';
        </script>";
    }
}
if (isset($_POST['bhapus'])) {
    $hapus = mysqli_query($koneksi, "DELETE FROM data_pengguna WHERE id_pengguna='$_POST[id]'");

    if ($hapus) {
        echo "<script>
        alert('Data dihapus Sukses!');
        document.location='index.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal dihapus!');
        document.location='index.php';
        </script>";
    }
}

// Akhir CRUD User

// Awal CRUD Kategori

if (isset($_POST['bsimpanCategory'])) {


    $simpan = mysqli_query($koneksi, "INSERT INTO kategori(nama_kategori) VALUES('$_POST[nama_kategori]')");

    if ($simpan) {
        echo "<script>
        alert('Simpan data sukses!');
        document.location='kategori.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal di simpan!');
        document.location='kategori.php';
        </script>";
    }
}
if (isset($_POST['bubahCategory'])) {
    $ubah = mysqli_query($koneksi, "UPDATE kategori SET nama_kategori='$_POST[nama_kategori]' WHERE id_kategori='$_POST[id]'");

    if ($ubah) {
        echo "<script>
        alert('Ubah data sukses!');
        document.location='kategori.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal di uabh!');
        document.location='kategori.php';
        </script>";
    }
}
if (isset($_POST['bhapusCategory'])) {
    $hapus = mysqli_query($koneksi, "DELETE FROM kategori WHERE id_kategori='$_POST[id]'");

    if ($hapus) {
        echo "<script>
        alert('Data dihapus Sukses!');
        document.location='kategori.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal di hapus!');
        document.location='kategori.php';
        </script>";
    }
}

// Akhir CRUD Kategori

// Awal CRUD Artikel

if (isset($_POST['bsimpanArtikel'])) {
    $image = $_FILES['file'];
    $info = getimagesize($image['tmp_name']);
    if (!$info) {
        die("File is not an image");
    }
    $blob = addslashes(file_get_contents($image['tmp_name']));
    $simpan = mysqli_query($koneksi, "INSERT INTO artikel (penulis,judul, kategori, deskripsi,file) VALUES ('$_POST[penulis]','$_POST[judul]','$_POST[kategori]','$_POST[deskripsi]','" . $blob . "')");

    if ($simpan) {
        echo "<script>
        alert('Simpan data sukses!');
        document.location='artikel.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal di simpan!');
        document.location='artikel.php';
        </script>";
    }
}
if (isset($_POST['bubahartikel'])) {
    $ubah = mysqli_query($koneksi, "UPDATE artikel SET penulis='$_POST[penulis]',judul='$_POST[judul]', kategori='$_POST[kategori]',deskripsi='$_POST[deskripsi]'  WHERE id_artikel='$_POST[id]'");

    if ($ubah) {
        echo "<script>
        alert('Ubah data sukses!');
        document.location='artikel.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal di ubah!');
        document.location='artikel.php';
        </script>";
    }
}
if (isset($_POST['bhapusartikel'])) {
    $hapus = mysqli_query($koneksi, "DELETE FROM artikel WHERE id_artikel='$_POST[id]'");

    if ($hapus) {
        echo "<script>
        alert('Data dihapus Sukses!');
        document.location='artikel.php';
        </script>";
    } else {
        echo "<script>
        alert('Data gagal di hapus!');
        document.location='artikel.php';
        </script>";
    }
}

// Akhir CRUD Artikel

function ubahtanggal1($tanggal)
{
    $split = explode(
        ',',
        date('l, d F Y', strtotime($tanggal))
    );
    $split2 = explode(' ', $split[1]);
    // Optional
    $split3 = explode(' ', $tanggal);
    switch ($split[0]) {
        case "Monday":
            $split[0] = "Senin";
            break;
        case "Tuesday":
            $split[0] = "Selasa";
            break;
        case "Wednesday":
            $split[0] = "Rabu";
            break;
        case "Thursday":
            $split[0] = "Kamis";
            break;
        case "Friday":
            $split[0] = "Jum'at";
            break;
        case "Saturday":
            $split[0] = "Sabtu";
            break;
        case "Sunday":
            $split[0] = "Minggu";
            break;
    }
    switch ($split2[2]) {
        case "January":
            $split2[2] = "Januari";
            break;
        case "February":
            $split2[2] = "Februari";
            break;
        case "March":
            $split2[2] = "Maret";
            break;
        case "April":
            $split2[2] = "April";
            break;
        case "May":
            $split2[2] = "Mei";
            break;
        case "June":
            $split2[2] = "Juni";
            break;
        case "July":
            $split2[2] = "Juli";
            break;
        case "August":
            $split2[2] = "Agustus";
            break;
        case "September":
            $split2[2] = "September";
            break;
        case "October":
            $split2[2] = "Oktober";
            break;
        case "November":
            $split2[2] = "Nopember";
            break;
        case "December":
            $split2[2] = "Desember";
            break;
    }

    return $split[0] . ' ,' . $split2[1] . ' ' . $split2[2] . ' ' . $split2[3] . ' ' . $split3[1];
}
function tampil($teks)
{
    $data = explode('.', $teks);


    return $data[0] . '.' . $data[1] . '.';
}

function tampiltext($teks)
{
    $data = explode('</p>', $teks);
    $data1 = explode('.', $data[0]);
    return $data[0] . $data[1];
}
