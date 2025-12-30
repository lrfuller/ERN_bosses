import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, Image } from "react-native"
import { Shield } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
import { bossTypes } from "types/bossTypes"
import { Text as SVGText } from "react-native-svg"
import { colors } from "@/theme/colors"

// Affinities
const magic = require("../../assets/images/affinities/magic.webp")
const fire = require("../../assets/images/affinities/fire.webp")
const lightning = require("../../assets/images/affinities/lightning.webp")
const holy = require("../../assets/images/affinities/holy.webp")

// shields
const ant = require("../../assets/images/greatshields/ants_skull_plate_elden_ring_wiki_guide_200px.png")
const albinauric = require("../../assets/images/greatshields/Albinauric_Shield.webp")
const briar = require("../../assets/images/greatshields/briar_greatshield_elden_ring_wiki_guide_200px.png")
const carian = require("../../assets/images/greatshields/Carian_Knight_Shield.webp")
const crossed_tree = require("../../assets/images/greatshields/crossed-tree_towershield_greatshield_elden_ring_wiki_guide_200px.png")
const crucible_horn = require("../../assets/images/greatshields/crucible_hornshield_elden_ring_wiki_guide_200px.png")
const cuckoo = require("../../assets/images/greatshields/cuckoo_greatshield_elden_ring_wiki_guide_200px.png")
const distinguished = require("../../assets/images/greatshields/distinguished_greatshield_shields_elden_ring_wiki_guide_200px.png")
const eclipse_crest = require("../../assets/images/greatshields/eclipse_crest_greatshield_elden_ring_wiki_guide_200px.png")
const dragonclaw = require("../../assets/images/greatshields/dragonclaw__shield_elden_ring_wiki_guide_200px.png")
const erdtree = require("../../assets/images/greatshields/erdtree_greatshield_elden_ring_wiki_guide_200px.png")
const fingerprint = require("../../assets/images/greatshields/fingerprint_stone_shield_greatshield_elden_ring_wiki_guide_200px.png")
const guardian = require("../../assets/images/greatshields/guardians_greatshiweapon_elden_ring_nightreign_wiki_guide.png")
const gilded = require("../../assets/images/greatshields/gilded_greatshield_elden_ring_wiki_guide_200px.png")
const golden_beast_crest = require("../../assets/images/greatshields/golden_beast_crest_shield_elden_ring_wiki_guide_200px.png")
const golden = require("../../assets/images/greatshields/golden_greatshield_elden_ring_wiki_guide_200px.png")
const haligtree_crest = require("../../assets/images/greatshields/haligtree_crest_greatshield_elden_ring_wiki_guide_200px.png")
const icon_shield = require("../../assets/images/greatshields/icon_shield_elden_ring_wiki_guide_200px.png")
const jellyfish = require("../../assets/images/greatshields/jellyfish_shield_elden_ring_wiki_guide_200.png")
const one_eyed = require("../../assets/images/greatshields/one-eyed_shield_elden_ring_wiki_guide_200px.png")
const visage = require("../../assets/images/greatshields/visage_shield_elden_ring_wiki_guide_200px.png")
const wooden = require("../../assets/images/greatshields/wooden_greatshield_elden_ring_wiki_guide_200px.png")
const spiked_palisade = require("../../assets/images/greatshields/spiked_palisade_shield_elden_ring_wiki_guide_200px.png")
const redmane = require("../../assets/images/greatshields/redmane_greatshield_elden_ring_wiki_guide_200px.png")
const dragon_tower = require("../../assets/images/greatshields/dragon_towershield_greatshield_elden_ring_wiki_guide_200px.png")
const inverted_hawk = require("../../assets/images/greatshields/invert_hawk_towershield_greatshield_elden_ring_wiki_guide_200px.png")
const manor_tower = require("../../assets/images/greatshields/manor_towershield_greatshield_elden_ring_wiki_guide_200px.png")
const lordsworns = require("../../assets/images/greatshields/lordsworns_shield_greatshield_elden_ring_wiki_guide_200px.png")
const silver_mirror = require("../../assets/images/greatshields/Silver_Mirrorshield.webp")

