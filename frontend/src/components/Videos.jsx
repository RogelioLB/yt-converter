import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';


const Videos = (props) =>{
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyBq03nMImRjM9Y0liidDvY5eZgzzjdGkas&part=snippet&q=${window.location.pathname.replace("/search/","")}&maxResults=20`).then(res=>res.json()).then(res=>{
            console.log(res.items);
            setVideos(res.items);
        })
    },[])

    const [videos,setVideos] = useState([]);
    return(
        <div className="videos p-top">
            {
                videos.map((e,i)=>{
                    console.log(e);
                    return(
                        <div className="video" key={i}>
                            <Link to={`/video/${e.id.videoId}`}>
                                <h2>{e.snippet.title}</h2>
                                <img src={e.snippet.thumbnails.medium.url}></img>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Videos;