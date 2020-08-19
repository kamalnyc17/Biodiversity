// in order to import data from a json file in the local drive,
// we need to start localhost server to avoid CORS error
// from the terminal we need to type following command
// python -m http.server

// global variables
const fileName = "./data/samples.json"
let names, metadata, samples

// build the dropdown
d3.json(fileName).then(data => {
  names = data.names
  metadata = data.metadata
  samples = data.samples}).then(l => {
  const select = document.getElementById("selDataset");
  names.map(name => {
    let el = document.createElement("option")
    el.textContent = el.value = name;
    select.appendChild(el);
  })
  // building the dashboard based on the default value of the dropdown i.e. the first id of the list
  optionChanged(document.getElementById("selDataset").value)
}); 

// main function to create dashboard
const optionChanged = (id) => {
  createDemogrphic(id)
  barChart(id)
  gaugeChart(id)
  bubbleChart(id)
}

// Demographic Info
const createDemogrphic = (id) => {
  info = metadata.find(data => data.id.toString() === id)
  document.getElementById('data-id').innerHTML = "ID: " + info.id
  document.getElementById('data-ethnicity').innerHTML = "Ethnicity: " + info.ethnicity
  document.getElementById('data-gender').innerHTML = "Gender: " + info.gender
  document.getElementById('data-age').innerHTML = "Age: " + info.age
  document.getElementById('data-location').innerHTML = "Location: " + info.location
  document.getElementById('data-bbtype').innerHTML = "BBTYPE: " + info.bbtype
  document.getElementById('data-wfreq').innerHTML = "WFREQ: " + info.wfreq  
  console.log("meta data", id, info)  
}
// bar chart
const barChart = (id) => {
  info = samples.find(data => data.id.toString() === id)
  otu_ids = info.otu_ids.slice(0,10).map(id => "OTU "+id.toString())
  sample_values = info.sample_values.slice(0,10)
  otu_labels = info.otu_labels.slice(0,10)
  console.log("bar chart 1", id, sample_values)  
  console.log("bar chart 2", id, otu_ids)   
  console.log("bar chart 3", id, otu_labels)  
}
// gauge chart
const gaugeChart = (id) => {
  info = samples.find(data => data.id.toString() === id)
  console.log("gauge chart", id, info)  
}
// bubble chart
const bubbleChart = (id) => {
  info = samples.find(data => data.id.toString() === id)
  console.log("bubble chart", id, info)  
}