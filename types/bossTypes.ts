export type elementalDamage = "fire" | "holy" | "magic" | "lightning"

export interface bossTypes {
  id: number
  name: string
  src: string
  damageTypes: elementalDamage
  //   damageTypes: elementalDamage[] | elementalDamage
}
