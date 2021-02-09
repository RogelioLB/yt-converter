import logo from './logo.svg';
import './App.css';
import Video from './components/Video'
import {useEffect,useState} from 'react'
import SeacrhBar from './components/SeacrhBar'
import Videos from './components/Videos';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';



function App() {
  const [videos,setVideos] = useState([]);

  function handleSubmit(query){
    
  }
  return (
    <div className="App">
      <SeacrhBar onSubmitForm={handleSubmit}/>
      <Router>
        <Switch>
          <Route path="/search">
            <Videos videos={videos}/>
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
