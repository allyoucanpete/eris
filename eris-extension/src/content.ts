import {Eris} from "./eris";
import {status} from "./netflix";

// Keep typescript happy
declare global {
    interface Window {
        netflix: any;
    }
}

const url = "http://localhost:5091/hubs/netflix"; // Assume Eris server will always be running on localhost.

const eris = new Eris(url);
eris.connect();
setInterval(() => eris.report(status()), 500);

