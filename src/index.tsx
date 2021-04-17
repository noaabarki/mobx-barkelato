import React from "react"
import ReactDOM from "react-dom"

import store from "./app"
import { App } from "./app/App"

ReactDOM.render(<App store={store} />, document.getElementById("root"))
