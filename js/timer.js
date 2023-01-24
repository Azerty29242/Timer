const params = new URLSearchParams(window.location.search)

document.body.style.backgroundImage = `url(${params.get("image")})`
audio = new Audio(params.get("sound"))
audio.volume = params.get("volume") / 10
const timer = new Timer(document.getElementById("progress"), document.getElementById("text"), audio)
timer.start(params.get("hours"), params.get("minutes"), params.get("seconds"))