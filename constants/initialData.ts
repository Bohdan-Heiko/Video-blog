import { IconType, VECTOR_ICONS_TYPE } from "@/types/icons"
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from "@expo/vector-icons"

const ICON_TYPES = Object.keys(VECTOR_ICONS_TYPE) as (keyof IconType)[]

const ICON_NAMES: {
  [K in keyof IconType]: (keyof (typeof VECTOR_ICONS_TYPE)[K]["glyphMap"])[]
} = {
  AntDesign: Object.keys(AntDesign.glyphMap) as (keyof typeof AntDesign.glyphMap)[],
  Entypo: Object.keys(Entypo.glyphMap) as (keyof typeof Entypo.glyphMap)[],
  EvilIcons: Object.keys(EvilIcons.glyphMap) as (keyof typeof EvilIcons.glyphMap)[],
  Feather: Object.keys(Feather.glyphMap) as (keyof typeof Feather.glyphMap)[],
  FontAwesome: Object.keys(FontAwesome.glyphMap) as (keyof typeof FontAwesome.glyphMap)[],
  FontAwesome5: Object.keys(
    FontAwesome5.getRawGlyphMap()
  ) as (keyof typeof FontAwesome5.glyphMap)[],
  Fontisto: Object.keys(Fontisto.glyphMap) as (keyof typeof Fontisto.glyphMap)[],
  Ionicons: Object.keys(Ionicons.glyphMap) as (keyof typeof Ionicons.glyphMap)[],
  MaterialCommunityIcons: Object.keys(
    MaterialCommunityIcons.glyphMap
  ) as (keyof typeof MaterialCommunityIcons.glyphMap)[],
  MaterialIcons: Object.keys(
    MaterialIcons.glyphMap
  ) as (keyof typeof MaterialIcons.glyphMap)[],
  Octicons: Object.keys(Octicons.glyphMap) as (keyof typeof Octicons.glyphMap)[],
  SimpleLineIcons: Object.keys(
    SimpleLineIcons.glyphMap
  ) as (keyof typeof SimpleLineIcons.glyphMap)[],
  Zocial: Object.keys(Zocial.glyphMap) as (keyof typeof Zocial.glyphMap)[]
}

export { ICON_NAMES, ICON_TYPES }
