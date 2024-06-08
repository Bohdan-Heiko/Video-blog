import { View } from "react-native"

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

export type SVGIconNames =
  | "Eye"
  | "HideEye"
  | "CheckBox_Check"
  | "CheckBox_Uncheck"
  | "Arrow_Up_Right"
  | "Visa_Logo"
  | "Visa_Name"
  | "Tether_Usdt"

export type IconType = {
  AntDesign: typeof AntDesign
  Entypo: typeof Entypo
  EvilIcons: typeof EvilIcons
  Feather: typeof Feather
  FontAwesome: typeof FontAwesome
  FontAwesome5: typeof FontAwesome5
  Fontisto: typeof Fontisto
  Ionicons: typeof Ionicons
  MaterialCommunityIcons: typeof MaterialCommunityIcons
  MaterialIcons: typeof MaterialIcons
  Octicons: typeof Octicons
  SimpleLineIcons: typeof SimpleLineIcons
  Zocial: typeof Zocial
}

export type IconNames = {
  AntDesign: keyof typeof AntDesign.glyphMap
  Entypo: keyof typeof Entypo.glyphMap
  EvilIcons: keyof typeof EvilIcons.glyphMap
  Feather: keyof typeof Feather.glyphMap
  FontAwesome: keyof typeof FontAwesome.glyphMap
  FontAwesome5: keyof typeof FontAwesome5.glyphMap
  Fontisto: keyof typeof Fontisto.glyphMap
  Ionicons: keyof typeof Ionicons.glyphMap
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap
  MaterialIcons: keyof typeof MaterialIcons.glyphMap
  Octicons: keyof typeof Octicons.glyphMap
  SimpleLineIcons: keyof typeof SimpleLineIcons.glyphMap
  Zocial: keyof typeof Zocial.glyphMap
}

export const VECTOR_ICONS_TYPE: IconType = {
  AntDesign: AntDesign,
  Entypo: Entypo,
  EvilIcons: EvilIcons,
  Feather: Feather,
  FontAwesome: FontAwesome,
  FontAwesome5: FontAwesome5,
  Fontisto: Fontisto,
  Ionicons: Ionicons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  Octicons: Octicons,
  SimpleLineIcons: SimpleLineIcons,
  Zocial: Zocial
}

export interface BarIconProps<T extends keyof IconType> {
  type?: T
  name?: IconNames[T]
  color?: string
  size?: number
  style?: View["props"]["style"]
}
