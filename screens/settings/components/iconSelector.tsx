const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

import { IconType } from "@/types/icons"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"

import { VectorExpoIcons } from "@/components/ui/icons/vectorExpoIcons"
import { ICON_NAMES, ICON_TYPES } from "@/constants/initialData"

export const IconSelector = () => {
  const [selectedType, setSelectedType] = useState<keyof IconType | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  const handleTypeChange = (value: keyof IconType | null) => {
    setSelectedType(value)
    setSelectedName(null)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Icon Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => handleTypeChange(itemValue as keyof IconType)}
        >
          <Picker.Item label="Select an icon type" value={null} />
          {ICON_TYPES.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>
      {selectedType && (
        <>
          <Text style={styles.label}>Select Icon Name:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedName}
              onValueChange={(itemValue) => setSelectedName(itemValue)}
            >
              <Picker.Item label="Select an icon name" value={null} />
              {ICON_NAMES[selectedType].map((name, idx) => (
                <Picker.Item key={idx} label={name as string} value={name} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {selectedType && selectedName && (
        <View style={styles.iconContainer}>
          <VectorExpoIcons
            type={selectedType}
            name={selectedName as any} // TypeScript sometimes needs a little help
            size={50}
            color="#000"
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "red"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  label: {
    fontSize: 18,
    marginVertical: 10
  },
  pickerContainer: {
    height: 50,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20
  },
  iconContainer: {
    marginTop: 30
  }
})
