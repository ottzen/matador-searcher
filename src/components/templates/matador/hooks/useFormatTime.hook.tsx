export const formatTime = (time: string): string => {
    const [hours, minutes, rest] = time.split(":");
    const [seconds] = rest.split(",");

    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseInt(seconds, 10);

    const parts = [];

    if (parsedHours > 0) parts.push(`${parsedHours} time,`);
    if (parsedMinutes > 0) parts.push(`${parsedMinutes} minutter og`);
    if (parsedSeconds > 0) parts.push(`${parsedSeconds} sekunder`);

    return parts.join(" ");
};