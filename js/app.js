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
var firstTrainTime = "";
var frequency = "";
var nextArrival = "";
var tMinutesTillTrain = 0;
var currentTime = "";
var firstTimeConverted = "";
var diffTime = "";
var tRemainder = "";
var minutesTillTrain = "";
var arrivalTime = "";
var minutesAway = "";

$("#submit").on("click", function (event) {
  event.preventDefault();

  routeName = $("#routeName")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();
  firstTrainTime = $("#firstTrain")
    .val()
    .trim();

  database.ref().push({
    routeName: routeName,
    destination: destination,
    frequency: frequency,
    firstTrainTime: firstTrainTime

  });
});

database.ref().on("child_added", function (childSnapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = childSnapshot.val();

  // Current Time
  currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // First Time (pushed back 1 year to make sure it comes before current time)
  firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log("First Time Converted: " + firstTimeConverted);

  // Difference between the times
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  tRemainder = diffTime % frequency;
  console.log("tRemainder: " + tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  minutesAway = tMinutesTillTrain;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var nextArrival = moment(nextTrain).format("hh:mm");


  var newRow = $("<tr>").append(
    $("<td>").text(sv.routeName),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );
  // Append the table row to the table body
  $("tbody").append(newRow);
  //$("#table").append(newRow);

  $("#routeName").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#firstTrain").val("");

  // Prevents page from refreshing
  return false;
});
