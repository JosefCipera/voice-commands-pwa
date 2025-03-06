let commandList = {};  // Sem se načtou dynamické povely

export async function fetchCommands() {
    try {
        const response = await fetch("https://hook.eu1.make.com/17gn7hrtmnfgsykl52dcn2ekx15nvh1f");
        commandList = await response.json();
        console.log("📜 Načtené povely:", commandList);
    } catch (error) {
        console.error("❌ Chyba při načítání povelů:", error);
    }
}

export function executeCommand(command) {
    if (commandList[command]) {
        console.log("✅ Otevírám:", commandList[command]);
        window.open(commandList[command], "_blank");
    } else {
        console.log("❌ Neznámý příkaz:", command);
    }
}
