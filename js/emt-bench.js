(function () {
  const cloth = document.getElementById("emt-cloth");
  const surface = document.getElementById("emt-surface");
  if (!cloth || !surface) return;

  let z = 20;
  let drag = null;
  const GRAB = 6;

  function localXY(e) {
    const r = surface.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function raise(el) {
    z += 1;
    el.style.zIndex = String(z);
    surface.querySelectorAll(".emt-obj").forEach((o) => o.classList.remove("is-hand"));
    el.classList.add("is-hand");
  }

  function onDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target.closest("button, a, input")) return;
    const piece = e.target.closest(".emt-obj");
    if (!piece || !surface.contains(piece)) return;
    raise(piece);
    const r = piece.getBoundingClientRect();
    drag = {
      pointerId: e.pointerId,
      piece,
      dx: e.clientX - r.left,
      dy: e.clientY - r.top,
      moved: false,
    };
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    const p = localXY(e);
    if (!drag.moved) {
      const sr = drag.piece.getBoundingClientRect();
      if (Math.abs(e.clientX - sr.left - drag.dx) < GRAB &&
          Math.abs(e.clientY - sr.top - drag.dy) < GRAB) return;
      drag.moved = true;
    }
    e.preventDefault();
    drag.piece.style.left = Math.max(0, p.x - drag.dx) + "px";
    drag.piece.style.top = Math.max(0, p.y - drag.dy) + "px";
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    drag = null;
  }

  surface.addEventListener("pointerdown", onDown);
  document.addEventListener("pointermove", onMove, { passive: false });
  document.addEventListener("pointerup", onUp);
  document.addEventListener("pointercancel", onUp);

  document.querySelectorAll("[data-raise]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const el = document.getElementById(btn.getAttribute("data-raise"));
      if (!el) return;
      raise(el);
      el.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  });
})();
