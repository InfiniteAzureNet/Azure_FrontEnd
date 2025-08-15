<?php
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

    return $split[0] . ' : ' . $split2[1] . ' ' . $split2[2] . ' ' . $split2[3] . ' ' . $split3[1];
}
function tampil($teks)
{
    $data = explode('.', $teks);


    return $data[0] . '.' . $data[1] . '.';
}

function tampiltext($teks)
{
    $data = explode('</p>', $teks);
    return $data[2];
}
