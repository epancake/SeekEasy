const apiURL = 'https://seekeasyserver.herokuapp.com/';
var responseOfHours;
var daySelected;
var $main = document.querySelector('main');
var $section = document.querySelector('section');


fetch(apiURL)
  .then(response => response.json())
  .then(response => responseOfHours = response);

document.querySelector('#dayForm').addEventListener('submit', function(event){
  event.preventDefault();
  removeFirstPage();
  generateHeader();
  generateResults();
});

function setDay(sel) {
  daySelected = sel.options[sel.selectedIndex].text;
}

function removeFirstPage() {
  var $h2 = document.querySelector('h2');
  $h2.className = 'hidden';
  var $form = document.querySelector('form');
  $form.className = 'hidden';
  $form.removeAttribute('id');
}

function generateHeader () {
  var dayHeader = document.createElement('h2');
  var dayHeaderText = document.createTextNode(daySelected + ' Happy Hours');
  dayHeader.className = 'h2Header';
  dayHeader.appendChild(dayHeaderText);
  $section.appendChild(dayHeader);
  var clickInstr = document.createElement('p');
  clickInstr.className = 'instrP';
  var clickInstrText = document.createTextNode('Click any of the results for more info!');
  clickInstr.appendChild(clickInstrText);
  $section.appendChild(clickInstr);
}

function generateResults () {
  var resultsDiv = document.createElement('div');
  var resultsList = document.createElement('ul');
  $main.appendChild(resultsDiv);
  resultsDiv.className = 'results';
  responseOfHours.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  responseOfHours.map(item => {
    var hours = (item[daySelected]);
    if (hours) {
      var $li = document.createElement('li');
      var liText = document.createTextNode(item.name + ': ' + hours);
      $li.appendChild(liText);
      $li.className = 'resultItem';
      $li.addEventListener('click', function(event) {
        var $h2 = document.querySelector('.h2Header');
        $h2.textContent = item.name;
        var $p = document.getElementsByClassName('instrP')[0];
        $p.className = 'hidden';
        var $ul = document.querySelector('ul');
        $ul.className = 'hidden';

        resultsDiv2 = document.querySelector('.results');

        $restUl = document.createElement('ul');
        $restUl.className = 'resultsUl';

        $HappyHoursUl = document.createElement('ul');
        $HappyHoursUl.className = 'resultsUl times';

        $li1 = document.createElement('li');
        $li1.textContent = item.address;
        $li2 = document.createElement('li');
        $li2.textContent = item.type;
        $li3 = document.createElement('li');
        var $webAnchor = document.createElement('a');
        $webAnchor.href = item.website;
        $webAnchor.textContent = item.website;
        $li3.className = 'break';


        $restUl.appendChild($li1);
        $restUl.appendChild($li2);
        $restUl.appendChild($li3);
        $li3.appendChild($webAnchor);


        if (item.Monday) {
          $li4 = document.createElement('li');
          $li4.textContent = 'Monday: ' + item.Monday;
          $HappyHoursUl.appendChild($li4);
        }
        if (item.Tuesday) {
          $li5 = document.createElement('li');
          $li5.textContent = 'Tuesday: ' + item.Tuesday;
          $HappyHoursUl.appendChild($li5);
        }
        if (item.Wednesday) {
          $li6 = document.createElement('li');
          $li6.textContent = 'Wednesday: ' + item.Wednesday;
          $HappyHoursUl.appendChild($li6);
        }
        if (item.Thursday) {
          $li7 = document.createElement('li');
          $li7.textContent = 'Thursday: ' + item.Thursday;
          $HappyHoursUl.appendChild($li7);
        }
        if (item.Friday) {
          $li8 = document.createElement('li');
          $li8.textContent = 'Friday: ' + item.Friday;
          $HappyHoursUl.appendChild($li8);
        }
        if (item.Saturday) {
          $li9 = document.createElement('li');
          $li9.textContent = 'Saturday: ' + item.Saturday;
          $HappyHoursUl.appendChild($li9);
        }
        if (item.Sunday) {
          $li10 = document.createElement('li');
          $li10.textContent = 'Sunday: ' + item.Sunday;
          $HappyHoursUl.appendChild($li10);
        }
        resultsDiv2.appendChild($restUl);
        resultsDiv2.appendChild($HappyHoursUl);
      });
      resultsList.appendChild($li);
      resultsDiv.appendChild(resultsList);
    }
  });
}
