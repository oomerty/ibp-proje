let eventsContainer = document.getElementById("upcoming-events");
let ratingContainer = document.getElementById("rating-container");
let responseText = document.querySelector('.response-text');

document.addEventListener("DOMContentLoaded", function () {
    loadUpcomingEvents();
});

function loadUpcomingEvents() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/ratings/events-all", true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            let events = JSON.parse(xhr.responseText);
            if (events.length > 0) {
                displayEvents(events);
            } else {
                eventsContainer.innerHTML = "<div class='message-bar empty-message'><span class='material-symbols-rounded empty-symbol'>hourglass_empty</span> Son 30 dakika içerisinde biten veya süren bir etkinlik bulunamadı...</div>";
            }
        } else {
            eventsContainer.innerHTML = "<div class='message-bar error-message'><span class='material-symbols-rounded warning-symbol'>warning</span> Yaklaşan etkinlikler alınmaya çalışılırken bir hata meydana geldi. Lütfen sayfayı sıfırlayıp tekrar deneyiniz.</div>";
        }
    };

    xhr.send();
}

function displayEvents(events) {
    let eventsList = document.getElementById("eventsList");
    eventsList.innerHTML = "";

    events.forEach(function (event) {
        let listItem = document.createElement("li");
        listItem.textContent = event.name;
        listItem.addEventListener("click", function () {
            showRatingSection(event.id);
        });
        eventsList.appendChild(listItem);
    });

    eventsContainer.style.display = "block";
}

function showRatingSection(eventId) {
    upcomingEvents.style.display = "none";
    ratingContainer.style.display = "flex";

    ratingContainer.querySelector("button").addEventListener("click", function () {
        rateEvent(eventId);
    });
}

function rateEvent(eventId) {
    let rating = document.getElementById("rating").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/ratings/rate/" + eventId, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        responseText.style.display = "inline-block";
        if (xhr.status == 200) {
            responseText.textContent = xhr.responseText;
            ratingContainer.style.display = "none";
            loadUpcomingEvents();
        } else {
            if (xhr.responseText != "") {
                responseText.textContent = xhr.responseText;
            } else {
                responseText.textContent = "Sunucudan cevap alınamadı.";
            }
        }
    };

    let ratingData = { rating: rating };
    xhr.send(JSON.stringify(ratingData));
}