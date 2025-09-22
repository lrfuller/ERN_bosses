import React, { FC } from "react"
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
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel"
import { interpolate } from "react-native-reanimated"
import { Pressable, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { SlideItem } from "@/components/SlideItem"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

const BOSSES = [
  {
    name: "tricephalos",
    src: "@assets/images/bosses/ERN_Icon_Target_Tricephalos.webp",
  },
  {
    name: "gaping_jaw",
    src: "@assets/images/bosses/ERN_Icon_Target_Gaping_Jaw.webp",
  },
  {
    name: "sentient_pest",
    src: "@assets/images/bosses/ERN_Icon_Target_Sentient_Pest.webp",
  },
  {
    name: "augur",
    src: "@assets/images/bosses/ERN_Icon_Target_Augur.webp",
  },
  {
    name: "equilibrious_beast",
    src: "@assets/images/bosses/ERN_Icon_Target_Equilibrious_Beast.webp",
  },
  {
    name: "darkdrift_knight",
    src: "@assets/images/bosses/ERN_Icon_Target_Darkdrift_Knight.webp",
  },
  {
    name: "fissure_in_the_fog",
    src: "@assets/images/bosses/ERN_Icon_Target_Fissure_in_the_Fog.webp",
  },
  {
    name: "night_aspect",
    src: "@assets/images/bosses/ERN_Icon_Target_Night_Aspect.webp",
  },
]
// const tricephalos = require("@assets/images/bosses/ERN_Icon_Target_Tricephalos.webp")
// const gaping_jaw = require("@assets/images/bosses/ERN_Icon_Target_Gaping_Jaw.webp")
// const sentient_pest = require("@assets/images/bosses/ERN_Icon_Target_Sentient_Pest.webp")
// const augur = require("@assets/images/bosses/ERN_Icon_Target_Augur.webp")
// const equilibrious_beast = require("@assets/images/bosses/ERN_Icon_Target_Equilibrious_Beast.webp")
// const darkdrift_knight = require("@assets/images/bosses/ERN_Icon_Target_Darkdrift_Knight.webp")
// const fissure_in_the_fog = require("@assets/images/bosses/ERN_Icon_Target_Fissure_in_the_Fog.webp")
// const night_aspect = require("@assets/images/bosses/ERN_Icon_Target_Night_Aspect.webp")

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()

  const { height, width } = useWindowDimensions()

  // const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const itemSize = 80
  const centerOffset = width / 2 - itemSize / 2

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet"

      const itemGap = interpolate(value, [-3, -2, -1, 0, 1, 2, 3], [-30, -15, 0, 0, 0, 15, 30])

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) + centerOffset - itemGap

      const translateY = interpolate(value, [-1, -0.5, 0, 0.5, 1], [60, 45, 40, 45, 60])

      const scale = interpolate(value, [-1, -0.5, 0, 0.5, 1], [0.8, 0.85, 1.1, 0.85, 0.8])

      return {
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          { scale },
        ],
      }
    },
    [centerOffset],
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <Carousel
        width={itemSize}
        height={itemSize}
        style={{
          width: width,
          height: width / 2,
        }}
        loop
        data={BOSSES}
        renderItem={({ index }) => (
          <Pressable
            key={index}
            onPress={() => {
              console.log(index)
            }}
            // containerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
                borderRadius: 50,
                justifyContent: "center",
                overflow: "hidden",
                alignItems: "center",
              }}
            >
              <View style={{ width: "100%", height: "100%" }}>
                <SlideItem index={index} />
              </View>
            </View>
          </Pressable>
        )}
        customAnimation={animationStyle}
      />
      {/* <SafeAreaView>
        <ScrollView style={themed($topContainer)}>
          <Image source={tricephalos} resizeMode="contain" />
          <Image source={gaping_jaw} resizeMode="contain" />
          <Image source={sentient_pest} resizeMode="contain" />
          <Image source={augur} resizeMode="contain" />
          <Image source={equilibrious_beast} resizeMode="contain" />
          <Image source={darkdrift_knight} resizeMode="contain" />
          <Image source={fissure_in_the_fog} resizeMode="contain" />
          <Image source={night_aspect} resizeMode="contain" />
        </ScrollView>
      </SafeAreaView> */}

      {/* <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Text tx="welcomeScreen:postscript" size="md" />
      </View> */}
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  // flexBasis: "57%",
  // justifyContent: "center",
  paddingHorizontal: spacing.lg,
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
