# Buscador-
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Estalingrado Corp</title>
  <link rel="icon" href="https://64.media.tumblr.com/459660738b1bfb7a47ec26f6923f028c/f35afd85213d1bb5-73/s400x600/aabb91202143136261d7fdcde1f3832f21c69da9.pnj" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  <style>
    body { margin:0; background:#000; color:#317DF5; font-family:'Segoe UI',sans-serif; }
    #loading-screen {
      position:fixed; z-index:9999; background:#000; width:100vw; height:100vh;
      display:flex; flex-direction:column; justify-content:center; align-items:center;
    }
    .loading-logo { width:120px; height:120px; border-radius:50%; margin-bottom:20px; }
    .loading-text { font-size:18px; color:#317DF5; margin-bottom:10px; }
    .loading-bar {
      width:300px; height:20px; border:1px solid #317DF5; border-radius:10px;
      overflow:hidden; background:#111; margin-bottom:8px;
    }
    #loading-progress-bar {
      height:100%; width:0%; background:#317DF5; transition:width 0.1s linear;
    }
    #loading-percent { color:#ccc; font-size:14px; }

    header { margin-top:30px; text-align:center; position:relative; z-index:10; }
    .header-brand { display:flex; flex-direction:column; align-items:center; gap:10px; }
    .header-brand-row { display:flex; align-items:center; justify-content:center; gap:15px; }
    .header-brand img { width:80px; height:80px; border-radius:50%; cursor:pointer; }
    header h1 { font-size:36px; color:#fff; margin:0; }

    .menu-button, .settings-button {
      position:absolute; top:15px; background:none; border:none; cursor:pointer; z-index:11;
    }
    .menu-button { right:20px; }
    .settings-button { left:20px; color:#317DF5; font-size:26px; }
    .menu-icon { width:25px; height:3px; background:#317DF5; margin:5px 0; }

    .menu-panel, .settings-panel {
      position:absolute; top:50px; background:#111; border:1px solid #317DF5;
      border-radius:10px; padding:15px; display:none; z-index:1000;
      min-width:240px; box-shadow:0 8px 16px rgba(0,0,0,0.5);
    }
    .menu-panel { right:20px; }
    .settings-panel { left:20px; }
    .menu-panel label, .menu-panel a, .settings-panel label {
      display:block; color:#fff; margin-bottom:5px; font-size:14px; text-decoration:none;
    }
    .menu-panel strong, .settings-panel strong {
      display:block; font-weight:bold; margin:10px 0 5px; font-size:15px; color:#317DF5;
    }
    .settings-panel button {
      margin-top:10px; padding:8px 12px; background:red; color:white;
      border:none; border-radius:5px; cursor:pointer;
    }

    .search-container { margin-top:40px; text-align:center; position:relative; z-index:1; }
    .search-box { display:flex; flex-direction:column; align-items:center; }
    .search-wrapper { display:flex; align-items:center; justify-content:center; }
    .search-input {
      width:600px; padding:14px 18px; font-size:16px; border:1px solid #317DF5;
      border-radius:10px 0 0 10px; background:#222; color:white; outline:none;
    }
    .search-input::placeholder { color:#999; }
    .search-button {
      background:#317DF5; border:none; padding:14px 20px;
      border-radius:0 10px 10px 0; cursor:pointer; display:flex; align-items:center;
    }
    .search-button svg { fill:#fff; width:20px; height:20px; }
    .search-slogan {
      margin-top:10px; font-size:18px; color:#ccc; text-align:center;
    }

    .results-container {
      margin: 50px auto; width: 80%; display:none;
    }
    .result {
      background:#111; padding:15px; margin-bottom:10px;
      border-radius:8px; color:#317DF5;
    }
    .disclaimer {
      background:#222; color:#ccc; padding:15px; margin-bottom:20px;
      border-radius:8px; display:flex; align-items:center; gap:15px;
    }
    .disclaimer img { width:50px; height:50px; border-radius:50%; }

    footer {
      margin-top:auto; padding:20px 0; text-align:center;
      color:#555; font-size:14px; background:#000;
    }

    #help-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: transparent;
      border: none;
      color: #317DF5;
      font-size: 22px;
      z-index: 999;
      cursor: pointer;
    }
    #help-modal {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8);
      z-index: 10000;
      justify-content: center;
      align-items: center;
    }
    .help-content {
      position: relative;
      background: #111;
      padding: 20px;
      border-radius: 8px;
      max-width: 800px;
      width: 90%;
      box-shadow: 0 0 15px #317DF5;
    }
    .close-help {
      position: absolute;
      top: 5px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="loading-screen">
    <img src="https://64.media.tumblr.com/3d305395ebd099966bbd46734f6afa03/4d78480730607865-41/s1280x1920/617bcc52deb4bb5c2bf470b4f95db32123898bc6.pnj" class="loading-logo" alt="Logo">
    <p class="loading-text">Ingrasando a la intra-net de Estalingrado Corp</p>
    <div class="loading-bar"><div id="loading-progress-bar"></div></div>
    <div id="loading-percent">0%</div>
  </div>

  <header>
    <button class="settings-button" onclick="toggleSettings()"><i class="fas fa-cog"></i></button>
    <button class="menu-button" onclick="toggleMenu()">
      <div class="menu-icon"></div><div class="menu-icon"></div><div class="menu-icon"></div>
    </button>

<div id="settingsPanel" class="settings-panel">
      <strong>Buscadores:</strong>
      <label><input type="checkbox" value="Google" checked> Google</label>
      <label><input type="checkbox" value="Bing" checked> Bing</label>
      <label><input type="checkbox" value="Yahoo" checked> Yahoo</label>
      <label><input type="checkbox" value="DuckDuckGo" checked> DuckDuckGo</label>
      <label><input type="checkbox" value="Yandex" checked> Yandex</label>
      <label><input type="checkbox" value="Brave" checked> Brave</label>
      <label><input type="checkbox" value="Baidu" checked> Baidu</label>
      <label><input type="checkbox" value="Startpage" checked> Startpage</label>
      <label><input type="checkbox" value="Qwant" checked> Qwant</label>
      <label><input type="checkbox" value="Ecosia" checked> Ecosia</label>
	  <label><input type="checkbox" value="Wikipedia" checked> Wikipedia</label>
      <label><input type="checkbox" value="Archive" checked> Internet Archive</label>
      <button onclick="clearHistory()">Borrar y re-conectar</button>
    </div>

     <div id="menuPanel" class="menu-panel">
      <strong>Busca con IA</strong>
      <a href="https://chatgpt.com/" target="_blank">ChatGPT</a>
      <a href="https://gemini.google.com/app?hl=es" target="_blank">Géminis</a>
      <a href="https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat&duckai=1" target="_blank">Duck.ia </a>
      <a href="https://chat.deepseek.com/sign_in" target="_blank">DeepSeek </a>
	  <strong>Contacto:</strong>
      <a href="https://www.instagram.com/estalingradocorp" target="_blank">Instagram</a>
      <a href="https://t.me/estalingradocorp" target="_blank">Telegram</a>
      <a href="https://x.com/Estalingrado27" target="_blank">X</a>
      <a href="https://centercorpec.wixsite.com/estalingradocorp" target="_blank">Intranet</a>
    </div>

    <div class="header-brand">
      <div class="header-brand-row">
        <img id="main-logo" src="" alt="Logo" />
        <h1>Estalingrado Corp </h1>
      </div>
    </div>
  </header>

  <div class="search-container">
    <form class="search-box" onsubmit="event.preventDefault(); search();">
      <div class="search-wrapper">
        <input type="text" id="query" class="search-input" placeholder="Buscar..." autocomplete="off" />
        <button class="search-button" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M505 442.7l-99.7-99.7c28.3-35.3 45.3-80 45.3-128.6C450.6 
            96.5 354.1 0 232.3 0 110.5 0 14 96.5 14 214.4s96.5 214.4 
            214.3 214.4c48.6 0 93.3-17 128.6-45.3l99.7 99.7c9.1 9.2 24 
            9.2 33.1 0 9.1-9.2 9.1-24 0-33.1zM232.3 382.3c-92.6 
            0-168-75.4-168-168s75.4-168 168-168 168 75.4 168 
            168-75.4 168-168 168z"/>
          </svg>
        </button>
      </div>
      <div class="search-slogan">Soluciones inteligentes para personas inteligentes</div>
    </form>
  </div>

  <div class="results-container" id="resultsContainer">
    <h2>Resultados de búsqueda:</h2>
    <div class="disclaimer">
      <img id="result-logo" src="" alt="Logo" />
      <p>Los resultados provienen de motores de búsqueda externos. Estalingrado Corp desarrolla su propia Big Data.</p>
    </div>
    <div id="results"></div>
  </div>
  <button id="help-button" title="Ayuda"><i class="fas fa-question-circle"></i></button>
  <div id="help-modal">
    <div class="help-content">
      <button class="close-help" onclick="toggleHelp()">&times;</button>
      <iframe id="help-video" width="100%" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  </div>

  <script src="js/script.js"></script>
  <script>
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
    document.getElementById("help-button").addEventListener("click", toggleHelp);
  </script>
</body>
</html>

