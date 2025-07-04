window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("loading-progress-bar");
  const percentText = document.getElementById("loading-percent");
  const duration = [4000, 5000, 7000][Math.floor(Math.random() * 3)];
  const intervalTime = 50;
  const steps = duration / intervalTime;
  let progress = 0;
  const interval = setInterval(() => {
    progress += 100 / steps;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.remove();
        document.body.style.overflow = "auto";
      }, 200);
    }
    progressBar.style.width = `${progress}%`;
    percentText.textContent = `${Math.floor(progress)}%`;
  }, intervalTime);
});

const logos = [
  "https://64.media.tumblr.com/3d305395ebd099966bbd46734f6afa03/b67f3092c2d53e2e-c3/s400x600/c95c495a2c9a7340a6606413b73eecd8e783a65f.pnj",
  "https://64.media.tumblr.com/e23f88de568aa9048ac614f06733775a/b67f3092c2d53e2e-0f/s400x600/9dd0ed927c80754ecb77c531ab1bb6783115b7bd.jpg"
];
let currentLogo = 0;
function setLogo() {
  const logo = document.getElementById("main-logo");
  const resultLogo = document.getElementById("result-logo");
  if (logo) logo.src = logos[currentLogo];
  if (resultLogo) resultLogo.src = logos[currentLogo];
}

