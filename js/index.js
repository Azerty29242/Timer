var sounds = new Sounds()
var images = new Images()

sounds.load(() => {
    var option;
    sounds.list.forEach(sound => {
        option = document.createElement("option")
        option.value = sound.src
        option.innerHTML = sound.name
        document.getElementById("sound").appendChild(option)
    })
})

images.load(() => {
    var option;
    images.list.forEach(image => {
        option = document.createElement("option")
        option.value = image.src
        option.innerHTML = image.name
        option.dataIcon = image.src
        document.getElementById("image").appendChild(option)
    })
})

document.getElementById("sound").addEventListener("change", () => {
    sounds.list[document.getElementById("sound").selectedIndex - 1].play()
})

document.getElementById("volume").addEventListener("change", () => {
    sounds.list[document.getElementById("sound").selectedIndex - 1].play()
})