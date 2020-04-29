import React from 'react';
import { images } from "../utils/images";
import { withUserContext } from "./UserState";

class Home extends React.Component {
  render() {
    const { locale } = this.props;

    return <div style={{ margin: "1em auto 1em", maxWidth: "1200px"}}>
            <div style={{display: "inline-block", margin: "0 2em 0", backgroundColor: "#E7EBF0", borderRadius: "50px", padding: "1.5em 2em", height: "270px"}}>
                <div class="card" style={{width: "100px"}}>
                    <img class="card-img-top" src={images.dario} alt="Card image cap" width="100px" style={{borderRadius: "50px"}}/>
                    <div class="card-body">
                        <h5 class="card-title">Dario Palma</h5>
                        <p class="card-text">Analista y Desarrollador</p>
                    </div>
                </div>
            </div>

            <div style={{display: "inline-block", margin: "0 2em 0", backgroundColor: "#E7EBF0", borderRadius: "50px", padding: "1.5em 2em", height: "270px"}}>
                <div class="card" style={{width: "100px"}}>
                    <img class="card-img-top" src={images.robinson} alt="Card image cap" width="100px" style={{borderRadius: "50px"}}/>
                    <div class="card-body">
                        <h5 class="card-title">Robinson Castro</h5>
                        <p class="card-text">Desarrollador Estrella</p>
                    </div>
                </div>
            </div>

            <div style={{display: "inline-block", margin: "0 2em 0", backgroundColor: "#E7EBF0", borderRadius: "50px", padding: "1.5em 2em", height: "270px"}}>
                <div class="card" style={{width: "100px"}}>
                    <img class="card-img-top" src={images.roberto} alt="Card image cap" width="100px" style={{borderRadius: "50px"}}/>
                    <div class="card-body">
                        <h5 class="card-title">Roberto Puga</h5>
                        <p class="card-text">Big Boss</p>
                    </div>
                </div>
            </div>

            <div style={{display: "inline-block", margin: "0 2em 0", backgroundColor: "#E7EBF0", borderRadius: "50px", padding: "1.5em 2em", height: "270px"}}>
                <div class="card" style={{width: "100px"}}>
                    <img class="card-img-top" src={images.pablo} alt="Card image cap" width="100px" style={{borderRadius: "50px"}}/>
                    <div class="card-body">
                        <h5 class="card-title">Pablo Astudillo</h5>
                        <p class="card-text">Desarrollador Estrella</p>
                    </div>
                </div>
            </div>


            <div style={{display: "inline-block", margin: "0 2em 0", backgroundColor: "#E7EBF0", borderRadius: "50px", padding: "1.5em 2em", height: "270px"}}>
                <div class="card" style={{width: "100px"}}>
                    <img class="card-img-top" src={images.bird} alt="Card image cap" width="100px" style={{borderRadius: "50px"}}/>
                    <div class="card-body">
                        <h5 class="card-title">Andres Baloian</h5>
                        <p class="card-text">Analista</p>
                    </div>
                </div>
            </div>

            <div style={{display: "inline-block", margin: "0 2em 0", backgroundColor: "#E7EBF0", borderRadius: "50px", padding: "1.5em 2em", height: "270px"}}>
                <div class="card" style={{width: "100px"}}>
                    <img class="card-img-top" src={images.bird} alt="Card image cap" width="100px" style={{borderRadius: "50px"}}/>
                    <div class="card-body">
                        <h5 class="card-title">Marcelo Navarro</h5>
                        <p class="card-text">Desarrollador y Parche</p>
                    </div>
                </div>
            </div>

            <div style={{display: "inline-block", margin: "0 2em 0", backgroundColor: "#E7EBF0", borderRadius: "50px", padding: "1.5em 2em", height: "270px"}}>
                <div class="card" style={{width: "100px"}}>
                    <img class="card-img-top" src={images.bird} alt="Card image cap" width="100px" style={{borderRadius: "50px"}}/>
                    <div class="card-body">
                        <h5 class="card-title">Lester Muñoz</h5>
                        <p class="card-text">Ingeniero de Calidad</p>
                    </div>
                </div>
            </div>

        </div>;
  }
}

export default withUserContext(Home);