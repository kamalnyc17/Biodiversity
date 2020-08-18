// import data
//import samples from '../../data/samples.json'
data = '../../data/samples.json'
fetch(data)
  .then(response => response.json())
  .then(json => console.log(json));