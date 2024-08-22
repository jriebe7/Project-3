// Build the chart
function buildChart(platform) {
    d3.json("top100.json").then((data) => {
  
      // get the metadata field
      let metadata = data.metaData;
      // Sort the metadata based on the platform selected
      let sorteddata = metadata.sort((a, b) => b[platform]-a[platform]);
      
      let sliceddata = sorteddata.slice(0,10).reverse();
      //Create bar chart
      let trace1 = {
        x: sliceddata.map(object => object[platform]),
        y: sliceddata.map(object => object.Track),
        text: sliceddata.map(object => object.Artist),
        name: "Top 10 Songs and Number of Plays",
        type: "bar",
        orientation: "h"
      };
      let plotdata = [trace1];
      let layout = {
        title: "Top 10 Songs and Number of Plays",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
    Plotly.newPlot("top100", plotdata, layout);

    let bubbledata = [{
      x: sliceddata.map(object => object["All Time Rank"]),
      y: sliceddata.map(object => object[platform]),
      text: sliceddata.map(object => object["Shazam Counts"]),
      mode: 'markers',
      marker:{
        color: sliceddata.map(object => object["Shazam Counts"]),
        colorscale: "Earth",
        size: sliceddata.map(object => object[platform])
      }
    }];
    let bubble_layout = {
      title: 'Shazam Counts by Steaming Platform Popularity',
      height: 600,
      width: 1500 
    };
  Plotly.newPlot('bubble', bubbledata, bubble_layout);})}

// Function to run on page load
function init() {
  d3.json("top100.json").then((data) => {

    // Get the names field
    let platformnames = data.names;

    // Use d3 to select the dropdown with id of `#selPlatform`
    let dropdown = d3.select("#selPlatform");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let x = 0; x < platformnames.length; x++){
      dropdown.append("option").text(platformnames[x]).property("value", platformnames[x])
        };

    // Get the first sample from the list
    let firstplatform = platformnames[0];

    // Build charts and metadata panel with the first sample
    buildChart(firstplatform);
  });
}
// Function for event listener
function optionChanged(newplatform) {
  // Build charts and metadata panel each time a new sample is selected
buildChart(newplatform);
}

init();
