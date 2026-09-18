(function () {
  const base = document.body.getAttribute("data-rom-base") || "";

  const LINE = [
    {
      href: "rom-cat.html",
      julie: "#c01830",
      badge: "CAT",
      name: "ROM Cat",
      sku: "CO.DCC-001-ROMCAT",
      plate:
        "background:repeating-linear-gradient(to bottom,blue 0px,darkblue 2px,blue 3px,darkblue 4px);color:#fff;font-size:0.7rem;border:1px solid blue",
    },
    {
      julie: "#c01830",
      badge: "TINY",
      name: "TINY notes",
      sku: "CO.DCC-STICKY",
    },
    {
      julie: "#921b1b",
      badge: "VENS",
      name: "cat-o-vens",
      sku: "CO.DCC-002-VENS",
    },
    {
      href: "pocket-go.html",
      open: true,
      julie: "#1a3a8a",
      badge: "GO",
      name: "Pocket Go",
      sku: "CO.MYPT-004-GO",
      plate:
        "font-size:0.7rem;letter-spacing:0.06em;background:linear-gradient(to top,#000080,#0000cd);color:#fff;border:1px solid #000080",
    },
    {
      href: "pocket-notebook.html",
      julie: "#0e1f00",
      badge: "NOTES",
      name: "Pocket Notebook",
      sku: "CO.MYPT-002-NOTES",
      plate: "font-size:0.7rem",
    },
    {
      href: "pocket-chapbook.html",
      julie: "#1f677f",
      badge: "CHAPS",
      name: "Pocket Chapbook",
      sku: "CO.MYPT-001-CHAPS",
      plate: "font-size:0.7em",
    },
    {
      href: "desk-world.html",
      open: true,
      julie: "#1a2e24",
      badge: "LEA",
      name: "Desk World",
      sku: "CO.LEA",
      plate:
        "font-size:0.68rem;letter-spacing:0.04em;background:linear-gradient(165deg,#2a4034 0%,#142018 100%);color:#d8e8d0;border:1px solid #5a7a68",
    },
    {
      href: "glass-compost.html",
      julie: "#6a90b0",
      badge: "GLASS",
      name: "Glass Compost",
      sku: "CO.LEA-003-GLASS",
      plate:
        "background:linear-gradient(160deg,#2a2218 0%,#16130f 55%,#1a1410 100%);color:#e0a050;font-family:IBM Plex Mono,monospace;font-weight:600;border:1px solid #c46b3a",
    },
    {
      href: "emt-bench.html",
      open: true,
      badge: "EMT",
      name: "EM Translation Bench",
      sku: "CO.LEA-002-EMT",
    },
    {
      href: "world-builder-studio.html",
      julie: "#5ec8d8",
      badge: "WBS",
      name: "World Builder Studio",
      sku: "CO.WBS-001-STUDIO",
      plate:
        "background:linear-gradient(165deg,#0a0a0c 0%,#121218 55%,#0e2a30 100%);color:#5ec8d8;border:1px solid #5ec8d8",
    },
    {
      href: "digital-office-spaces.html",
      julie: "#1a6b78",
      badge: "DOS",
      name: "Digital Office Spaces",
      sku: "CO.WBS-DOS",
    },
    {
      href: "sky-lite.html",
      julie: "#1a6b78",
      badge: "SKY",
      name: "Sky-lite",
      sku: "CO.WBS",
    },
    {
      href: "lore-box.html",
      julie: "#b46412",
      badge: "LORE",
      name: "loreBOX",
      sku: "CO.DAT-LORE",
    },
    {
      href: "shot-box.html",
      julie: "#b46412",
      badge: "SHOT",
      name: "shotBOX",
      sku: "CO.DAT-SHOT",
    },
    {
      href: "prompt-box.html",
      julie: "#b46412",
      badge: "PROMPT",
      name: "promptBOX",
      sku: "CO.DAT-PROMPT",
    },
    {
      href: "sopr-documenter.html",
      julie: "#2f323c",
      badge: "SOPR",
      name: "sopr Documenter",
      sku: "SPR-403",
    },
    {
      href: "great-road-mapper.html",
      julie: "#2f323c",
      badge: "GRM",
      name: "Great Road Mapper",
      sku: "CO.BBC-001-GRM",
    },
    {
      href: "reqrep.html",
      julie: "#2f323c",
      badge: "RR",
      name: "ReqRep",
      sku: "CO.BBC-002-RR",
    },
    {
      href: "deck-host.html",
      open: true,
      julie: "#4a5cc8",
      badge: "HOST",
      name: "Deck Host",
      sku: "CO.HOST-DECK",
      plate:
        "background:linear-gradient(165deg,#2a3148 0%,#151a28 100%);color:#e4e8f0;border:1px solid #4a5cc8;letter-spacing:0.06em",
    },
    {
      href: "deck-host.html",
      open: true,
      julie: "#6a90b0",
      badge: "LAUNCH",
      name: "ROM Launcher",
      sku: "CO.HOST-001-LAUNCH",
      plate:
        "background:linear-gradient(180deg,#3a4258 0%,#1c2234 100%);color:#d8deea;border:1px solid #8a94aa;font-size:0.62rem",
    },
    {
      href: "kde-notes-chords.html",
      julie: "#a80000",
      badge: "KDE",
      name: "KDE Notes & Chords",
      sku: "CO.KDE-001-INSTR",
      plate:
        "background-color:darkred;font-weight:700;background-image:radial-gradient(darkred,#051c08 120%);color:red;border:1px dashed darkred",
    },
    {
      href: "terminal-prolog.html",
      julie: "#8f1d2c",
      badge: "PROLOG",
      name: "Terminal Prolog",
      sku: "SMH-001-PROLOG",
    },
    {
      href: "forgetting-house.html",
      julie: "#8f1d2c",
      badge: "TFH",
      name: "The Forgetting House",
      sku: "SMH-002-TFH",
    },
    {
      href: "dream-gardener.html",
      julie: "#8f1d2c",
      badge: "DREAM",
      name: "Dream Gardener",
      sku: "SMH-003-DREAM",
    },
    {
      href: "adm.html",
      julie: "#8f1d2c",
      badge: "AIDM",
      name: "AIDM",
      sku: "SMH-004-AIDM",
    },
    {
      href: "ineffable-box.html",
      julie: "#7f4195",
      badge: "USBOX",
      name: "Ineffable Box",
      sku: "CO.TOY-002-USBOX",
      plate:
        "background:radial-gradient(ellipse 60% 40% at 80% 10%,rgba(200,80,255,0.35),transparent 50%),radial-gradient(ellipse 50% 50% at 10% 80%,rgba(80,255,180,0.12),transparent 45%),linear-gradient(160deg,#08040e 0%,#140818 40%,#451365 70%,#591dd1 100%)",
    },
    {
      href: "eddies-encoder.html",
      julie: "#b44a1c",
      badge: "EDDY",
      name: "Eddy’s Encoder",
      sku: "CO.TOY-004-EEE",
    },
    {
      href: "meta-time-machine.html",
      julie: "#0f172a",
      badge: "TMACH",
      name: "Meta Time Machine",
      sku: "CO.TOY-003-TMACH",
      plate:
        "background-color:#0f172a;background-image:radial-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),radial-gradient(rgba(255,255,255,0.15) 1px,transparent 1px);background-size:24px 24px;background-position:0 0,12px 12px;color:#e8eef8",
    },
    {
      href: "import-station.html",
      julie: "#0f5c00",
      badge: "IO",
      name: "Import Station",
      sku: "CO.TOY-001-TERMINAL",
      plate:
        "background-color:#051c08;font-weight:700;background-image:radial-gradient(rgba(18,190,35,0.2),#051c08 120%);color:#33ff33",
    },
    {
      href: "the-injector.html",
      julie: "#b44a1c",
      badge: "INJ",
      name: "The Injector",
      sku: "CO.IMP-INJ",
    },
    {
      href: "moire-arcana.html",
      julie: "#7a2f6a",
      badge: "ARCANA",
      name: "Moire Arcana",
      sku: "TOY-006-ARCANA",
    },
  ];

  const KIND = {
    "CO.MYPT-004-GO": "desk",
    "CO.MYPT-002-NOTES": "desk",
    "CO.MYPT-001-CHAPS": "desk",
    "CO.LEA": "desk",
    "CO.LEA-003-GLASS": "desk",
    "CO.LEA-002-EMT": "desk",
    "CO.WBS-001-STUDIO": "game",
    "CO.WBS-DOS": "desk",
    "CO.WBS": "tool",
    "CO.DAT-LORE": "tool",
    "CO.DAT-SHOT": "tool",
    "CO.DAT-PROMPT": "tool",
    "SPR-403": "tool",
    "CO.BBC-001-GRM": "tool",
    "CO.BBC-002-RR": "tool",
    "CO.HOST-DECK": "tool",
    "CO.HOST-001-LAUNCH": "tool",
    "CO.DCC-001-ROMCAT": "tool",
    "CO.DCC-STICKY": "tool",
    "CO.DCC-002-VENS": "tool",
    "CO.KDE-001-INSTR": "game",
    "SMH-001-PROLOG": "game",
    "SMH-002-TFH": "game",
    "SMH-003-DREAM": "game",
    "SMH-004-AIDM": "game",
    "CO.TOY-002-USBOX": "game",
    "CO.TOY-004-EEE": "game",
    "CO.TOY-003-TMACH": "game",
    "CO.TOY-001-TERMINAL": "tool",
    "CO.IMP-INJ": "tool",
    "TOY-006-ARCANA": "game",
  };

  LINE.forEach((c) => {
    c.kind = KIND[c.sku] || "tool";
  });

  const dressed = LINE.filter((c) => c.open);
  const waiting = LINE.filter((c) => !c.open).map((c) => ({
    ...c,
    href: "",
    soon: true,
  }));
  const CARTS = dressed.concat(waiting);

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function cartHTML(c) {
    const julie = c.julie
      ? ` shell-julie" style="--julie:${esc(c.julie)}"`
      : '"';
    const plate = c.plate ? ` style="${esc(c.plate)}"` : "";
    const soon = c.soon ? " is-soon" : "";
    const href = c.href ? `href="${esc(base + c.href)}"` : "";
    const tag = c.href ? "a" : "div";
    const title = c.soon ? `Coming soon · ${c.name}` : c.name;
    const veil = c.soon
      ? `<span class="rl-case-veil" aria-hidden="true"></span>` +
        `<span class="rl-case-status">coming soon</span>`
      : "";
    return (
      `<${tag} class="rl-case${soon}${julie} ${href} title="${esc(title)}">` +
      `<span class="rl-case-shell" aria-hidden="true"></span>` +
      `<span class="rl-case-notch" aria-hidden="true"></span>` +
      `<span class="rl-case-badge">ROM</span>` +
      `<span class="rl-case-label"${plate}><span class="rl-case-label-main">${esc(c.name)}</span></span>` +
      `<span class="rl-case-pins" aria-hidden="true"></span>` +
      veil +
      `</${tag}>`
    );
  }

  function rowHTML(carts) {
    return `<div class="dh-cases">${carts.map(cartHTML).join("")}</div>`;
  }

  const live = document.querySelector("[data-carts]");
  if (!live) return;

  const tray = live.closest(".dh-tray");
  const prev = tray && tray.querySelector('[data-nudge="-1"]');
  const next = tray && tray.querySelector('[data-nudge="1"]');
  const STEP = 7.5 * 16;
  let kind = "all";

  function visible() {
    if (kind === "all") return CARTS;
    return CARTS.filter((c) => c.kind === kind);
  }

  function paint() {
    live.innerHTML = rowHTML(visible());
    live.scrollLeft = 0;
    syncNudge();
  }

  function syncNudge() {
    const max = live.scrollWidth - live.clientWidth;
    const overflow = max > 8;
    if (tray) tray.classList.toggle("is-overflow", overflow);
    if (!overflow) return;
    const x = live.scrollLeft;
    if (prev) prev.disabled = x <= 2;
    if (next) next.disabled = x >= max - 2;
  }

  function slide(dir) {
    live.scrollBy({ left: dir * STEP, behavior: "smooth" });
  }

  tray.querySelectorAll("[data-nudge]").forEach((btn) => {
    btn.addEventListener("click", () => slide(Number(btn.getAttribute("data-nudge"))));
  });

  live.addEventListener("scroll", syncNudge, { passive: true });
  live.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      slide(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      slide(-1);
    }
  });

  live.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (live.scrollWidth <= live.clientWidth + 8) return;
      e.preventDefault();
      live.scrollLeft += e.deltaY;
      syncNudge();
    },
    { passive: false }
  );

  tray.querySelectorAll(".dh-kind").forEach((btn) => {
    btn.addEventListener("click", () => {
      kind = btn.getAttribute("data-kind") || "all";
      tray.querySelectorAll(".dh-kind").forEach((other) => {
        other.setAttribute("aria-pressed", String(other === btn));
      });
      paint();
    });
  });

  window.addEventListener("resize", syncNudge);
  paint();
})();
