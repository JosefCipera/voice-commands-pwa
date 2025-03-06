export let commandList = {};  // Správně exportujeme seznam povelů

export async function fetchCommands() {
    try {
        console.log("📡 Načítám povely z Make...");

        const response = await fetch("https://hook.eu1.make.com/17gn7hrtmnfgsykl52dcn2ekx15nvh1f");
        if (!response.ok) throw new Error(`HTTP chyba! Status: ${response.status}`);

        const data = await response.json();
        console.log("📜 Přijatá data z Make:", data);

        // Pokud Make vrací objekt s klíčem "url", převedeme ho na seznam příkazů
        if (data.url) {
            console.warn("⚠️ Make vrátil pouze jednu URL, převádím na seznam povelů...");
            commandList = { "vytížení kapacit": data.url }; // Můžeš upravit klíč podle svého příkazu
        } else {
            commandList = data;  // Pokud už je ve správném formátu, použijeme ho přímo
        }

        console.log("✅ Načtené povely do commandList:", commandList);

    } catch (error) {
        console.error("❌ Chyba při načítání povelů:", error);
    }
}


export function executeCommand(command) {
    console.log(`🔎 Hledám příkaz: ${command}`);
    console.log("📜 Aktuální commandList:", commandList);

    const recognizedUrl = document.getElementById("recognized-url");

    if (commandList[command]) {
        const url = commandList[command];
        console.log("✅ Otevírám:", url);

        if (recognizedUrl) {
            recognizedUrl.textContent = `Otevírám: ${url}`;
        }

        window.location.href = url;
    } else {
        console.log("❌ Příkaz nenalezen v seznamu!", command);
        if (recognizedUrl) {
            recognizedUrl.textContent = `❌ Neznámý příkaz: ${command}`;
        }
    }
}

