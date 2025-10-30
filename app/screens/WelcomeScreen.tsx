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
import Carousel, { ICarouselInstance, TAnimationStyle } from "react-native-reanimated-carousel"
import { interpolate } from "react-native-reanimated"
import { Pressable, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { SlideItem } from "@/components/SlideItem"
import GameItemsScreen from "@/components/ShieldCard"

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

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()

  const { height, width } = useWindowDimensions()

  // console.log(width)
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
    [centerOffset, itemSize],
  )

  const carouselRef = React.useRef<ICarouselInstance>(null)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const navigateToIndex = React.useCallback(
    (targetIndex: number) => {
      if (carouselRef.current) {
        const totalItems = BOSSES.length
        const current = currentIndex

        // Calculate the shortest path in the loop
        const forwardDistance = (targetIndex - current + totalItems) % totalItems
        const backwardDistance = (current - targetIndex + totalItems) % totalItems

        // Choose the shorter path
        const shouldGoForward = forwardDistance <= backwardDistance

        if (shouldGoForward) {
          carouselRef.current.next({ animated: true, count: forwardDistance })
        } else {
          carouselRef.current.prev({ animated: true, count: backwardDistance })
        }

        setCurrentIndex(targetIndex)
      }
    },
    [currentIndex],
  )

  const ShieldView = () => {
    return (
      <View style={themed($topContainer)}>
        {/* <Text>Boss1 text</Text> */}
        <GameItemsScreen key={1}></GameItemsScreen>
      </View>
    )
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      {/* TODO place view here with shield values */}
      <ShieldView></ShieldView>
      <Carousel
        ref={carouselRef}
        width={itemSize}
        height={itemSize}
        style={{
          width: width,
          height: width / 2,
        }}
        loop
        data={BOSSES}
        defaultIndex={0}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ index }) => (
          <Pressable
            key={index}
            onPress={() => {
              console.log(`Clicked index: ${index}`)
              navigateToIndex(index)
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
