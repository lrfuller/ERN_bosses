/**
 * This file does the setup for integration with Reactotron, which is a
 * free desktop app for inspecting and debugging your React Native app.
 * @see https://github.com/infinitered/reactotron
 */
import { Platform, NativeModules } from "react-native"
import { ArgType } from "reactotron-core-client"
import { ReactotronReactNative } from "reactotron-react-native"
import mmkvPlugin from "reactotron-react-native-mmkv"

import { goBack, resetRoot, navigate } from "@/navigators/navigationUtilities"
import { storage } from "@/utils/storage"

import { Reactotron } from "./ReactotronClient"

// For Android emulator, use 10.0.2.2 to connect to host machine's localhost
// For physical devices, use your computer's local IP address
// For iOS simulator, localhost works fine
// If Reactotron desktop isn't running, the connection will fail silently
const getReactotronHost = () => {
  if (Platform.OS === "android") {
    // Use 10.0.2.2 for Android emulator (maps to host machine's localhost)
    // For physical devices, you may need to use your computer's IP address
    // You can set REACTOTRON_HOST environment variable to override
    return process.env.REACTOTRON_HOST || "10.0.2.2"
  }
  // iOS simulator and other platforms use localhost
  return process.env.REACTOTRON_HOST || "localhost"
}

const reactotron = Reactotron.configure({
  name: require("../../package.json").name,
  host: getReactotronHost(),
  // Don't fail if Reactotron desktop isn't running
  safeRecursion: true,
  onConnect: () => {
    /** since this file gets hot reloaded, let's clear the past logs every time we connect */
    Reactotron.clear()
  },
  // Handle connection errors gracefully
  onDisconnect: () => {
    // Silently handle disconnections
  },
})

reactotron.use(mmkvPlugin<ReactotronReactNative>({ storage }))

if (Platform.OS !== "web") {
  reactotron.useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
}

/**
 * Reactotron allows you to define custom commands that you can run
 * from Reactotron itself, and they will run in your app.
 *
 * Define them in the section below with `onCustomCommand`. Use your
 * creativity -- this is great for development to quickly and easily
 * get your app into the state you want.
 *
 * NOTE: If you edit this file while running the app, you will need to do a full refresh
 * or else your custom commands won't be registered correctly.
 */
reactotron.onCustomCommand({
  title: "Show Dev Menu",
  description: "Opens the React Native dev menu",
  command: "showDevMenu",
  handler: () => {
    Reactotron.log("Showing React Native dev menu")
    NativeModules.DevMenu.show()
  },
})

reactotron.onCustomCommand({
  title: "Reset Navigation State",
  description: "Resets the navigation state",
  command: "resetNavigation",
  handler: () => {
    Reactotron.log("resetting navigation state")
    resetRoot({ index: 0, routes: [] })
  },
})

reactotron.onCustomCommand<[{ name: "route"; type: ArgType.String }]>({
  command: "navigateTo",
  handler: (args) => {
    const { route } = args ?? {}
    if (route) {
      Reactotron.log(`Navigating to: ${route}`)
      // @ts-ignore
      navigate(route as any) // this should be tied to the navigator, but since this is for debugging, we can navigate to illegal routes
    } else {
      Reactotron.log("Could not navigate. No route provided.")
    }
  },
  title: "Navigate To Screen",
  description: "Navigates to a screen by name.",
  args: [{ name: "route", type: ArgType.String }],
})

reactotron.onCustomCommand({
  title: "Go Back",
  description: "Goes back",
  command: "goBack",
  handler: () => {
    Reactotron.log("Going back")
    goBack()
  },
})

/**
 * We're going to add `console.tron` to the Reactotron object.
 * Now, anywhere in our app in development, we can use Reactotron like so:
 *
 * ```
 * if (__DEV__) {
 *  console.tron.display({
 *    name: 'JOKE',
 *    preview: 'What's the best thing about Switzerland?',
 *    value: 'I don't know, but the flag is a big plus!',
 *    important: true
 *  })
 * }
 * ```
 *
 * Use this power responsibly! :)
 */
console.tron = reactotron

/**
 * We tell typescript about our dark magic
 *
 * You can also import Reactotron yourself from ./reactotronClient
 * and use it directly, like Reactotron.log('hello world')
 */
declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance, and more.
     * @see https://github.com/infinitered/reactotron
     * @example
     * if (__DEV__) {
     *  console.tron.display({
     *    name: 'JOKE',
     *    preview: 'What's the best thing about Switzerland?',
     *    value: 'I don't know, but the flag is a big plus!',
     *    important: true
     *  })
     * }
     */
    tron: typeof reactotron
  }
}

/**
 * Now that we've setup all our Reactotron configuration, let's connect!
 * Reactotron's connect() is non-blocking and will fail silently if the desktop app isn't running.
 * The app will continue to work normally even if Reactotron can't connect.
 */
reactotron.connect()
