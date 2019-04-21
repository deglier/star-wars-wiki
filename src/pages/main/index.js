import React from 'react';
import './styles.css'
import Planet from '../../components/planet';

import bg_stars from './bg-stars.jpg';

import googleCredentials from '../../credentials/googleCustomSearchApi'

const {google} = require('googleapis')

const customSearch = google.customsearch("v1");

const googleImagesRobot = async searchTerm => {
    const response = await customSearch.cse.list({
        auth: googleCredentials.key,
        cx: googleCredentials.engine,
        q: 'Naboo planet star wars',
        searchType: 'image',
        num: 1
    })

    console.log(response, {depth: null});
    
}

const changeBackground = async (isLoading = false, image) => {
    if(isLoading){
        return await googleImagesRobot('')
    }else {
        return await googleImagesRobot('')
    }
}
const Main = () => (
    <div id="main-container" style={{backgroundColor: bg_stars}}>
    <Planet changeBackground={(bool, planetName)=> changeBackground(bool, planetName)} />
    </div>  
);


export default Main;

