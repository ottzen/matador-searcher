"use client"
import React, { useState } from 'react';

const SubtitleSearch = ({ srtContent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const parseSRT = (srtContent) => {
    const lines = srtContent.split('\n\n');
    return lines.map(line => {
      const [index, times, ...textLines] = line.split('\n');
      const [startTime, endTime] = times.split(' --> ');
      const text = textLines.join(' ');
      return { index, startTime, endTime, text };
    });
  };

  const subtitles = parseSRT(srtContent);

  const handleSearch = () => {
    const results = subtitles.filter(subtitle =>
      subtitle.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search subtitles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <p>Time: {result.startTime} - {result.endTime}</p>
              <p>{result.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SubtitleSearch;
