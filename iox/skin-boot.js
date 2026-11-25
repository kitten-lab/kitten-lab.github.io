/* Pick a skin before first paint. A choice saved this tab wins.
   Otherwise a skin is chosen at random and not saved, so a reload picks again. */
(function () {
  var SKINS = [
    {
      id: "POCKET_WWW", code: "elle.www", name: "POCKET WWW", scheme: "light",
      dir: "skins/POCKET_WWW", all: true,
      preview: ["#6e6e6e", "#0000cd", "#1a3aff", "#d4d0c8"]
    },
    {
      id: "PHOSPHOR_TERMINAL", code: "elle.phx", name: "PHOSPHOR", scheme: "dark",
      dir: "skins/PHOSPHOR_TERMINAL", all: true,
      tints: [
        { id: "green", name: "GREEN", preview: ["#020802", "#33ff33", "#44ff44"] },
        { id: "red", name: "RED", preview: ["#0a0204", "#ff4a55", "#ff6a75"] },
        { id: "amber", name: "AMBER", preview: ["#0a0804", "#e8b86a", "#f0c060"] },
        { id: "blue", name: "BLUE", preview: ["#00005a", "#55d4e8", "#d0d0e4"] }
      ]
    },
    {
      id: "ARCHIVIST", code: "edde.arc", name: "ARCHIVIST", scheme: "light",
      dir: "skins/ARCHIVIST", all: true,
      preview: ["#1a3a28", "#14100c", "#e8dcc4", "#b8954a", "#8a2818"]
    },
    {
      id: "DETECTIVE", code: "kronos.det", name: "DETECTIVE", scheme: "light",
      dir: "skins/DETECTIVE", all: true,
      preview: ["#9d8462", "#f3ead5", "#a1352a", "#e6d09c", "#1c2433"]
    },
    {
      id: "NOTEBOOK", code: "kronos.nbk", name: "NOTEBOOK", scheme: "light",
      dir: "skins/NOTEBOOK", all: true,
      preview: ["#ece6dc", "#fcfaf5", "#b5544b", "#f6e7b8", "#26221e"]
    },
    {
      id: "DEX_DARK", code: "cc.dex", name: "DEX DARK", scheme: "dark",
      dir: "skins/DEX_DARK", all: false,
      preview: ["#0a0c12", "#12151e", "#6a8cff", "#a070ff"]
    },
    {
      id: "DEX_LIGHT", code: "cc.dxl", name: "DEX LIGHT", scheme: "light",
      dir: "skins/DEX_LIGHT", all: true,
      preview: ["#ebe6da", "#faf7f0", "#3a5ad0", "#7040c8"]
    }
  ];

  function read(key) {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  }

  var savedId = read("iox-skin");
  var skin = null;
  for (var i = 0; i < SKINS.length; i++) if (SKINS[i].id === savedId) skin = SKINS[i];
  var chosen = !!skin;
  if (!skin) skin = SKINS[Math.floor(Math.random() * SKINS.length)];

  var tint = "";
  if (skin.tints) {
    var savedTint = read("iox-tint");
    var ok = false;
    if (chosen) {
      for (var t = 0; t < skin.tints.length; t++) if (skin.tints[t].id === savedTint) ok = true;
    }
    if (ok) tint = savedTint;
    else if (chosen) tint = skin.tints[0].id;
    else tint = skin.tints[Math.floor(Math.random() * skin.tints.length)].id;
  }

  var root = document.documentElement;
  root.setAttribute("data-dsc-skin", skin.code);
  root.setAttribute("data-theme", skin.id);
  root.setAttribute("data-scheme", skin.scheme);
  root.style.colorScheme = skin.scheme;
  if (tint) {
    root.setAttribute("data-dsc-tint", tint);
    var names = [];
    for (var n = 0; n < skin.tints.length; n++) names.push(skin.tints[n].id);
    root.setAttribute("data-dsc-tints", names.join(" "));
  } else {
    root.removeAttribute("data-dsc-tint");
    root.removeAttribute("data-dsc-tints");
  }

  var html = '<link rel="stylesheet" id="dsc-tokens" href="' + skin.dir + '/tokens.css">';
  if (skin.all) html += '<link rel="stylesheet" id="dsc-all" href="' + skin.dir + '/roms/_all.css">';
  document.write(html);

  window.IOX_SKINS = SKINS;
  window.IOX_SKIN = { id: skin.id, name: skin.name, tint: tint, chosen: chosen, scheme: skin.scheme };
})();
