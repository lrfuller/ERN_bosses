import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { Minus, Plus, Shield } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
import { bossTypes } from "types/bossTypes"
import Svg, { Line, Text as SVGText } from "react-native-svg"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { Button } from "./Button"
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { AllShields, ShieldData } from "types/shields"

// Affinities
const magic = require("../../assets/images/affinities/magic.webp")
const fire = require("../../assets/images/affinities/fire.webp")
const lightning = require("../../assets/images/affinities/lightning.webp")
const holy = require("../../assets/images/affinities/holy.webp")

interface ShieldCardProps {
  item: ShieldData
  hideItemById: any
}

const ShieldCard: React.FC<ShieldCardProps> = ({ item, hideItemById }) => {
  const { theme } = useAppTheme()
  const getResistanceColor = (value: number): string => {
    if (value >= 70) return "#22c55e"
    if (value >= 60) return "#eab308"
    if (value >= 50) return "white"
    // if (value >= 55) return "white"
    // if (value >= 50) return "gray"
    return "#ef4444"
  }

  const size = 45

  const toggleShieldEvent = () => {
    setToggleShield((prev) => {
      hideItemById(item.id)
      // console.log(`id ${item.id} state: ${item.hideItem}`)
      return !prev
    })
  }

  const [toggleShield, setToggleShield] = useState(item.hideItem)

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(toggleShield ? 1 : 0, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  }, [toggleShield])

  const verticalStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: 1 - progress.value }],
    // opacity: 1 - progress.value,
  }))

  // Use the theme's active color which adapts to light/dark themes
  const activeShieldStyle = toggleShield ? { backgroundColor: theme.colors.active } : null

  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Button
          style={[styles.itemCompare, activeShieldStyle]}
          pressedStyle={styles.itemComparePressed}
          onPress={toggleShieldEvent}
        >
          <View style={{ width: 14, height: 14, justifyContent: "center", alignItems: "center" }}>
            {/* Horizontal line - always visible */}
            <View
              style={{
                width: 14,
                height: 2.5,
                backgroundColor: "white",
                borderRadius: 1.25,
                position: "absolute",
              }}
            />

            {/* Vertical line - collapses */}
            <Animated.View
              style={[
                {
                  width: 2.5,
                  height: 14,
                  backgroundColor: "white",
                  borderRadius: 1.25,
                  position: "absolute",
                },
                verticalStyle,
              ]}
            />
          </View>
        </Button>
      </View>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
        </View>

        <View style={styles.resistancesContainer}>
          <View style={styles.resistanceRow}>
            <View style={styles.resistance}>
              <Image source={lightning} style={styles.resistanceImage} resizeMode="contain" />
              <Text style={[styles.resistanceValue, { color: getResistanceColor(item.lightning) }]}>
                {item.lightning}%
              </Text>
            </View>

            <View style={styles.resistance}>
              <Image source={fire} style={styles.resistanceImage} resizeMode="contain" />
              <Text style={[styles.resistanceValue, { color: getResistanceColor(item.fire) }]}>
                {item.fire}%
              </Text>
            </View>
          </View>

          <View style={styles.resistanceRow}>
            <View style={styles.resistance}>
              <Image source={magic} style={styles.resistanceImage} resizeMode="contain" />
              <Text style={[styles.resistanceValue, { color: getResistanceColor(item.magic) }]}>
                {item.magic}%
              </Text>
            </View>

            <View style={styles.resistance}>
              <Image source={holy} style={styles.resistanceImage} resizeMode="contain" />
              <Text style={[styles.resistanceValue, { color: getResistanceColor(item.holy) }]}>
                {item.holy}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.guardBadge}>
          <Text style={styles.guardLabel}>Guard</Text>
          <Shield size={size} color={theme.colors.palette.guard} strokeWidth={1.5}>
            <SVGText
              x={12.5}
              y={15}
              textAnchor="middle"
              fontSize={8}
              fontWeight={100}
              strokeWidth={1}
            >
              {item.guard}
            </SVGText>
          </Shield>
        </View>

        {item.size == "M" ? (
          <View style={styles.guardBadge}>
            <Text style={styles.guardLabel}>Size</Text>
            <Shield size={size} color={theme.colors.palette.guard} strokeWidth={1.5}>
              <SVGText
                x={12.5}
                y={15}
                textAnchor="middle"
                fontSize={8}
                fontWeight={100}
                strokeWidth={1}
              >
                {item.size}
              </SVGText>
            </Shield>
          </View>
        ) : null}
      </View>
    </View>
  )
}

interface GameScreenProps {
  filterByAffinityType?: bossTypes
  filterByShieldName?: string
  updateCompareList?: any
  newList?: Array<any>
}

