import React from "react"
import { Pressable, View } from "react-native"
import { interpolate } from "react-native-reanimated"
import Carousel, { ICarouselInstance, TAnimationStyle } from "react-native-reanimated-carousel"
import { bossTypes } from "types/bossTypes"
import { AFFINITY_IMAGES } from "@/constants/boss-images"
import { SlideItem } from "./SlideItem"

interface BossesCaourselProps {
  width: number
  currentIndex: number
  BossAffinities: bossTypes[]
  setCurrentIndex: any
}

const BossesCaoursel: React.FC<BossesCaourselProps> = ({
  width,
  currentIndex,
  BossAffinities,
  setCurrentIndex,
}) => {
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

  const navigateToIndex = React.useCallback(
    (targetIndex: number) => {
      if (carouselRef.current) {
        const totalItems = BossAffinities.length
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
  return (
    <Carousel
      ref={carouselRef}
      width={itemSize}
      height={itemSize}
      style={{
        width: width,
        height: width / 2,
      }}
      loop
      data={BossAffinities}
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
              <SlideItem index={index} source={AFFINITY_IMAGES[index % AFFINITY_IMAGES.length]} />
            </View>
          </View>
        </Pressable>
      )}
      customAnimation={animationStyle}
    />
  )
}

export default BossesCaoursel
