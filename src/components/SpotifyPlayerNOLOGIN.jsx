import { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useRecoilState } from 'recoil';
import { average } from 'color.js';
import { useToasts } from 'react-toast-notifications';
import useMedia from 'use-media';
import Marquee from "react-fast-marquee";
import { PlayerColorState } from "../App";
import { queueState } from './Queue'

const SpotifyPlayerNOLOGIN = () => {
    const isSm = useMedia({minWidth: "576px"});
    const isMd = useMedia({minWidth: "768px"});
    const isLg = useMedia({minWidth: "992px"});
    const [Queue, setQueue] = useRecoilState(queueState);
    const [Color, setColor] = useRecoilState(PlayerColorState);
    const [isPlaying, setPlayerState] = useState(false);
    const [Title, setTitle] = useState("");
    const [Artists, setArtists] = useState("");
    const [CurrentPosition, setCurrentPosition] = useState(0);
    const [Duration, setDuration] = useState(0);
    const { addToast } = useToasts();

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

    const AudioObjControl = () => {
        const previewTrack = new Audio(Queue[0]["preview"]);
        previewTrack.load();
        
        previewTrack.addEventListener("loadedmetadata",(e) => {
            setDuration(previewTrack.duration);
        });

        previewTrack.volume = 0.5;
        previewTrack.play();
        document.body.style.backgroundImage = `url('${Queue[0]["src"]}')`;
        setPlayerState(true);

        previewTrack.addEventListener("timeupdate", (event) => {
            setCurrentPosition(previewTrack.currentTime);
        });

        previewTrack.addEventListener("ended", () => {
            setPlayerState(false);
            const SSprevQueue = sessionStorage.getItem("prevQueue");
            const prevQueue = JSON.parse(SSprevQueue);
            const tmpQueue = [...prevQueue].slice(1);
            sessionStorage.setItem("prevQueue", JSON.stringify(tmpQueue));
            setQueue(tmpQueue);
        }, false);
    }

    useEffect(() => {
        console.log("==========Queue has changed (from SpotifyPlayer-NOLOGIN)==========");
        console.log(Queue);
        if(Queue.length){
            if(!(isPlaying)){
                if(Queue[0].service == "spotify"){
                    if(!(Queue[0].preview == null)){
                        average(Queue[0]["src"]).then(color => {
                            const hex = rgbTo16(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
                            setColor(blackOrWhite(hex));
                        });
                        const Title = getLen(Queue[0].title);
                        const Artists = getLen(Queue[0].artists);
                        if(Title >= 25 && Artists >= 40){ //両方はみ出た場合
                            setTitle(<div style={{maxWidth: "700px", marginTop: "-50px"}}><Marquee pauseOnHover={true} gradient={false} speed={30}><p className="spotify-title-lg" >{Queue[0]["title"]}&nbsp;&nbsp;&nbsp;&nbsp;</p></Marquee></div>);
                            setArtists(<div style={{maxWidth: "700px", marginTop: "-20px"}}><Marquee pauseOnHover={true} gradient={false} speed={30}><p className="spotify-artists-lg" >&nbsp;/&nbsp;{Queue[0]["artists"]}&nbsp;</p></Marquee></div>);
                        }else if(Title >= 25 && Artists < 40){//タイトルだけはみ出た場合
                            setTitle(<div style={{maxWidth: "700px", marginTop: "-100px"}}><Marquee pauseOnHover={true} gradient={false} speed={30}><p className="spotify-title-lg" >{Queue[0]["title"]}&nbsp;&nbsp;&nbsp;&nbsp;</p></Marquee></div>);
                            setArtists(<p className="spotify-artists-lg" >&nbsp;/&nbsp;{Queue[0]["artists"]}&nbsp;</p>);
                        }else if(Title < 25 && Artists >= 40){//アーティストだけはみ出た場合
                            setTitle(<p className="spotify-title-lg">{Queue[0]["title"]}&nbsp;&nbsp;&nbsp;&nbsp;</p>);
                            setArtists(<div style={{maxWidth: "700px", marginTop: "-20px"}}><Marquee pauseOnHover={true} gradient={false} speed={30}><p className="spotify-artists-lg" >&nbsp;/&nbsp;{Queue[0]["artists"]}&nbsp;</p></Marquee></div>);
                        }else{//どっちも大丈夫な場合
                            setTitle(<p className="spotify-title-lg" >{Queue[0]["title"]}&nbsp;&nbsp;&nbsp;&nbsp;</p>);
                            setArtists(<p className="spotify-artists-lg" >&nbsp;/&nbsp;{Queue[0]["artists"]}&nbsp;</p>);
                        }
                        AudioObjControl();
                    }else{
                        addToast(`プレビュー版音源が用意されていないので『${Queue[0]["title"]}』の再生はスキップされました`, {appearance: "error", autoDismiss: true, autoDismissTimeout: 5000});
                        const SSprevQueue = sessionStorage.getItem("prevQueue");
                        const prevQueue = JSON.parse(SSprevQueue);
                        const tmpQueue = [...prevQueue].slice(1);
                        sessionStorage.setItem("prevQueue", JSON.stringify(tmpQueue));
                        setQueue(tmpQueue);
                    }
                }
            }
        }
    }, [Queue]);   

    return(
        <Container className="mt-2" fluid={true}>
        {Queue.length && isPlaying ? <>
            <Row>
                <Col xs={{span: 4, offset: 4}}>
                    <p className="spotify-player-heading" style={{color: Color}}><FontAwesomeIcon icon={faSpotify} /> Now Playing...</p>
                </Col>
            </Row> 
            <Row className="justify-content-md-center" lg={"auto"}>
                <Row>
                <Col>
                <img src={Queue[0]["src"]} style={{
                    width: 300, height: 300, 
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}} alt={Queue[0]["title"]}/>
                </Col>
                </Row>
                <Row className="align-items-center">
                <Col>
                    <div style={{color: Color}}>
                        {Title}
                        {Artists}
                    </div>
                    <div className="seekbar" style={{borderBottom: `5px solid ${Color}`}}><div style={{width: (500 * (CurrentPosition / Duration)).toString() + "px", content: "", display: "block", borderBottom: "5px solid #1ed760", paddingBottom: "25px", marginLeft: "auto", position: "absolute"}}></div></div>
                </Col>
                </Row>
            </Row>
            <Row className="justify-content-md-center" lg={"auto"}>
                <Col>
                    <div className="bb_lg" style={{borderBottom: `2px solid ${Color}`}}></div>
                </Col>
            </Row>
        </> : null}
        </Container>
    );
}

export default SpotifyPlayerNOLOGIN;