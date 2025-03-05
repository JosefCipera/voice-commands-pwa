self.addEventListener("install", (event) => {
  console.log("Service Worker nainstalován.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker aktivován.");
});

self.addEventListener("fetch", (event) => {
  console.log("Zachycena žádost:", event.request.url);
});
