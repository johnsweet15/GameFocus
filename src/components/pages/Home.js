import React from 'react';
import axios from 'axios';
import { IGDB_Key } from '../../config';

const headers = {
  "Accept": "application/json",
  "user-key": IGDB_Key,
}

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      games: null,
      covers: []
    }
  }

  componentDidMount() {
    this.getGames();
    this.getCover();
 
  }

  getGames() {
    axios({
      url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/",
      method: 'POST',
      headers: headers,
      data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;sort popularity desc;"
    })
      .then(response => {
        console.log(response.data);
        this.setState({ games: response.data })
      })
      .catch(err => {
        console.error(err);
      });
  }

  getCover(id) {
    axios({
      url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers/",
      method: 'POST',
      headers: headers,
      data: 'fields alpha_channel,animated,game,height,image_id,url,width; where id = ' + id + ';'
    })
    .then(response => {
      console.log('response: ' + JSON.stringify(response.data[0].url));
      return JSON.stringify(response.data[0].url);
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    if (this.state.games) {
      var gameList = this.state.games.map((game, i) =>
      {console.log(this.getCover(game.cover))}
        // <div key={i}>
        //   <img src={this.getCover(game.cover)} />
        //   <p>{game.name}</p>
        // </div>
      )
    }

    return (
      <div>
        <h1>Home</h1>
        {gameList}
      </div>
    )
  }
}