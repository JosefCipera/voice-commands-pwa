import { startSpeechRecognition } from './speech.js';
import { fetchCommands } from './actions.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Aplikace spuštěna...");
    await fetchCommands();  // Nejdřív stáhneme povely
    startSpeechRecognition();  // Pak spustíme rozpoznávání hlasu
});
