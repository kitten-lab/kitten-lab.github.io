(function () {
  const stage = document.getElementById("desk");
  const cloth = document.getElementById("cloth") || stage;
  const surface = document.getElementById("surface") || cloth;
  const logEl = document.getElementById("mira-log");
  const form = document.getElementById("mira-form");
  const input = document.getElementById("mira-in");
  const ps = document.getElementById("mira-ps");
  if (!stage) return;

  let hand = null;
  let drag = null;
  const GRAB = 8;

  const spaces = () => [...stage.querySelectorAll(".dw-space")];

  function localXY(e) {
    const r = surface.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    };
  }

  function liftToCloth(piece) {
    piece.classList.remove("is-in");
    if (piece.parentElement !== surface) surface.appendChild(piece);
  }

  function place(piece, e, dx, dy) {
    const p = localXY(e);
    piece.style.left = Math.max(0, p.x - dx) + "px";
    piece.style.top = Math.max(0, p.y - dy) + "px";
  }

  function kindOf(el) {
    return (el && el.dataset.kind) || "felt";
  }

  function writeln(text, cls) {
    const row = document.createElement("div");
    if (cls) row.className = cls;
    row.textContent = text;
    logEl.appendChild(row);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function setHand(el) {
    if (hand) hand.classList.remove("is-hand");
    hand = el && el.classList.contains("dw-piece") ? el : null;
    if (hand) hand.classList.add("is-hand");
    const k = kindOf(hand);
    ps.textContent = (hand ? k : "felt") + ">";
  }

  function feltList() {
    return [...surface.querySelectorAll(".dw-piece")]
      .filter((el) => !el.closest(".dw-pocket"))
      .map((el) => el.dataset.name || kindOf(el));
  }

  function putIn(piece, space) {
    const pocket = space.querySelector(".dw-pocket");
    if (!pocket) return;
    piece.classList.add("is-in");
    piece.style.left = "";
    piece.style.top = "";
    pocket.appendChild(piece);
    writeln(
      "filed · " + (piece.dataset.name || kindOf(piece)) +
        " → " + (space.dataset.name || space.dataset.space)
    );
  }

  function dropTarget(space) {
    return space.querySelector(".env-body") ||
      space.querySelector(".tool-inbox-shell") ||
      space.querySelector(".tool-fax-shell") ||
      space.querySelector(".can") ||
      space;
  }

  function hitSpace(x, y, skip) {
    return spaces().find((space) => {
      if (space === skip || space.contains(skip)) return false;
      const b = dropTarget(space).getBoundingClientRect();
      return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
    });
  }

  function onDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target.closest("button, input, a, .dw-mira")) return;
    const piece = e.target.closest(".dw-piece");
    if (!piece || !cloth.contains(piece)) return;
    setHand(piece);
    const r = piece.getBoundingClientRect();
    drag = {
      pointerId: e.pointerId,
      piece,
      dx: e.clientX - r.left,
      dy: e.clientY - r.top,
      x0: e.clientX,
      y0: e.clientY,
      moved: false,
      fromSpace: piece.closest(".dw-space"),
    };
    try {
      piece.setPointerCapture(e.pointerId);
    } catch (_) {}
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    const dist = Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0);
    if (!drag.moved) {
      if (dist < GRAB) return;
      drag.moved = true;
      drag.piece.classList.add("is-held");
      liftToCloth(drag.piece);
    }
    if (e.cancelable) e.preventDefault();
    place(drag.piece, e, drag.dx, drag.dy);
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    const { piece, moved } = drag;
    piece.classList.remove("is-held");
    try {
      piece.releasePointerCapture(e.pointerId);
    } catch (_) {}
    if (moved) {
      const space = hitSpace(e.clientX, e.clientY, piece);
      if (space && space !== drag.fromSpace) {
        const movable =
          piece.dataset.kind === "leaf" ||
          piece.dataset.kind === "card" ||
          piece.dataset.kind === "key";
        if (movable || space.dataset.space === "trash") putIn(piece, space);
      }
    }
    drag = null;
  }

  cloth.addEventListener("pointerdown", onDown);
  document.addEventListener("pointermove", onMove, { passive: false });
  document.addEventListener("pointerup", onUp);
  document.addEventListener("pointercancel", onUp);

  cloth.addEventListener("click", (e) => {
    if (e.target.closest(".dw-mira")) return;
    const piece = e.target.closest(".dw-piece");
    if (piece) setHand(piece);
    else setHand(null);
  });

  const kven = ["KVEN", "LEAF", "DECK", "FELT", "HAND", "MIRA"];
  window.dwPull = function (e) {
    if (e) e.preventDefault();
    const face = cloth.querySelector("[data-kven]");
    const now = (face.textContent || "").trim();
    const next = kven[(Math.max(0, kven.indexOf(now)) + 1) % kven.length];
    face.textContent = next;
    face.classList.add("is-live");
    setTimeout(() => face.classList.remove("is-live"), 400);
    writeln("karaoke · " + next);
    setHand(cloth.querySelector(".dw-karaoke"));
  };

  function spawn(kind, name, html, left, top) {
    const wrap = document.createElement("div");
    wrap.className = "dw-piece " + (kind === "key" ? "dw-key" : "dw-leaf");
    wrap.dataset.kind = kind;
    wrap.dataset.name = name;
    wrap.style.left = left;
    wrap.style.top = top;
    wrap.innerHTML = html;
    surface.appendChild(wrap);
    setHand(wrap);
    writeln("spawned · " + name);
  }

  function run(raw) {
    const line = (raw || "").trim();
    if (!line) return;
    writeln(ps.textContent + " " + line, "echo");
    const low = line.toLowerCase().replace(/\s+/g, " ");
    const target = hand;

    if (low === "help" || low === "?") {
      writeln("papers please · dress up lined · undress · trash · spawn key · spawn leaf · despawn");
      writeln("-ins is already on the cloth. prompt kind follows what you click.");
      return;
    }
    if (low === "clear") {
      logEl.innerHTML = "";
      return;
    }
    if (low === "papers please") {
      const held = target ? (target.dataset.name || kindOf(target)) : "felt";
      writeln("papers please · " + held);
      feltList().forEach((n) => writeln("  " + n));
      return;
    }
    if (low === "dress up lined" || low === "dress lined") {
      if (!target || kindOf(target) !== "leaf") {
        writeln("dress up · pick up a leaf first");
        return;
      }
      target.classList.add("is-lined");
      target.classList.remove("is-letter");
      writeln("dressed · lined");
      return;
    }
    if (low === "dress up letter" || low === "dress letter") {
      if (!target || kindOf(target) !== "leaf") {
        writeln("dress up · pick up a leaf first");
        return;
      }
      target.classList.add("is-letter");
      target.classList.remove("is-lined");
      writeln("dressed · letter");
      return;
    }
    if (low === "undress" || low.indexOf("undress") === 0) {
      if (!target) {
        writeln("undress · nothing in hand");
        return;
      }
      target.classList.remove("is-lined", "is-letter");
      writeln("undressed");
      return;
    }
    if (low === "trash" || low === "trash can") {
      const can = surface.querySelector('[data-space="trash"]');
      if (low === "trash can") {
        writeln("trash can · already on the felt");
        return;
      }
      if (!target || !can) {
        writeln("trash · nothing in hand");
        return;
      }
      putIn(target, can);
      setHand(null);
      return;
    }
    if (low === "spawn key" || low.indexOf("spawn key") === 0) {
      spawn(
        "key",
        "key",
        '<span class="key-cap"><span class="key-pip"></span>*</span>',
        "48%",
        "30%"
      );
      return;
    }
    if (low === "spawn leaf") {
      spawn(
        "leaf",
        "a leaf",
        '<span class="k">leaf</span><h3>new leaf</h3><p>minted on the cloth.</p>',
        "12%",
        "20%"
      );
      return;
    }
    if (low === "despawn") {
      if (!target) {
        writeln("despawn · nothing in hand");
        return;
      }
      writeln("despawned · " + (target.dataset.name || kindOf(target)));
      target.remove();
      setHand(null);
      return;
    }
    writeln("mira does not know that word here. help");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
  });
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    run(input.value);
    input.value = "";
  });
})();
