let eventsContainer = document.getElementById("upcoming-events");
let ratingContainer = document.getElementById("rating-container");
let responseText = document.querySelector('.response-text');

document.addEventListener("DOMContentLoaded", function () {
    loadUpcomingEvents();
});

function loadUpcomingEvents() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/ratings/events/all", true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            let events = JSON.parse(xhr.responseText);
            console.log(events);
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
    let eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";

    const eventStrtDate = new Date(events.startDate);
  
    const eventStrtHr = eventStrtDate.getHours();
    const eventStrtMn = eventStrtDate.getMinutes();

    const eventEndDate = new Date(events.endDate);
    const eventEndHr = eventEndDate.getHours();
    const eventEndMn = eventEndDate.getMinutes();

    const eventStrtDay = eventStrtDate.getDate();
    const eventStrtMnth = eventStrtDate.getMonth();
    const eventStrtYear = eventStrtDate.getFullYear();

    events.forEach(function (event) {
        let listItem = document.createElement("li");
        listItem.classList.add("container");
        listItem.classList.add("event-item");
        listItem.classList.add("event-item");
        listItem.textContent = event.name;

        listItem.addEventListener("click", function () {
            showRatingSection(event);
        });
        eventsList.appendChild(listItem);
    });

}

function showRatingSection(event) {
    document.querySelector('#upcoming-events').style.display = "none";
    document.querySelector('#rating-container').style.display = "flex";
    document.querySelector('#event-detail-card').style.display = "flex";

    document.querySelector(".btn--rate").addEventListener("click", function () {
        rateEvent(event.id);
    });

    document.querySelector('.btn--back').addEventListener('click', function () {
        unshowRatingSection();
    });

    const eventStrtDate = new Date(event.startDate);
  
    const eventStrtHr = eventStrtDate.getHours();
    const eventStrtMn = eventStrtDate.getMinutes();

    const eventEndDate = new Date(event.endDate);
    const eventEndHr = eventEndDate.getHours();
    const eventEndMn = eventEndDate.getMinutes();

    const eventStrtDay = eventStrtDate.getDate();
    const eventStrtMnth = eventStrtDate.getMonth();
    const eventStrtYear = eventStrtDate.getFullYear();

    document.querySelector('.event-title').textContent = `${event.name}`;
    document.querySelector('.event-date').textContent = `${eventStrtHr}:${eventStrtMn.toString().padEnd(2, "0")} - ${eventEndHr}:${eventEndMn.toString().padEnd(2, "0")} • ${eventStrtDay}/${eventStrtMnth + 1}/${eventStrtYear.toString().slice(2)}`;
}

function unshowRatingSection() {
    document.querySelector('#upcoming-events').style.display = "flex";
    document.querySelector('#rating-container').style.display = "none";
    document.querySelector('#event-detail-card').style.display = "none";

    let responseText = document.querySelector('.response-text');
    responseText.style.display = "none";
    responseText.textContent = "";
}

function rateEvent(eventId) {
    let rating = document.getElementById("rating").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/ratings/rate/${eventId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        document.querySelector('.response-text').style.display = "inline-block";
        if (xhr.status == 200) {
            document.querySelector('.response-text').textContent = xhr.responseText;
            ratingContainer.style.display = "none";
            loadUpcomingEvents();
        } else {
            if (xhr.responseText != "") {
                document.querySelector('.response-text').textContent = xhr.responseText;
            } else {
                document.querySelector('.response-text').textContent = "Sunucudan cevap alınamadı.";
            }
        }
    };

    let ratingData = { rating: rating };
    xhr.send(JSON.stringify(ratingData));
}