import React,{useState} from 'react';
import icon from '../favicon.png';
import {Link} from 'react-router-dom';

const SearchBar = (props) =>{

    const [query,setQuery] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        window.location.pathname = "/search/"+query;
    }

    return(
        <header>
            <div className="nav_bar">
                <div className="logo">
                    <Link to="/">
                        <img src={icon}/><h1>YOUTUBE-CONVERTER</h1>
                    </Link>
                </div>
                
                <form onSubmit={handleSubmit} id="form_query">
                    <input type="text" onChange={e=>setQuery(e.target.value)} placeholder="Buscar videos: " autoComplete="off"/>
                    <input type="submit" value="Buscar" className="btn gray"/>
                </form>
            </div>
            <hr></hr>
        </header>
    )
}

export default SearchBar;