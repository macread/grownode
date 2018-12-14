module.exports = {
    
    getPeople: (req, res, next) => {
        const connection = req.app.get('db');
        connection.contact_get([req.params.id])
            .then ( (contacts) => {
                res.status(200).send(contacts)} )
            .catch ( (err) => res.status(500).send())
    },

    getPlanets: (req, res, next) => {
    },
    

}