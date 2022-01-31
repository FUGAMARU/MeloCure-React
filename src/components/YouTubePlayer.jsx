import { Container, Row, Col } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { average } from 'color.js';
import YouTube from 'react-youtube';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ReactTooltip from 'react-tooltip';
import useMedia from 'use-media';
import { PlayerColorState } from "../App";
import { queueState } from "./Queue";

const YouTubePlayer = () => {
    const isSm = useMedia({minWidth: "576px"});
    const isMd = useMedia({minWidth: "768px"});
    const isLg = useMedia({minWidth: "992px"});
    const [Queue, setQueue] = useRecoilState(queueState);
    const [Color, setColor] = useRecoilState(PlayerColorState);
    const [isPlaying, setPlayerState] = useState(false);
    const [Title, setTitle] = useState("");
    const [VideoSource, setVideoSource] = useState("");
    const [PlayVideoState, setPlayVideoState] = useState(true);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [YouTubeAudio, setYouTubeAudio] = useState(new Audio(""));

    const opts = {playerVars: {autoplay: 1, controls: 0, disablekb: 1}}

    const getLen = (str) => {
        let result = 0;
        for(let i=0;i<str.length;i++){
            const chr = str.charCodeAt(i);
            if((chr >= 0x00 && chr < 0x81) ||
                (chr === 0xf8f0) ||
                (chr >= 0xff61 && chr < 0xffa0) ||
                (chr >= 0xf8f1 && chr < 0xf8f4)){
                result += 1;
            }else{
                result += 2;
            }
        }
        return result;
    }

    const blackOrWhite = (hexcolor) => {
        const r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
        const g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
        const b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;
        return ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;
    }
    
    const rgbTo16 = (col) => {
        return "#" + col.match(/\d+/g).map((a) => {return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
    }

    useEffect(() => {
        if(Queue.length){
            YouTubeAudio.volume = 1;
            YouTubeAudio.play();
            document.body.style.backgroundImage = `url('${Queue[0]["src"]}')`;
            setPlayerState(true);

            YouTubeAudio.addEventListener("ended", () => {
                setPlayerState(false);
                const SSprevQueue = sessionStorage.getItem("prevQueue");
                const prevQueue = JSON.parse(SSprevQueue);
                const tmpQueue = [...prevQueue].slice(1);
                sessionStorage.setItem("prevQueue", JSON.stringify(tmpQueue));
                setQueue(tmpQueue);
            }, false);
        }
    }, [YouTubeAudio])

    const StopAudio = () => {
        YouTubeAudio.pause();
        setYouTubeAudio(new Audio(""));
    }

    useEffect(() => {
        console.log("==========Queue has changed (from YouTube)==========");
        console.log(Queue);
        if(Queue.length){
            if(!(isPlaying)){
                if(Queue[0]["service"] == "youtube"){
                    //document.body.style.backgroundImage = `url(${dark})`;
                    document.body.style.backgroundImage = `url('${Queue[0]["src"]}')`;
                    setColor("white");
                    average(Queue[0]["src"]).then(color => {
                        const hex = rgbTo16(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
                        setColor(blackOrWhite(hex));
                    });
                    setTitle(Queue[0]["title"]);
                    if(PlayVideoState){
                        setShowThumbnail(false);
                        setVideoSource(Queue[0]["id"]);
                        setShowVideoPlayer(true);
                    }else{
                        setShowVideoPlayer(false);
                        setImgSrc(Queue[0]["src"]);
                        setShowThumbnail(true);
                        setYouTubeAudio(new Audio(`https://melocure.fugamaru.com/YouTube/${Queue[0]["id"]}.mp3`));
                    }
                    setPlayerState(true);
                }
            }
        }
    }, [Queue]);

    const _onEnd = () => {
        setPlayerState(false);
        const tmpQueue = [...Queue].slice(1);
        sessionStorage.setItem("prevQueue", JSON.stringify(tmpQueue));
        setQueue(tmpQueue);
    }

    useEffect(() => {
        const LSPlayVideoState = localStorage.getItem("PlayVideoState");
        if(LSPlayVideoState == null){
            localStorage.setItem("PlayVideoState", "true");
        }else if(LSPlayVideoState == "false"){
            setPlayVideoState(false);
        }
    }, [])

    useEffect(() => {
        if(isPlaying){
            if(PlayVideoState){
                StopAudio();
                setShowThumbnail(false);
                setVideoSource(Queue[0]["id"]);
                setShowVideoPlayer(true);
                localStorage.setItem("PlayVideoState", "true");
            }else{
                StopAudio();
                setShowVideoPlayer(false);
                setImgSrc(Queue[0]["src"]);
                setShowThumbnail(true);
                setYouTubeAudio(new Audio(`https://melocure.fugamaru.com/YouTube/${Queue[0]["id"]}.mp3`));
                localStorage.setItem("PlayVideoState", "false");
            }
        }
    }, [PlayVideoState])

    if(isPlaying){
        return(
            <>
                <Container className="mt-2" fluid={true}>
                <Row>
                    <Col xs={{span: 4, offset: 4}}>
                        <p className="spotify-player-heading" style={{color: Color}}><FontAwesomeIcon icon={faYoutube} /> Now Playing...</p>
                    </Col>
                </Row>
                    <div className="frame-wrapper">
                        <div style={{textAlign: "right"}}>
                            <a data-tip data-for='PlayVideo' style={{color: "white", fontWeight: "bold", fontFamily: "Kazesawa-bold"}}>動画再生:&nbsp;
                                <BootstrapSwitchButton
                                    size="xs"
                                    checked={PlayVideoState}
                                    onlabel='ON'
                                    offlabel='OFF'
                                    onChange={(checked) => {setPlayVideoState(checked)}}
                                />
                            </a>
                            <ReactTooltip id='PlayVideo' type='dark' effect="solid">
                                <span>OFFにするとYouTubeの動画が再生されなくなりますが、曲送りがバックグラウンドでも作動します</span>
                            </ReactTooltip>
                        </div>
                        <div className="frame-wrapper__video">
                            {showVideoPlayer ? <YouTube videoId={VideoSource} opts={opts} onEnd={_onEnd}></YouTube> : null}
                            {showThumbnail ? <img src={imgSrc} width="100%"></img> : null}
                            {/*<iframe src={VideoSource} frameBorder="0" allowFullScreen></iframe>*/}
                        </div>
                    </div>
                    <div style={{textAlign: "center"}}><p className="youtube-title-lg" style={{color: Color}}>{Title}</p></div>
                <Row className="justify-content-md-center" lg={"auto"}>
                    <Col>
                        <div className="bb_lg" style={{borderBottom: "2px solid #FFF"}}></div>
                    </Col>
                </Row>
                </Container>
            </>
        );
    }else{
        return null;
    }
}

export default YouTubePlayer;