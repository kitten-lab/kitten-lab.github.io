/* IOX OS shell. Windows, deep links, taskbar, skin menu.
   Resume facts are quoted from Dani's resume. Anything she still has to
   write is labeled SAMPLE in the markup. */
(function () {
  var ICON = {
    min: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.2 4.2l7.6 7.6M11.8 4.2l-7.6 7.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    doc: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.4h5.1L12.6 6v7.6H4z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 2.6V6h3.3M6 8.6h4.2M6 11h3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    skin: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity=".4"/><rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity=".65"/><rect x="9" y="9" width="5" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    more: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="3.4" cy="8" r="1.15" fill="currentColor"/><circle cx="8" cy="8" r="1.15" fill="currentColor"/><circle cx="12.6" cy="8" r="1.15" fill="currentColor"/></svg>'
  };

  var WINS = [
    { id: "who", code: "WHO", name: "Who I am", tab: "Dani", title: "Dani Leve", group: "studio", kind: "studio", stamp: "STUDIO", slot: "more" },
    { id: "do", code: "DO", name: "What I do", tab: "What I do", title: "What I do", group: "studio", kind: "studio", stamp: "STUDIO", slot: "more" },
    { id: "bts", code: "BTS", name: "Betsoft", tab: "Betsoft", title: "Betsoft Gaming", group: "studio", kind: "studio", stamp: "STUDIO", slot: "more" },
    { id: "blt", code: "BLT", name: "Built", tab: "Built", title: "Built and tested", group: "studio", kind: "studio", stamp: "STUDIO", slot: "more" },
    { id: "skl", code: "SKL", name: "Skills", tab: "Skills", title: "Research and skills", group: "studio", kind: "studio", stamp: "STUDIO", slot: "more" },
    {
      id: "art", code: "ART", name: "Art pipeline", tab: "Pipeline", title: "Betsoft art pipeline", group: "case", kind: "case", stamp: "CASE", slot: "more",
      fact: "Scaled production from one game every six months to 32 games a year by designing and owning the production pipeline.",
      before: "One game every six months.",
      after: "32 games a year."
    },
    {
      id: "rsp", code: "RSP", name: "Responsive spec", tab: "Engine", title: "Responsive engine spec", group: "case", kind: "case", stamp: "CASE", slot: "more",
      fact: "Around 2020, wrote the full product spec for a new responsive game engine and owned it through delivery. One design replaced separate mobile and desktop codebases, scaling from desktop down to a mini mode. After years of backporting, nearly all of Betsoft’s games now run on it.",
      before: "Separate mobile and desktop codebases.",
      after: "One responsive design, from desktop down to a mini mode."
    },
    {
      id: "tbk", code: "TBK", name: "Take the Bank", tab: "Bank", title: "Take the Bank & Coins of Ra", group: "case", kind: "case", stamp: "CASE", slot: "more",
      fact: "Saved a failing roadmap by building Take the Bank and Coins of Ra from unused assets. Both became top performers.",
      before: "A failing roadmap, and unused assets.",
      after: "Take the Bank and Coins of Ra. Both became top performers."
    },
    {
      id: "dxe", code: "DXE", name: "DXE", tab: "Envelope", title: "Data Exchange Envelope", group: "case", kind: "case", stamp: "CASE", slot: "more",
      fact: "A provenance-aware container for shared and remixed content, with a passing 49-test suite covering writing and sealing.",
      before: "Lineage intact.",
      after: "Tampered. One edited line breaks the chain, and every later version and fork is flagged.",
      figs: [
        ["../img/dxe-intact.png", "Lineage intact. Figure already on this site."],
        ["../img/dxe-tampered.png", "Tampered lineage. Figure already on this site."]
      ]
    },
    {
      id: "glc", code: "GLC", name: "Glass Compost", tab: "Compost", title: "Glass Compost", group: "case", kind: "case", stamp: "CASE", slot: "more",
      fact: "A method and app that breaks long chat logs into titled, deep-tagged, value-rated fragments, tracking order so newer beliefs supersede older ones.",
      before: "A long chat log.",
      after: "Titled, deep-tagged, value-rated fragments, kept in order.",
      figs: [
        ["../img/glass-compost-overview.png", "Conversation overview. Figure already on this site."],
        ["../img/glass-compost-fragments.png", "Individual fragments. Figure already on this site."],
        ["../img/glass-compost-search.png", "Search in context. Figure already on this site."],
        ["../img/glass-compost-report.png", "A report with sources. Figure already on this site."]
      ]
    },
    {
      id: "rdm", code: "RDM", name: "RoseDoc", tab: "RoseDoc", title: "RoseDoc", group: "case", kind: "case", stamp: "CASE", slot: "more",
      fact: "A bundle format, like docx, that keeps metadata with the document.",
      before: "Scattered metadata.",
      after: "Metadata kept with the document."
    },
    { id: "mbo", code: "MBO", name: "Model behavior", tab: "Behavior", title: "Model behavior", group: "work", kind: "board", stamp: "BOARD", slot: "desk" },
    { id: "pgo", code: "PGO", name: "Pocket Go", tab: "Pocket", title: "Pocket Go", group: "work", kind: "world", stamp: "WORLD", slot: "desk", href: "../pocket-go/index.html", blurb: "The Pocket Go page already published on this site." },
    { id: "dsk", code: "DSK", name: "Desk World", tab: "Desk", title: "Desk World", group: "work", kind: "world", stamp: "WORLD", slot: "desk", href: "../desk-world/index.html", blurb: "The Desk World page already published on this site." },
    { id: "hst", code: "HST", name: "Deck Host", tab: "Host", title: "Deck Host", group: "work", kind: "world", stamp: "WORLD", slot: "desk", href: "../deck-host/index.html", blurb: "The Deck Host page already published on this site." },
    { id: "cse", code: "CSE", name: "Case studies", tab: "Case studies", title: "Case studies", group: "launcher", kind: "launcher", stamp: "CASE", slot: "none" }
  ];

  /* Per-rom color: maker accents from surface/app.css (--bm-cc, --bm-bb, --bm-mira)
     and julie swatches from CLASSIC.romfit/romfit.manifest. No new hex. */
  var ROM_FACE = {
    who: { color: "#6a8cff", plate: "Dani Leve" },
    do: { color: "#189878", plate: "What I do" },
    bts: { color: "#e24b4b", plate: "Betsoft" },
    blt: { color: "#a070ff", plate: "Built" },
    skl: { color: "#4a5058", plate: "Skills" },
    art: { color: "#c87810", plate: "Art line" },
    rsp: { color: "#6a90b0", plate: "Engine" },
    tbk: { color: "#7a0018", plate: "The Bank" },
    dxe: { color: "#1858c8", plate: "DXE" },
    glc: { color: "#c01830", plate: "Compost" },
    rdm: { color: "#5a18b8", plate: "RoseDoc" },
    mbo: { color: "#d02878", plate: "Behavior" },
    pgo: { color: "#6a8cff", plate: "Pocket Go" },
    dsk: { color: "#c87810", plate: "Desk" },
    hst: { color: "#4a5058", plate: "Host" },
    cse: { color: "#6a8cff", plate: "Cases" }
  };
  WINS.forEach(function (w) {
    var face = ROM_FACE[w.id] || { color: "#6a8cff", plate: w.name };
    w.color = face.color;
    w.plate = face.plate;
    w.shell = w.group === "case" ? "julie" : "classicboi";
  });

  var byId = {};
  WINS.forEach(function (w) { byId[w.id] = w; });

  var state = {};
  var focus = null;
  var z = 4;
  WINS.forEach(function (w) { state[w.id] = "closed"; });

  var narrowQ = window.matchMedia("(max-width: 860px)");
  var drag = null;

  function shellHead(w) {
    return '' +
      '<header class="dex-shell" data-deck-chrome>' +
        '<span class="dex-shell-spine" aria-hidden="true"></span>' +
        '<span class="dex-shell-chip">' + w.code + '</span>' +
        '<span class="dex-shell-title">' + w.title + '</span>' +
        '<span class="dex-shell-drag" data-deck-drag></span>' +
        '<span class="dex-shell-tape" aria-hidden="true"></span>' +
        '<div data-deck-window-controls>' +
          '<button type="button" class="dh-cap-btn" data-act="min" aria-label="Minimize ' + w.title + '">' + ICON.min + '</button>' +
          '<button type="button" class="dh-cap-btn close" data-act="close" aria-label="Close ' + w.title + '">' + ICON.close + '</button>' +
        '</div>' +
      '</header>';
  }

  function sampleBlock(html) {
    return '<div class="sample-block"><span class="dex-stamp">SAMPLE</span>' + html + '</div>';
  }

  function caseBody(w) {
    var figs = "";
    if (w.figs) {
      figs = '<div class="figs">' + w.figs.map(function (f) {
        return '<figure class="dex-media"><img src="' + f[0] + '" alt="' + f[1] + '"><figcaption>' + f[1] + '</figcaption></figure>';
      }).join("") + '</div>';
    }
    var tabs = [
      ["brf", "BRF"],
      ["log", "LOG"],
      ["spc", "SPC"],
      ["ba", "B/A"],
      ["run", "RUN"]
    ];
    return '' +
      '<div class="case-head"><div><p class="kicker">Case file</p><h3>' + w.title + '</h3></div></div>' +
      '<p class="kicker">From the resume</p><p class="fact">' + w.fact + '</p>' +
      '<div class="case-tabs" role="tablist">' + tabs.map(function (t, i) {
        return '<button type="button" role="tab" data-casetab="' + t[0] + '" aria-selected="' + (i === 0 ? "true" : "false") + '">' + t[1] + '</button>';
      }).join("") + '</div>' +
      '<div class="case-panel" role="tabpanel" data-panel="brf">' +
        '<h4>The problem</h4>' +
        sampleBlock('<p>SAMPLE. The brief goes here: who it was for, what was stuck, and what had to change. This sentence is a placeholder.</p>') +
      '</div>' +
      '<div class="case-panel" role="tabpanel" data-panel="log" hidden>' +
        '<h4>Decision log</h4>' +
        sampleBlock('<ol class="log"><li><span class="when">DATE</span><span>SAMPLE. A decision, in her words.</span></li><li><span class="when">DATE</span><span>SAMPLE. What was tried, and what was kept.</span></li><li><span class="when">DATE</span><span>SAMPLE. What changed after that.</span></li></ol>') +
      '</div>' +
      '<div class="case-panel" role="tabpanel" data-panel="spc" hidden>' +
        '<h4>Spec</h4>' +
        sampleBlock('<pre class="spec">SPEC   SAMPLE\nname:\n  ' + w.title + '\nintent:\n  [ she writes what the work is for ]\nout:\n  [ what it refuses ]\ndone:\n  [ how you can tell ]</pre>') +
      '</div>' +
      '<div class="case-panel" role="tabpanel" data-panel="ba" hidden>' +
        '<h4>Before / after</h4>' +
        '<div class="ba"><article><p class="kicker">Before</p><p>' + w.before + '</p></article><article><p class="kicker">After</p><p>' + w.after + '</p></article></div>' +
        figs +
        sampleBlock('<p>SAMPLE. Room for a comparison she still wants to show. Nothing in this block is a result.</p>') +
      '</div>' +
      '<div class="case-panel" role="tabpanel" data-panel="run" hidden>' +
        '<h4>Run</h4>' +
        sampleBlock('<div class="run-slot"><p>SAMPLE. Her local Python ROMs cannot run on GitHub Pages. This slot is for a be.imported.to link, or an embedded recording, once she has one.</p><label>Link to be<input class="dex-field" type="text" readonly value="" placeholder="https://be.imported.to/…"></label></div>') +
      '</div>';
  }

  function boardBody() {
    var cards = [
      { issue: "context rot", change: "scoped individual agents", rom: "", romId: "" },
      { issue: "scattered metadata", change: "RoseDoc", rom: "RDM", romId: "rdm" },
      { issue: "stale memory", change: "Glass Compost", rom: "GLC", romId: "glc" },
      { issue: "spec drift", change: "specs that carry intent", rom: "", romId: "" }
    ];
    return '' +
      '<p class="kicker">Model behavior</p>' +
      '<h3 class="who-name" style="font-size:28px">What she changed</h3>' +
      '<p class="board-intro">Four pairings from the resume. The lines under each pairing are SAMPLE until she replaces them. The full notes are in the <a href="text.html">text resume</a>.</p>' +
      '<div class="board">' + cards.map(function (c) {
        var rom = c.romId
          ? '<button type="button" class="linkish" data-open="' + c.romId + '">' + c.rom + ' · ' + c.change + '</button>'
          : '<span>No ROM named for this pairing</span>';
        return '<article class="card">' +
          '<span class="dex-stamp">SAMPLE</span>' +
          '<div class="row"><span class="k">Issue</span><span class="v">' + c.issue + '</span></div>' +
          '<div class="row"><span class="k">Changed</span><span class="v">' + c.change + '</span></div>' +
          '<div class="row"><span class="k">ROM</span><span class="v">' + rom + '</span></div>' +
          '<p class="sample-copy">SAMPLE. The write-up of this observation goes here.</p>' +
        '</article>';
      }).join("") + '</div>';
  }

  function worldBody(w) {
    return '' +
      '<div class="world-bar"><p>' + w.blurb + '</p><a class="dex-btn" href="' + w.href + '">Open the page</a></div>' +
      '<div class="world-frame"><iframe data-src="' + w.href + '" title="' + w.title + '"></iframe></div>';
  }

  function studioBody(id) {
    if (id === "who") {
      return '' +
        '<h3 class="who-name">Dani Leve <span class="cat">=^·^=</span></h3>' +
        '<p class="contact"><span>Norwich, Connecticut</span><span class="sep">·</span><a href="mailto:the.danibobby@gmail.com">the.danibobby@gmail.com</a><span class="sep">·</span><span>860-908-9785</span><span class="sep">·</span><a href="https://linkedin.com/in/danielle-leve">linkedin.com/in/danielle-leve</a><span class="sep">·</span><a href="../index.html">kitten-lab.github.io</a></p>' +
        '<div class="pane-tools">' +
          '<a class="dex-btn is-primary" href="text.html">' + ICON.doc + ' Read as text</a>' +
          '<a class="dex-btn" href="Dani_Leve_Resume.pdf">Resume PDF</a>' +
        '</div>' +
        '<p class="tagline">Product leader with 25 years shipping consumer games, now building and testing AI-assisted software every day.</p>' +
        '<p class="lede">I make complicated systems easy to understand, then ship them. At Betsoft I ran the product line for 25 years, including six as Head of Product, and I now lead marketing art. In early 2026 I went back to building: I learned Python and PHP by hand, then started working daily with AI coding agents. That work has produced about 40 small apps, 20 past prototype, including a working operating system of about 20 apps.</p>';
    }
    if (id === "do") {
      var moves = [
        ["SHIP", "Turn fuzzy needs into shipped products", "Ambiguous player and business needs in; games, engines and pipelines out."],
        ["SPEC", "Write specs that carry the intent", "For dev teams, math models and AI agents alike, so the work comes back right."],
        ["TELL", "Narrativize complex systems", "Give a system a story so the team building it and the players using it both understand it."],
        ["LEAD", "Direct people and AI agents", "About 40 artists plus a dev team; now scoped, task-specific coding agents."]
      ];
      return '<p class="kicker">What I do</p><div class="moves">' + moves.map(function (m) {
        return '<div class="move"><span class="k">' + m[0] + '</span><div><b>' + m[1] + '</b><span>' + m[2] + '</span></div></div>';
      }).join("") + '</div>';
    }
    if (id === "bts") {
      return '' +
        '<div class="prose"><p class="kicker">Experience</p>' +
        '<h3>Betsoft Gaming</h3>' +
        '<p class="meta">Online casino games · Remote (company based in Cyprus) · 2001–present</p>' +
        '<p>Managed the full product line from the start, through Diamond Games and Diamond Digital Systems and the acquisition by Betsoft, with the product line and team kept intact.</p>' +
        '<div class="roles">' +
          '<span class="role is-now"><b>Head of Marketing Art</b> · current</span>' +
          '<span class="role"><b>Head of Product</b> · 2019–2025</span>' +
          '<span class="role"><b>Product PM Lead</b> · before 2019</span>' +
        '</div>' +
        '<p class="earlier">Earlier: banner design, art direction, game design, product management, product lead</p>' +
        '<ul>' +
          '<li><b>Scaled production from one game every six months to 32 games a year</b> by designing and owning the production pipeline. <button type="button" class="linkish" data-open="art">ART</button></li>' +
          '<li><b>Saved a failing roadmap</b> by building Take the Bank and Coins of Ra from unused assets. Both became top performers. <button type="button" class="linkish" data-open="tbk">TBK</button></li>' +
          '<li><b>Lifted average rounds per session from about 60 to 100–120</b> on titles I designed, at a time when the line as a whole has only recently held above 100.</li>' +
          '<li><b>Wrote the full product spec for a new responsive game engine</b> (around 2020) and owned it through delivery. One design replaced separate mobile and desktop codebases, scaling from desktop down to a mini mode; after years of backporting, nearly all of Betsoft’s games now run on it. <button type="button" class="linkish" data-open="rsp">RSP</button></li>' +
          '<li><b>Led about 40 artists plus the dev team</b> through one point of contact, running team management and cross-department communication.</li>' +
          '<li><b>Led original concept titles</b> including Sugarpop, Whospunit and Towers of Fortuna, and learned where a strong concept needs the math model to carry it.</li>' +
          '<li><b>Worked every role in the slot pipeline except writing code and math models,</b> and wrote the specs for both.</li>' +
        '</ul></div>';
    }
    if (id === "blt") {
      return '' +
        '<div class="prose"><p class="field-note">March 2026–present · self-taught</p>' +
        '<h3>Built and tested work</h3><ul>' +
          '<li><b>ROM operating system:</b> about 20 working apps in about eight months. Each runs its own Python server and works alone, as a website, or inside a full-screen surface with inter-app APIs (file cabinet, IDE, word processor, search). A super search reads metadata across every app. <a href="../index.html">Portfolio</a></li>' +
          '<li><b>DXE Data Exchange Envelope:</b> a provenance-aware container for shared and remixed content, with a passing 49-test suite covering writing and sealing. <button type="button" class="linkish" data-open="dxe">Open DXE</button></li>' +
          '<li><b>RoseDoc:</b> a bundle format, like docx, that keeps metadata with the document. <button type="button" class="linkish" data-open="rdm">Open RDM</button></li>' +
          '<li><b>Glass Compost:</b> a method and app that breaks long chat logs into titled, deep-tagged, value-rated fragments, tracking order so newer beliefs supersede older ones. <button type="button" class="linkish" data-open="glc">Open GLC</button></li>' +
          '<li><b>Pocket Go:</b> Markdown with a small token set and front matter that loads a CSS environment, so each document becomes its own mini website. <button type="button" class="linkish" data-open="pgo">Open PGO</button></li>' +
          '<li><b>be.imported.to:</b> a web builder and host, newly launched; my portfolio runs on it.</li>' +
          '<li><b>Also past prototype:</b> The Great Road Map (roadmaps from step durations, dependencies and a release date, with Kanban, list, Gantt and team views), Reqrep (long-running task tracking for solo devs and AI agents), Abujo (a day planner the AI manages), Mira IDE for my own DSL, and FIND, search across every document in the network.</li>' +
        '</ul></div>';
    }
    return '' +
      '<div class="prose"><h3>Research and skills</h3><ul>' +
        '<li><b>Product and creative craft:</b> product management, product specs, game design, art direction, banner design, production pipelines, team leadership.</li>' +
        '<li><b>Languages and tools:</b> Python and PHP (both self-taught in about eight weeks), JavaScript; hand-coded websites in the late 1990s and early 2000s. Daily work with Claude and Grok as coding agents through CLI tools, Cursor and bot-style harnesses, building data structures, Python and web applications, and game engines; ChatGPT for coding and long-form conversation. I test new assistants side by side as they come out.</li>' +
        '<li><b>Hands-on model behavior work:</b> about two years of intensive daily work with LLMs from the user side. I design, instruct and evaluate task-specific agents, such as a dev agent scoped to one codebase and an archive agent that searches, splits and headlines a large chat-log archive. I steer behavior through instructions, scope and context, not training. <button type="button" class="linkish" data-open="mbo">Open MBO</button></li>' +
        '<li><b>Independent research</b> on consciousness, memory and persistence (since 2019): how context limits, compaction and storage format change what meaning survives.</li>' +
        '<li><b>Also:</b> Biblical Hebrew translation.</li>' +
      '</ul></div>';
  }

  function cartHTML(w) {
    return '<button type="button" class="rl-case shell-' + w.shell + '" data-open="' + w.id + '" style="--julie:' + w.color + ';--rom-c:' + w.color + '">' +
      '<span class="rl-case-shell" aria-hidden="true"></span>' +
      '<span class="rl-case-notch" aria-hidden="true"></span>' +
      '<span class="rl-case-well" aria-hidden="true"></span>' +
      '<span class="rl-case-badge">' + w.code + '</span>' +
      '<span class="rl-case-label"><span class="rl-case-label-main">' + w.plate + '</span></span>' +
      '<span class="rl-case-sku">' + w.code + '</span>' +
      '<span class="rl-case-shutter" aria-hidden="true"></span>' +
      '<span class="rl-case-pins" aria-hidden="true"></span>' +
      '</button>';
  }

  function launcherBody() {
    var cases = WINS.filter(function (w) { return w.group === "case"; });
    return '<p class="kicker">Launcher</p>' +
      '<h3 class="who-name" style="font-size:28px">Case studies</h3>' +
      '<p class="board-intro">Pick a file. Lines marked SAMPLE are still to be written. A shared link such as #dxe opens that file directly.</p>' +
      '<div class="case-shelf">' + cases.map(cartHTML).join("") + '</div>';
  }

  function paneFor(w) {
    if (w.kind === "case") return caseBody(w);
    if (w.kind === "board") return boardBody();
    if (w.kind === "world") return worldBody(w);
    if (w.kind === "launcher") return launcherBody();
    return studioBody(w.id);
  }

  function pillHTML(w, extra) {
    return '<button type="button" class="srf-pill' + (extra || "") + '" data-open="' + w.id + '" style="--rom-c:' + w.color + '">' +
      '<span class="srf-pill-code">' + w.code + '</span>' +
      '<span class="srf-pill-name">' + (w.tab || w.name) + '</span></button>';
  }

  function render() {
    var shelf = document.getElementById("desk-shelf");
    var windows = document.getElementById("windows");
    shelf.innerHTML = WINS.filter(function (w) { return w.slot === "desk" || w.group === "studio"; }).map(cartHTML).join("");
    windows.innerHTML = WINS.map(function (w, i) {
      var left = 24 + (i % 5) * 22;
      var top = 18 + (i % 4) * 18;
      return '<section class="win" data-win="' + w.id + '" data-kind="' + w.kind + '" id="win-' + w.id + '" style="left:' + left + 'px;top:' + top + 'px" aria-label="' + w.title + '">' +
        shellHead(w) + '<div class="pane">' + paneFor(w) + '</div></section>';
    }).join("");
    document.querySelector("#skin-btn .tool-ico").innerHTML = ICON.skin;
    document.getElementById("more-ico").innerHTML = ICON.more;
    renderSkinMenu();
    paintSkinLabel();
  }

  function swatch(colors) {
    return '<span class="swatch" aria-hidden="true">' + colors.map(function (c) {
      return '<i style="background:' + c + '"></i>';
    }).join("") + '</span>';
  }

  function renderSkinMenu() {
    var menu = document.getElementById("skin-menu");
    var html = "";
    (window.IOX_SKINS || []).forEach(function (skin) {
      if (skin.tints) {
        skin.tints.forEach(function (tint) {
          html += '<button type="button" role="menuitemradio" data-skin="' + skin.id + '" data-tint="' + tint.id + '">' +
            swatch(tint.preview) + '<span>' + skin.name + ' · ' + tint.name + '</span></button>';
        });
      } else {
        html += '<button type="button" role="menuitemradio" data-skin="' + skin.id + '" data-tint="">' +
          swatch(skin.preview) + '<span>' + skin.name + '</span></button>';
      }
    });
    var note = window.IOX_SKIN && window.IOX_SKIN.chosen
      ? "Kept for this tab. A new tab picks at random again."
      : "This visit picked a skin at random. Choose one to keep it for this tab. A reload without a choice picks again.";
    html += '<p class="menu-note">' + note + '</p>';
    menu.innerHTML = html;
    markSkinCurrent();
  }

  function currentTint() {
    return document.documentElement.getAttribute("data-dsc-tint") || "";
  }

  function markSkinCurrent() {
    var id = document.documentElement.getAttribute("data-theme");
    var tint = currentTint();
    document.querySelectorAll("#skin-menu button").forEach(function (btn) {
      var on = btn.getAttribute("data-skin") === id && (btn.getAttribute("data-tint") || "") === tint;
      if (on) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
    });
  }

  function skinById(id) {
    var list = window.IOX_SKINS || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function paintSkinLabel() {
    var skin = skinById(document.documentElement.getAttribute("data-theme"));
    var label = skin ? skin.name : "Skin";
    var tint = currentTint();
    if (tint) label += " · " + tint.toUpperCase();
    document.getElementById("skin-label").textContent = label;
  }

  function applySkin(id, tint, persist) {
    var skin = skinById(id);
    if (!skin) return;
    if (skin.tints && !tint) tint = skin.tints[0].id;
    if (!skin.tints) tint = "";
    var root = document.documentElement;
    root.setAttribute("data-dsc-skin", skin.code);
    root.setAttribute("data-theme", skin.id);
    root.setAttribute("data-scheme", skin.scheme);
    root.style.colorScheme = skin.scheme;
    if (tint) {
      root.setAttribute("data-dsc-tint", tint);
      root.setAttribute("data-dsc-tints", skin.tints.map(function (t) { return t.id; }).join(" "));
    } else {
      root.removeAttribute("data-dsc-tint");
      root.removeAttribute("data-dsc-tints");
    }
    var tokens = document.getElementById("dsc-tokens");
    tokens.href = skin.dir + "/tokens.css";
    var all = document.getElementById("dsc-all");
    if (skin.all) {
      if (!all) {
        all = document.createElement("link");
        all.rel = "stylesheet";
        all.id = "dsc-all";
        tokens.insertAdjacentElement("afterend", all);
      }
      all.href = skin.dir + "/roms/_all.css";
    } else if (all) {
      all.remove();
    }
    if (persist) {
      try {
        sessionStorage.setItem("iox-skin", skin.id);
        if (tint) sessionStorage.setItem("iox-tint", tint);
        else sessionStorage.removeItem("iox-tint");
      } catch (e) {}
      window.IOX_SKIN = { id: skin.id, name: skin.name, tint: tint, chosen: true, scheme: skin.scheme };
      renderSkinMenu();
    }
    paintSkinLabel();
    markSkinCurrent();
  }

  function paint() {
    var any = false;
    WINS.forEach(function (w) {
      var el = document.getElementById("win-" + w.id);
      var st = state[w.id];
      el.classList.toggle("is-open", st !== "closed");
      el.classList.toggle("is-min", st === "min");
      var focused = focus === w.id && st === "open";
      el.classList.toggle("is-focus", focused);
      if (focused) {
        any = true;
        el.style.zIndex = String(z);
        ensureFrame(el);
      }
    });
    var chips = document.getElementById("open-chips");
    chips.innerHTML = WINS.filter(function (w) {
      return w.id !== "cse" && state[w.id] !== "closed";
    }).map(function (w) {
      var st = state[w.id];
      var extra = st === "min" ? " is-min" : " is-open";
      if (focus === w.id && st === "open") extra += " is-focus";
      return pillHTML(w, extra);
    }).join("");
    var cse = byId.cse;
    var cseBtn = document.getElementById("case-btn");
    var cseState = state.cse;
    cseBtn.className = "srf-pill is-launcher" +
      (cseState === "min" ? " is-min" : cseState === "open" ? " is-open" : "") +
      (focus === "cse" && cseState === "open" ? " is-focus" : "");
    cseBtn.style.setProperty("--rom-c", cse.color);
    cseBtn.setAttribute("aria-pressed", cseState === "open" ? "true" : "false");
    document.getElementById("os").classList.toggle("has-focus", any);
  }

  function ensureFrame(el) {
    var frame = el.querySelector("iframe");
    if (frame && !frame.getAttribute("src")) frame.src = frame.getAttribute("data-src");
  }

  function hashId() {
    var h = (location.hash || "").replace(/^#/, "").toLowerCase();
    return byId[h] ? h : "";
  }

  function setHash(id) {
    var next = "#" + id;
    if (location.hash === next) return;
    history.pushState({ win: id }, "", next);
  }

  function openWin(id) {
    if (!byId[id]) return;
    state[id] = "open";
    focus = id;
    z += 1;
    paint();
    setHash(id);
    closeMenus();
  }

  function onTab(id) {
    if (focus === id && state[id] === "open") {
      state[id] = "min";
      focus = null;
      paint();
      return;
    }
    openWin(id);
  }

  function closeWin(id) {
    state[id] = "closed";
    if (focus === id) focus = null;
    paint();
    if (hashId() === id) history.pushState({}, "", location.pathname + location.search);
  }

  function minWin(id) {
    state[id] = "min";
    if (focus === id) focus = null;
    paint();
  }

  function closeMenus() {
    document.querySelectorAll(".menu").forEach(function (m) { m.hidden = true; });
    document.querySelectorAll("[data-menu]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
  }

  function toggleMenu(id, btn) {
    var menu = document.getElementById(id);
    var open = menu.hidden;
    closeMenus();
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function tick() {
    var d = new Date();
    var hh = String(d.getHours()).padStart(2, "0");
    var mm = String(d.getMinutes()).padStart(2, "0");
    var clock = document.getElementById("clock");
    clock.textContent = hh + ":" + mm;
    clock.setAttribute("datetime", d.toISOString());
  }

  function onPointerDown(e) {
    var capBtn = e.target.closest("[data-act]");
    if (capBtn) return;
    var win = e.target.closest(".win");
    if (!win || !e.target.closest(".dex-shell")) return;
    if (narrowQ.matches) return;
    if (e.button !== 0) return;
    var desk = document.getElementById("desk").getBoundingClientRect();
    var rect = win.getBoundingClientRect();
    drag = {
      win: win,
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
      desk: desk
    };
    win.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!drag) return;
    var x = e.clientX - drag.dx - drag.desk.left;
    var y = e.clientY - drag.dy - drag.desk.top;
    x = Math.max(0, Math.min(x, drag.desk.width - 120));
    y = Math.max(0, Math.min(y, drag.desk.height - 48));
    drag.win.style.left = x + "px";
    drag.win.style.top = y + "px";
  }

  document.addEventListener("click", function (e) {
    var menuBtn = e.target.closest("[data-menu]");
    if (menuBtn) {
      toggleMenu(menuBtn.getAttribute("data-menu"), menuBtn);
      return;
    }
    var skinBtn = e.target.closest("[data-skin]");
    if (skinBtn) {
      applySkin(skinBtn.getAttribute("data-skin"), skinBtn.getAttribute("data-tint") || "", true);
      closeMenus();
      return;
    }
    var tabBtn = e.target.closest("[data-casetab]");
    if (tabBtn) {
      var win = tabBtn.closest(".win");
      var name = tabBtn.getAttribute("data-casetab");
      win.querySelectorAll("[data-casetab]").forEach(function (b) {
        b.setAttribute("aria-selected", b === tabBtn ? "true" : "false");
      });
      win.querySelectorAll("[data-panel]").forEach(function (p) {
        p.hidden = p.getAttribute("data-panel") !== name;
      });
      return;
    }
    var act = e.target.closest("[data-act]");
    if (act) {
      var host = act.closest(".win");
      var id = host.getAttribute("data-win");
      if (act.getAttribute("data-act") === "close") closeWin(id);
      else minWin(id);
      return;
    }
    var opener = e.target.closest("[data-open]");
    if (opener) {
      if (opener.classList.contains("srf-pill")) onTab(opener.getAttribute("data-open"));
      else openWin(opener.getAttribute("data-open"));
      return;
    }
    if (!e.target.closest(".menu")) closeMenus();
  });

  document.getElementById("windows").addEventListener("pointerdown", function (e) {
    var win = e.target.closest(".win");
    if (!win) return;
    var id = win.getAttribute("data-win");
    var control = e.target.closest("a, button, input, textarea, select");
    if (!control) {
      if (focus !== id || state[id] !== "open") openWin(id);
      else { z += 1; win.style.zIndex = String(z); }
    }
    onPointerDown(e);
  });
  document.getElementById("windows").addEventListener("pointermove", onPointerMove);
  document.getElementById("windows").addEventListener("pointerup", function () { drag = null; });
  document.getElementById("windows").addEventListener("pointercancel", function () { drag = null; });

  function showHashed(closeOthers) {
    var id = hashId();
    if (!id) {
      if (!closeOthers) return;
      WINS.forEach(function (w) { state[w.id] = "closed"; });
      state.who = "open";
      focus = "who";
    } else {
      if (closeOthers) WINS.forEach(function (w) { state[w.id] = "closed"; });
      state[id] = "open";
      focus = id;
    }
    z += 1;
    paint();
  }

  window.addEventListener("hashchange", function () { showHashed(false); });
  window.addEventListener("popstate", function () { showHashed(false); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (document.querySelector(".menu:not([hidden])")) { closeMenus(); return; }
      if (focus) closeWin(focus);
    }
  });

  render();
  tick();
  setInterval(tick, 30000);
  var start = hashId();
  if (start) {
    state[start] = "open";
    focus = start;
  } else {
    state.who = "open";
    focus = "who";
  }
  paint();
})();
