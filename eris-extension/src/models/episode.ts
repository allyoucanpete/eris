import {Image} from "./image";
import {Season} from "./season";

export interface Episode {
    seq: number;
    title: string;
    thumbs: Image[];
    stills: Image[];
    synopsis: string;
    season: Season;
}
