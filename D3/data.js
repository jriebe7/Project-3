//d3.json('http://localhost:5000/platforms_data').then(function(data) {
  //  console.log(data); // Use the data for visualization
//})
fetch('http://localhost:5000/platforms_data').then(function(data) {
    console.log(data); // Use the data for visualization
})

fetch('http://localhost:5000/artists_data').then(function(data) {
    console.log(data);
})