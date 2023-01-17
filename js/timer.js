class Timer {
    constructor(circle, text) {
        this.circle = circle
        this.text = text
        this.text.innerHTML
    }

    async start(hours, minutes, seconds) {
        await this.countdown()
        this.circle.classList = "progress"
        var remaining, interval, duration, end;
        duration = hours * 3600000 + minutes * 60000 + (seconds + 1) * 1000
        end = Date.now() + duration
        interval = setInterval(async () => {
            remaining = end - Date.now()
            this.circle.style["stroke-dashoffset"] = remaining * 2051 / duration;
            if (remaining < 0) {
                this.circle.style["stroke-dashoffset"] = 0
                clearInterval(interval)
                this.text.innerHTML = "Fin"
                window.location.href = "https://azerty29242.github.io/Timer"
                return true
            }  else {
                this.text.innerHTML = `${("0" + parseInt(remaining / 3600000)).slice(-2)}:${("0" + parseInt(remaining % 3600000 / 60000)).slice(-2)}:${("0" + parseInt(remaining % 3600000 % 60000 / 1000)).slice(-2)}`
            }
        }, 100)
    }

    countdown() {
        var duration, interval;
        duration = 2
        this.text.innerHTML = 3
        return new Promise(resolve => { 
                setInterval(async () => {
                if (duration <= 0) {
                    resolve(true)
                }  else {
                    this.text.innerHTML = duration
                    duration -= 1
                }
            }, 1000)
        })
    }
}

const timer = new Timer(document.getElementById("progress"), document.getElementById("text"))
const params = new URLSearchParams(window.location.search)
timer.start(params.get("hours"), params.get("minutes"), params.get("seconds"))
