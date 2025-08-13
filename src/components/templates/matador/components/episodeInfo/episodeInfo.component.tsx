import BasicLink from "../../../../atoms/Link/Link.component";
import { EpisodeData } from "../../interfaces/episodeData.interface";
import S from "./episodeInto.module.scss"

const EpisodeInfoComponent = (props: EpisodeData) => {
    return (
        <>
            <div className={S.episodeInfo} >
                <div>Episode nr: {props.episodeNumber}</div>
                <div>Titel: {props.episodeTitle}</div>
                <div>År: {props.period}</div>
                <div>Sæson: {props.season}</div>
                <div>Varighed: {props.playTime}</div>
                {props.drTvUrl && (
                    <BasicLink href={props.drTvUrl} target="_blank">Se {props.episode} - {props.episodeTitle} på DRTV</BasicLink>
                )}
            </div>
        </>
    );
};

export default EpisodeInfoComponent;