// in order to import data from a json file in the local drive,
// we need to start localhost server to avoid CORS error
// from the terminal we need to type following command
// python -m http.server

// import data
const fileName = "./data/samples.json"
d3.json(fileName).then(function(data){ console.log(data)});