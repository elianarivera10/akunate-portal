/* Akunaté · guarda cada registro semanal en la hoja privada de Google de la Dra. Eliana.
   Sin datos personales: solo un código de miembro (p. ej. ?m=S1 en el enlace), la semana y el texto del registro. */
(function () {
  var URL_HOJA = "https://script.google.com/macros/s/AKfycbwwNP2l40rl9IsOfF046WwlhNySCxJTOz8I1Ojm6dgmdgZRYmiWGatiGSicwLb08QbyMQ/exec"; // Pegar aquí la URL de la aplicación web de Apps Script (termina en /exec).
  var KEY = "aku-miembro";
  try {
    var m = new URLSearchParams(location.search).get("m");
    if (m && /^[A-Za-z0-9-]{1,12}$/.test(m)) localStorage.setItem(KEY, m.toUpperCase());
  } catch (e) {}
  function codigo() { try { return localStorage.getItem(KEY) || "SIN-CODIGO"; } catch (e) { return "SIN-CODIGO"; } }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("#send");
    if (!a || !URL_HOJA) return;
    var texto = "";
    try { texto = decodeURIComponent(a.href.split("text=")[1] || ""); } catch (_) {}
    var semana = (location.pathname.match(/\/s(\d+)\//) || [])[1] || location.pathname;
    try {
      fetch(URL_HOJA, { method: "POST", mode: "no-cors", keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ codigo: codigo(), semana: semana, texto: texto }) });
    } catch (_) {}
  }, true);
})();
