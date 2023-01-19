var sounds = new Sounds()

sounds.load(() => {
    var option;
    sounds.list.forEach(sound => {
        option = document.createElement("option")
        option.value = sound.src
        option.innerHTML = sound.name
        document.getElementById("sound").appendChild(option)
        console.log(sound)
    })
})

document.getElementById("sound").addEventListener("change", () => {
    console.log(document.getElementById("sound"), document.getElementById("sound").selectedIndex - 1, sounds.list)
    sounds.list[document.getElementById("sound").selectedIndex - 1].play()
})