const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});
const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API or faces not found'));
};
const handleImage = (req,res, db) => {
    const { id, box} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', box.length)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'));
};
module.exports = {
    handleImage,
    handleApiCall
};

