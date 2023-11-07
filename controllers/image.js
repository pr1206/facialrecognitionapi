const returnClarifaiRequestOptions = (imageURL) => {
    const PAT = '4d8ea5ee83d44a749b42e693a2b8bb7e';
    const USER_ID = 'pr1206';       
    const APP_ID = 'facialrecognition';
    //eslint-disable-next-line
    const MODEL_ID = 'face-detection'; 
    //eslint-disable-next-line
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = imageURL;
  
    const raw = JSON.stringify({
      "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID,
      },
      "inputs": [{
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
      }]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    return requestOptions;
    
}

const handleAPICall = (req, res) => {
    //eslint-disable-next-line
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + '6dc7e46bc9124c5c8824be4822abe105' + "/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => response.json())
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
const {id} = req.body;
db('users').where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(entries => {
    res.json(entries[0].entries);
})
.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
handleImage: handleImage,
handleAPICall: handleAPICall

}