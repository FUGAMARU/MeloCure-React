import { Container, Row, Col, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faReact, faBootstrap, faFontAwesomeAlt, faSpotify, faYoutube, faNpm } from "@fortawesome/free-brands-svg-icons";

const About = () => {
    return(
        <>
        <Container className="mt-3" fluid={true}>
                <Row>
                    <Col xs={{span: 4, offset: 4}}>
                        <p className="spotify-player-heading" style={{color: "#FFF"}}><FontAwesomeIcon icon={faCameraRetro} /> Background Images</p>
                    </Col>
                </Row>
                <Row className="text-center" style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto"}}>
                    <Carousel>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/ZhQCZjr9fHo"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/2_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Aditya Chinchure</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/0BZcsD8UVmM"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/1_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by David von Diemar</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/QhuDOxvjoWY"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/3_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Daria Dyachenko</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/5X2ViX_r0ZA"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/4_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by David Švihovec</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/uHzf13WevGc"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/5_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by David von Diemar</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/dkTldxHj6_s"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/6_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Dima Pechurin</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/FNieWqIDsJA"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/7_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Antoine Julien</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/Ys-DBJeX0nE"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/8_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Alex Knight</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/MU5ld71rDcs"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/9_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Matty Adame</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/1cPDgsZh6Cg"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/10_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Mimi Di Cianni</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="https://unsplash.com/photos/DgBNkXB-ckI"><img className="d-block w-100" src={`${process.env.PUBLIC_URL}/background-images/11_carousel.jpg`} alt="Background Image" style={{height: "500px"}}/></a>
                            <Carousel.Caption>
                            <p>Photo by Zachary Smith</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row className="mt-3">
                    <Col xs={{span: 4, offset: 4}}>
                        <p className="spotify-player-heading" style={{color: "#FFF"}}><FontAwesomeIcon icon={faNpm} /> Made With(Front-End)</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span: 10, offset: 1}}>
                        <ul>
                            <span className="mx-2"><a className="madewith" href="https://ja.reactjs.org/"><FontAwesomeIcon icon={faReact} />React</a></span>
                            <span className="mx-2"><a className="madewith" href="https://react-bootstrap.github.io/"><FontAwesomeIcon icon={faBootstrap} />React Bootstrap</a></span>
                            <span className="mx-2"><a className="madewith" href="https://fontawesome.com/"><FontAwesomeIcon icon={faFontAwesomeAlt} />Font Awesome</a></span>
                            <span className="mx-2"><a className="madewith" href="https://zenn.dev/stin/articles/about-react-spotify-web-playback-sdk"><FontAwesomeIcon icon={faSpotify} />react-spotify-web-playback-sdk</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/react-youtube"><FontAwesomeIcon icon={faYoutube} />react-youtube</a></span>
                            <span className="mx-2"><a className="madewith" href="https://recoiljs.org/">Recoil</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/axios">axios</a></span>
                            <span className="mx-2"><a className="madewith" href="https://reactrouter.com/">React Router DOM</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/use-media">use-media</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/react-joyride">react-joyride</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/react-tooltip">react-tooltip</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/react-toast-notifications">react-toast-notifications</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/color.js">color.js</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/get-yt-thumbnail">get-yt-thumbnail</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/get-video-id">get-video-id</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/bootstrap-switch-button-react">Bootstrap Switch Button for React</a></span>
                            <span className="mx-2"><a className="madewith" href="https://www.npmjs.com/package/react-fast-marquee">react-fast-marquee</a></span>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default About;