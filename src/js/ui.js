export function updateMicIcon(active) {
    const micIcon = document.getElementById("start-speech");
    micIcon.src = active ? "public/images/microphone-192.png" : "public/images/microphone-muted.png";
}
