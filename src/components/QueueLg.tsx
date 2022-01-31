import { Row, Col } from "react-bootstrap";
import { useRecoilState } from 'recoil';
import ReactTooltip from 'react-tooltip';
import { queueState } from "./Queue";
import { PlayerColorState } from "../App";

const QueueLg = () => {
    const [Queue] = useRecoilState(queueState);
    const [Color] = useRecoilState(PlayerColorState);

    const QueueItemsFiltered = Queue.filter((v, i) => i > 0);

    const QueueItems = QueueItemsFiltered.map((args: any, index) =>
       <Col>
            <a data-tip data-for={args["id"]}><img className="mx-3 mb-5" src={args["src"]} key={index} style={args["service"] === "spotify" ? {width: 300, height: 300} : {width: 528, height: 297}} alt="AlbumArtwork"/></a>
            <ReactTooltip id={args["id"]} effect="solid" type={Color == "white" ? "light" : "dark"} multiline={true}>
                <div style={{textAlign: "center"}}>{args["title"]}</div>
            </ReactTooltip>
       </Col>
    );

    return(
        <div>
            <Row className="justify-content-md-center" lg={"auto"}>{QueueItems}</Row>
        </div>
    );
}

export default QueueLg;