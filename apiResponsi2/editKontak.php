<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$id = trim($data['id']);
$nama_kontak = trim($data['nama_kontak']);
$nomor_kontak = trim($data['nomor_kontak']);
http_response_code(201);
if ($nama_kontak != '' and $nomor_kontak != '') {
    $query = mysqli_query($koneksi, "update kontak set nama_kontak='$nama_kontak',nomor_kontak='$nomor_kontak' where 
id='$id'");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
