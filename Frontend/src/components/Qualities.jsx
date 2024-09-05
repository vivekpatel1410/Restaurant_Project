import React from "react";
import {data} from "../restApi.json";

const Qualities = () => {
    return(
        <section className="qualities" id="qualities">
            <div className="container">
            <div className="top">
                        <div className="heading">
                            SERVICES
                        </div>
                        <p>The only food services Provide.</p>
                    </div>

                {
                    
                    data[0].ourQualities.map(element=>(
                        
                        <div className="card" key={element.id}>
                            <img src={element.image} alt={element.title}></img>
                            <p className="title">{element.title}</p>
                            <p className="description">{element.description}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Qualities