import React, { Component } from 'react';

import './styles.css'
import api from '../../services/api'

// import { Container } from './styles';

export default class Planet extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      planet:{
        name:'Naboo',
        population: 4500000000,
        climate:'temperate',
        terrain: 'grassy hills, swamps, forests, mountains',
        films: []
      }
    }
  }

  disppatchNewPlanet (){
    const {changeBackground} = this.props
    const {name}= this.state.planet
    if(name !== 'unknown')
      changeBackground(true, name)
    else
    changeBackground(false, '')
  }

  async componentDidMount(){

  }

  async fecthNewPlanet(){
    const id = Math.floor(Math.random()*60)
    if(id !== this.state.planet.id) {
      try {
        this.setState({loading: true})
        const response = await api.get(`planets/${id}`)
        this.setState({
          loading: false,
          planet: {
            id,
            ...response.data
          }
        });

        this.disppatchNewPlanet()

      } catch(err) {
        console.log(err);
        setTimeout(() => {
          console.log("Trying again...");
          this.fecthNewPlanet()          
        }, 500);
      }
    }else {
      this.fecthNewPlanet()
    }
  }

  async handleNext() {
    this.setState({loading: true})
    await this.fecthNewPlanet()
  }
  render() {
    const {loading} = this.state;
    const {name, population, climate, terrain, films} = this.state.planet;
    
    const preffixFeatured = films.length > 0 ? 'Featured in ' :  'No Featured'
    const suffixFeatured = films.length > 1 ? ' films' :  ' film'

    const filmsCount = films.length > 0 ?
      preffixFeatured + films.length + suffixFeatured : preffixFeatured

    const populate = population === "unknown" ? population :
    parseInt(population).toLocaleString('pt-br')
    return (
      <>
        <div className="planet">
          <h2 className="planet-name">{name}</h2>
          <div className="planet-props">
            <p className="planet-property"><b>Population:</b>{' '}
            {populate}</p>
            <p className="planet-property"><b>Climate:</b> {climate}</p>
            <p className="planet-property"><b>Terrain:</b> {terrain}</p>
            <p className="planet-featured">{filmsCount}</p>
          </div>
        </div>
        <div onClick={()=> this.handleNext()} className="button">
        {loading ? 'Loading...' : 'Next'}
        </div>
      </>
    );
  }
}
