const state = {
  pages: [],
  current: 0,
};

const els = {
  grid: document.getElementById("grid"),
  heroImage: document.getElementById("heroImage"),
  openDeck: document.getElementById("openDeck"),
  overlay: document.getElementById("overlay"),
  overlayImage: document.getElementById("overlayImage"),
  overlayBadge: document.getElementById("overlayBadge"),
  closeOverlay: document.getElementById("closeOverlay"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

function renderGrid() {
  els.grid.innerHTML = "";
  state.pages.forEach((page, idx) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${page.image}" alt="Plate ${page.index}" loading="lazy" />
      <div class="card__body">
        <span>Plate ${page.index.toString().padStart(2, "0")}</span>
        <span>↗</span>
      </div>
    `;
    card.addEventListener("click", () => openOverlay(idx));
    els.grid.appendChild(card);
  });
}

function openOverlay(index) {
  if (!state.pages.length) return;
  state.current = clamp(index, 0, state.pages.length - 1);
  const page = state.pages[state.current];
  els.overlayImage.src = page.image;
  els.overlayImage.alt = `Plate ${page.index}`;
  els.overlayBadge.textContent = `Plate ${page.index}`;
  els.overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  els.overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

function next(offset) {
  const target = clamp(state.current + offset, 0, state.pages.length - 1);
  openOverlay(target);
}

function getInlineData() {
  const el = document.getElementById("pages-inline");
  if (!el) return null;
  try {
    return JSON.parse(el.textContent);
  } catch (err) {
    console.error("Inline data parse error", err);
    return null;
  }
}

function setHeroBackground() {
  if (state.pages.length) {
    els.heroImage.style.backgroundImage = `url(${state.pages[0].image})`;
  }
}

async function loadData() {
  try {
    const res = await fetch("./data/pages.json");
    if (!res.ok) throw new Error("Failed to load pages.json");
    const data = await res.json();
    state.pages = data.pages || [];
    setHeroBackground();
    renderGrid();
  } catch (err) {
    console.warn("Fetch failed, falling back to inline data", err);
    const inlineData = getInlineData();
    if (inlineData && inlineData.pages) {
      state.pages = inlineData.pages;
      setHeroBackground();
      renderGrid();
    } else {
      els.grid.innerHTML = `<p style="color:#b91c1c;font-weight:700;">${err.message}</p>`;
      console.error(err);
    }
  }
}

function wireEvents() {
  els.openDeck.addEventListener("click", () => openOverlay(0));
  els.closeOverlay.addEventListener("click", closeOverlay);
  els.prevBtn.addEventListener("click", () => next(-1));
  els.nextBtn.addEventListener("click", () => next(1));
  els.overlay.addEventListener("click", (e) => {
    if (e.target === els.overlay) closeOverlay();
  });
  document.addEventListener("keydown", (e) => {
    if (els.overlay.classList.contains("hidden")) return;
    if (e.key === "Escape") closeOverlay();
    if (e.key === "ArrowRight") next(1);
    if (e.key === "ArrowLeft") next(-1);
  });
}

wireEvents();
loadData();
