import React from "react";  // Make sure React is imported

export const useHighlightText = () => {
    const highlightText = (text: string, query: string): React.ReactNode => {
        if (!query) return text; // Return text unmodified if no query

        const regex = new RegExp(`(${query})`, "gi"); // Case-insensitive regex
        const parts = text.split(regex); // Split the text based on regex

        return parts.map((part, index) => {
            // If part matches the query, highlight it
            if (part.toLowerCase() === query.toLowerCase()) {
                return <strong key={index} style={{ backgroundColor: "yellow" }}>{part}</strong>;
            }

            // Otherwise, return part as plain text
            return part;
        }) as React.ReactNode; // Cast the result to ReactNode to satisfy TypeScript
    };

    return { highlightText };
};
