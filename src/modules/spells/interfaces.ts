export interface SpellList {
  count: string
  results: Resource[]
}

export interface Resource {
  index: string
  name: string
  url: string
}

export enum SpellComponent {
  VERBAL = 'V',
  SOMATIC = 'S',
  MATERIAL = 'M'
}

export interface SpellDescription {
  index: string
  name: string
  desc: string[]
  higher_level: string[]
  range: string
  components: SpellComponent[]
  material: string
  ritual: boolean
  duration: string
  concentration: boolean
  casting_time: string
  level: number
  attack_type: string
  damage: {
    damage_type: Resource
    damage_at_slot_level: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, string>
  }
  school: Resource
  classes: Resource[]
  subclasses: Resource[]
  url: string
}
