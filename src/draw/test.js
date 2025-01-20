import { startIntro, sounds, playEnd } from "./sound.js"
import {
  Application,
  Assets,
  Text,
  Spritesheet,
  Texture,
  Sprite,
  Rectangle,
} from "pixi.js"
import atlasData from "../../assets/spritesheets/pieces-spritesheet.json"

const load = async () => {
  return Promise.all([
    Assets.load("../../assets/bloodyterror.ttf"),
    Assets.load("../../assets/fonts/OpenSans-Medium.ttf"),
    Assets.load("../../assets/spritesheets/pieces-spritesheet.png"),
  ])
}

const drawText = async (app) => {
  const text = new Text({
    text: "2:17am",
    style: {
      fontFamily: "OpenSans Medium",
      fontSize: 50,
      fill: "white",
    },
  })
  text.x = window.screen.width - 300
  text.y = 20

  let startTime = 17

  setTimeout(() => {
    startTime++
    text.text = `2:${startTime}am`

    setInterval(() => {
      startTime++
      text.text = `2:${startTime}am`
    }, 1000 * 60)
  }, 3000)

  app.stage.addChild(text)
}

const credits = (app) => {
  const text = new Text({
    text: "                 The End\n\nA Game by Jacob O'Donnell",
    style: {
      fontFamily: "OpenSans Medium",
      fontSize: 70,
      fill: "white",
    },
  })

  text.x = window.screen.width / 2
  text.y = window.screen.height / 2
  text.anchor.x = 0.5
  text.anchor.y = 0.5

  app.stage.addChild(text)
}

const redraw = (menuItems) => {
  let loopIndex = 0
  menuItems.forEach((menuItem) => {
    if (menuItem.shown) {
      loopIndex++
      menuItem.text.y = 60 + loopIndex * 40
    }
  })
}

const drawMenuItems = async (app, menuItems) => {
  let loopIndex = 0
  let optionsChosenCount = 0
  menuItems.forEach((menuItem) => {
    loopIndex++
    const text = new Text({
      text: menuItem.text,
      style: {
        fontFamily: "OpenSans Medium",
        fontSize: 20,
        fill: "white",
      },
    })
    menuItem.text = text

    text.x = 40
    text.y = 60 + loopIndex * 40

    text.on("mouseover", (event) => {
      text.style.fill = "yellow"
    })
    text.on("mouseout", (event) => {
      text.style.fill = "white"
    })

    text.on("mousedown", (event) => {
      const soundPlayed = menuItem.callback()
      text.destroy(true)
      menuItem.shown = false
      redraw(menuItems)
      optionsChosenCount++

      if (optionsChosenCount === menuItems.length) {
        soundPlayed.on("end", () => {
          playEnd(() => {
            credits(app)
          })
        })
      }
    })
    text.eventMode = "static"

    app.stage.addChild(text)
  })
}

const drawIntro = (app) => {
  const text = new Text({
    text: "BLAWREND",
    style: {
      fontFamily: "bloodyterror",
      fontSize: 100,
      fill: "white",
    },
  })

  text.x = window.screen.width / 2
  text.y = window.screen.height / 2
  text.anchor.x = 0.5
  text.anchor.y = 0.5

  app.stage.addChild(text)
  return text
}

const startGame = (app) => {
  const { dontknow, cantdothat, bringbring, noanswer, cry } = sounds()
  const options = [
    {
      text: "Learn Java",
      callback: () => {
        cantdothat.play()
        return cantdothat
      },
      shown: true,
    },
    {
      text: "Restart service",
      callback: () => {
        dontknow.play()
        return dontknow
      },
      shown: true,
    },
    {
      text: "Call Stoyan",
      callback: () => {
        bringbring.play()
        bringbring.on("end", () => {
          noanswer.play()
        })
        return noanswer
      },
      shown: true,
    },
    {
      text: "Cry",
      callback: () => {
        cry.play()
        return cry
      },
      shown: true,
    },
    {
      text: "Read the logs",
      callback: () => {},
      shown: true,
    },
  ]

  drawMenuItems(app, options)
}

export const test = async () => {
  const app = new Application()
  await app.init({ background: "#000000", resizeTo: window })
  document.body.appendChild(app.canvas)

  await load()

  //startGame(app)
  drawText(app)
  let introText
  startIntro(
    () => {
      introText = drawIntro(app)
    },
    () => {
      introText.destroy(true)

      startGame(app)
    },
  )
}
