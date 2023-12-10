// Here be dragons

import {PlaybackStatus, Metadata, VideoType} from "./models";

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
    const view: HTMLDivElement | null = document.querySelector("[data-uia=\"player\"]");
    // const trigger: HTMLButtonElement | null = document.querySelector("[data-uia=\"player-blocked-play\"]");
    const trigger: HTMLDivElement | null = document.querySelector("[class=\"watch-video--autoplay-blocked\"]");
    
    if (trigger !== null && view !== null) {
        console.debug("Playing from blocked screen");
        view.click();
        player().play();
        setTimeout(() => trigger.click(), 500);
    } else {
        console.debug("Playing from player screen");
        player().play();
    }
}



export function seek(position: number): void {
    player().seek(position);
}

export function volume(vol: number): void {
    player().setVolume(vol);
}

export function status(): PlaybackStatus {
    const {getCurrentTime, getDuration, getMovieId, getPlaying, getVolume} = player();
    return {
        duration: getDuration(),
        elapsed: getCurrentTime(),
        metadata: metadata(getMovieId()),
        isPlaying: getPlaying(),
        volume: Math.round(getVolume() * 100),
    }
}

function metadata(videoId: number): Metadata {
    const {getVideoMetadataByVideoId} = window.netflix.appContext.state.playerApp.getAPI();
    const metadata = getVideoMetadataByVideoId(videoId);
    const video = metadata.getVideo()._video;
    const type: VideoType = video.type;

    const data: Metadata = {
        type: type,
        title: video.title,
        artwork: video.artwork,
        boxart: video.boxart,
        storyart: video.storyart,
        synopsis: video.synopsis,
    }
    
    if (type === "show") {
        const currentVideo = metadata.getCurrentVideo()._video;
        const currentSeason = metadata.getCurrentVideo()._season._season;

        data.episode = {
            seq: currentVideo.seq,
            title: currentVideo.title,
            thumbs: currentVideo.thumbs,
            stills: currentVideo.stills,
            synopsis: currentVideo.synopsis,
            season: {
                seq: currentSeason.seq,
                year: currentSeason.year,
                title: currentSeason.title,
                shortName: currentSeason.shortName,
                longName: currentSeason.longName
            }
        };
    }
    
    return data;
}

function player(): any {
    const {
        getAllPlayerSessionIds,
        getVideoPlayerBySessionId
    } = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
    const sessionId = getAllPlayerSessionIds().filter((sessionId: string) => sessionId.startsWith("watch-"))[0];
    return getVideoPlayerBySessionId(sessionId);
}