import hljs from "highlight.js";
import { get } from "./http.js";
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
    windowsProgramsHtml += `<a href="http://www.google.com/search?q=${item}" target="_blank" rel="noopener noreferrer">${item}</a> `;
  });
  document.getElementById("windows_programs").innerHTML = windowsProgramsHtml;
  load(
    "linux_programs",
    `${MYENV}/installcommon.sh`,
    (res) => res.data.split("sudo_cmd=")[0],
  );
  load("brew_programs", `${MYENV}/installbrew.sh`);
  load("cargo_programs", `${MYENV}/installcargo.sh`);
  load("pip_programs", `${MYENV}/installpip.sh`);
  // https://github.com/ysoftman/myenv/tree/main/nvim/lua/plugins 는 CORS 에러로 브라우저에서 요청할수 없다.
  // NOTE: api 사용이라 자주 호출하면 403 응답으로 사용할수 없게 된다.
  // 비인증 요청 (Unauthenticated): IP당 시간당 60회
  // 인증 요청 (Authenticated): 사용자당 시간당 5,000회
  load(
    "nvim_plugins",
    "https://api.github.com/repositories/77009402/contents/nvim/lua/plugins",
    (res) => {
      document.getElementById("nvim_plugins_api_limit").textContent =
        `github api request(remaining/limit_per_hour): ${res.headers.get("x-ratelimit-remaining")}/${res.headers.get("x-ratelimit-limit")}`;
      return res.data
        .filter((item) => item.type === "file")
        .map((item) => item.name)
        .join("\n");
    },
  );
  load("vim_plugins", `${MYENV}/.vimrc`, (res) =>
    (res.data.match(/^call plug.*|^Plug.*|.*:Plug.*/gm) ?? []).join("\n"),
  );
  load("vscode_extensions", `${MYENV}/installvscodeextension.sh`);
}

const MYENV = "https://raw.githubusercontent.com/ysoftman/myenv/main";

// url 을 받아 transform 결과를 id 요소에 넣고 하이라이트, 실패 시 에러 메시지 표시
function load(id, url, transform = (res) => res.data) {
  const el = document.getElementById(id);
  get(url)
    .then((res) => {
      el.textContent = transform(res);
      hljs.highlightElement(el);
    })
    .catch((error) => {
      console.error(error);
      el.textContent = `Failed to load data: ${error.message}`;
    });
}
