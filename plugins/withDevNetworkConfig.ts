import { ConfigPlugin, withAndroidManifest, withDangerousMod } from "expo/config-plugins"
import fs from "fs"
import path from "path"

/**
 * Expo Config Plugin to add network security configuration for development.
 * This allows Reactotron and Metro bundler to connect properly in dev mode.
 *
 * Applies by default. Set SKIP_DEV_NETWORK_CONFIG=true to disable.
 */
export const withDevNetworkConfig: ConfigPlugin = (config) => {
  // Skip only if explicitly disabled (for production EAS builds, set env var)
  if (process.env.SKIP_DEV_NETWORK_CONFIG === "true") {
    console.log("Skipping dev network config (SKIP_DEV_NETWORK_CONFIG=true)")
    return config
  }

  console.log("Applying dev network config for Metro/Reactotron connectivity")

  config = withAndroidNetworkSecurityConfig(config)
  config = withAndroidManifestNetworkConfig(config)
  return config
}

/**
 * Creates the network_security_config.xml file in the Android res/xml directory.
 * This file allows cleartext traffic to localhost and Android emulator host.
 */
const withAndroidNetworkSecurityConfig: ConfigPlugin = (config) =>
  withDangerousMod(config, [
    "android",
    async (config) => {
      const xmlDir = path.join(config.modRequest.platformProjectRoot, "app/src/main/res/xml")

      // Ensure the xml directory exists
      if (!fs.existsSync(xmlDir)) {
        fs.mkdirSync(xmlDir, { recursive: true })
      }

      const xmlFilePath = path.join(xmlDir, "network_security_config.xml")
      // For development: Allow cleartext traffic globally
      // This enables Metro bundler and Reactotron to connect from any IP
      // Only use this config in development - disable plugin for production builds
      const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- Allow cleartext traffic for development (Metro bundler, Reactotron, etc.) -->
    <!-- For production builds, set SKIP_DEV_NETWORK_CONFIG=true to exclude this -->
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
`

      fs.writeFileSync(xmlFilePath, xmlContent, "utf-8")

      return config
    },
  ])

/**
 * Modifies AndroidManifest.xml to reference the network security config.
 */
const withAndroidManifestNetworkConfig: ConfigPlugin = (config) =>
  withAndroidManifest(config, async (modConfig) => {
    const androidManifest = modConfig.modResults
    const { manifest } = androidManifest

    if (!manifest.application) {
      return modConfig
    }

    const application = Array.isArray(manifest.application)
      ? manifest.application[0]
      : manifest.application

    // Add networkSecurityConfig attribute
    // Ensure the $ object exists - use type assertion since required properties
    // will be present in the actual manifest (this is just adding an attribute)
    if (!application.$) {
      application.$ = {} as any
    }

    // Always set it in dev mode (plugin will regenerate AndroidManifest.xml)
    application.$["android:networkSecurityConfig"] = "@xml/network_security_config"

    return modConfig
  })
