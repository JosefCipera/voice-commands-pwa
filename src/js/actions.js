let commandList = {};  // Načtené příkazy

export async function fetchCommands() {
    try {
        console.log("📡 Načítám povely z Make...");

        const response = await fetch("https://hook.eu1.make.com/17gn7hrtmnfgsykl52dcn2ekx15nvh1f");
        if (!response.ok) throw new Error(`HTTP chyba! Status: ${response.status}`);

        const data = await response.json();
        console.log("📜 Přijatá data:", data);

        if (typeof data !== "object") {
            throw new Error("❌ Odpověď z Make není validní JSON objekt!");
        }

        commandList = data;
        console.log("✅ Načtené povely do commandList:", commandList);

        if (Object.keys(commandList).length === 0) {
            console.warn("⚠️ Seznam povelů je prázdný!");
        }

    } catch (error) {
        console.error("❌ Chyba při načítání povelů:", error);
    }
}


export function executeCommand(command) {
    console.log(`🔎 Hledám příkaz: ${command}`);
    const recognizedUrl = document.getElementById("recognized-url");

    if (commandList[command]) {
        const url = commandList[command];
        console.log("✅ Otevírám:", url);

        // Zobrazíme URL pod mikrofonem
        if (recognizedUrl) {
            recognizedUrl.textContent = `Otevírám: ${url}`;
        }

        // Přesměrování na URL
        window.location.href = url;
    } else {
        console.log("❌ Příkaz nenalezen v seznamu!", commandList);
        if (recognizedUrl) {
            recognizedUrl.textContent = `❌ Neznámý příkaz: ${command}`;
        }
    }
}
