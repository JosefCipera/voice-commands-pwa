import { checkProductionData } from "./utils/dataCheck.js";

export function setupVoiceCommands(voiceRecognition) {
    voiceRecognition.addCommand(["kontrola", "kontrola dat"], async () => {
        console.log("🎤 Rozpoznán hlasový povel: Kontrola dat");

        await checkProductionData(); // 🔹 Spustí kontrolu přímo, bez Make

        console.log("✅ Kontrola dat dokončena!");
        alert("✅ Kontrola dat dokončena!"); // Ukáže uživateli zprávu
    });
}
