const config = window.SITE_CONFIG || {};

const refs = {
  heroBrochureLink: document.querySelector("#hero-brochure-link"),
  photoArchiveLink: document.querySelector("#photo-archive-link"),
  videoArchiveLink: document.querySelector("#video-archive-link"),
  form: document.querySelector("#register-form"),
  formMessage: document.querySelector("#form-message")
};

function applySiteConfig() {
  if (refs.heroBrochureLink) {
    refs.heroBrochureLink.href = config.brochureUrl || "#";
  }

  if (refs.photoArchiveLink) {
    refs.photoArchiveLink.href = config.photoArchiveUrl || "#";
  }

  if (refs.videoArchiveLink) {
    refs.videoArchiveLink.href = config.videoArchiveUrl || "#";
  }
}

async function submitToGas(payload) {
  if (!config.gasWebAppUrl) {
    throw new Error("尚未設定 GAS Web App URL，請先編輯 site-config.js。");
  }

  await fetch(config.gasWebAppUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: "shinnyo-en-buddhist-summer-camp"
    })
  });
}

if (refs.form) {
  refs.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    refs.formMessage.textContent = "送出中...";

    const formData = new FormData(refs.form);
    const payload = Object.fromEntries(formData.entries());

    try {
      await submitToGas(payload);
      refs.formMessage.textContent = "資料已送出，我們會盡快與您聯繫。";
      refs.form.reset();
    } catch (error) {
      refs.formMessage.textContent = error.message;
    }
  });
}

applySiteConfig();
