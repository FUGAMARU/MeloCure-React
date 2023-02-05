import { useRecoilState } from "recoil";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import useMedia from 'use-media';
import { AccessToken, LoginState } from "../App";

const Login = () => {
    const isMd = useMedia({minWidth: "768px"});
    const API_URL = "https://accounts.spotify.com/authorize?response_type=code&client_id=bcaba30ef9964e669abb1eacc932b945&scope=user-modify-playback-state%2520streaming%2520user-read-email%2520user-read-private%2520user-read-currently-playing%2520user-read-playback-state&redirect_uri=https%3A%2F%2Fmelocure.fugamaru.com%2Fphp%2Fcallbackspotify.php&state=johnmanjirou";
    const [,setToken] = useRecoilState(AccessToken);
    const [,setLoginState] = useRecoilState<any>(LoginState);

    const continueFunc = () => {
        setToken("NO_TOKEN");
        setLoginState(true);
    }

    if(isMd){ //PCかタブレット
        return(
            <Container className="mt-5" fluid={true}>
                <Row className="justify-content-md-center" xs={"auto"}>
                    <Col>
                        <div className="gr_title"><p className="welcome text-center" style={{fontSize: "70px"}}>Welcome to MeloCure</p></div>
                        <p className="welcome text-center" style={{fontSize: "30px", marginTop: "-20px"}}>-&nbsp;&nbsp;&nbsp;Quick sharing your favorites in real-time&nbsp;&nbsp;&nbsp;-</p>
                        <Row className="justify-content-md-center mt-4" xs={"auto"}>
                            <span><a href={API_URL} className="login" style={{width: "305px"}}><FontAwesomeIcon icon={faSpotify} />&nbsp;<b>Spotifyでサインインする</b></a></span>
                            <span><a href="javascript:void(0);" onClick={continueFunc} className="nologin" style={{width: "305px"}}><FontAwesomeIcon icon={faArrowCircleRight} />&nbsp;<b>サインインせずに続ける</b></a></span>
                        </Row>
                        <Row className="justify-content-md-center mt-3" xs={"auto"}>
                            <div className="attention">
                                <p>Spotify Premiumアカウントをお持ちでない方はサインインせずに続行してください(Spotify Freeアカウントでサインインしても反映されません)</p>
                            </div>
                        </Row>
                        <Row className="justify-content-md-center mt-2" xs={"auto"}>
                            <div style={{color: "white", fontSize: "30px", fontWeight: "bold", fontFamily: "Kazesawa-bold"}}>
                                <p>対応サービス</p>
                            </div>
                        </Row>
                        <Row className="justify-content-md-center" xs={"auto"} style={{marginTop: "-30px"}}>
                            <span style={{fontSize: "100px"}}><FontAwesomeIcon style={{color: "#0bd630"}} icon={faSpotify} /></span>
                            <span style={{fontSize: "100px"}}><FontAwesomeIcon style={{color: "#FF0000"}} icon={faYoutube}/></span>
                        </Row>
                        <Row className="justify-content-md-center" xs={"auto"}>
                            <div className="attention">
                                <p>フルでSpotifyの楽曲再生を行うにはSpotify Premiumへの登録・サインインが必要です</p>
                                <p>サインインせずに続行した場合、Spotifyの楽曲再生は低音質な30秒のプレビュー版に制限されます(YouTubeの利用制限はありません) </p>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }else{ //スマホ
        return(
            <Container className="mt-5" fluid={true}>
                <Row className="justify-content-xs-center" xs={"auto"}>
                    <Col>                       
                        <div className="gr_title"><p className="welcome text-center" style={{fontSize: "30px"}}>Welcome to MeloCure</p></div>
                        <p className="welcome text-center" style={{fontSize: "13px", marginTop: "-20px"}}>-&nbsp;&nbsp;&nbsp;Quick sharing your favorites in real-time&nbsp;&nbsp;&nbsp;-</p>
                        <Row className="justify-content-xs-center mt-4" xs={"auto"}>
                            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                <div><a href={API_URL} className="login" style={{width: "300px"}}><FontAwesomeIcon icon={faSpotify} />&nbsp;<b>Spotifyでサインインする</b></a></div>
                                <div className="mt-4"><a href="javascript:void(0);" onClick={continueFunc} className="nologin" style={{width: "300px"}}><FontAwesomeIcon icon={faArrowCircleRight} />&nbsp;<b>サインインせずに続ける</b></a></div>
                            </div>
                        </Row>
                            <div className="attention mt-3" style={{lineHeight: "1"}}>
                                <p>Spotify Premiumアカウントをお持ちでない方はサインインせずに続行してください(Spotify Freeアカウントでサインインしても反映されません)</p>
                            </div>
                            <div style={{color: "white", fontSize: "30px", fontWeight: "bold", fontFamily: "Kazesawa-bold", textAlign: "center"}}>
                                <p>対応サービス</p>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <span className="mx-2" style={{fontSize: "100px"}}><FontAwesomeIcon style={{color: "#0bd630"}} icon={faSpotify} /></span>
                                <span className="mx-2" style={{fontSize: "100px"}}><FontAwesomeIcon style={{color: "#FF0000"}} icon={faYoutube}/></span>
                            </div>
                        <Row className="justify-content-xs-center" xs={"auto"}>
                            <div className="attention" style={{lineHeight: "1"}}>
                                <p>フルでSpotifyの楽曲再生を行うにはSpotify Premiumへの登録・サインインが必要です</p>
                                <p>サインインせずに続行した場合、Spotifyの楽曲再生は低音質な30秒のプレビュー版に制限されます(YouTubeの利用制限はありません) </p>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;