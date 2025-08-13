import { useState } from "react";
import { allEpisodes } from "./data/allEpisodes";
import { useHighlightText } from "./hooks/useHighlightText.hook";
import { formatTime } from "./hooks/useFormatTime.hook";
import EpisodeInfoComponent from "./components/episodeInfo/episodeInfo.component";
import { useDebounce } from "react-use";
import { Spinner } from "../../organims/Spinner/Spinner.component";
import { FaInfoCircle } from "react-icons/fa";
import S from "./matador.module.scss";

const MatadorComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { highlightText } = useHighlightText();
    const [showInfo, setShowInfo] = useState<{ [key: string]: boolean }>({});

    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useDebounce(
        () => {
            setDebouncedQuery(searchQuery);
            window.scrollTo(0, 0); // Scroll to top when search query changes
        },
        500,
        [searchQuery]
    );

    const filteredResults = allEpisodes
        .map(ep => ({
            ...ep,
            results: ep.data.filter(entry =>
                entry.lines.some(lineObj =>
                    lineObj.line.toLowerCase().includes(debouncedQuery.toLowerCase())
                ),
            )
        }))
        .filter(ep => ep.results.length > 0);

    const getAllLinesFromAllEpisodes = () => {
        return allEpisodes.flatMap(ep =>
            ep.data.flatMap(entry =>
                entry.lines.map(lineObj => lineObj.line)
            )
        );
    };

    const allLines = getAllLinesFromAllEpisodes();

    const shouldShowResults = debouncedQuery.length > 1 && filteredResults.length > 0;
    if (shouldShowResults && !showResults) setShowResults(true);
    if (!shouldShowResults && showResults) setShowResults(false);

    const toggleInfo = (episodeId: string) => {
        setShowInfo(prevState => ({
            ...prevState,
            [episodeId]: !prevState[episodeId] // Toggle the info visibility for the clicked episode
        }));
    };
    const allMatchingEntries = filteredResults.flatMap(ep => ep.results);

    return (
        <div className={S.container}>
            <div className={S.searchBar}>

                <button onClick={() => setSearchQuery("")} disabled={!searchQuery} className={S.clearButton}>
                    Ryd
                </button>

                <input
                    type="text"
                    placeholder="Søg efter matador replik..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setShowInfo({})
                    }}
                />
            </div>

            {searchQuery !== "" && !showResults && (
                <div className={S.spinnerWrapper}>
                    <Spinner />
                    <span>
                        ` Søger i {allLines.length} replikker...`
                    </span>
                </div>
            )}

            {showResults && (
                <ul className={S.resultList}>
                    <h4 className={S.resultHeader}>
                        "{debouncedQuery}" siges {allMatchingEntries.length} gange i {filteredResults.length} afsnit
                    </h4>
                    {filteredResults.map((ep) => (
                        <li key={ep.episode} className={S.episodeItem}>
                            <div className={S.episodeHeader}>
                                {ep.results.length > 0 && (
                                    <div className={S.episodeInfoWrapper}>
                                        <span>
                                            <strong>{ep.results.length} hits</strong> i {ep.episode} - {ep.episodeTitle}
                                        </span>
                                        <button className={S.episodeInfo} onClick={() => toggleInfo(ep.episode)} ><FaInfoCircle /> {showInfo[ep.episode] ? "Luk info om episode" : "Se info om episode"}</button>
                                    </div>
                                )}
                            </div>
                            {showInfo[ep.episode] && (
                                <EpisodeInfoComponent {...ep} />
                            )}
                            <ul className={S.subtitleList}>
                                {ep.results.map((entry, index) => (
                                    <li key={index} className={S.subtitleEntry}>
                                        <div>
                                            {entry.lines.map((lineObj, i) => (
                                                <span className={S.line} key={i}>{highlightText(lineObj.line, searchQuery)}</span>
                                            ))}
                                            {entry.resume === true && <span className={S.resume}>(en del af resuméet)</span>}
                                        </div>
                                        <span>
                                            Siges efter {formatTime(entry.start)} i <span className={S.italic}>{ep.episode} - {ep.episodeTitle}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default MatadorComponent;
