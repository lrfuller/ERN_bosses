import React, { FC, useEffect, useState } from "react"
import { Pressable, View, ViewStyle, TextStyle } from "react-native"
import { ChevronDown } from "lucide-react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface DropdownProps {
  /**
   * Array of options to display in the dropdown
   */
  options: string[]
  /**
   * Currently selected value
   */
  value?: string
  /**
   * Callback when an option is selected
   */
  onValueChange?: (value: string) => void
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string
  /**
   * Style overrides for the container
   */
  containerStyle?: ViewStyle
}

/**
 * A dropdown component with a modern, clean design
 */
export const Dropdown: FC<DropdownProps> = function Dropdown({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  containerStyle,
}) {
  const { themed, theme } = useAppTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || options[0] || "")
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withTiming(isOpen ? 180 : 0, {
      duration: 200,
    })
  }, [isOpen, rotation])

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    }
  })

  const handleSelect = (option: string) => {
    setSelectedValue(option)
    onValueChange?.(option)
    setIsOpen(false)
  }

  const displayValue = value || selectedValue

  return (
    <View style={[themed($container), containerStyle]}>
      <Pressable
        style={themed($trigger)}
        onPress={() => setIsOpen(!isOpen)}
        android_ripple={{ color: theme.colors.palette.primary200 }}
      >
        <Text style={themed($triggerText)} numberOfLines={1}>
          {displayValue || placeholder}
        </Text>
        <Animated.View style={animatedChevronStyle}>
          <ChevronDown size={20} color={theme.colors.textDim} />
        </Animated.View>
      </Pressable>

      {isOpen && (
        <View style={themed($optionsContainer)}>
          {options.map((option, index) => {
            const isSelected = displayValue === option
            const isLast = index === options.length - 1

            return (
              <Pressable
                key={index}
                style={themed([$option, isSelected && $optionSelected, !isLast && $optionBorder])}
                onPress={() => handleSelect(option)}
                android_ripple={{ color: theme.colors.palette.primary100 }}
              >
                <Text style={themed([$optionText, isSelected && $optionTextSelected])}>
                  {option}
                </Text>
                {/* {isSelected && (
                  <View style={themed($checkmark)}>
                    <Text style={themed($checkmarkText)}>✓</Text>
                  </View>
                )} */}
              </Pressable>
            )
          })}
        </View>
      )}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  zIndex: 1,
})

const $trigger: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.background,
  borderWidth: 2,
  borderColor: colors.border,
  borderRadius: 12,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm + 2,
  minHeight: 48,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
})

const $triggerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
  fontSize: 16,
  fontWeight: "500",
  marginRight: 8,
})

const $optionsContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: 4,
  backgroundColor: colors.background,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: colors.border,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 8,
})

const $option: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
  minHeight: 48,
})

const $optionSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.cardBackground2,
})

const $optionBorder: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $optionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
  fontSize: 16,
})

const $optionTextSelected: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary600,
  fontWeight: "600",
})

const $checkmark: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: colors.palette.primary500,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 8,
})

const $checkmarkText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 14,
  fontWeight: "bold",
})
