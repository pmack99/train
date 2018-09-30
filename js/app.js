var config = {
  apiKey: "AIzaSyB9c9_fy4pEiVuDq63zW0R4ZJR-PQWOO0M",
  authDomain: "pmack-train.firebaseapp.com",
  databaseURL: "https://pmack-train.firebaseio.com",
  projectId: "pmack-train",
  storageBucket: "",
  messagingSenderId: "677237502602"
};
firebase.initializeApp(config);

var database = firebase.database();

var routeName = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var firstTrainTime = "";
var currentTime = moment();
var minutesAway = "";
var nextArrival = "";

$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  routeName = $("#routeName").val();
  destination = $("#destination").val();
  frequency = $("#frequency").val();
  firstTrainTime = $("#firstTrain").val();

  console.log(routeName);
  console.log(destination);
  console.log(frequency);
  console.log(firstTrainTime);

  // Code for handling the push
  database.ref().push({
    routeName: routeName,
    destination: destination,
    frequency: frequency,
    firstTrainTime: firstTrainTime,
    time: firebase.database.ServerValue.TIMESTAMP
    //nextArrival = moment().diff(moment(firstTrainTime), "minutes"),
    //minutesAway = moment(firstTime, "HH:mm").subtract(1, "years")
  });

  // ChronoUnit.MONTHS.between(startDate, dateAdded)

  

  database.ref().on("child_added", function(childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();
    // Console.loging the last user's data
    console.log(sv.routeName);
    console.log(sv.destination);
    console.log(sv.frequency);
    //console.log(sv.firstTrainTime);
    //console.log(sv.nextArrival);
    //console.log(sv.minutesAway);

    // Change the HTML to reflect
    //$(".table").append(function createRow() {
    // Create a new table row element
    //var tRow = $("<tr>");

    var newRow = $("<tr>").append(
      $("<td>").text(sv.routeName),
      $("<td>").text(sv.destination),
      $("<td>").text(sv.frequency)
      //$("<td>").text(nextArrival),
      //  $("<td>").text(minutes)
    );
    // Append the table row to the table body
     $("tbody").append(newRow);
    //$("#table").append(newRow);
  });



  // "<div><span>" + snapshot.val().employeeName + "</span><span>" + snapshot.val().role + "</span><span>" + snapshot.val().startDate + "</span><span>" + snapshot.val().monthsWorked + "</span><span>" + snapshot.val().monthlyRate + "</span><span>" + snapshot.val().totalBilled + "</span></div>")
  // Handle the errors
});
