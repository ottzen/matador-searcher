import BasicLink from "../../../../atoms/Link/Link.component";
import S from "./episodeInto.module.scss"

type EpisodeInfoComponentProps = {
    episode: string;
    episodeTitle: string;
    period: string;
    season: string;
    playTime: string;
    drTvUrl: string;
};

const EpisodeInfoComponent = (props: EpisodeInfoComponentProps) => {
    return (
        <>
            <div className={S.episodeInfo} >
                <div>Titel: {props.episodeTitle}</div>
                <div>År: {props.period}</div>
                <div>Sæson: {props.season}</div>
                <div>Varighed: {props.playTime}</div>
                <BasicLink href={props.drTvUrl} target="_blank">Se {props.episode} - {props.episodeTitle} på DRTV</BasicLink>
            </div>
        </>
    );
};

export default EpisodeInfoComponent;