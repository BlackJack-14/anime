import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { LinearProgress } from "@material-ui/core";
import Detail from "./Components/Detail/Detail";
import SearchWidget from "./Components/Widget/Search_Widget";
import Genre from "./Components/Widget/Genre/Genre";
import Redirection from "./Redirection";
import Search from "./Components/SearchBar/Search";
import ContentWidget from "./Components/Widget/Content-Widget";
import "./App.css";

function App() {
  const [Input, setInput] = useState()
  const [Anime_Data, setAnime_Data] = useState()
  const [Top_Data, setTop_Data] = useState()
  const Api = {
    Search: `https://api.jikan.moe/v3/search/anime?q=${Input}&page=1`,
    Top: `https://api.jikan.moe/v3/top/anime/1/favorite`,
    Schedule: `https://api.jikan.moe/v3/schedule/`,
  }
  const anime = [
    {
      "name": "Dragon Ball",
      "ratting": 9,
      "id": 223
    },
    {
      "name": "Naruto",
      "ratting": 10,
      "id": 20
    },
    {
      "name": "Death Note",
      "ratting": 10,
      "id": 1535
    },
    {
      "name": "One Piece",
      "ratting": 9,
      "id": 21
    },
    {
      "name": "Demon Slayer",
      "ratting": 8,
      "id": 38000
    },
    {
      "name": "My Hero Academia",
      "ratting": 9,
      "id": 31964
    },
    {
      "name": "Your Lie In April",
      "ratting": 9,
      "id": 23273
    },
    {
      "name": "Jujutsu Kaisen",
      "ratting": 10,
      "id": 40748
    },
    {
      "name": "One Punch Man",
      "ratting": 9.5,
      "id": 30276
    },
    {
      "name": "Tokyo Revengers",
      "ratting": 8,
      "id": 42249
    },

    {
      "name": "Black Clover",
      "ratting": 9,
      "id": 34572
    },
    {
      "name": "The Devil Is Part-Timer",
      "ratting": 8.5,
      "id": 15809
    },
    {
      "name": "Your Name",
      "ratting": 9.5,
      "id": 32281
    },
    {
      "name": "The Quintessential Quintuplets",
      "ratting": 9.6,
      "id": 38101
    },
    {
      "name": "Horimiya",
      "ratting": 10,
      "id": 42897
    },
    {
      "name": "The Misfit of Demon King Academy",
      "ratting": 8,
      "id": 40496
    },
    {
      "name": "Love Is War",
      "ratting": 9,
      "id": 37999
    },
    {
      "name": "Bungou Stray Dogs",
      "ratting": 10,
      "id": 31478
    },
  ]
  const usePathname = () => {
    return window.location.pathname
  }
  useEffect(async () => {
    await TopData()
    setTimeout(() => { }, 2000);
  }, []);
  const SearchData = () => {
    setTimeout(() => {
      fetch(Api.Search)
        .then(response => response.json())
        .then(animes => setAnime_Data(animes))
    }, 2000);
  }
  const TopData = () => {
    setTimeout(() => {
      fetch(Api.Top)
        .then(response => response.json())
        .then(animes => setTop_Data(animes))
    }, 3000);
  }
  return (
    <div className="App">
      <div className="App_Content">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Search input={Input} className="Search" location={usePathname()} setinput={setInput} />
              {Anime_Data !== undefined ?
                (
                  <ContentWidget input={Input} Data={Anime_Data} search="true" suggest="false" />
                ) : ("")}
              {Top_Data !== undefined ?
                (
                  <ContentWidget Data={Top_Data} search="false" suggest="false" />
                ) : (
                  <LinearProgress />
                )}
              {anime !== undefined ?
                (
                  <ContentWidget Data={anime} search="false" suggest="true" />
                ) : (
                  <LinearProgress />
                )}
            </Route>
            <Route exact path="/detail/:type/:id">
              <Search className="Search" input={Input} location={usePathname()} setinput={setInput} />
              <Detail />
            </Route>
            <Route exact path="/Suggested/:type/:ratting/:id">
              <Search className="Search" input={Input} location={usePathname()} setinput={setInput} />
              <Detail suggest="true" search={anime} />
            </Route>
            <Route exact path='/Search/:input'>
              <SearchWidget SearchData={SearchData} Input={Input} usePathname={usePathname} setInput={setInput} Anime_Data={Anime_Data} suggest={anime} Top_Data={Top_Data} />
            </Route>
            <Route exact path='/anime/'>
              <Redirect to='/' />
            </Route>
            <Route exact path='/Search/'>
              <Redirect to='/' />
            </Route>
            <Route exact path={'/genres/:id/:name'}>
              <Redirection />
            </Route>
            <Route exact path={'/genres/:name'}>
              <Search className="Search" input={Input} location={usePathname()} setinput={setInput} />
              <Genre />
            </Route>
            <Route exact path={'/genres/'}>
              <Redirect to='/genres/Action' />
            </Route>
            <Route exact path='/search/'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
