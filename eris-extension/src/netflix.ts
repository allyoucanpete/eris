// Here be dragons

import { PlaybackStatus } from "./models";

const skip = 30 * 1000;

export function back(): void {
    player().seek(player().getCurrentTime() - skip);
}

export function forward(): void {
    player().seek(player().getCurrentTime() + skip);
}

export function pause(): void {
    player().pause();
}

export function play(): void {
    player().play();
}
export function seek(position: number): void {
    player().seek(position);
}

export function volume(vol: number): void {
    player().setVolume(vol);
}

export function status(): PlaybackStatus {
    const p = player();
    return {
        duration: p.getDuration(),
        elapsed: p.getCurrentTime(),
        isPlaying: p.getPlaying(),
        volume: Math.round(p.getVolume() * 100),
    }
}

function player(): any {
    const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
    const sessionId = videoPlayer.getAllPlayerSessionIds().filter((sessionId: string) => sessionId.startsWith("watch-"))[0];
    const player = videoPlayer.getVideoPlayerBySessionId(sessionId);
    return player;
}