import axios from "axios";

export function loadProgramList() {
  const windowsPrograms = [
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
    "hwp_converter",
    "hxd",
    "image_rescue",
    "imdisk",
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
    "nanum_font",
    "nanum_gothiccoding",
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
    "putty_tray",
    "pycharm",
    "python",
    "qbittorrent",
    "rammap",
    "rawcap",
    "remote_desktop_manager",
    "robocode",
    "samsung_data_migration",
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
    "tortoise_hg",
    "tortoise_svn",
    "truecrypt-7.2",
    "ubuntu14",
    "universal-usb-installer",
    "utorrent",
    "virtualbox",
    "vscode",
    "win32_disk_imager",
    "winamp",
    "windump",
    "winmerge",
    "wireshark",
  ];
  windowsPrograms.forEach((item, _index) => {
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
    .then((response) => {
      let data = response.data.split("sudo_cmd=")[0];
      data = data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("linux_programs").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installbrew.sh",
    )
    .then((response) => {
      const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("brew_programs").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installcargo.sh",
    )
    .then((response) => {
      const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("cargo_programs").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installpip.sh",
    )
    .then((response) => {
      const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("pip_programs").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    // NOTE: api 사용이라 자주 호출하면 403 응답으로 사용할수 없게 된다.
    // 비인증 요청 (Unauthenticated): IP당 시간당 60회
    // 인증 요청 (Authenticated): 사용자당 시간당 5,000회
    .get(
      "https://api.github.com/repositories/77009402/contents/nvim/lua/plugins",
    )
    .then((response) => {
      document.getElementById("nvim_plugins_api_limit").innerHTML =
        `github api request(remaining/limit_per_hour): ${response.headers["x-ratelimit-remaining"]}/${response.headers["x-ratelimit-limit"]}`;
      const files = response.data
        .filter((item) => item.type === "file")
        .map((item) => item.name);
      let result = "";
      for (const v of files) {
        result += `${v}<br>`;
      }
      document.getElementById("nvim_plugins").innerHTML = result;
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get("https://raw.githubusercontent.com/ysoftman/myenv/master/.vimrc")
    .then((response) => {
      const data = response.data.match(/^call plug.*|^Plug.*|.*:Plug.*/gm);
      let result = "";
      for (const v of data) {
        result += `${v}<br>`;
      }
      document.getElementById("vim_plugins").innerHTML = result;
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installvscodeextension.sh",
    )
    .then((response) => {
      const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("vscode_extensions").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
}