function toggleMenu() {
  const menu = document.getElementById("menuPanel");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function toggleSettings() {
  const settings = document.getElementById("settingsPanel");
  settings.style.display = settings.style.display === "block" ? "none" : "block";
}

function clearHistory() {
  localStorage.removeItem("searchHistory");
  const input = document.getElementById("query");
  if (input) {
    input.value = "";
    input.setAttribute("autocomplete", "off");
    input.blur();
    setTimeout(() => input.focus(), 100);
  }
  window.location.reload();
}

const knownSites = {
  "chatgpt": "https://chatgpt.com/",
  "gemini": "https://gemini.google.com/app?hl=es",
  "google": "https://www.google.com/",
  "youtube": "https://www.youtube.com/",
  "youtube music": "https://music.youtube.com/",
  "traductor": "https://translate.google.com/",
  "gmail": "https://mail.google.com/",
  "google drive": "https://drive.google.com/drive/",
  "steam": "https://store.steampowered.com/",
  "estalingrado": "https://centercorpec.wixsite.com/softwarelab",
  "facebook": "https://www.facebook.com/",
  "instagram": "https://www.instagram.com/",
  "whatsapp": "https://web.whatsapp.com/",
  "x": "https://x.com/",
  "spotify": "https://open.spotify.com/",
  "tumblr": "https://www.tumblr.com/",
  "wikipedia": "https://es.wikipedia.org/wiki/Wikipedia:Portada",
  "archive": "https://archive.org/",
  "tiktok": "https://www.tiktok.com/",
  "telegram": "https://www.telegram.org/"
};

function search() {
  const query = document.getElementById("query").value.trim().toLowerCase();
  if (!query) return;
  const container = document.getElementById("resultsContainer");
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Cargando resultados...</p>";
  container.style.display = "block";
  const checkboxes = document.querySelectorAll("#settingsPanel input[type='checkbox']");
  const selectedEngines = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
  const engineList = {
    "Google": `https://www.google.com/search?q=${query}`,
    "Bing": `https://www.bing.com/search?q=${query}`,
    "Yahoo": `https://espanol.search.yahoo.com/search?p=${query}`,
    "DuckDuckGo": `https://duckduckgo.com/?q=${query}`,
    "Yandex": `https://yandex.com/search/?text=${query}`,
    "Brave": `https://search.brave.com/search?q=${query}`,
    "Baidu": `https://www.baidu.com/s?wd=${query}`,
    "Startpage": `https://www.startpage.com/sp/search?query=${query}`,
    "Qwant": `https://www.qwant.com/?q=${query}`,
    "Ecosia": `https://www.ecosia.org/search?q=${query}`,
    "Wikipedia": `https://es.wikipedia.org/wiki/Special:Search?search=${query}`,
    "Archive": `https://archive.org/search?query=${query}`
  };
  const estimatedResults = {
    "Google": 1000000, "Bing": 800000, "Yahoo": 600000,
    "DuckDuckGo": 500000, "Yandex": 400000, "Brave": 300000,
    "Baidu": 200000, "Startpage": 150000, "Qwant": 100000,
    "Ecosia": 50000, "Wikipedia": 10000, "Archive": 8000
  };
  const ordered = ["Google", "Bing"].concat(selectedEngines.filter(e => !["Google", "Bing"].includes(e)));
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 10) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
  setTimeout(() => {
    resultsDiv.innerHTML = "";
    if (query.match(/(juego|descarga|videojuego|gratis|game|programa|software)/i)) {
      const promo = document.createElement("div");
      promo.classList.add("result");
      promo.innerHTML = `
        <strong>Estalingrado Software Lab:</strong><br>
        <a href='https://centercorpec.wixsite.com/softwarelab' target='_blank'>
          Explora nuestras promociones y descargas de juegos. ¡Algunos son gratis por tiempo limitado!
        </a><br>
        <img src='https://64.media.tumblr.com/9d299a07dfbcdc0e334b45e0068e2a1a/caba0613a83a169b-88/s1280x1920/85da26811de83e4747fd8b7c0c860ea0dfc7f4a6.pnj'
             alt='Promo'
             style='width:100%;max-width:300px;margin-top:10px;border-radius:8px;'>
      `;
      resultsDiv.appendChild(promo);
    }
    for (const keyword in knownSites) {
      if (query.includes(keyword)) {
        const siteDiv = document.createElement("div");
        siteDiv.classList.add("result");
        siteDiv.innerHTML = `<strong>${keyword.toUpperCase()}:</strong> <a href="${knownSites[keyword]}" target="_blank">Ir directamente al sitio</a>`;
        resultsDiv.appendChild(siteDiv);
      }
    }
    ordered.forEach(engine => {
      if (selectedEngines.includes(engine)) {
        const link = engineList[engine];
        const estimate = estimatedResults[engine] || 0;
        const div = document.createElement("div");
        div.classList.add("result");
        div.innerHTML = `<strong>${engine}:</strong> <a href="${link}" target="_blank">Ver resultados</a> — Aproximadamente ${estimate.toLocaleString()} resultados.`;
        resultsDiv.appendChild(div);
      }
    });
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  setLogo();

  const logo = document.getElementById("main-logo");
  if (logo) {
    logo.addEventListener("click", () => {
      currentLogo = (currentLogo + 1) % logos.length;
      setLogo();
      window.location.reload();
    });
  }

  const input = document.getElementById("query");
  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        search();
      }
    });
  }

  document.addEventListener("mousedown", (e) => {
    const settingsPanel = document.getElementById("settingsPanel");
    const menuPanel = document.getElementById("menuPanel");
    const settingsBtn = document.querySelector(".settings-button");
    const menuBtn = document.querySelector(".menu-button");

    const clickInsideSettings = settingsPanel.contains(e.target) || settingsBtn.contains(e.target);
    const clickInsideMenu = menuPanel.contains(e.target) || menuBtn.contains(e.target);

    if (!clickInsideSettings) settingsPanel.style.display = "none";
    if (!clickInsideMenu) menuPanel.style.display = "none";
  });

  const helpButton = document.getElementById("help-button");
  if (helpButton) {
    helpButton.addEventListener("click", toggleHelp);
  }
});

function toggleHelp() {
  const modal = document.getElementById("help-modal");
  const iframe = document.getElementById("help-video");
  if (modal.style.display === "flex") {
    modal.style.display = "none";
    iframe.src = "";
  } else {
    modal.style.display = "flex";
    iframe.src = "https://www.youtube.com/embed/YHHfxAaR4Fg?autoplay=1";
  }
}
