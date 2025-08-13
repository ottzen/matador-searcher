import { SubtitleEntry } from "./subtitleEntry.interface";

export interface EpisodeData {
    episode: string;
    episodeTitle: string;
    episodeNumber: number;
    period: string;
    season: string;
    playTime: string;
    drTvUrl?: string;
    data: SubtitleEntry[];
}