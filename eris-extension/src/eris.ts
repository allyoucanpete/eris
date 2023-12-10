import {back, forward, pause, play, seek, status, volume} from "./netflix";
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {PlaybackStatus} from "./models";

export class Eris {
    private connection: HubConnection | null = null;

    constructor(private url: string) {
    }

    setup(): void {
        const connection = new HubConnectionBuilder()
            .withUrl(this.url, {withCredentials: true})
            .build();

        connection.on("Back", async () => {
            console.debug(`${new Date()} Back`);
            back();
            await this.report(status())
        });

        connection.on("Forward", async () => {
            console.debug(`${new Date()} Forward`);
            forward();
            await this.report(status())
        });

        connection.on("Pause", async () => {
            console.debug(`${new Date()} Pause`);
            pause();
            await this.report(status())
        });

        connection.on("Play", async () => {
            console.debug(`${new Date()} Play`);
            play();
            await this.report(status())
        });

        connection.on("Seek", async position => {
            console.debug(`${new Date()} Position: ${position}`);
            seek(position);
            await this.report(status())
        });

        connection.on("Volume", async vol => {
            console.debug(`${new Date()} Volume: ${vol / 100}`);
            volume(vol / 100);
            await this.report(status())
        });
        
        // Skip connecting here, check connection before reporting status.
        this.connection = connection;
    }

    async report(status: PlaybackStatus | null): Promise<void> {
        console.debug("Status", status)
        
        if (status === null) {
            console.debug("Status was null, aborting.")
            return;
        }
        
        if (this.connection === null) {
            console.debug("SignalR connection was null, aborting.")
            return;
        }
        
        if (this.connection.state !== HubConnectionState.Connected) {
            console.debug("SignalR connection was lost, reconnecting.")
            
            try {
                await this.connection.start();    
            } catch (e) {
                console.debug("Could not reestablish SignalR connection, aborting.")
                return;
            }
        }
        
        await this.connection.send("Status", status);
    }
}