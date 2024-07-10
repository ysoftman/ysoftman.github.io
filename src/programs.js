const axios = require("axios");

export function loadProgramList() {
  let windowsPrograms = [
    "4kvideodownloader",
    "7z",
    "bandizip",
    "cannon-mg3500",
    "cdex",
    "centos7",
    "clonezilla",
    "cmake",
    "ConEmu",
    "coretemp",
    "cpuz",
    "crystaldiskinfo",
    "crystaldiskmark",
    "dbgview",
    "depends22_x64",
    "depends22_x86",
    "dosbox",
    "dvddecrypter",
    "dxsdk",
    "eclipse",
    "elasticsearch",
    "emacs",
    "eraser",
    "fd11src",
    "fences_public",
    "filezilla",
    "firefox",
    "flux",
    "getgnuwin32",
    "gimp",
    "git",
    "gitkraken",
    "go_appengine",
    "golang",
    "gparted",
    "gvim",
    "hangulputty-0.60h",
    "hashcat_cudahashcat",
    "hashcat",
    "hddllf",
    "heidisql",
    "hwmonitor",
    "hwpconverter",
    "hxd",
    "imagerescue",
    "imdiskinst",
    "intel_hd_graphics_driver",
    "intel_network_driver",
    "jdk",
    "kibana",
    "lgunitedmobiledriver",
    "liteide",
    "logstash",
    "lua",
    "magicdisc",
    "mingw-w64",
    "mysql-connector-odbc-3.51.30",
    "mysql-connector-odbc-5.2.6",
    "mysql-workbench",
    "mysql",
    "nanumfont",
    "nanumgothiccoding",
    "navermediaplayerinst",
    "nmap",
    "node",
    "npp",
    "nvidia-gefore-driver",
    "ollydbg",
    "openssl",
    "potplayer",
    "powertoy",
    "procexp",
    "procexp64",
    "putty",
    "puttytray",
    "pycharm",
    "python",
    "qbittorrent",
    "rammap",
    "rawcap",
    "remotedesktopmanager",
    "robocode",
    "samsung data migration",
    "samsung_usb_driver",
    "scala",
    "sdformatterv4",
    "snappy-app",
    "sourcetree",
    "sqldeveloper",
    "sqlmanagementstudio",
    "staruml",
    "sublimetext",
    "tcpview",
    "tightvnc",
    "tortoisehg",
    "tortoisesvn",
    "truecrypt-7.2",
    "ubuntu14",
    "universal-usb-installer",
    "utorrent",
    "virtualbox",
    "vscode",
    "win32diskimager",
    "winamp",
    "windump",
    "winmerge",
    "wireshark",
  ];
  windowsPrograms.forEach(function (item, index) {
    document.getElementById("windows_programs").innerHTML +=
      `<a href="http://www.google.com/search?q=` +
      item +
      `"target="_blank">` +
      item +
      `</a> `;
  });

  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installcommon.sh",
    )
    .then(function (response) {
      let data = response.data.split("sudo_cmd=")[0];
      data = data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("linux_programs").innerHTML = data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installbrew.sh",
    )
    .then(function (response) {
      let data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("brew_programs").innerHTML = data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installcargo.sh",
    )
    .then(function (response) {
      let data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("cargo_programs").innerHTML = data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installpip.sh",
    )
    .then(function (response) {
      let data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("pip_programs").innerHTML = data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
  axios
    .get("https://raw.githubusercontent.com/ysoftman/myenv/master/.vimrc")
    .then(function (response) {
      let data = response.data.match(/^call plug.*|^Plug.*|.*:Plug.*/gm);
      let result = "";
      for (let v of data) {
        result += v + "<br>";
      }
      document.getElementById("vim_plugins").innerHTML = result;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installvscodeextension.sh",
    )
    .then(function (response) {
      let data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("vscode_extensions").innerHTML = data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
}
