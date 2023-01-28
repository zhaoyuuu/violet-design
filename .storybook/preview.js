//import { library } from "@fortawesome/fortawesome-svg-core"
//import { fas } from "@fortawesome/free-solid-svg-icons"
import "../src/styles/index.scss"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}