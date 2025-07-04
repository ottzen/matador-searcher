export interface SubtitleEntry {
    start: string;
    end: string;
    resume?: boolean;
    lines: { line: string }[];
}