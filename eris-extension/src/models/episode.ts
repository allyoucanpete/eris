import {Image} from "./image";

export interface Episode {
    seq: number;
    title: string;
    thumbs: Image[];
    stills: Image[];
    synopsis: string;
}
