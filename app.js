﻿const config = window.SITE_CONFIG || {};

const refs = {
  heroBrochureLink: document.querySelector("#hero-brochure-link"),
  photoArchiveLink: document.querySelector("#photo-archive-link"),
  videoArchiveLink: document.querySelector("#video-archive-link"),
  officialSiteLink: document.querySelector("#official-site-link"),
  facebookLink: document.querySelector("#facebook-link"),
  contactPhone: document.querySelector("#contact-phone"),
  form: document.querySelector("#register-form"),
  formMessage: document.querySelector("#form-message")
};

function resetScrollOnHomeEntry() {
  if (window.location.hash) {
    return;
  }

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
}

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

  if (refs.officialSiteLink) {
    refs.officialSiteLink.href = config.officialSiteUrl || "#";
  }

  if (refs.facebookLink) {
    refs.facebookLink.href = config.facebookUrl || "#";
  }

  if (refs.contactPhone) {
    refs.contactPhone.textContent = config.contactPhone || "";
  }
}

async function submitToGas(payload) {
  if (!config.gasWebAppUrl) {
    throw new Error("尚未設定 GAS Web App URL，請先更新 site-config.js。");
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

window.addEventListener("pageshow", resetScrollOnHomeEntry);
applySiteConfig();
