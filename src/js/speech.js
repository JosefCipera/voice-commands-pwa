import { executeCommand, fetchCommands } from './actions.js';

let firstRecognition = true;

export function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Tvůj prohlížeč nepodporuje rozpoznávání hlasu.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'cs-CZ';
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
        const recognizedText = event.results[0][0].transcript.trim(); // Správně načteme text
        console.log("🎤 Rozpoznaný text:", recognizedText);

        await fetchCommands(recognizedText); // Nyní posíláme správný text do Make
    };

    recognition.start();
}

// ✅ Mikrofon se spustí až po kliknutí na ikonku
document.getElementById("start-speech").addEventListener("click", () => {
    console.log("🎤 Klik na mikrofon, spouštím rozpoznávání...");
    startSpeechRecognition();
});
