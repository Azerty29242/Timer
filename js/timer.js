const params = new URLSearchParams(window.location.search)

const timer = new Timer(document.getElementById("progress"), document.getElementById("text"), new Audio(params.get("sound")))
timer.start(params.get("hours"), params.get("minutes"), params.get("seconds"))