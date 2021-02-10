import React,{useState,useEffect} from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import io from 'socket.io-client';


const Video = (props) =>{

    let ID;

    useEffect(()=>{
        const socket = io("/");
        socket.on('connect',function(){
            ID=socket.id;
            console.log(ID)
        });
        socket.on("upload",(data)=>{
            console.log(data);
            setDownloaded(data.downloaded);
        });
        socket.on("Finish",()=>{
            console.log("Finish")
            setFinish(true)
        });
    });

    const [id,setId] = useState(window.location.pathname.replace("/video/",""));
    const [finish,setFinish] = useState(false);
    const [nombre,setNombre] = useState("");
    const [formato,setFormato] = useState("Audio");
    const [calidad,setCalidad] = useState("");
    const [downloaded,setDownloaded] = useState("");

    function handleConvert(e){
        setDownloaded("0");
        setFinish(false);
        axios.post("/url",{uri:id,id:ID,op:formato,quality:calidad}).then(res=>{
            console.log(res.data);
            if(res.data.op === false){
                alert("Parece que no esta disponible esa calidad.");
            }else{
                setNombre(res.data.title);
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="videoFrame p-top">
            <div className="iframe">
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls={true}/> 
            </div>
            <div className="down">
            <form>
                <div className="form-group">
                    <label htmlFor="formato">Seleccionar formato:</label>
                    <select id="formato" name="formato" onChange={e=>{
                            setFormato(e.target.value);
                        }}>
                        <option value="Audio">Audio</option>
                        <option value="Video">Video</option>
                    </select>
                </div>
                
                {
                    formato === 'Video' ? 
                    <div className="form-group">
                        <label htmlFor="calidad">Escoge calidad:</label>
                        <select id="calidad" name="calidad" onChange={e=>setCalidad(e.target.value)}>
                            <option value="135">480p</option>
                            <option value="136">720p</option>
                            <option value="137">1080p</option>
                        </select>
                    </div>
                    :
                    <React.Fragment></React.Fragment>
                }
            </form>
            <div className="buttons">
                <button onClick={handleConvert} className="btn">Convert</button>
                {
                    formato !== 'Audio' ? <a href={`/files/${nombre}.mkv`} download={`${nombre}.mkv`} className="btn" onClick={e=>window.location.reload()}>Descargar</a> : <a href={`/files/${nombre}.mp3`} download={`${nombre}.mp3`} className="btn" onClick={e=>window.location.reload()}>Descargar</a>
                }
            </div>
            </div>
            {
                    downloaded !== '' 
                ? 
                    <div>
                        {finish !==true ? <h3>Conviertiendo un {downloaded}%</h3> : <h3>Convertido</h3>}
                    </div>
                : 
                    <React.Fragment></React.Fragment>
            }
        </div>
    )
}

export default Video;