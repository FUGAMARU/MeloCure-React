import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { atom, useRecoilState } from 'recoil';
import axios from 'axios';
import useMedia from 'use-media';
import getYtThumbnail from 'get-yt-thumbnail';
import Joyride from 'react-joyride';
import getVideoId from 'get-video-id';
import { AccessToken, PlayerColorState } from "../App";
import { onlineCounter,  WSState } from "./Header";
import QueueLg from "./QueueLg";
import socket from "./WSConnector";

export const queueState = atom({key: "Queue", default: []});

const Queue = () => {
    const [Token] = useRecoilState(AccessToken);
    const [Color] = useRecoilState(PlayerColorState);
    const [Queue, setQueue] = useRecoilState(queueState);
    const [,setCounter] = useRecoilState(onlineCounter);
    const [,setWSConnectionState] = useRecoilState(WSState);
    const [URL, setURL] = useState("");
    const [showTutorial, setShowTutorial] = useState(false);
    const [prevURL, setPrevURL] = useState("");
    const { addToast } = useToasts();

    const YTDurationToSeconds = (duration: any) => {
        let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      
        match = match.slice(1).map((x: any) => {
          if (x != null) {
              return x.replace(/\D/, '');
          }
        });
      
        const hours = (parseInt(match[0]) || 0);
        const minutes = (parseInt(match[1]) || 0);
        const seconds = (parseInt(match[2]) || 0);
      
        return (hours * 3600 + minutes * 60 + seconds) * 1000;
    }

    useEffect(() => {
        const checkSS = setInterval(() => {
            if(!(Queue.length)){
                console.log("Checking a Session Storage....");
                const SSprevQueue: any = sessionStorage.getItem("prevQueue");
                const prevQueue = JSON.parse(SSprevQueue);
                if(prevQueue.length && prevQueue[0]["type"] == "init"){
                    const bdpQueue = prevQueue.slice(1);
                    const tmpQueue = bdpQueue.map((v: any) => {
                        return v[0];
                    });
                    sessionStorage.setItem("prevQueue", JSON.stringify(tmpQueue));
                    setQueue(tmpQueue);
                    setCounter(prevQueue[0]["online"]);
                    clearInterval(checkSS);
                    setWSConnectionState("#a6eb1c");
                }
            }
          }, 200);

        const LSshowTutorial = localStorage.getItem('showTutorial');
        if(LSshowTutorial == null){
            setShowTutorial(true);
            localStorage.setItem("showTutorial", "true");
        }
    },[]);

    const submitURL = (e: any) => {
        if(e.which === 13) {
            if(!(URL === prevURL)){
                if(URL.indexOf("spotify.com") != -1){
                    if(Token == "NO_TOKEN"){
                        alert("サインインしていない状態ではSpotifyのコンテンツをキューに追加することはできません");
                    }else{
                        const SpotifyID = URL.substr(URL.indexOf("/track/") + 7, 22);
                        let exists = false;
                        if(Queue.length){
                            for(const v of Queue) {
                                if(v["id"] == SpotifyID){
                                    alert("追加しようとしているコンテンツは再生中か、既にキューに存在しています");
                                    exists = true;
                                }
                            }
                        }
                        if(!(exists)){
                            axios.get("https://api.spotify.com/v1/tracks/" + SpotifyID, { headers: {"Authorization": "Bearer " + Token} })
                            .then((res: any) => {
                                if(res.data.duration_ms >= 600000){
                                    alert("長さが10分以上のコンテンツは送信できません");
                                }else{
                                    addToast("データーを送信しました", {appearance: "success", autoDismiss: true});
                                    setPrevURL(URL);
                                    const Artists = res.data.artists;
                                    let arrArtists = [];
                                    for (const artist of Artists){
                                        arrArtists.push(artist.name);
                                    }
                                    const strArtists = arrArtists.join(", ");
                                    const params = [{"type": "add", "service": "spotify", "id": SpotifyID, "src": res.data.album.images[0].url, "title": res.data.name, "artists": strArtists, "preview": res.data.preview_url, "duration": res.data.duration_ms}];
                                    socket.send(JSON.stringify(params));
                                }
                            })
                            .catch(err => {
                                alert("SpotifyAPIアクセス時にエラーが発生しました");
                                console.log('err:', err);
                            });
                        }
                    }
                }else if(URL.indexOf("youtube.com") != -1 || URL.indexOf("youtu.be") != -1){
                    const YouTubeID: any = getVideoId(URL)["id"];
                    let exists = false;
                    if(Queue.length){
                        for(const v of Queue) {
                            if(v["id"] == YouTubeID){
                                alert("追加しようとしているコンテンツは再生中か、既にキューに存在しています");
                                exists = true;
                            }
                        }
                    }
                    if(!(exists)){
                        addToast("データーを送信しました\nキューに反映されるまでしばらくお待ちください", {appearance: "success", autoDismiss: true});
                        setPrevURL(URL);
                        (async () => {
                            const Thumbnail: any = await getYtThumbnail(YouTubeID);
                            axios.get(`https://melocure.fugamaru.com/php/get-youtube-title.php?id=${YouTubeID}`, {withCredentials: true})
                            .then((res: any) => {
                                const Title = res.data.title;
                                const duration = YTDurationToSeconds(res.data.duration);
                                if(duration >= 600000){
                                    alert("長さが10分以上のコンテンツは送信できません");
                                }else{
                                    const params = [{"type": "add", "service": "youtube", "id": YouTubeID, "src": Thumbnail, "title": Title, "duration": duration}];
                                    socket.send(JSON.stringify(params));
                                
                                }
                            })
                            .catch(err => {
                                console.log('err:', err);
                            });
                        })();
                    }
                }else{
                    alert("URLのフォーマットが不正です");
                }
                setURL("");
            }
        }
    }

    const changeURL = (e: any) => {
        setURL(e.target.value);
    }

    const isSm = useMedia({minWidth: "576px"});
    const isMd = useMedia({minWidth: "768px"});
    const isLg = useMedia({minWidth: "992px"});

    return(
        <>
            <Joyride run={showTutorial} steps={[
            {
              target: '.inputURL',
              title: "コンテンツの追加方法",
              content: <span>このテキストボックスに、SpotifyやYouTubeの共有用URLを入力し、エンターキーを押してコンテンツをキューに追加します。<br />入力例<br/>
                        Spotify&nbsp;:&nbsp;https://open.spotify.com/track/3NgCkkW8PnzPHSmmrmNhLB<br/>
                        YouTube&nbsp;:&nbsp;https://www.youtube.com/watch?v=eo8nPndrfFw<br/><br/>
                        なお、YouTubeは送信してからキューに反映されるまでに少し時間がかかります。</span>
            }]}
            styles={{
                options: {
                  arrowColor: '#54ebc8',
                  backgroundColor: '#1e1f1c',
                  primaryColor: '#54ebc8',
                  textColor: '#fff',
                  width: 900,
                  zIndex: 1000,
                }
              }}
            />
            <Container className="mt-3" fluid={true}>
                <Row>
                    <Col xs={{span: 4, offset: 4}}>
                        <p className="spotify-player-heading" style={{color: Color}}><FontAwesomeIcon icon={faTh} /> Queue</p>
                    </Col>
                </Row>
                <Row className="justify-content-md-center" lg={"auto"}>
                    <Col>
                        <div className="webflow-style-input mb-4">
                        <input className="inputURL" type="url" onChange={(e) => changeURL(e)} value={URL} placeholder="Paste URL here and press Enter" onKeyPress={(e) => submitURL(e)} style={{width: "1000px"}}></input>
                        </div>
                    </Col>
                </Row>
                <QueueLg />
            </Container>
        </>
    );
}

export default Queue;