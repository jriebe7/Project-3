// Build the chart
function buildChart(platform) {
  
  d3.json("http://localhost:5000/spotify_data").then((data) => {
    console.log("init")

    
    // get the metadata field
    let metadata = data;
    let platformname = platform.replace(" ", "").toLowerCase();
    console.log(platformname)
    // Sort the metadata based on the platform selected
    let sorteddata = metadata.sort((a, b) => b[platformname]-a[platformname]);
    console.log(sorteddata)
    
    let sliceddata = sorteddata.slice(0,10).reverse();
    console.log(sliceddata)
    //Create bar chart
    let trace1 = {
      x: sliceddata.map(object => object[platformname]),
      y: sliceddata.map(object => object.track),
      text: sliceddata.map(object => object.artist),
      name: "Top 10 Songs and Number of Plays",
      type: "bar",
      orientation: "h",
      marker: {
        color: 'red',
        opacity: 0.6
      }
    };
    
    let plotdata = [trace1];
    console.log(plotdata);
    
    let layout = {
      title: "Top 10 Songs and Number of Plays",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    
    Plotly.newPlot("top10", plotdata, layout);

  let trace2 = {
    x: sliceddata.map(object => object[platformname]),
    y: sliceddata.map(object => object.shazamcounts),
    text: sliceddata.map(object => object.track),
    mode: 'markers',
    marker: {
        color: sliceddata.map(object => object.shazamcounts),
        colorscale: "Twilight",
        size: sliceddata.map(object => object.shazamcounts),
        sizemode: 'area',
        sizeref: 2.0 * Math.max(...sliceddata.map(object => object.shazamcounts)) / (200**2),
        sizemin: 2
          
    }
};

let plotdata2 = [trace2];
console.log(plotdata2)

let bubble_layout = {
    title: 'Shazam Counts by Streaming Platform Popularity',
    height: 600,
    width: 1500, 
    xaxis: { title: "Platform Streams" },
    yaxis: { title: "Shazam Counts" }
      };

Plotly.newPlot("bubble", plotdata2, bubble_layout);
    });
}

// Function to run on page load
function init() {
console.log("init")
d3.json("http://localhost:5000/platforms_data").then((data) => {
  console.log("init")
  // Get the names field
  let platformnames = data;

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
console.log("outer")
init();