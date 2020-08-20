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
}
// bar chart
const barChart = (id) => {
  // gathering data
  info = samples.find(data => data.id.toString() === id)
  otu_ids = info.otu_ids.slice(0,10).map(id => "OTU "+id.toString()+" ").reverse()
  sample_values = info.sample_values.slice(0,10).reverse()
  otu_labels = info.otu_labels.slice(0,10).reverse()

  // plotting chart
  const trace1 = {
    x: sample_values,
    y: otu_ids,
    type: "bar",
    orientation: 'h',
    hovertemplate: otu_labels
  };
  const data = [trace1];
  const layout = {
    xaxis: {
      tickfont: {
        family: 'Arial, Helvetica, sans-serif',
        size: 12,
        color: '#000000'
      },
    },
    yaxis: {
      tickfont: {
        family: 'Arial, Helvetica, sans-serif',
        size: 12,
        color: '#000000'
      },
    }
  };
  Plotly.newPlot("bar", data, layout);
}

// gauge chart
const gaugeChart = (id) => {
  // gathering data
  val = metadata.find(data => data.id.toString() === id).wfreq

  // plotting chart
  const data = [
  {
    type: "indicator",
    mode: "gauge+number",
    value: val,
    gauge: {
      axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 1], color: "#eb4334" },
        { range: [1, 2], color: "#eb6234" },
        { range: [2, 3], color: "#eb9f34" },
        { range: [3, 4], color: "#ebc634" },
        { range: [4, 5], color: "#34e5eb" },
        { range: [5, 6], color: "#34c3eb" },
        { range: [6, 7], color: "#349feb" },
        { range: [7, 8], color: "#93eb34" },
        { range: [8, 9], color: "#4feb34" },
        { range: [9, 10], color: "#34eb89" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 9
      }
    }
  }
];

const layout = {
  width: 450,
  height: 400,
  margin: { t: 75, r: 25, l: 25, b: 25 },
  paper_bgcolor: "lavender",
  font: { color: "darkblue", family: "Arial, Helvetica, sans-serif" },
  title: { 
    text: "Belly Button Washing Frequency", 
    font: { 
      size: 24, 
      family: 'Arial, Helvetica, sans-serif' 
    } 
  },
};

Plotly.newPlot('gauge', data, layout);
}

// bubble chart
const bubbleChart = (id) => {
  // gathering data
  info = samples.find(data => data.id.toString() === id)
  otu_ids = info.otu_ids
  sample_values = info.sample_values
  otu_labels = info.otu_labels

  // plotting the chart
  const trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values
    }
  };
  
  const data = [trace1];
  
  const layout = {
    xaxis: {
      title: {
        text: 'OTU ID',
        font: {
          family: 'Arial, Helvetica, sans-serif',
          size: 18,
          color: '#000000'
        }
      },
      tickfont: {
        family: 'Arial, Helvetica, sans-serif',
        size: 12,
        color: '#000000'
      },
    },
    yaxis: {
      tickfont: {
        family: 'Arial, Helvetica, sans-serif',
        size: 12,
        color: '#000000'
      },
    },
    showlegend: false,
    height: 600,
    width: 1300
  };
  
  Plotly.newPlot('bubble', data, layout);
}