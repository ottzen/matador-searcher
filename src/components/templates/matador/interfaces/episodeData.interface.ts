import { SubtitleEntry } from "./subtitleEntry.interface";

export interface EpisodeData {
    episode: string;
    episodeTitle: string;
    period: string;
    season: string;
    playTime: string;
    drTvUrl: string;
    data: SubtitleEntry[];
}