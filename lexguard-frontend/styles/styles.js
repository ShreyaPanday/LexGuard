import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  userChat: {
    position: "relative",
    padding: 10,
    borderRadius: 10,
    marginLeft: "20%",
    width: "75%",
    height: "auto",
    backgroundColor: "#D3D3D3",
    color: "Black",
    fontSize: 18,
    textAlign: "right",
  },
  geminiChat: {
    position: "relative",
    padding: 10,
    borderRadius: 10,
    marginRight: "20%",
    marginVertical: 10,
    width: "75%",
    height: "auto",
    backgroundColor: "#D3D3D3",
    color: "Black",
    fontSize: 18,
    textAlign: "left",
    flexWrap: "wrap",
  },
  user: {
    color: "#333333",
    backgroundColor: "#CCCCFF",
    fontWeight: "bold",
    padding: 10,
    marginBottom: 10,
    width: "75%",
    alignSelf: "flex-start",
  },
  gemini: {
    color: "#333333",
    backgroundColor: "#E6E6FA",
    padding: 10,
    marginBottom: 10,
    width: "90%",
    alignSelf: "flex-end",
  },
});

export const landingPageStyles = StyleSheet.create({
  pageStyle: {
    marginLeft: 5,
    backgroundColor: "#FAF9F6",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    width: 450,
    height: 75,
    backgroundColor: "#4B0082",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 135,
  },
  content: {
    width: "95%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
    height: 60,
    fontSize: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export const textStyles = StyleSheet.create({
  h1: {
    fontSize: 28,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#2A2A2A",
    textAlign: "center",
  },
  h2: {
    fontSize: 22,
    marginVertical: 8,
    fontWeight: "bold",
    color: "#2A2A2A",
    textAlign: "center",
  },
  p: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    textAlign: "center",
    marginVertical: 10,
  },
});

export const buttonStyles = StyleSheet.create({
  button: {
    padding: 20,
    color: "white",
    backgroundColor: "#9400D3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});
