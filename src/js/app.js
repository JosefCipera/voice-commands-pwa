import { startSpeechRecognition } from './speech.js';
import { fetchCommands } from './actions.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Aplikace spuštěna...");
    await fetchCommands();  // Nejdřív stáhneme povely

    // Přidáme event listener na kliknutí na ikonu mikrofonu
    const micIcon = document.getElementById("start-speech");
    if (micIcon) {
        micIcon.addEventListener("click", () => {
            console.log("Klik na mikrofon, spouštím rozpoznávání...");
            startSpeechRecognition();
        });
    } else {
        console.error("❌ Ikona mikrofonu nebyla nalezena v HTML!");
    }
});
