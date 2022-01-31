import './App.css';
import './css.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { ToastProvider } from 'react-toast-notifications';
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import SpotifyPlayer from './components/SpotifyPlayer.jsx';
import Queue from './components/Queue';
import WS from "./components/WSControl";
import Login from "./components/Login";
import YouTubePlayer from './components/YouTubePlayer';
import SpotifyPlayerNOLOGIN from './components/SpotifyPlayerNOLOGIN.jsx';
import About from './components/About';

//import useWindowDimensions from './components/useWindowDimensions';

export const AccessToken = atom({key: "Token", default: ""});
export const LoginState = atom({key: "LoginState", default: false});
export const PlayerColorState = atom({key: "Color", default: "white"});

const App = () => {
  //const { height, width } = useWindowDimensions();
  const [isLoggedIn, setLoginState] = useRecoilState<any>(LoginState);
  const [,setToken] = useRecoilState(AccessToken);
  const [TokenState, setTokenState] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const deviceChecker = () => {
    const ua = navigator.userAgent.toLowerCase()
    if(/android|ipod|ipad|iphone|macintosh/.test(ua) && 'ontouchend' in document){
      return true;
    }else{
      return false;
    }
  }

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if(deviceChecker()){
      setShowModal(true);
    }

    const rand = Math.floor( Math.random () * 11) + 1; //1～11の乱数
    document.body.style.backgroundImage = `url('${process.env.PUBLIC_URL}/background-images/${rand}.jpg')`;

    axios.get('https://melocure.fugamaru.com/php/spotifyapi.php', {withCredentials: true})
      .then((res: any) => {
        console.log("==========Spotify Token Received==========");
        console.log(res);
        if(res.data.state){
          setToken(res.data.token);
          setLoginState(true);
          setTokenState(true);
        }else{
          setTokenState(false);
        }
      })
      .catch(err => {
          console.log('err:', err);
      });

    setInterval(() => {
      axios.get('https://melocure.fugamaru.com/php/spotifyapi.php', {withCredentials: true})
      .then((res: any) => {
        console.log("==========Spotify Token Received==========");
        console.log(res);
        if(res.data.state){
          setToken(res.data.token);
          setLoginState(true);
          setTokenState(true);
        }else{
          setTokenState(false);
        }
      })
      .catch(err => {
          console.log('err:', err);
      });
    }, 3500000);
  },[]);

  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>注意事項</Modal.Title>
        </Modal.Header>
        <Modal.Body>MeloCureは、iOS、iPadOS、及びAndroidをサポートしていません。自動再生やバックグラウンド再生が利用できなかったり、ページレイアウトが崩れたりする可能性がります。<br/>Windows、macOS、Linuxなどを搭載したPCでご利用ください。</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
      <Switch>
        <Route exact path="/">
          <ToastProvider>
            {isLoggedIn == true && TokenState == true ? 
              <>
                <WS />
                <SpotifyPlayer />
                <YouTubePlayer />
                <Queue />
              </> : null}
            {isLoggedIn == true && TokenState == false ? 
              <>
                <WS />
                <SpotifyPlayerNOLOGIN />
                <YouTubePlayer />
                <Queue />
              </> : null}
            {isLoggedIn == false && TokenState == false ? <Login /> : null}
          </ToastProvider>
        </Route>

        <Route path="/about" component={About}/>
        <Route>
          <p style={{color: "white", textAlign: "center", fontSize: "500px", lineHeight: "100%"}}>404</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;