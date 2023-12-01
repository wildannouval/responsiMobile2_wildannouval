<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$nama_kontak = trim($data['nama_kontak']);
$nomor_kontak = trim($data['nomor_kontak']);
http_response_code(201);
if ($nama_kontak != '' and $nomor_kontak != '') {
    $query = mysqli_query($koneksi, "insert into kontak(nama_kontak,nomor_kontak) values('$nama_kontak','$nomor_kontak')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
