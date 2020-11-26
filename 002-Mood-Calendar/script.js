const bodyContainer = document.getElementById('body-container');
const headerContainer = document.getElementById('header-container');

const currentYear = '2020';
headerContainer.innerHTML = `<h2>${currentYear} Mood Calendar</h2>`;

const firstDay = new Date(`Jan 1 ${currentYear}`);
const lastDay = new Date(`Dec 31 ${currentYear}`);

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
var allDates = [];

//generate all days of the year
function getAllDates() {
  for (let i = 1, month = 0; i <= 32; i++) {
    //starting from the first day of the year, add 1 day by day
    firstDay.setDate(i);

    //if the month is not the current month, change it to next month
    if (firstDay.getMonth() != month) {
      month++;
      i = 1;
    }

    //if it finishes 12 months, stop the loop;
    if (month > 11) {
      break;
    }
    //push each day to allDates;
    allDates.push(new Date(firstDay));
  }
}
getAllDates();

//create months in bodyContainer
let monthContainer = '';
months.forEach((month, index) => {
  monthContainer += `
  <div class="month month-${index}">
    <div class="month-header">${month}</div>
    <div class="week-container">
      ${weekDays
        .map(
          day =>
            `<div class="${day} week">
            <span>${day}</span>
            </div>`
        )
        .join('')}
    </div>
  </div>`;
});

//add months in bodyContainer
bodyContainer.innerHTML += monthContainer;

//for all days, get it's month, week and find it in the calendar;
allDates.forEach(date => {
  const targetMonth = date.getMonth();
  const targetWeek = date.getDay();
  const targetDate = date.getDate();

  const week = document.querySelector(
    `.month-${targetMonth} .${weekInText(targetWeek)}`
  );

  week.innerHTML += addDate(targetWeek, targetDate, date);
});

//convert digit week number to text
function weekInText(targetWeek) {
  var result = '';
  if (targetWeek === 0) {
    result = 'Sun';
  } else if (targetWeek === 1) {
    result = 'Mon';
  } else if (targetWeek === 2) {
    result = 'Tue';
  } else if (targetWeek === 3) {
    result = 'Wed';
  } else if (targetWeek === 4) {
    result = 'Thu';
  } else if (targetWeek === 5) {
    result = 'Fri';
  } else if (targetWeek === 6) {
    result = 'Sat';
  }
  return result;
}

//add date to each column, if it should not be the first row, add a placeholder
function addDate(day, date, fullDate) {
  if (date <= 7 && date > day && date - day > 1) {
    return `<div class="placeholder">0</div><div id=${JSON.stringify(
      fullDate
    )}>${date}</div>`;
  } else {
    return `<div id=${JSON.stringify(fullDate)}>${date}</div>`;
  }
}

//add notes
//retrieve the data from local storage and display them on the calendar
//click the date to edit moods and notes

const dates = document.querySelectorAll('.week div');
const noteContainer = document.getElementById('note-container');
const moods = document.querySelectorAll('.mood');
const noteText = document.getElementById('note');
const closeBtn = document.getElementById('close-btn');
const saveBtn = document.getElementById('save-btn');

//record the current date info of every date we click
var currentDate = '';
var currentMood = '';
var currentNote = '';

//when we click on a date
dates.forEach(date => {
  date.addEventListener('click', () => {
    currentDate = date;
    //when we click on a mood
    moods.forEach(mood => {
      mood.addEventListener('click', () => {
        //remove mood-active first (previously active mood)
        moods.forEach(mood => {
          mood.classList.remove('mood-active');
        });
        //add mood-active to the clicked mood
        mood.classList.add('mood-active');
        //update color of the date and show it on the calendar
        currentDate.style.backgroundColor = mood.style.color;
        //update currentMood
        currentMood = mood;
      });
    });
    //after clicked, show the target date's mood and note
    showNote(date);
  });
});

//after clicked close button and close the open note
closeBtn.addEventListener('click', () => {
  noteContainer.classList.remove('note-active');
});

//get the local storage
var DateMoodNoteObjects = JSON.parse(
  localStorage.getItem('DateMoodNoteObjects')
);
//if the local storage doesn't exist, create key of DataMoodNoteObjects and value of [];
if (localStorage.getItem('DateMoodNoteObjects') === null) {
  localStorage.setItem('DateMoodNoteObjects', JSON.stringify([]));
  //and refresh the window to get started
  window.location.reload();
  // if the local storage exists, show the local storage on the calendar
} else {
  for (let i = 0; i < DateMoodNoteObjects.length; i++) {
    dates.forEach(date => {
      if (date.id === DateMoodNoteObjects[i]['date']) {
        if (DateMoodNoteObjects[i]['mood'] === 'mood1') {
          date.style.backgroundColor = '#2d6b5f';
        } else if (DateMoodNoteObjects[i]['mood'] === 'mood2') {
          date.style.backgroundColor = '#72e3a6';
        } else if (DateMoodNoteObjects[i]['mood'] === 'mood3') {
          date.style.backgroundColor = '#dff4c7';
        } else if (DateMoodNoteObjects[i]['mood'] === 'mood4') {
          date.style.backgroundColor = '#edbf98';
        } else if (DateMoodNoteObjects[i]['mood'] === 'mood5') {
          date.style.backgroundColor = '#ea3d36';
        }
      }
    });
  }
}

// when we clicked on the save button
saveBtn.addEventListener('click', () => {
  //close the open note
  noteContainer.classList.remove('note-active');
  //update currentNote
  currentNote = noteText.value;
  //create dateMoodNote object
  var dateMoodNote = {
    date: currentDate.id,
    mood: currentMood.id,
    note: currentNote,
  };
  //setting the found as false indicates that this object is not in the localStorage
  var found = false;
  for (let i = 0; i < DateMoodNoteObjects.length; i++) {
    // if we find this object, we updated it
    if (DateMoodNoteObjects[i]['date'] === dateMoodNote['date']) {
      found = true;
      DateMoodNoteObjects[i]['mood'] = dateMoodNote['mood'];
      DateMoodNoteObjects[i]['note'] = dateMoodNote['note'];
      break;
    }
  }
  //if we didn't find it, add it
  if (found === false) {
    DateMoodNoteObjects.push(dateMoodNote);
  }
  // update localStorage
  localStorage.setItem(
    'DateMoodNoteObjects',
    JSON.stringify(DateMoodNoteObjects)
  );
});

//show note
function showNote(date) {
  //retrieve data from localStorage
  var targetDateObj = JSON.parse(localStorage.getItem('DateMoodNoteObjects'));
  noteContainer.classList.add('note-active');

  //go through the objects in localStorage
  for (i = 0; i < targetDateObj.length; i++) {
    //if we find the clicked date in the localStorage,
    if (targetDateObj[i]['date'] === date.id) {
      moods.forEach(mood => {
        //if the localStorage has a mood-active mood
        if (mood.id === targetDateObj[i]['mood']) {
          //update the mood as mood-active
          mood.classList.add('mood-active');
          //update the background color of the date
          currentDate.style.backgroundColor = mood.style.color;
          //if the localStorage has no mood-active mood
        } else if (mood.id !== targetDateObj[i]['mood']) {
          //clear the mood if it is mood-active
          mood.classList.remove('mood-active');
        }
      });
      //update the note content from the localStorage
      noteText.value = targetDateObj[i]['note'];
      break;
    } else {
      //if the date information is not in the localStorage, we create an empty note
      moods.forEach(mood => {
        mood.classList.remove('mood-active');
        noteText.value = '';
      });
    }
  }
}
