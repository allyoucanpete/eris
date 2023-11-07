import * as signalR from "@microsoft/signalr";
import { pause, play } from "./netflix";

const eris = "http://localhost:5091/hubs/netflix"; // Assume SignalR server will always be running on localhost.
const netflix = "https://www.netflix.com/watch";

// TODO: Also look into what happens for background tabs, switching tabs, multiple tabs playing netflix etc.

chrome.tabs.onCreated.addListener((tab) => {
  console.debug(`A new tab was opened. Tab ID: ${tab.id}. URL: ${tab.url}.`);

  if (tab.url?.startsWith(netflix)) {
    // connect();
  }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.debug(`Navigation occurred. Tab ID: ${details.tabId}. URL: ${details.url}.`)

  if (details.url?.startsWith(netflix)) {
    // connect();
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  // TODO: Decide if any cleanup is needed when tabs are closed, or SignalR will clean up after itself.
  console.log(`Tab closed: ${tabId}`)
})

function connect(): signalR.HubConnection {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(eris, { withCredentials: true })
    .build();

  connection.on("Pause", () => {
    console.debug(`${new Date()} Pause`);
    pause();
  });

  connection.on("Play", () => {
    console.debug(`${new Date()} Play`);
    play();
  });

  connection.start().catch(console.error);
  return connection;
}