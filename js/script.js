class Timer {
    constructor(circle, text, audio) {
        this.circle = circle
        this.text = text
        this.audio = audio
    }

    async start(hours, minutes, seconds) {
        this.circle.style["stroke-dasharray"] = this.circumference()
        this.circle.style["stroke-dashoffset"] = this.circumference()
        document.body.style.setProperty('--stroke-dasharray', this.circumference())
        await this.countdown()
        var duration = parseInt(hours) * 3600000 + parseInt(minutes) * 60000 + (parseInt(seconds) + 1) * 1000
        var end = Date.now() + duration
        this.loop(end, this.circle, this.text, duration, this.circumference)
    }

    async loop(end, circle, text, duration, circumference) {
        this.circle.style["stroke-dasharray"] = this.circumference()
        document.body.style.setProperty('--stroke-dasharray', this.circumference())
        var remaining = end - Date.now();
        circle.style["stroke-dashoffset"] = remaining * circumference() / duration;
        if (remaining < 0) {
            circle.style["stroke-dashoffset"] = 0;
            this.text.innerHTML = "Fin"
            this.audio.play()
            this.audio.addEventListener("ended", () => document.location.href = "./")
            return true;
        } else {
            text.innerHTML = `${("0" + parseInt(remaining / 3600000)).slice(-2)}:${("0" + parseInt(remaining % 3600000 / 60000)).slice(-2)}:${("0" + parseInt(remaining % 3600000 % 60000 / 1000)).slice(-2)}`;
        }
        requestAnimationFrame(() => this.loop(end, circle, text, duration, circumference));
    }

    countdown() {
        var duration;
        duration = 2
        this.text.innerHTML = 3
        return new Promise(resolve => { 
                setInterval(async () => {
                if (duration <= 0) {
                    this.circle.classList = "progress"
                    resolve(true)
                }  else {
                    this.text.innerHTML = duration
                    duration -= 1
                }
            }, 1000)
        })
    }
      
    circumference() {
        return parseInt(Math.min((42.75 * Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) / 100, (42.75 * Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100) * Math.PI * 2) + 1;
    }
}


class Sounds {
    constructor() {
        this.list = []
        this.volume = 10
    }

    load(callback) {
        fetch("./data/sounds.json")
            .then(response => response.json())
            .then(sounds => {
                sounds.forEach(sound => {
                    this.list.push(new Sound(sound.name, sound.src))
                });
                callback()
            })
    }
}

class Sound {
    constructor(name, src) {
        this.name = name
        this.src = src
    }

    play() {
        this.volume = document.getElementById("volume").value
        var audio = new Audio(this.src)
        audio.volume = this.volume / 10
        audio.play()
    }
}
