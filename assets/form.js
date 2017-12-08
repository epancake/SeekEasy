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
      "Monday": hours_am_pm(MessageData.get("Monday1")) + " - " + hours_am_pm(MessageData.get("Monday2")),
      "Tuesday": hours_am_pm(MessageData.get("Tuesday1")) + " - " + hours_am_pm(MessageData.get("Tuesday2")),
      "Wednesday": hours_am_pm(MessageData.get("Wednesday1")) + " - " + hours_am_pm(MessageData.get("Wednesday2")),
      "Thursday": hours_am_pm(MessageData.get("Thursday1")) + " - " + hours_am_pm(MessageData.get("Thursday2")),
      "Friday": hours_am_pm(MessageData.get("Friday1")) + " - " + hours_am_pm(MessageData.get("Friday2")),
      "Saturday": hours_am_pm(MessageData.get("Saturday1")) + " - " + hours_am_pm(MessageData.get("Saturday2")),
      "Sunday": hours_am_pm(MessageData.get("Sunday1")) + " - " + hours_am_pm(MessageData.get("Sunday2")),
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
    addSuccess.className = 'h2Header'
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

function hours_am_pm(time) {
    var hours = time[0] + time[1];
    var min = time[3] + time[4];
    if (hours < 12) {
        return hours + ':' + min + ' AM';
    } else {
        hours=hours - 12;
        hours=(hours.length < 10) ? '0'+hours:hours;
        return hours+ ':' + min + ' PM';
}
}
