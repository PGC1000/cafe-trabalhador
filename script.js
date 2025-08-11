document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("cookie-modal");
  const customizeBtn = document.getElementById("customize");
  const acceptAll = document.getElementById("accept-all");
  const rejectAll = document.getElementById("reject-all");
  const prefsForm = document.getElementById("cookie-preferences");

  const saved = JSON.parse(localStorage.getItem("cookie-consent") || "{}");

  if (!saved.stats && !saved.geo) {
    banner.style.display = "flex";
  } else {
    if (saved.stats) enableTracking();
    if (saved.geo) console.log("📍 Localização ativada");
  }

  customizeBtn.onclick = () => {
    modal.style.display = "block";
  };

  acceptAll.onclick = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ stats: true, geo: true }));
    banner.style.display = "none";
    modal.style.display = "none";
    enableTracking();
    console.log("📍 Localização ativada");
  };

  rejectAll.onclick = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ stats: false, geo: false }));
    banner.style.display = "none";
    modal.style.display = "none";
  };

  prefsForm.onsubmit = (e) => {
    e.preventDefault();
    const stats = prefsForm.stats.checked;
    const geo = prefsForm.geo.checked;
    localStorage.setItem("cookie-consent", JSON.stringify({ stats, geo }));
    banner.style.display = "none";
    modal.style.display = "none";
    if (stats) enableTracking();
    if (geo) console.log("📍 Localização ativada");
  };
});

function enableTracking() {
  trackVisits();

  let startTime = Date.now();
  window.addEventListener('beforeunload', function () {
    let timeSpent = (Date.now() - startTime) / 1000;
    let total = parseFloat(localStorage.getItem('timeSpent') || '0');
    total += timeSpent;
    localStorage.setItem('timeSpent', total);
  });

  let script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-81NMBGT9KT';
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-81NMBGT9KT');
}

function trackVisits() {
  let visits = parseInt(localStorage.getItem('siteVisits') || '0');
  visits += 1;
  localStorage.setItem('siteVisits', visits);
}
