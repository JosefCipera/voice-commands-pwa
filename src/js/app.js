import { startSpeechRecognition } from './speech.js';
import { fetchCommands } from './actions.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Aplikace spuštěna...");
    startSpeechRecognition();  // ✅ Spustíme mikrofon, ale Make zatím nevoláme
});
