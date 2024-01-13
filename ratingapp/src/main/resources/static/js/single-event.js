let alertContainer = document.getElementById('alert-container');

document.addEventListener("DOMContentLoaded", function () {
  loadEvent();
});

function loadEvent() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `/api/ratings/events/${pageNum}`, true);

  xhr.onload = function () {
      if (xhr.status == 200) {
          let event = JSON.parse(xhr.responseText);
          if (event) {
            showRatingSection(event);
          } else {
            document.getElementById('alert-container').innerHTML = "<div class='message-bar empty-message'><span class='material-symbols-rounded empty-symbol'>hourglass_empty</span> İlgili etkinliğe ait detaylar alınmaya çalışılırken bir hata meydana geldi. Lütfen sayfayı sıfırlayıp tekrar deneyiniz.</div>";
          }
      } else {
        document.getElementById('alert-container').innerHTML = "<div class='message-bar error-message'><span class='material-symbols-rounded warning-symbol'>warning</span> Aradığınız etkinliğin değerlendirme süresi geçmiş veya hiç varolmamış olabilir. Bunun bir hata olduğunu düşünüyorsanız etkinlik düzenleyicileri ile iletişime geçiniz.</div>";
      }
  };

  xhr.send();
}

function showRatingSection(event) {
  document.querySelector('#rating-container').style.display = "flex";
  document.querySelector('#event-detail-card').style.display = "flex";

  document.querySelector(".btn--rate").addEventListener("click", function () {
      rateEvent(event.id);
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
          loadEvent();
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
