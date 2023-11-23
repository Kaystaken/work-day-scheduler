// const values used to make code safer and easier to work with
const EVENTS_KEY = 'events';
const PAST_CLASS = 'past';
const PRESENT_CLASS = 'present';
const FUTURE_CLASS = 'future';

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  displayCurrentDate();
  displayCurrentDayEvents();
});

function displayCurrentDate() {
  // display date at top in MMMM dd, YYYY format
  const currentDate = dayjs();
  $('#currentDay').text(currentDate.format('MMMM D, YYYY'));
}

function displayCurrentDayEvents() {
  // show all time slots 9am - 5pm, chose to use 24 hour time because thats what I use
  const calendar = $('#calendar');
  const events = getEvents();

  for (let hour = 9; hour <= 17; hour++) {
    const timeSlot = createTimeSlot(hour, events[hour]);
    calendar.append(timeSlot);
  }
}

function createTimeSlot(hour, event) {
  // add hour and event to slot
  // add slot to list using relative class for styling
  const timeDisplay = createTimeDisplay(hour);
  const textArea = createTextArea(event);
  const button = createButton(hour, textArea);

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
  textArea.val(event);
  return textArea;
}

//createButton creates the icon and button
function createButton(hour, textArea) {
  const icon = $('<i>');
  icon.addClass('fas fa-save');
  icon.attr('aria-hidden', 'true');

  const button = $('<button>');
  button.addClass('btn saveBtn col-2 col-md-1');
  button.attr('aria-label', 'save');
  button.on('click', () => { saveEvent(textArea.val(), hour); });
  button.append(icon);
  return button;
}

function getRelativeClass(hour) {
  // return 'past', 'present', or 'future' depending on time
  // relative to current time 
  const currentHour = dayjs().hour();

  if (currentHour === hour) {
    return PRESENT_CLASS;
  }

  return (currentHour > hour) ? PAST_CLASS : FUTURE_CLASS;
}

function getEvents() {
  // return event array from localStorage
  const events = JSON.parse(localStorage.getItem(EVENTS_KEY));
  
  if (events === null) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify([]));
    return [];
  }

  return events;
}

function saveEvent(event, hour) {
  // add event to event array in localStorage
  const events = getEvents();
  events[hour] = event;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}