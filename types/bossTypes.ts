export type elementalDamage = "fire" | "holy" | "magic" | "lightning"

export interface bossTypes {
  id: number
  name?: string
  src: string
  damageTypes: elementalDamage
  //   damageTypes: elementalDamage[] | elementalDamage
}

export const BossAffinities: bossTypes[] = [
  {
    id: 0,
    src: "@assets/images/affinities/fire.webp",
    damageTypes: "fire",
  },
  {
    id: 1,
    src: "@assets/images/affinities/lightning.webp",
    damageTypes: "lightning",
  },
  {
    id: 2,
    src: "@assets/images/affinities/magic.webp",
    damageTypes: "magic",
  },
  {
    id: 3,
    src: "@assets/images/affinities/holy.webp",
    damageTypes: "holy",
  },
]

export const BossAffinities_OLD: bossTypes[] = [
  {
    id: 0,
    name: "tricephalos",
    src: "@assets/images/bosses/ERN_Icon_Target_Tricephalos.webp",
    damageTypes: "fire",
  },
  {
    id: 1,
    name: "gaping_jaw",
    src: "@assets/images/bosses/ERN_Icon_Target_Gaping_Jaw.webp",
    damageTypes: "lightning",
  },
  {
    id: 2,
    name: "sentient_pest",
    src: "@assets/images/bosses/ERN_Icon_Target_Sentient_Pest.webp",
    damageTypes: "magic",
  },
  {
    id: 3,
    name: "augur",
    src: "@assets/images/bosses/ERN_Icon_Target_Augur.webp",
    damageTypes: "magic",
  },
  {
    id: 4,
    name: "equilibrious_beast",
    src: "@assets/images/bosses/ERN_Icon_Target_Equilibrious_Beast.webp",
    damageTypes: "holy",
  },
  {
    id: 5,
    name: "darkdrift_knight",
    src: "@assets/images/bosses/ERN_Icon_Target_Darkdrift_Knight.webp",
    damageTypes: "holy",
  },
  {
    id: 6,
    name: "fissure_in_the_fog",
    src: "@assets/images/bosses/ERN_Icon_Target_Fissure_in_the_Fog.webp",
    damageTypes: "magic",
  },
  {
    id: 7,
    name: "night_aspect",
    src: "@assets/images/bosses/ERN_Icon_Target_Night_Aspect.webp",
    damageTypes: "magic",
  },
]
