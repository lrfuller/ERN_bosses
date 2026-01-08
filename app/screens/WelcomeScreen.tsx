import React, { FC, useCallback, useEffect, useState } from "react"
import {
  ImageStyle,
  TextInput,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"

import { Screen } from "@/components/Screen"
import { Dropdown } from "@/components/Dropdown"
import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import GameItemsScreen from "@/components/ShieldCard"
import { BossAffinities, elementalDamage } from "types/bossTypes"
// import BossesCaoursel from "@/components/Bosses"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()

  const { height, width } = useWindowDimensions()

  const [currentAffinity, setCurrentAffinity] = useState(BossAffinities[0])
  const [affinityThreshold, setAffinityThreshold] = useState("0")

  const dropdownOptions = BossAffinities.map((boss) => boss.damageTypes)

  const damageTypeChanged = useCallback((value: string) => {
    const damageType = value as elementalDamage
    const bossObj = BossAffinities.find((boss) => boss.damageTypes === damageType)
    if (bossObj) {
      setCurrentAffinity(bossObj)
    }
  }, [])

  // const changeAffinityThreshold = useCallback((value: string) => {
  //   if (/^(?:[0-9]|[1-8][0-9]|90)?$/.test(value)) {
  //     setAffinityThreshold(value)
  //   }
  // }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <View style={themed($filterContainer)}>
          <Text>Affinity type</Text>
          <Dropdown
            options={dropdownOptions}
            value={currentAffinity.damageTypes}
            onValueChange={damageTypeChanged}
            placeholder="Select an option"
          />
        </View>
        {/* <View style={themed($filterContainer)}>
          <Text>Min Percent</Text>
          <TextField
            keyboardType="numeric"
            placeholder="0-90"
            onChangeText={changeAffinityThreshold}
            value={affinityThreshold}
          ></TextField>
        </View> */}
      </View>
      <View style={themed($shieldContainer)}>
        <GameItemsScreen bossInfo={BossAffinities[currentAffinity.id]} />
      </View>
      {/* <BossesCaoursel
        currentIndex={currentIndex}
        width={width}
        setCurrentIndex={setCurrentIndex}
        BossAffinities={BossAffinities}
      /> */}
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  // flexGrow: 1,
  flexBasis: "20%",
  justifyContent: "center",
  paddingTop: spacing.xl,
  display: "flex",
  flexDirection: "row",
})

const $shieldContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  // flexGrow: 1,
  flexBasis: "100%",
  paddingTop: spacing.md,
})

const $filterContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  // paddingVertical: spacing.sm,
  justifyContent: 'flex-end',
  // width: "50%",
  width: "100%"
})
