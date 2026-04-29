const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};

function isEmailJsConfigured() {
  return Object.values(EMAILJS_CONFIG).every(
    value => value && !value.startsWith("YOUR_EMAILJS_")
  );
}

function setFormStatus(message, type) {
  const formStatus = document.getElementById("pf-contact-form-status-msg");
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.remove("pf-form-status-success", "pf-form-status-error", "pf-form-status-info");
  formStatus.classList.add(type);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pf-contact-form-element");
  const sendButton = document.getElementById("send-btn");

  if (!form || !sendButton) {
    return;
  }

  if (!window.emailjs) {
    setFormStatus("Email service failed to load. Please refresh the page.", "pf-form-status-error");
    return;
  }

  if (!isEmailJsConfigured()) {
    setFormStatus("Set EmailJS keys in js/contact.js before sending messages.", "pf-form-status-info");
    return;
  }

  window.emailjs.init({
    publicKey: EMAILJS_CONFIG.publicKey
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const templateParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message")
    };

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";
    setFormStatus("Sending your message...", "pf-form-status-info");

    try {
      await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      form.reset();
      setFormStatus("Message sent successfully. I will get back to you soon.", "pf-form-status-success");
    } catch (error) {
      setFormStatus("Message failed to send. Please try again.", "pf-form-status-error");
      console.error("EmailJS send failed:", error);
    } finally {
      sendButton.disabled = false;
      sendButton.textContent = "Send Message";
    }
  });
});
