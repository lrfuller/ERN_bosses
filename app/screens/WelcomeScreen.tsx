import React, { FC, useEffect } from "react"
import {
  Image,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"

import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import GameItemsScreen from "@/components/ShieldCard"
import { BOSSES, bossTypes } from "types/bossTypes"
import BossesCaoursel from "@/components/Bosses"

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()

  const { height, width } = useWindowDimensions()

  // console.log(width)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const ShieldView = () => {
    return (
      <View style={themed($topContainer)}>
        {/* <Text>Boss1 text</Text> */}
        <GameItemsScreen bossInfo={BOSSES[currentIndex]} />
      </View>
    )
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      {/* TODO place view here with shield values */}
      <ShieldView />
      <BossesCaoursel
        currentIndex={currentIndex}
        width={width}
        setCurrentIndex={setCurrentIndex}
        BOSSES={BOSSES}
      />
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  // flexGrow: 1,
  flexBasis: "70%",
  justifyContent: "center",
  // paddingTop: spacing.lg,
  // paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
