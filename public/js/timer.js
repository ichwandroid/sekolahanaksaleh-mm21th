/**
 * Countdown Timer
 * Target Date: February 14, 2026, at 08:00:00
 */

document.addEventListener('DOMContentLoaded', () => {
    // Set the date we're counting down to
    const countDownDate = new Date("Feb 14, 2026 08:00:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(function () {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements with corresponding IDs
        const daysEl = document.getElementById("timer-days");
        const hoursEl = document.getElementById("timer-hours");
        const minutesEl = document.getElementById("timer-minutes");
        const secondsEl = document.getElementById("timer-seconds");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            // Pad numbers with leading zeros if less than 10
            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            if (daysEl && hoursEl && minutesEl && secondsEl) {
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minutesEl.innerText = "00";
                secondsEl.innerText = "00";
            }
        }
    }, 1000);
});
