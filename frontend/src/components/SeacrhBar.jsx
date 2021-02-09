import React,{useState} from 'react';
import icon from '../favicon.png';

const SearchBar = (props) =>{

    const [query,setQuery] = useState("");
    const [url,setUrl] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        props.onSubmitForm(query);
        window.location.pathname = "/search/"+query;
    }

    function handleUrl(e){
        e.preventDefault();
        if(url.includes("https://youtu.be/")){
            console.log(url.replace("https://youtu.be/",""));
            window.location.pathname = "/video/"+url.replace("https://youtu.be/","");
        }else if(url.includes("https://www.youtube.com/watch?v=") && url.includes("&")){
            window.location.pathname = "/video/"+url.split("v=")[1].split("&")[0];
        }else if(url.includes("https://www.youtube.com/watch?v=")){
            window.location.pathname = "/video/"+url.split("v=")[1];
        }
    }
    return(
        <header>
            <div className="nav_bar">
                <div className="logo">
                    {window.screen.width <= 900 ? <img src={icon}/> : <React.Fragment><img src={icon}/><h1>YOUTUBE-CONVERTER</h1></React.Fragment>}
                </div>
                
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={e=>setQuery(e.target.value)} placeholder="Buscar: " autoComplete="off"/>
                    <input type="submit" value="Buscar" className="btn"/>
                </form>

                <form onSubmit={handleUrl}>
                    <input type="text" name="url" id="url" placeholder="Link directo: " onChange={e=>setUrl(e.target.value)} autoComplete="off"/>
                    <input type="submit" value="Buscar" className="btn"/>
                </form>
            </div>
            <hr></hr>
        </header>
    )
}

export default SearchBar;