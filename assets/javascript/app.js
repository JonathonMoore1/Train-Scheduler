// Initialize Firebase
var config = {
    apiKey: "AIzaSyBVguDcHq3s8ImsqD4HEfi_q0jMqnw5fZQ",
    authDomain: "train-scheduler-72648.firebaseapp.com",
    databaseURL: "https://train-scheduler-72648.firebaseio.com",
    projectId: "train-scheduler-72648",
    storageBucket: "train-scheduler-72648.appspot.com",
    messagingSenderId: "733284910073"
};

firebase.initializeApp(config);

var database = firebase.database();

//======================
// Add new row on submit
//======================
$(document).on('click', '#submit', function(e) {

    // Prevent submission
    e.preventDefault();

    // Save the values the user entered
    var name = $('#name-input').val().trim();
    var destination = $('#dest-input').val().trim();
    var firstTrain = $('#first-input').val().trim();
    var frequency = $('#freq-input').val().trim();
    
    // Data object for Firebase
    var dataObj = {
        name: name,
        destination: destination,
        first_train: firstTrain,
        frequency: frequency
    };

    // Push data object to firebase
    database.ref().push(dataObj);

    // Clear out form text boxes
    $('#name-input').val("");
    $('#dest-input').val("");
    $('#first-input').val("");
    $('#freq-input').val("");
});

database.ref().on('child_added', function(childSnapshot) {
    var childName = childSnapshot.val().name;
    var childDest = childSnapshot.val().destination;
    var childFreq = childSnapshot.val().frequency;
    var childFirst = childSnapshot.val().first_train;
    
    var currentTime = moment().format('HH:mm');
    var firstConverted = moment(childFirst, 'hh:mm').subtract(1, 'years');
    var diffTime = moment().diff(moment(firstConverted), 'minutes');
    var tRemainder = diffTime % childFreq;
    var tMinutesTill = childFreq - tRemainder;
    var nextTrain = moment().add(tMinutesTill, 'minutes');
    var nextConverted = moment(nextTrain).format('HH:mm'); 

    var tBody = $('tbody');

    tBody.append("<tr><td>" + childName + "</td><td>" + childDest + "</td><td>" +
    childFreq + "</td><td>" + nextConverted + "</td><td>" + tMinutesTill + "</td></tr>");
});