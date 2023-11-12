import {Episode, Season, VideoType} from ".";

export interface Metadata {
    type: VideoType;
    title: string;
    artwork: string;
    boxart: string;
    storyart: string;
    synopsis: string;
    episode?: Episode;
    season?: Season;
}
