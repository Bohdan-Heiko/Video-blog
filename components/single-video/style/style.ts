import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainContainer: {
    position: "relative",
  },

  indicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -25,
    zIndex: 1000,
  },

  flex1: {
    flex: 1,
  },

  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },

  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },

  labelVideoContainer: {
    justifyContent: "space-between",
    flex: 1,
  },

  label: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  icon: {
    position: "absolute",
    left: 20,
  },

  title: {
    fontSize: 30,
    color: "white",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: 300,
  },

  timeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 15,
    position: "absolute",
    bottom: 15,
    gap: 15,
  },

  sliderMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  sliderContainer: {
    flex: 1,
    position: "relative",
    gap: 4,
  },

  sliderTime: {
    color: "white",
    fontSize: 12,
  },

  slider: {
    width: "100%",
  },
  timeText: {
    color: "#FFFFFF",
  },
});
