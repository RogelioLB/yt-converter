import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';


const Videos = (props) =>{
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyBq03nMImRjM9Y0liidDvY5eZgzzjdGkas&part=snippet&q=${window.location.pathname.replace("/search/","")}&maxResults=20&type=video`).then(res=>res.json()).then(res=>{
            setVideos(res.items);
            console.log(res.items)
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
                                <img src={e.snippet.thumbnails.medium.url}></img>
                                <h2>{e.snippet.title}</h2>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Videos;