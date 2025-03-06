import { executeCommand } from './actions.js';
import { fetchCommands } from './actions.js';

let firstRecognition = true; // Hlídáme první povel

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

        // Poprvé načteme povely z Make
        if (firstRecognition) {
            console.log("📡 Poprvé načítám povely z Make...");
            await fetchCommands();
            firstRecognition = false; // Už jsme načetli, příště už jen hledáme v cache
        }

        executeCommand(command);
    };

    recognition.start();
}
