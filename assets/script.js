// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  displayCurrentDate();
  displayCurrentDayEvents();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function displayCurrentDate() {
  // display date at top in MMMM dd, YYYY format
  const currentDate = dayjs();
  $('#currentDay').text(currentDate.format('MMMM D, YYYY'));
}

function displayCurrentDayEvents() {
  // show all time slots 9am - 5pm
  const calendar = $('#calendar');

  for (let hour = 9; hour <= 17; hour++) {
    const timeSlot = createTimeSlot(hour, 'haircut');
    calendar.append(timeSlot);
  }
}

function createTimeSlot(hour, event) {
  // add hour and event to slot
  // add slot to list using relative class for styling
  console.log("hour", hour)
  const timeDisplay = createTimeDisplay(hour);
  const textArea = createTextArea(event);
  const button = createButton();

  const timeSlot = $('<div>');
  timeSlot.addClass('row time-block ' + getRelativeClass(hour));
  timeSlot.id = `hour-${hour}`;

  timeSlot.append(timeDisplay);
  timeSlot.append(textArea);
  timeSlot.append(button);

  return timeSlot;
}

function createTimeDisplay(hour) {
  const timeDisplayContainer = $('<div>');
  timeDisplayContainer.addClass('col-2 col-md-1 hour text-center py-3');
  const timeDisplay = $('<span>');
  timeDisplay.text(hour);
  timeDisplayContainer.append(timeDisplay);
  return timeDisplayContainer;
}

function createTextArea(event) {
  const textArea = $('<textarea>');
  textArea.addClass('col-8 col-md-10 description');
  textArea.attr('rows', '3');
  textArea.text(event);
  return textArea;
}

//createButton creates the icon and button
function createButton() {
  const icon = $('<i>');
  icon.addClass('fas fa-save');
  icon.attr('aria-hidden', 'true');

  const button = $('<button>');
  button.addClass('btn saveBtn col-2 col-md-1');
  button.attr('aria-label', 'save');
  button.append(icon);
  return button;
}

function getRelativeClass(hour) {
  // return 'past', 'present', or 'future' depending on time
  // relative to current time 
  const currentHour = dayjs().hour();

  if (currentHour === hour) {
    return 'present';
  }

  return (currentHour > hour) ? 'past' : 'future';
}

function getEvents() {
  // return event array from localStorage
  const events = JSON.parse(localStorage.getItem('events'));
  return events;
}

function saveEvent(event, hour) {
  // add event to event array in localStorage
  const events = getEvents();
  events[hour] = event;
  localStorage.setItem('events', JSON.stringify(events));
}