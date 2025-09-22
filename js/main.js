(function () {
  const form = document.getElementById("signup-form");
  const submitBtn = form?.querySelector('button[type="submit"]');

  function getUTMs() {
    const url = new URL(window.location.href);
    const get = (k) => url.searchParams.get(k) || null;
    return {
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      utm_content: get("utm_content"),
      utm_term: get("utm_term")
    };
  }

  function toast(message, ok = true) {
    alert(message);
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (form.website && form.website.value.trim() !== "") return;
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      full_name: form.full_name.value.trim(),
      company: form.company.value.trim() || null,
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || null,
      consent: form.consent.checked ? true : false,
      ...getUTMs(),
      referrer: document.referrer || null
    };

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";

      const { error } = await window.db.saveSignup(payload);

      if (error) {        
        if (error.code === "23505") {
          toast("Este correo ya está registrado. ¡Gracias!", true);
        } else {
          console.error(error);
          toast("No pudimos registrar tus datos. Inténtalo de nuevo.", false);
        }
      } else {
        if (typeof gtag === "function") {
          gtag("event", "generate_lead", {
            event_category: "engagement",
            method: "signup_form"
          });
        }
        toast("¡Gracias! Te contactaremos con las novedades.");
        form.reset();
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Quiero recibir novedades";
    }
  });
})();
