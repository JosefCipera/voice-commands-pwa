let commandList = {};  // Sem uložíme dynamicky načtené povely

// Funkce pro načtení povelů z externího zdroje (např. JSON soubor z Make)
export async function fetchCommands() {
    try {
        const response = await fetch("https://hook.eu1.make.com/17gn7hrtmnfgsykl52dcn2ekx15nvh1f"); // Sem dej URL, kde Make vrací povely
        commandList = await response.json();
        console.log("Načtené povely:", commandList);
    } catch (error) {
        console.error("Chyba při načítání povelů:", error);
    }
}

// Funkce pro vykonání příkazu podle dynamicky načtených dat
export function executeCommand(command) {
    if (commandList[command]) {
        window.open(commandList[command], "_blank");
    } else {
        console.log("Neznámý příkaz:", command);
    }
}
