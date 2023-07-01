// function displayCalendar() {
//   var startDate = document.getElementById("startDate").value;
//   var knownWeek = document.getElementById("knownWeek").value;
//   var knownDay = document.getElementById("knownDay").value;
//   var lastPeriodDate = document.getElementById("lastPeriodDate").value;
//   var dueDate = document.getElementById("dueDate").value;

//   // Your logic to compute pregnancy progress and generate the calendar events goes here

//   // Example logic: Generating sample events for demonstration purposes
//   var events = [
//       { date: "2023-07-01", description: "Week 1" },
//       { date: "2023-07-08", description: "Week 2" },
//       { date: "2023-07-15", description: "Week 3" },
//       { date: "2023-07-22", description: "Week 4" },
//       { date: "2023-07-29", description: "Week 5" },
//   ];

//   var calendarContainer = document.getElementById("calendar");
//   calendarContainer.innerHTML = "";

//   events.forEach(function(event) {
//       var eventElement = document.createElement("div");
//       eventElement.innerText = event.description;
//       calendarContainer.appendChild(eventElement);
//   });
// }

function downloadICal() {
  // Your logic to generate and download the iCal file goes here
  // You can use the `ics` library as mentioned in the requirements
}

function displayCalendar() {

  var events = generateCalendarEventsByUserInput();


  var calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";

  displayCalendarTable(events);
}

function formatDate(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}

// document.addEventListener('DOMContentLoaded', function() {
//   const form = document.getElementById('pregnancy-form');
//   const calendarContainer = document.getElementById('calendar-container');
//   const downloadButton = document.getElementById('download-button');

//   form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     generateCalendar();
//   });

//   function generateCalendar() {
//     const startDate = document.getElementById('start-date').value;
//     const pregnancyWeeks = parseInt(document.getElementById('pregnancy-weeks').value);
//     const pregnancyDays = parseInt(document.getElementById('pregnancy-days').value);
//     const eventDuration = parseInt(document.getElementById('event-duration').value);

//     const cal = ics();

//     let currentDate = new Date(startDate);

//     for (let week = 1; week <= pregnancyWeeks; week++) {
//       for (let day = 1; day <= pregnancyDays; day++) {
//         const endDate = new Date(currentDate.getTime() + (eventDuration - 1) * 24 * 60 * 60 * 1000);

//         cal.addEvent(`Week ${week} - Day ${day}`, '', '', currentDate, endDate);

//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     }

//     const calendarContent = cal.calendar();
//     calendarContainer.innerHTML = calendarContent;
//     calendarContainer.style.display = 'block';

//     downloadButton.style.display = 'block';
//     downloadButton.addEventListener('click', function() {
//       const filename = 'pregnancy_schedule.ics';
//       const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
//       saveAs(blob, filename);
//     });
//   }
// });

function computeProgressByStartDate(startDate, knownWeek, knownDay) {
  console.log("Computing progress using start date");
  var start = new Date(startDate);
  var startWeek = parseInt(knownWeek);
  var startDay = parseInt(knownDay);

  var currentDate = new Date(start);
  var events = [];

  while (currentDate <= new Date()) {
      events.push({ date: formatDate(currentDate), description: "Week " + Math.floor((currentDate - start) / (7 * 24 * 60 * 60 * 1000)) });
      currentDate.setDate(currentDate.getDate() + 7);
  }

  return events;
}

function computeProgressByLastPeriod(lastPeriodDate) {
  console.log("Computing progress using last period date");
  var lastPeriod = new Date(lastPeriodDate);
  var currentDate = new Date(lastPeriod);
  var events = [];

  while (currentDate <= new Date()) {
      events.push({ date: formatDate(currentDate), description: "Week " + Math.floor((currentDate - lastPeriod) / (7 * 24 * 60 * 60 * 1000)) });
      currentDate.setDate(currentDate.getDate() + 7);
  }

  return events;
}

function computeProgressByDueDate(dueDate) {
  console.log("Computing progress using due date");
  var due = new Date(dueDate);
  var currentDate = new Date();
  var events = [];

  while (currentDate <= due) {
      events.push({ date: formatDate(currentDate), description: "Week " + Math.floor((due - currentDate) / (7 * 24 * 60 * 60 * 1000)) });
      currentDate.setDate(currentDate.getDate() + 7);
  }

  return events;
}

function computeProgress(option, startDate, knownWeek, knownDay, lastPeriodDate, dueDate) {
  var events = [];

  if (option === 'startDate' && startDate && knownWeek && knownDay) {
      events = computeProgressByStartDate(startDate, knownWeek, knownDay);
  } else if (option === 'lastPeriod' && lastPeriodDate) {
      events = computeProgressByLastPeriod(lastPeriodDate);
  } else if (option === 'dueDate' && dueDate) {
      events = computeProgressByDueDate(dueDate);
  }

  return events;
}


function generateCalendarEventsByUserInput() {
    var selectedOption;
    var startDate = document.getElementById("startDate").value;
    var knownWeek = document.getElementById("knownWeek").value;
    var knownDay = document.getElementById("knownDay").value;
    var lastPeriodDate = document.getElementById("lastPeriodDate").value;
    var dueDate = document.getElementById("dueDate").value;

    if (startDate && knownWeek && knownDay) {
        selectedOption = 'startDate';
    } else if (lastPeriodDate) {
        selectedOption = 'lastPeriod';
    } else if (dueDate) {
        selectedOption = 'dueDate';
    }

    return computeProgress(selectedOption, startDate, knownWeek, knownDay, lastPeriodDate, dueDate);
}

function displayCalendarTable(events) {
  var calendarTable = document.createElement("table");
  calendarTable.classList.add("calendar-table");

  // Create table header row
  var headerRow = document.createElement("tr");
  headerRow.classList.add("calendar-header");
  var headerCell = document.createElement("th");
  headerCell.setAttribute("colspan", "7");
  headerCell.innerText = "Pregnancy Calendar";
  headerRow.appendChild(headerCell);
  calendarTable.appendChild(headerRow);

  // Create table weekdays row
  var weekdaysRow = document.createElement("tr");
  weekdaysRow.classList.add("calendar-weekdays");
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(function(weekday) {
      var weekdayCell = document.createElement("td");
      weekdayCell.innerText = weekday;
      weekdaysRow.appendChild(weekdayCell);
  });
  calendarTable.appendChild(weekdaysRow);

  // Create table body
  var currentDate = new Date(events[0].date);
  var endDate = new Date(events[events.length - 1].date);

  while (currentDate <= endDate) {
      var row = document.createElement("tr");
      row.classList.add("calendar-row");

      for (var i = 0; i < 7; i++) {
          var cell = document.createElement("td");
          cell.innerText = currentDate.getDate();

          var event = events.find(function(event) {
              return event.date === formatDate(currentDate);
          });

          if (event) {
              cell.innerHTML += "<br>" + event.description;
          }

          row.appendChild(cell);
          currentDate.setDate(currentDate.getDate() + 1);
      }

      calendarTable.appendChild(row);
  }

  var calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";
  calendarContainer.appendChild(calendarTable);
}
