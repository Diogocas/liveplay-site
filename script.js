const LIVEPLAY_CONFIG = {
  DOWNLOAD_URL: "#",
  API_BASE: "https://liveplay-backend.onrender.com",
  RELEASE_LOCKED: true
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const downloadButton = $("#downloadButton");
const proModal = $("#proModal");
const checkoutForm = $("#proCheckoutForm");
const checkoutEmail = $("#checkoutEmail");
const checkoutSubmit = $("#checkoutSubmit");
const checkoutMessage = $("#checkoutMessage");
const checkoutFallbackLink = $("#checkoutFallbackLink");
let lastFocusedElement = null;

function setMessage(text, type = "") {
  if (!checkoutMessage) return;
  checkoutMessage.textContent = text || "";
  checkoutMessage.classList.remove("success", "error");
  if (type) checkoutMessage.classList.add(type);
}

function resetFallbackLink() {
  if (!checkoutFallbackLink) return;
  checkoutFallbackLink.hidden = true;
  checkoutFallbackLink.href = "#";
}

function showComingSoon(type = "download") {
  const message = type === "pro"
    ? "Assinatura em breve. O LivePlay está em fase final de testes."
    : "Download em breve. O LivePlay está em fase final de testes.";
  alert(message);
}

function openProModal() {
  if (LIVEPLAY_CONFIG.RELEASE_LOCKED) {
    showComingSoon("pro");
    return;
  }

  if (!proModal) return;
  lastFocusedElement = document.activeElement;
  proModal.hidden = false;
  proModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  resetFallbackLink();
  setMessage("", "");
  window.setTimeout(() => checkoutEmail?.focus(), 40);
}

function closeProModal() {
  if (!proModal) return;
  proModal.hidden = true;
  proModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

async function createCheckout(email) {
  const response = await fetch(`${LIVEPLAY_CONFIG.API_BASE}/payments/create-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const data = await response.json().catch(() => null);
  const checkoutUrl = data?.checkoutUrl || data?.sandboxCheckoutUrl;
  if (!response.ok || !data?.ok || !checkoutUrl) {
    throw new Error(data?.error || "Não foi possível gerar o checkout agora.");
  }
  return checkoutUrl;
}

$$("[data-pro-checkout]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showComingSoon("pro");
  });
});

$$("[data-coming-soon]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const type = button.getAttribute("data-coming-soon") || "download";
    showComingSoon(type);
  });
});

checkoutForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (LIVEPLAY_CONFIG.RELEASE_LOCKED) {
    setMessage("Assinatura em breve. O checkout será ativado quando os testes finais terminarem.", "error");
    showComingSoon("pro");
    return;
  }

  resetFallbackLink();

  const email = String(checkoutEmail?.value || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    setMessage("Informe um email válido para vincular a licença PRO.", "error");
    checkoutEmail?.focus();
    return;
  }

  let checkoutWindow = null;
  try {
    checkoutWindow = window.open("about:blank", "_blank");
    if (checkoutWindow) {
      checkoutWindow.opener = null;
      checkoutWindow.document.write("<p style='font-family: system-ui; padding: 24px;'>Gerando checkout seguro do LivePlay...</p>");
    }
  } catch {
    checkoutWindow = null;
  }

  checkoutSubmit.disabled = true;
  checkoutSubmit.setAttribute("aria-busy", "true");
  checkoutSubmit.textContent = "Gerando checkout...";
  setMessage("Conectando ao checkout seguro do Mercado Pago...", "");

  try {
    const checkoutUrl = await createCheckout(email);
    setMessage("Checkout gerado. Depois do pagamento aprovado, abra o app com o mesmo email para sincronizar o PRO.", "success");

    if (checkoutWindow && !checkoutWindow.closed) {
      checkoutWindow.location.href = checkoutUrl;
    } else if (checkoutFallbackLink) {
      checkoutFallbackLink.href = checkoutUrl;
      checkoutFallbackLink.hidden = false;
    }
  } catch (error) {
    if (checkoutWindow && !checkoutWindow.closed) checkoutWindow.close();
    const message = error instanceof Error ? error.message : "Falha ao gerar checkout.";
    setMessage(`${message} Se o erro for de comunicação, confirme se o backend permite CORS para o domínio do site.`, "error");
  } finally {
    checkoutSubmit.disabled = false;
    checkoutSubmit.removeAttribute("aria-busy");
    checkoutSubmit.textContent = "Gerar checkout Mercado Pago";
  }
});

proModal?.addEventListener("click", (event) => {
  if (event.target === proModal) closeProModal();
});

$$("[data-close-pro-modal]").forEach((button) => {
  button.addEventListener("click", closeProModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && proModal && !proModal.hidden) {
    closeProModal();
  }
});

downloadButton?.addEventListener("click", (event) => {
  event.preventDefault();

  if (LIVEPLAY_CONFIG.RELEASE_LOCKED || !LIVEPLAY_CONFIG.DOWNLOAD_URL || LIVEPLAY_CONFIG.DOWNLOAD_URL === "#") {
    showComingSoon("download");
    return;
  }

  window.location.href = LIVEPLAY_CONFIG.DOWNLOAD_URL;
});
