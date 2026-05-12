const DOWNLOAD_URL = "#";
const DISCORD_URL = "#";

document.getElementById("downloadButton")?.addEventListener("click", (event) => {
  if (DOWNLOAD_URL === "#") {
    event.preventDefault();
    alert("Coloque aqui o link do instalador oficial do LivePlay.");
    return;
  }
  window.location.href = DOWNLOAD_URL;
});

document.getElementById("discordButton")?.addEventListener("click", (event) => {
  if (DISCORD_URL === "#") {
    event.preventDefault();
    alert("Coloque aqui o link do Discord/suporte.");
    return;
  }
  window.location.href = DISCORD_URL;
});
