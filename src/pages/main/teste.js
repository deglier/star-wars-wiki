const googleCredentials = require('../../credentials/googleCustomSearchApi.json')

const google = require('googleapis').google

const customSearch = google.customsearch("v1");

const googleImagesRobot = async searchTerm => {
  try {
    const response = await customSearch.cse.list({
      auth: googleCredentials.key,
      cx: googleCredentials.engine,
      q: 'Naboo planet star wars',
      searchType: 'image',
      num: 1
  })
  console.log("teste");
  console.log(response, {depth: null});
  }catch(err){
    console.log("Erro!")
    console.log(err, {deth: null})

  }
    
    
}

googleImagesRobot()