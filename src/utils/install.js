let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    document.getElementById("installPWA").style.display = "block";
});

document.getElementById("installPWA").addEventListener("click", () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("✅ Uživatel aplikaci nainstaloval");
            } else {
                console.log("❌ Uživatel instalaci odmítl");
            }
            deferredPrompt = null;
        });
    }
});
