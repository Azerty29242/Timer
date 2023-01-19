function load(callback) {
    fecth("data/sounds.json")
        .then(response => response.json())
        .then(sounds => callback(sounds))
}

function play(sound) {
    new Audio(sound).play()
}

load((sounds) => {
    var option;
    sounds.forEach(sound => {
        option = document.createElement("option")
        option.value = sound.src
        option.innerHTML = sound.name
        document.getElementById("sound").appendChild(option)
    })
})

document.getElementById("sound").addEventListener("change", () => {
    play(document.getElementById("sound").value)
})