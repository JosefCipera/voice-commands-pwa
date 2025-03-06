import { executeCommand } from './actions.js';

export function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Tvůj prohlížeč nepodporuje rozpoznávání hlasu.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'cs-CZ';
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("🎤 Rozpoznaný text:", command);

        // Přidáme výpis do HTML
        const output = document.getElementById("recognized-text");
        if (output) {
            output.textContent = `Rozpoznáno: ${command}`;
        }

        executeCommand(command);
    };

    recognition.start();
}
