import ReactTooltip from 'react-tooltip';
import { Container, Navbar } from 'react-bootstrap';
import { useRecoilState, atom } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleArrows, faUsers, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { LoginState, PlayerColorState } from "../App";

export const onlineCounter = atom({key: "onlineCounter", default: null});
export const WSState = atom({key: "WSState", default: "#ff0a37"});

const Header = () => {
    const [Counter] = useRecoilState(onlineCounter);
    const [isLoggedIn] = useRecoilState<any>(LoginState);
    const [Color] = useRecoilState(PlayerColorState);
    const [WSConnectionState] = useRecoilState(WSState);

    return(
        <>
            <Navbar className="customNav py-0 shadow">
                <Container>
                <Navbar.Brand className="nav-title" href="https://melocure.fugamaru.com/" style={{color: "#54ebc8", fontSize: "30px"}}>MeloCure</Navbar.Brand>
                
                <span>
                <a href="https://melocure.fugamaru.com/about" data-tip data-for='about'><FontAwesomeIcon icon={faInfoCircle} style={{marginRight: "25px", color: "#FFF"}}/></a>
                <ReactTooltip id='about' type={Color == "white" ? "light" : "dark"} effect="solid">
                    <span>MeloCureについて</span>
                </ReactTooltip>   
                <a data-tip data-for='WSStatus'><FontAwesomeIcon icon={faPeopleArrows} style={{marginRight: "5px"}}/><div className="WSStatus" style={{backgroundColor: WSConnectionState, marginRight: "20px"}}></div></a>
                <ReactTooltip id='WSStatus' type={Color == "white" ? "light" : "dark"} effect="solid">
                    <span>WebSocket接続ステータス</span>
                </ReactTooltip>               
                <a data-tip data-for='OnlineUsers'>{isLoggedIn ? <span><FontAwesomeIcon icon={faUsers} style={{marginRight: "5px"}}/><span style={{fontFamily: "Kazesawa-bold"}}>{Counter}</span></span> : null}</a>
                <ReactTooltip id='OnlineUsers' type={Color == "white" ? "light" : "dark"} effect="solid">
                    <span>同時接続人数</span>
                </ReactTooltip>
                </span>
                {/*<Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>*/}
                </Container>
            </Navbar>
        </>
    );
}

export default Header;