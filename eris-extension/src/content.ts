import * as signalR from "@microsoft/signalr";
import { back, forward, pause, play, seek, status, volume } from "./netflix";
import { PlaybackStatus } from "./models";

// Keep typescript happy
declare global {
  interface Window { netflix: any; }
}

const eris = "http://localhost:5091/hubs/netflix"; // Assume Eris server will always be running on localhost.

const connection = connect();
setInterval(() => report(status()), 500)

function connect(): signalR.HubConnection {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(eris, { withCredentials: true })
    .build();

  connection.on("Back", () => {
    console.debug(`${new Date()} Back`);
    back();
    report(status())
  });

  connection.on("Forward", () => {
    console.debug(`${new Date()} Forward`);
    forward();
    report(status())
  });

  connection.on("Pause", () => {
    console.debug(`${new Date()} Pause`);
    pause();
    report(status())
  });

  connection.on("Play", () => {
    console.debug(`${new Date()} Play`);
    play();
    report(status())
  });

  // Value received is between 0 and 7200
  connection.on("Seek", (position) => {
    console.debug(`${new Date()} Position: ${position}`);
    seek(position);
    report(status())
  });

  connection.on("Volume", (vol) => {
    console.debug(`${new Date()} Volume: ${vol / 100}`);
    volume(vol / 100);
    report(status())
  });

  connection.start().catch(console.error);
  return connection;
}

function report(status: PlaybackStatus) {
  console.debug("Status", status)
  connection.send("Status", status);
}