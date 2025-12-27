// --- Tabs / panels ---
const tabs = document.querySelectorAll(".tab");
const panels = {
  home: document.getElementById("panel-home"),
  projects: document.getElementById("panel-projects"),
  dashboard: document.getElementById("panel-dashboard"),
  settings: document.getElementById("panel-settings"),
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    Object.values(panels).forEach((p) => p.classList.remove("show"));
    const panelKey = tab.dataset.panel;
    panels[panelKey].classList.add("show");
  });
});

// --- Theme toggle ---
const themeBtn = document.getElementById("themeBtn");
const THEME_KEY = "site_theme";

function setTheme(mode) {
  document.body.classList.toggle("light", mode === "light");
  localStorage.setItem(THEME_KEY, mode);
  themeBtn.setAttribute("aria-pressed", mode === "light" ? "true" : "false");
}

const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const next = document.body.classList.contains("light") ? "dark" : "light";
  setTheme(next);
});

// --- Demo buttons ---
const statusText = document.getElementById("statusText");
document.getElementById("pingBtn").addEventListener("click", () => {
  statusText.textContent = `Pinged at ${new Date().toLocaleTimeString()}`;
});
document.getElementById("clearBtn").addEventListener("click", () => {
  statusText.textContent = "Ready.";
});

// --- Form save to localStorage (simple demo) ---
const form = document.getElementById("demoForm");
const output = document.getElementById("savedOutput");
const DATA_KEY = "demo_saved";

function renderSaved() {
  const data = JSON.parse(localStorage.getItem(DATA_KEY) || "{}");
  output.textContent = JSON.stringify(data, null, 2);
}
renderSaved();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const payload = {
    goal: String(fd.get("goal") || ""),
    priority: String(fd.get("priority") || "medium"),
    public: fd.get("public") === "on",
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(DATA_KEY, JSON.stringify(payload));
  document.getElementById("formHint").textContent = "Saved ✔";
  renderSaved();
});

// --- Reset ---
document.getElementById("resetBtn").addEventListener("click", () => {
  localStorage.removeItem(DATA_KEY);
  renderSaved();
  statusText.textContent = "Reset complete.";
});
