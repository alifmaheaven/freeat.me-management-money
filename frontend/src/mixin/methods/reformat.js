var define = {
  // new Date().toLocaleString().split(',')[0].split('/')
  reformatDatetoinputdatabase: function (value) {
    var feedback;
    if (value) {
      const d = new Date(value);
      const dtf = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      feedback = `${ye}-${mo}-${da}`;
    } else {
      feedback = "";
    }
    return feedback;
  },
  reformatDateWithStandart: function (value) {
    var feedback;
    if (value) {
      const d = new Date(value);
      const dtf = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      feedback = `${ye}-${mo}-${da}`;
    } else {
      feedback = "";
    }
    return feedback;
  },
  reformatDateFromMIS: function (value) {
    var bits = value.split("/");
    return bits[2] + "-" + bits[1] + "-" + bits[0];
  },
  reformatDateToID: function (value) {
    // var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var bulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    var tanggal = new Date(value).getDate();
    // var xhari = new Date(value).getDay();
    var xbulan = new Date(value).getMonth();
    var xtahun = new Date(value).getYear();

    // hari = hari[xhari];
    bulan = bulan[xbulan];
    var tahun = xtahun < 1000 ? xtahun + 1900 : xtahun;

    if (value) {
      return tanggal + " " + bulan + " " + tahun;
    } else {
      return "-";
    }
  },
  reformatDateToIDWithDays: function (value) {
    var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var bulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    var tanggal = new Date(value).getDate();
    var xhari = new Date(value).getDay();
    var xbulan = new Date(value).getMonth();
    var xtahun = new Date(value).getYear();

    hari = hari[xhari];
    bulan = bulan[xbulan];
    var tahun = xtahun < 1000 ? xtahun + 1900 : xtahun;

    if (value) {
      return hari + " , " + tanggal + " " + bulan + " " + tahun;
    } else {
      return "-";
    }
  },
  reformatDateToClocks: function (value) {
    var hours = new Date(value).getHours();
    var minutes = new Date(value).getMinutes();

    if (value) {
      return (
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        ((minutes < 10 ? "0" : "") + minutes)
      );
    } else {
      return "-";
    }
  },
  reformatCountToKNumber: function (value) {
      var num = parseInt(value);
      if (num >= 1000000000) {
          return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + ' Triliun';
      }
      if (num >= 1000000000) {
         return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' Miliar';
      }
      if (num >= 1000000) {
         return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' Juta';
      }
      if (num >= 1000) {
         return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' Ribu';
      }
      return num;
  },
  reformatToRupiah: function (angka) {
    var prefix = "Rp.";
    try {
      var minus = angka.split("-");
    } catch (e) {
      minus = [""];
    }
    var number_string = angka.toString().replace("-", ""),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    if (minus.length == 2) {
      return prefix == undefined ? rupiah : rupiah ? "- Rp. " + rupiah : "";
    }
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  },
};

export default define;
