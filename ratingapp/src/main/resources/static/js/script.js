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

    events.forEach(function (event) {
        /*let listItem = document.createElement("li");
        listItem.textContent = event.name;
        listItem.addEventListener("click", function () {
            showRatingSection(event.id);
        });
        eventsList.appendChild(listItem);*/
        const eventStrtDate = new Date(event.startDate);
        const eventStrtHr = eventStrtDate.getHours();
        const eventStrtMn = eventStrtDate.getMinutes();

        const eventEndDate = new Date(event.endDate);
        const eventEndHr = eventEndDate.getHours();
        const eventEndMn = eventEndDate.getMinutes();

        const eventItem = `<li class="container event-item">
            <p class="event-title">${event.name}</p>
            <p class="standart-text" style="color: var(--text-secondary);">${eventStrtHr}:${eventStrtMn.toString().padEnd(2, "0")} - ${eventEndHr}:${eventEndMn.toString().padEnd(2, "0")}</p>
            <button class="btn--event btn btn-primary">Etkinliği Seç</button>
        </li>`;

        eventsList.insertAdjacentHTML("beforeend", eventItem);

        document.querySelector('.btn--event').addEventListener('click', function () {
            showRatingSection(event.id);
        });
    });

    //eventsContainer.style.display = "block";
}

function showRatingSection(eventId) {
    //eventsContainer.style.display = "none";
    document.querySelector('#upcoming-events').style.display = "none";
    //ratingContainer.style.display = "flex";
    document.querySelector('#rating-container').style.display = "flex";

    document.querySelector(".btn--rate").addEventListener("click", function () {
        rateEvent(eventId);
    });

    document.querySelector('.btn--back').addEventListener('click', function () {
        unshowRatingSection();
    });
}

function unshowRatingSection() {
    document.querySelector('#upcoming-events').style.display = "flex";
    document.querySelector('#rating-container').style.display = "none";
    document.querySelector('.response-text').textContent = "";
}

function rateEvent(eventId) {
    let rating = document.getElementById("rating").value;
    console.log(rating);

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