interface ItemData {
  id: number
  name: string
  image: any
  lightning: number
  fire: number
  magic: number
  holy: number
  guard: number
}

interface ShieldCardProps {
  item: ItemData
}

const ShieldCard: React.FC<ShieldCardProps> = ({ item }) => {
  const getResistanceColor = (value: number): string => {
    if (value >= 70) return "#22c55e"
    if (value >= 60) return "#eab308"
    if (value >= 50) return "white"
    // if (value >= 55) return "white"
    // if (value >= 50) return "gray"
    return "#ef4444"
  }

  const size = 45
  const center = size / 2

  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.header}>
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
          {/* <Text style={styles.guardLabel}>Guard</Text> */}
          <Shield size={size} color={"gray"} strokeWidth={1.5}>
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
      </View>
    </View>
  )
}

interface GameScreenProps {
  bossInfo: bossTypes
}

const GameItemsScreen: React.FC<GameScreenProps> = ({ bossInfo }) => {
  const items: ItemData[] = [
    {
      id: 1,
      name: "Guardian's Greatshield",
      image: guardian,
      magic: 59,
      fire: 66,
      lightning: 53,
      holy: 62,
      guard: 80,
    },
    {
      id: 2,
      name: "Silver Mirrorshield",
      image: silver_mirror,
      magic: 92,
      fire: 32,
      lightning: 20,
      holy: 28,
      guard: 76,
    },
    {
      id: 3,
      name: "Albinauric Shield",
      image: albinauric,
      magic: 64,
      fire: 41,
      lightning: 22,
      holy: 45,
      guard: 75,
    },
    {
      id: 4,
      name: "Carian Knight's Shield",
      image: carian,
      magic: 71,
      fire: 28,
      lightning: 19,
      holy: 54,
      guard: 74,
    },
    {
      id: 5,
      name: "Ant's Skull Plate",
      image: ant,
      magic: 64,
      fire: 48,
      lightning: 64,
      holy: 64,
      guard: 78,
    },
    {
      id: 6,
      name: "Briar Greatshield",
      image: briar,
      magic: 62,
      fire: 54,
      lightning: 62,
      holy: 62,
      guard: 78,
    },
    {
      id: 7,
      name: "Distinguished Greatshield",
      image: distinguished,
      magic: 64,
      fire: 62,
      lightning: 54,
      holy: 60,
      guard: 80,
    },
    {
      id: 8,
      name: "Crucible Hornshield",
      image: crucible_horn,
      magic: 58,
      fire: 57,
      lightning: 52,
      holy: 73,
      guard: 81,
    },
    {
      id: 9,
      name: "Cuckoo Greatshield",
      image: cuckoo,
      magic: 71,
      fire: 56,
      lightning: 52,
      holy: 61,
      guard: 80,
    },
    {
      id: 10,
      name: "Eclipse Crest Greatshield",
      image: eclipse_crest,
      magic: 73,
      fire: 57,
      lightning: 51,
      holy: 59,
      guard: 81,
    },
    {
      id: 11,
      name: "Dragonclaw Shield",
      image: dragonclaw,
      magic: 55,
      fire: 55,
      lightning: 80,
      holy: 50,
      guard: 80,
    },
    {
      id: 12,
      name: "Erdtree Greatshield",
      image: erdtree,
      magic: 67,
      fire: 50,
      lightning: 46,
      holy: 77,
      guard: 81,
    },
    {
      id: 13,
      name: "Fingerprint Stone Shield",
      image: fingerprint,
      magic: 59,
      fire: 62,
      lightning: 61,
      holy: 58,
      guard: 82,
    },
    {
      id: 14,
      name: "Gilded Greatshield",
      image: gilded,
      magic: 59,
      fire: 65,
      lightning: 52,
      holy: 64,
      guard: 82,
    },
    {
      id: 15,
      name: "Golden Beast Crest Shield",
      image: golden_beast_crest,
      magic: 62,
      fire: 62,
      lightning: 54,
      holy: 62,
      guard: 79,
    },
    {
      id: 16,
      name: "Golden Greatshield",
      image: golden,
      magic: 57,
      fire: 60,
      lightning: 57,
      holy: 66,
      guard: 83,
    },
    {
      id: 17,
      name: "Haligtree Crest Greatshield",
      image: haligtree_crest,
      magic: 56,
      fire: 61,
      lightning: 50,
      holy: 73,
      guard: 80,
    },
    {
      id: 18,
      name: "Icon Shield",
      image: icon_shield,
      magic: 61,
      fire: 56,
      lightning: 63,
      holy: 60,
      guard: 81,
    },
    {
      id: 19,
      name: "JellyFish Shield",
      image: jellyfish,
      magic: 65,
      fire: 65,
      lightning: 50,
      holy: 60,
      guard: 78,
    },
    {
      id: 20,
      name: "One-Eyed Shield",
      image: one_eyed,
      magic: 55,
      fire: 67,
      lightning: 57,
      holy: 61,
      guard: 80,
    },
    {
      id: 21,
      name: "Visage Shield",
      image: visage,
      magic: 55,
      fire: 72,
      lightning: 58,
      holy: 55,
      guard: 79,
    },
    {
      id: 22,
      name: "Wooden Greatshield",
      image: wooden,
      magic: 63,
      fire: 52,
      lightning: 65,
      holy: 60,
      guard: 77,
    },
    {
      id: 23,
      name: "Spiked Palisade Shield",
      image: spiked_palisade,
      magic: 61,
      fire: 54,
      lightning: 65,
      holy: 60,
      guard: 77,
    },
    {
      id: 24,
      name: "Redmane Greatshield",
      image: redmane,
      magic: 57,
      fire: 73,
      lightning: 56,
      holy: 54,
      guard: 79,
    },
    {
      id: 25,
      name: "Crossed-Tree Towershield",
      image: crossed_tree,
      magic: 56,
      fire: 66,
      lightning: 52,
      holy: 66,
      guard: 82,
    },
    {
      id: 26,
      name: "Dragon Towershield",
      image: dragon_tower,
      magic: 59,
      fire: 66,
      lightning: 53,
      holy: 62,
      guard: 83,
    },
    {
      id: 27,
      name: "Inverted Hawk Towershield",
      image: inverted_hawk,
      magic: 65,
      fire: 56,
      lightning: 54,
      holy: 65,
      guard: 80,
    },
    {
      id: 28,
      name: "Manor Towershield",
      image: manor_tower,
      magic: 66,
      fire: 66,
      lightning: 52,
      holy: 56,
      guard: 81,
    },
    {
      id: 29,
      name: "Lordsworn's Shield",
      image: lordsworns,
      magic: 62,
      fire: 52,
      lightning: 63,
      holy: 63,
      guard: 79,
    },
  ]

  const [sortedItems, setSortedItems] = useState(items)

  useEffect(() => {
    let newList = sortedItems

    // modify ascending later?...
    const ascending = true

    newList.sort((a, b) => {
      const valueA = a[bossInfo.damageTypes]
      const valueB = b[bossInfo.damageTypes]

      if (valueA > valueB) return ascending ? -1 : 1
      if (valueA < valueB) return ascending ? 1 : -1
      return 0
    })

    setSortedItems(newList)
  }, [bossInfo.id])

  return (
    <View style={styles.container}>
      <View></View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* {sortedItems.map((item) => (
          <ShieldCard key={item.id} item={item} />
        ))} */}
        <FlashList
          data={sortedItems}
          renderItem={({ item }) => <ShieldCard key={item.id} item={item} />}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1a1a2e",
    // paddingTop: 50,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.palette.cardBackground,
    borderRadius: 12,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2d3748",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
  },
  guardLabel: {
    fontSize: 10,
    color: "#94a3b8",
    marginBottom: 2,
  },
  guardBadge: {
    paddingHorizontal: 6,
    width: 50,
  },
  resistanceImage: {
    width: 20,
    height: 20,
  },
  resistancesContainer: {
    flex: 1,
    gap: 6,
  },
  resistanceRow: {
    flexDirection: "row",
    height: 30,
    gap: 6,
  },
  resistance: {
    flex: 1,
    backgroundColor: colors.palette.cardBackground2,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
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
