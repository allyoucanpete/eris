import {Metadata} from "./metadata";

export interface PlaybackStatus {
    elapsed: number;
    duration: number;
    metadata: Metadata;
    isPlaying: boolean;
    volume: number;
}