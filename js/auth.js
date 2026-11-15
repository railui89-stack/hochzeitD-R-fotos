/*
  Einfacher Passwortschutz für eine statische GitHub-Pages-Seite.

  WICHTIG: Das ist KEINE echte Sicherheit. Der Quellcode dieser Seite
  ist auf GitHub öffentlich einsehbar, das Passwort steht im Klartext
  unten in diesem File.

  -> Passwort hier ändern:
*/
const SITE_PASSWORD = "D&R26";

const SESSION_KEY = "hochzeit_danke_auth_ok";
const TARGET_PAGE = "danke.html";

/* Wird auf index.html (Passwort-Seite) aufgerufen */
function initGate() {
  const form = document.getElementById("gate-form");
  const input = document.getElementById("gate-password");
  const error = document.getElementById("gate-error");

  if (!form) return;

  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    window.location.href = TARGET_PAGE;
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const value = input.value.trim();

    if (value === SITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      window.location.href = TARGET_PAGE;
    } else {
      error.textContent = "Falsches Passwort – bitte noch einmal versuchen.";
      error.classList.remove("shake");
      void error.offsetWidth;
      error.classList.add("shake");
      input.value = "";
      input.focus();
    }
  });
}

/* Wird auf geschützten Seiten (danke.html) aufgerufen */
function guardPage() {
  if (sessionStorage.getItem(SESSION_KEY) !== "true") {
    window.location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initGate();
  if (document.body.dataset.protected === "true") {
    guardPage();
  }
});