const GameItemsScreen: React.FC<GameScreenProps> = ({
  // 2 scenarios.
  // 1: use affinityType and ShieldName
  filterByAffinityType,
  filterByShieldName,
  // 2: use updateCompare list to update values added to a smaller list above the total shieldData list
  updateCompareList,
  newList
}) => {

  const [sortedItems, setSortedItems] = useState(AllShields)

  function sortByAffinity() {
    const ascending = true
    const newList = AllShields

    newList.sort((a, b) => {
      const valueA = a[filterByAffinityType.damageTypes]
      const valueB = b[filterByAffinityType.damageTypes]

      if (valueA > valueB) return ascending ? -1 : 1
      if (valueA < valueB) return ascending ? 1 : -1
      return 0
    })
    return newList
  }

  useEffect(() => {
    const newList = sortByAffinity()

    setSortedItems(newList)
  }, [filterByAffinityType.id])

  useEffect(() => {
    // sorting by shield name
    if (filterByShieldName == "") {
      const newList = sortByAffinity()
      setSortedItems(newList)
      return
    }

    let newList = AllShields.filter((shield) =>
      shield.name.toLocaleLowerCase().includes(filterByShieldName.toLocaleLowerCase()),
    )

    const shieldNameLower = filterByShieldName.toLocaleLowerCase()
    newList.sort((a, b) => {
      const nameA = a.name.toLocaleLowerCase()
      const nameB = b.name.toLocaleLowerCase()

      if (nameA.startsWith(shieldNameLower)) return -1
      if (nameB.startsWith(shieldNameLower)) return 1

      return 0
    })

    setSortedItems(newList)
  }, [filterByShieldName])

  // TODO fix.
  const parentHideItemById = useCallback((id: number) =>{
    setSortedItems(prevItems => {
      const newItems = prevItems.map(item => 
        item.id === id 
          ? { ...item, hideItem: !item.hideItem }
          : item
      )

      updateCompareList(newItems.filter(item => item.hideItem))
      return newItems
    }
      
    );

    // const updatedItems = sortedItems.map((item, index)=> 
    // item.id === id
    //   ? {...item, hideItem: !item.hideItem}
    //   : item
    // )

    // setSortedItems(updatedItems)
    // updateCompareList(sortedItems.filter(item => item.hideItem))
  }, [])

  useEffect(()=>{
    // const hiddenItems = sortedItems.filter(item => item.hideItem)
    // console.log(sortedItems)
    // updateCompareList(hiddenItems)
  },[sortedItems])

  return (
    <View style={styles.container}>
      <FlashList
        data={sortedItems}
        style={styles.flashList}
        contentContainerStyle={styles.flashListContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
              {/* <Text style={{color: "white"}}>{item.hideItem == true ? "hide" : "show"}</Text> */}
            <ShieldCard key={item.id} item={item} hideItemById={parentHideItemById}/>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  titleContainer: {
    // paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
  },
  flashList: {
    flex: 1,
    width: "100%",
  },
  flashListContent: {
    paddingVertical: 10,
  },
  cardWrapper: {
    alignItems: "center",
    width: "100%",
  },
  card: {
    backgroundColor: colors.palette.cardBackground,
    borderRadius: 12,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2d3748",
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 6,
  },
  iconContainer: {
    width: 70,
    height: 70,
    backgroundColor: colors.palette.cardBackground2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    padding: 8,
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemName: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
    marginRight: 8,
  },
  itemName2: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
  },
  itemCompare: {
    backgroundColor: colors.palette.cardBackground2,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
    // width: 160,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  itemComparePressed: {
    backgroundColor: "#475569",
    opacity: 0.9,
  },
  compareButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  guardLabel: {
    fontSize: 14,
    color: colors.palette.guard,
    // marginBottom: 2,
  },
  guardBadge: {
    alignItems: "center",
    flexShrink: 0,
    width: 50,
  },
  resistanceImage: {
    width: 20,
    height: 20,
  },
  resistancesContainer: {
    width: 160,
    gap: 6,
    flexShrink: 0,
  },
  resistanceRow: {
    flexDirection: "row",
    height: 32,
    gap: 6,
  },
  resistance: {
    flex: 1,
    backgroundColor: colors.palette.cardBackground2,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    maxWidth: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: "100%",
  },
  resistanceIcon: {
    fontSize: 14,
  },
  resistanceLabel: {
    fontSize: 12,
    color: "#94a3b8",
    flex: 1,
  },
  resistanceValue: {
    fontSize: 14,
    fontWeight: "700",
  },
})

export default GameItemsScreen
