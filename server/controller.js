const request = require('request-promise');
const _ = require('lodash');

async function fetch(pageURI){
    // send the request
    let response = await request(pageURI)

    // convert the JSON object so we can deal with it
    let respObj = JSON.parse(response)

    // check to see if there is a next property
    if (respObj.hasOwnProperty('next')){
        // the next property has the URI to the next page. It null for the last page
        if (respObj.next !== null) {
            // combine the results with a recursive call to the next page
            return [...respObj.results, ...await fetch(respObj.next)]
        }else{
            // last page so just return the results
            return respObj.results
        }
    }else{
        // no paging available for this result and no results object
        return respObj
    }
}

module.exports = {

    getPeople: async (req, res, next) => {
        let people = await fetch('https://swapi.co/api/people')
        //sort the resulting object array with an option query parameter
        let sortedPeople = _.sortBy( people, [req.params.sortBy] );
        res.status(200).send(sortedPeople)
    },

    getPlanets: async (req, res, next) => {
        let planets = await fetch('https://swapi.co/api/planets')
        //go through the object and get the residents of each planet
        for (let planetIdx = 0; planetIdx < planets.length; planetIdx++){
            if (planets[planetIdx].residents.length>0) {
                let residents = [];
                for (let residentIdx = 0; residentIdx < planets[planetIdx].residents.length; residentIdx++){
                    let resident = await fetch(planets[planetIdx].residents[residentIdx])
                    residents.push(resident.name)
                }
                planets[planetIdx].residents = [...residents]
            }
        }
        res.status(200).send(planets)
    },
    

}