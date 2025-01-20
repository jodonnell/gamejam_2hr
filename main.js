import "./style.css"
import { test } from "./src/draw/test.js"

const startButton = document.getElementById("start")
startButton.addEventListener("click", (e) => {
  startButton.remove()
  test()
})
