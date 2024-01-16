function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", `/api/admin/login`, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState  == 4) {
            if (xhr.status == 200) {
              console.log(xhr.responseText);
              showDashboard();
            }
        } else {
          document.querySelector('.login-warning').textContent = "Giriş bilgileri hatalı";
        }
    };

  const data = `name=${username}&password=${password}`;
  xhr.send(data);
};

function showDashboard() {
  const eventsNav = document.getElementById("nav-events");
  const ratingsNav = document.getElementById("nav-ratings");
  const eventsTable = document.querySelector('.events-table');
  const ratingsTable = document.querySelector('.ratings-table');

  document.getElementById('login-container').style.display = "none";
  document.getElementById('dashboard').style.display = "grid";

  eventsNav.addEventListener('click', function (e) {
    eventsNav.classList.add("selected");
    eventsTable.style.display = "inline-block";
    ratingsNav.classList.remove("selected");
    ratingsTable.style.display = "none";
    loadEvents();
  });

  ratingsNav.addEventListener('click', function (e) {
    ratingsNav.classList.add("selected");
    ratingsTable.style.display = "inline-block";
    eventsNav.classList.remove("selected");
    eventsTable.style.display = "none";
    loadRatings();
  });
};

function loadEvents() {
  let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/admin/events/all", true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            let events = JSON.parse(xhr.responseText);
            console.log(events);
            displayEvents(events);
            if (events.length > 0) {
              console.log("success");
            } else {
              console.log("error");
            }
        } else {
          console.log("error");
        }
    };

    xhr.send();
};

function displayEvents(events) {
  let tableBody = document.querySelector('.event-table-body');

  if (tableBody != null) tableBody.innerHTML = ``;

  events.forEach(event => {
    const eventStrtDate = new Date(event.startDate);
  
    const eventStrtHr = eventStrtDate.getHours();
    const eventStrtMn = eventStrtDate.getMinutes();

    const eventEndDate = new Date(event.endDate);
    const eventEndHr = eventEndDate.getHours();
    const eventEndMn = eventEndDate.getMinutes();

    const eventStrtDay = eventStrtDate.getDate();
    const eventStrtMnth = eventStrtDate.getMonth();
    const eventStrtYear = eventStrtDate.getFullYear();

    const eventEndDay = eventEndDate.getDate();
    const eventEndMnth = eventEndDate.getMonth();
    const eventEndYear = eventEndDate.getFullYear();

    let tableRow = document.createElement("tr");
    tableRow.classList.add(`${event.id % 2 == 0 ? "even-row" : "odd-row"}`);
    tableBody.appendChild(tableRow);

    let tableId = document.createElement("td");
    tableId.textContent = `${event.id}`;
    tableRow.appendChild(tableId);

    let tableName = document.createElement("td");
    tableName.textContent = `${event.name}`;
    tableRow.appendChild(tableName);

    let tableStrtDate = document.createElement("td");
    tableStrtDate.textContent = `${eventEndHr}:${eventEndMn.toString().padEnd(2, "0")} • ${eventStrtDay}/${eventStrtMnth + 1}/${eventStrtYear.toString().slice(2)}`;
    tableRow.appendChild(tableStrtDate);

    let tableEndDate = document.createElement("td");
    tableEndDate.textContent = `${eventEndHr}:${eventEndMn.toString().padEnd(2, "0")} • ${eventEndDay}/${eventEndMnth + 1}/${eventEndYear.toString().slice(2)}`;
    tableRow.appendChild(tableEndDate);

    let tableLink = document.createElement("td");
    tableLink.textContent = `http://localhost:8081/event?eventID=${event.id}`;
    tableRow.appendChild(tableLink);
  });
};

function loadRatings() {
  let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/admin/ratings/all", true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            let ratings = JSON.parse(xhr.responseText);
            console.log(ratings);
            displayRatings(ratings);
            if (ratings.length > 0) {
              console.log("success");
            } else {
              console.log("error");
            }
        } else {
          console.log("error");
        }
    };

    xhr.send();
};

function displayRatings(ratings) {
  let tableBody = document.querySelector('.rating-table-body');

  if (tableBody != null) tableBody.innerHTML = ``;

  ratings.forEach(rating => {
    let tableRow = document.createElement("tr");
    tableRow.classList.add(`${rating.id % 2 == 0 ? "even-row" : "odd-row"}`);
    tableBody.appendChild(tableRow);

    let tableRating = document.createElement("td");
    //tableRating.textContent = `${rating.rating.split(":").at(1).replace("\"", "").replace("\"", "").replace("}", "")}`;
    tableRating.textContent = `${rating.rating}`;
    tableRow.appendChild(tableRating);

    let tableEvent = document.createElement("td");
    tableEvent.textContent = `${rating.event.name}`;
    tableRow.appendChild(tableEvent);

    let tableDate = document.createElement("td");
    tableDate.textContent = `${rating.ratingDate}`;
    tableRow.appendChild(tableDate);

    let tableIP = document.createElement("td");
    tableIP.textContent = `${rating.ipAddress}`;
    tableRow.appendChild(tableIP);

    let tableDevice = document.createElement("td");
    tableDevice.textContent = `${rating.deviceIdentity}`;
    tableRow.appendChild(tableDevice);
  });
};