import { Howl } from "howler"

export function playSound(sound) {
  return new Promise((resolve, reject) => {
    sound.on("end", () => {
      resolve(sound)
    });

    sound.on("playerror", (id, error) => {
      reject(error)
    });

    sound.play()
  });
}

export function loadSoundPromise(options) {
  const promise = new Promise((resolve, reject) => {
    const sound = new Howl({
      ...options,
      onload: (soundId) => {
        options.onload && options.onload(soundId);
        resolve(sound);
      },
      onloaderror: (soundId, errorMessage) => {
        options.onloaderror && options.onloaderror(soundId, errorMessage);
        reject(errorMessage);
      },
    });
  });

  return promise;
}

function loadSound(sound) {
  return loadSoundPromise({
    src: [`assets/${sound}`],
    onloaderror: function () {
      console.log("error loading sound" + sound)
    },
  })
}

export const startIntro = async (callback, boomCallback) => {
  const [bringbring, hello, automated, boom] = await Promise.all([
    loadSound("bringbring.m4a"),
    loadSound("hello.m4a"),
    loadSound("automated.m4a"),
    loadSound("sci-fi-soft-boom.mp3")
  ])

  await playSound(bringbring)
  await playSound(hello)
  await playSound(automated)

  callback()
  await playSound(boom)
  boomCallback()
}

export const sounds = () => {
  const [dontknow, cantdothat, bringbring, cry, nullpointers, noanswer] = await Promise.all([
    loadSound("dontknowhowtodothat.m4a"),
    loadSound("cantdothatrightnow.m4a"),
    loadSound("bringbring.m4a"),
    loadSound("cry.m4a"),
    loadSound("nullpointer.m4a"),
    loadSound("noanswer.m4a")
  ])

  return { dontknow, cantdothat, bringbring, cry, noanswer, nullpointers }
}

export const playEnd = async (callback) => {
  const [bringbring, resolved] = await Promise.all([
    loadSound("bringbring.m4a"),
    loadSound("resolved.m4a")
  ])
  await playSound(bringbring)
  await playSound(resolved)
  callback()
}
