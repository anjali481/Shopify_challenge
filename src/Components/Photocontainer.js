import React,{Component} from "react";
import Photo from "./Photo";
const PhotoContainer=props=>{


    const displayphotos=()=>{

        return props.photos.map(photo=>{

            return <Photo url={photo.url}/>
        });
    };

return(

    <>

    <p>{displayphotos()}</p>
    </>
)


}

export default PhotoContainer