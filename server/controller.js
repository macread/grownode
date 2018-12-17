const request = require('request-promise');
const _ = require('lodash');

async function getPeoplePage(pageURL){
    let response = await request(pageURL) 
    let respObj = JSON.parse(response)
    if (respObj.next !== null) {
        return [...respObj.results, ...await getPeoplePage(respObj.next)]
    }else{
        return respObj.results
    }
}

module.exports = {

    getPeople: async (req, res, next) => {
        let people = await getPeoplePage('https://swapi.co/api/people')
        let sortedPeople = _.sortBy( people, [req.params.sortBy] );
        res.status(200).send(sortedPeople)
    },

    getPlanets: (req, res, next) => {
    },
    

}