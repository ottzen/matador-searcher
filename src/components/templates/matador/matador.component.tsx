import { useState } from "react";
import { allEpisodes } from "./data/allEpisodes";
import { useHighlightText } from "./hooks/useHighlightText.hook";
import { formatTime } from "./hooks/useFormatTime.hook";
import EpisodeInfoComponent from "./components/episodeInfo/episodeInfo.component";
import { useDebounce } from "react-use";
import { Spinner } from "../../organims/Spinner/Spinner.component";
import { FaInfoCircle, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
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
                    placeholder={`Søg i ${allLines.length} replikker...`}
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

            <div className={S.wrapper}>
                <div className={S.section1}>
                    {showResults ? (
                        <ul className={S.resultList}>
                            <h4 className={S.resultHeader}>
                                "{debouncedQuery}" siges {allMatchingEntries.length} gange i {filteredResults.length} afsnit
                            </h4>
                            {filteredResults.map((ep) => (
                                <li key={ep.episode} className={S.episodeItem}>
                                    <div className={S.episodeHeader}>
                                        {ep.results.length > 0 && (
                                            <div className={S.episodeInfoWrapper}>
                                                <span className={S.episodeHits}>
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
                    ) : (
                        <div className={S.noResults}>
                            Vidste du at "Varnæs" bliver sagt 175 gange i løbet af serien? <br /><br />
                            Brug søgefeltet til at søge efter ord eller hele replikker
                        </div>
                    )}
                </div>
                <div className={S.section2}>
                    <h4 className={S.resultHeader}>Om websitet</h4>
                    Websitet/søgemotoren er lavet som et hobbyprojekt af <br />Kasper Søgaard Ottzen.
                    <div className={S.socialMediaIcons}>
                        <a href="https://www.facebook.com/ottzen" target="_blank" className={S.socialMediaIcon}><FaFacebook /></a>
                        <a href="https://www.instagram.com/kasperottzen" target="_blank" className={S.socialMediaIcon}><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/kasperottzen" target="_blank" className={S.socialMediaIcon}><FaLinkedin /></a>
                    </div>
                    <div>
                        Email: <a className={S.emailLink} href="mailto:kasper@ottzen.com">kasper@ottzen.com</a>
                    </div>
                    <br/>
                    I er velkomne til at sende ris/ros, fejl og mangler, eller forslag til forbedringer - både datamæssigt og lauout/designmæssigt.
                    <br /><br />
                    Undertekster er hentet som srt filer. 1 fil for hvert afsnit. Heri står replikker og tilhørende timetamps/tidspunkt hvornår replik bliver sagt. <br />
                    Jeg har derefter konverteret disse srt filer om til JSON format, som søgemotoren kan bruge til at søge i.
                    <br /><br />
                    <strong>Fejl:</strong>
                    <ul>
                        <li>
                            Episode 7 - Fødselsdagen: <br />
                            I hele dette afsnit passer replikker og tidspunkter ikke sammen. Dette er fordi at den srt fil jeg har brugt (og som er den eneste jeg har kunnet finde)
                            har det gamle resume fra før Matador blev restaureret. Og dette resume er kortere end det, som er brugt i den restaurerede version hvor der er indtalt nyt resume.
                            <br /><br />
                            Se den "gamle" version af <a href="https://www.kb.dk/find-materiale/dr-arkivet/post/ds.tv:oai:io:90cd6a06-1f19-4d13-b0aa-a318aeb59479" target="_blank">fødselsdagen</a>
                        </li>
                    <br />
                        <li>
                            Alle replikker som siges i serien er ikke gengivet 100% korrekt i underteksterne. <br />
                            Jeg ved ikke om det kan være fordi skuespillerne improviserer når det inspilles.<br />
                            Så der vil være nogle replikker som ikke bliver fundet, selvom de er sagt i serien. <br />
                            Jeg overvejer at gennemgå samtligere undertekster manuelt og rette dem. Men det er et stort arbejde. Så det er noget der vil komme løbende.
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default MatadorComponent;
