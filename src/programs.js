import axios from "axios";
import hljs from "highlight.js";
// import "highlight.js/styles/github-dark.css";
// import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/styles/night-owl.css";
// import "highlight.js/styles/xt256.css";

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
  let windowsProgramsHtml = "";
  windowsPrograms.forEach((item) => {
    windowsProgramsHtml += `<a href="http://www.google.com/search?q=${item}" target="_blank">${item}</a> `;
  });
  document.getElementById("windows_programs").innerHTML = windowsProgramsHtml;

  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installcommon.sh",
    )
    .then((response) => {
      const data = response.data.split("sudo_cmd=")[0];
      // data = data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      document.getElementById("linux_programs").textContent = data;
      hljs.highlightElement(document.getElementById("linux_programs"));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installbrew.sh",
    )
    .then((response) => {
      // const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      const data = response.data;
      document.getElementById("brew_programs").textContent = data;
      hljs.highlightElement(document.getElementById("brew_programs"));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installcargo.sh",
    )
    .then((response) => {
      // const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      const data = response.data;
      document.getElementById("cargo_programs").textContent = data;
      hljs.highlightElement(document.getElementById("cargo_programs"));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installpip.sh",
    )
    .then((response) => {
      // const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      const data = response.data;
      document.getElementById("pip_programs").textContent = data;
      hljs.highlightElement(document.getElementById("pip_programs"));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    // https://github.com/ysoftman/myenv/tree/master/nvim/lua/plugins 는 CORS 에러로 브라우저에서 요청할수 없다.
    // NOTE: api 사용이라 자주 호출하면 403 응답으로 사용할수 없게 된다.
    // 비인증 요청 (Unauthenticated): IP당 시간당 60회
    // 인증 요청 (Authenticated): 사용자당 시간당 5,000회
    .get(
      "https://api.github.com/repositories/77009402/contents/nvim/lua/plugins",
    )
    .then((response) => {
      document.getElementById("nvim_plugins_api_limit").textContent =
        `github api request(remaining/limit_per_hour): ${response.headers["x-ratelimit-remaining"]}/${response.headers["x-ratelimit-limit"]}`;
      const files = response.data
        .filter((item) => item.type === "file")
        .map((item) => item.name);
      let result = "";
      for (const v of files) {
        result += `${v}\n`;
      }
      document.getElementById("nvim_plugins").textContent = result;
      hljs.highlightElement(document.getElementById("nvim_plugins"));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get("https://raw.githubusercontent.com/ysoftman/myenv/master/.vimrc")
    .then((response) => {
      const data = response.data.match(/^call plug.*|^Plug.*|.*:Plug.*/gm);
      let result = "";
      for (const v of data ?? []) {
        result += `${v}\n`;
      }
      document.getElementById("vim_plugins").textContent = result;
      hljs.highlightElement(document.getElementById("vim_plugins"));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://raw.githubusercontent.com/ysoftman/myenv/master/installvscodeextension.sh",
    )
    .then((response) => {
      // const data = response.data.replace(/(?:\r\n|\r|\n)/g, "<br>");
      const data = response.data;
      document.getElementById("vscode_extensions").textContent = data;
      hljs.highlightElement(document.getElementById("vscode_extensions"));
    })
    .catch((error) => {
      console.log(error);
    });
}

// 독립 페이지(/programs)로 직접 접근 시 자동 초기화
// SPA(index.html)에서는 해당 DOM 요소가 없으므로 스킵됨
if (document.getElementById("windows_programs")) {
  loadProgramList();
}
