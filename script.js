const EMAIL = "larymenjon.dev@gmail.com";
const SUBJECT = "Delete Stepio Account";

const copyButton = document.getElementById("copyButton");
const feedback = document.getElementById("feedback");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const message = `${EMAIL}\nSubject: ${SUBJECT}`;

    try {
      await navigator.clipboard.writeText(message);
      if (feedback) {
        feedback.textContent = "Copied. You can now paste it in your email app.";
      }
    } catch {
      if (feedback) {
        feedback.textContent = "Could not copy automatically. Please copy the email and subject manually.";
      }
    }
  });
}
