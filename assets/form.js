const apiURL = 'https://seekeasyserver.herokuapp.com/';
// const apiURL = 'http://localhost:3000/';
let typeOfHH

function setType(sel) {
  typeOfHH = sel.options[sel.selectedIndex].text;
}

document.getElementById('addForm').addEventListener('submit', function(event){
    event.preventDefault();
    const MessageData = new FormData(event.target);
    const objectToSend = {
      "name": MessageData.get("name"),
      "id": 11,
      "Monday": MessageData.get("Monday1") + " - " + MessageData.get("Monday2"),
      "Tuesday": MessageData.get("Tuesday1") + " - " + MessageData.get("Tuesday2"),
      "Wednesday": MessageData.get("Wednesday1") + " - " + MessageData.get("Wednesday2"),
      "Thursday": MessageData.get("Thursday1") + " - " + MessageData.get("Thursday2"),
      "Friday": MessageData.get("Friday1") + " - " + MessageData.get("Friday2"),
      "Saturday": MessageData.get("Saturday1") + " - " + MessageData.get("Saturday2"),
      "Sunday": MessageData.get("Sunday1") + " - " + MessageData.get("Sunday2"),
      "type": MessageData.get("justDrinks"),
      "address": MessageData.get("address"),
      "website": MessageData.get("website")
    };
    console.log(objectToSend)
    sendMessage(objectToSend);
    var form = document.querySelector('#addForm')
    form.removeAttribute('id')
    form.className = 'hidden'
    var addSuccess = document.createElement('h2')
    var addSuccessText = document.createTextNode('Restaurant Added!')
    var $main = document.getElementsByTagName('main')[0];
    addSuccess.appendChild(addSuccessText)
    $main.appendChild(addSuccess)
  });


function sendMessage(submissionObject){
  fetch(apiURL, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(submissionObject),
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(console.error);
}
