interface Line {
    line: string;
}
interface EpisodeLine {
    start: string;
    end: string;
    resume?: boolean;
    lines: Line[];
    episode?: number;
}

export type Episode = EpisodeLine[];