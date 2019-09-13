var tableData = data;

// Display the UFO sightings to the table
function tableDisplay(ufoSightings) {
  var tbody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};

// Clear the table for new data
function deleteTbody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};

// Log and display the data
console.log(tableData);
tableDisplay(tableData);

// Identify the button and filter the database
var button = d3.select("#filter-btn");
button.on("click", function(event) {
  d3.event.preventDefault();
  deleteTbody();
  var dateInput = d3.select("#datetime").property("value");
  
  // Display all sightings with no value in the field, or the filtered data
  if (dateInput.trim() === "" ) {
    var filteredData = tableData;
  } else { 
    var filteredData = tableData.filter(ufoSighting => 
      ufoSighting.datetime === dateInput.trim());
  };

  // When no data exists for an input
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No sightings on that day/h4>");
  };

  console.log(filteredData);
  tableDisplay(filteredData);
});