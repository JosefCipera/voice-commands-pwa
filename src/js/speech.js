import { executeCommand } from './actions.js';
import { fetchCommands } from './actions.js'; // Přidáme načítání povelů

let firstRecognition = true; // Sledujeme, zda je to první příkaz

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

        // Pokud je to první příkaz, načteme povely z Make
        if (firstRecognition) {
            console.log("📡 Poprvé načítám povely z Make...");
            await fetchCommands();
            firstRecognition = false; // Už jsme načetli, další příkazy už jen z cache
        }

        executeCommand(command);
    };

    recognition.start();
}
