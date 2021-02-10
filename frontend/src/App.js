import logo from './logo.svg';
import './App.css';
import Video from './components/Video'
import {useEffect,useState} from 'react'
import SeacrhBar from './components/SeacrhBar'
import Videos from './components/Videos';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';



function App() {
  const [url,setUrl] = useState("");

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
  return (
    <div className="App">
      <Router>
      <SeacrhBar/>
        <Switch>
          <Route exact path="/">
                <form onSubmit={handleUrl} id="form_url">
                    <input type="text" name="url" id="url" placeholder="URL del video:" onChange={e=>setUrl(e.target.value)} autoComplete="off"/>
                    <input type="submit" value="Buscar" className="btn gray"/>
                </form>
          </Route>
          <Route path="/search">
            <Videos/>
          </Route>
          <Route path="/video">
            <Video></Video>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
