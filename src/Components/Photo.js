import React,{Component} from "react";

const Photo=(props)=>{

    return(

        <section>
            <img src={props.url}></img>
        </section>
    )
}

export default Photo