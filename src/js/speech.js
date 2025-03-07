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

    recognition.onresult = async function (event) {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("🎤 Rozpoznaný text:", command);

        if (firstRecognition) {
            console.log("📡 Poprvé načítám povely z Make...");
            await fetchCommands(recognizedText); // nebo jiné proměnné, která obsahuje rozpoznaný text
            firstRecognition = false;
        }

        executeCommand(command);
    };

    recognition.start();
}

// ✅ Mikrofon se spustí až po kliknutí na ikonku
document.getElementById("start-speech").addEventListener("click", () => {
    console.log("🎤 Klik na mikrofon, spouštím rozpoznávání...");
    startSpeechRecognition();
});
