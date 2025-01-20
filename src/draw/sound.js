import { Howl } from "howler"

function loadSound(sound) {
  return new Howl({
    src: [`assets/${sound}`],
    onloaderror: function () {
      console.log("error loading sound" + sound)
    },
  })
}

export const startIntro = (callback, boomCallback) => {
  const bringbring = loadSound("bringbring.m4a")
  const hello = loadSound("hello.m4a")
  const automated = loadSound("automated.m4a")
  const boom = loadSound("sci-fi-soft-boom.mp3")

  bringbring.once("load", () => {
    bringbring.play()
    bringbring.on("end", () => {
      hello.play()
      hello.on("end", () => {
        automated.play()
        automated.on("end", () => {
          boom.play()
          callback()
          boom.on("end", boomCallback)
        })
      })
    })
  })
}

export const sounds = () => {
  const dontknow = loadSound("dontknowhowtodothat.m4a")
  const cantdothat = loadSound("cantdothatrightnow.m4a")
  const bringbring = loadSound("bringbring.m4a")
  const cry = loadSound("cry.m4a")
  const noanswer = loadSound("noanswer.m4a")
  return { dontknow, cantdothat, bringbring, cry, noanswer }
}

export const playEnd = (callback) => {
  const bringbring = loadSound("bringbring.m4a")
  const resolved = loadSound("resolved.m4a")
  bringbring.on("end", () => {
    resolved.on("end", () => {
      callback()
    })
  })
}
