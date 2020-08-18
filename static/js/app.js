// import data
//import samples from '../../data/samples.json'
const fileName = "./data/samples.json"
d3.json(fileName).then(function(data){ console.log(data)});