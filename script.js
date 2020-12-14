//current day displayed at the top of the calendar
var currentDayEl = moment().format('dddd, MMMM Do YYYY');
$("#currentDay").text(currentDayEl);

//current hours
var currentHourEl = moment().format('H');

var container = $(".container");
//array for hours timeBlock
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var events = [];

init();

function renderPlanner() {
    // Create a for-loop to iterate through the hours array.
    for (var i = 0; i < hours.length; i++) {
        //Convert hours String into time number
        var h = moment(hours[i], "HH a A")
        var hoursConvert = h.format("HH");
        //Add row to container
        var row = $("<div>");
        row.addClass("row time-block");
        container.append(row);

        //Add hours column to row 
        var hoursColumn = $("<div>");
        hoursColumn.addClass("col-md-1 hour");
        //hoursColumn.attr("data-id", hoursColumn[i]);
        hoursColumn.text(hours[i]);
        row.append(hoursColumn);

        //Add text to textatera and indicate color 
        //if it's past, current or future.
        //var event = hours[i];
        var textColumn = $("<textarea>");
        // textColumn.textContent = event;
        textColumn.attr("data-index", i);

        if (hoursConvert < currentHourEl) {
            textColumn.addClass("col-md-10 description past");
        } else if (hoursConvert > currentHourEl) {
            textColumn.addClass("col-md-10 description future");
        } else {
            textColumn.addClass("col-md-10 description present");
        }
        row.append(textColumn);

        //Add save button to row
        var saveBtn = $("<button>");
        saveBtn.addClass("col-md-1 saveBtn");
        saveBtn.html('<span class="fa fa-save"></span>');
        row.append(saveBtn);
    }
}

function init() {
    renderPlanner();
    loadEvent();
}

function loadEvent() {
    for (var k = 0; k < localStorage.length; k++) {
        var storageKey = localStorage.key(k);
        if (storageKey.search("textArea-") !== -1) {
            var textAreaIndex = storageKey.replace("textArea-", "")
            var timeRow = $("textarea")[textAreaIndex];
            timeRow.value = localStorage.getItem(storageKey);
        }
    }
}

$(".saveBtn").on("click", function(event) {

    var dataRow = event.currentTarget.parentNode;
    var dataChild = dataRow.children[1].getAttribute("data-index");
    var eventText = $(this).siblings("textarea").val();
    localStorage.setItem('textArea-' + dataChild, eventText);

    init();
});