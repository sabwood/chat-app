import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BackgroundImage.png")}
        style={styles.imageBackground}
      >
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
          <View style={styles.chooseColorBox}>
            <Text style={styles.colorText}>Choose Background Color:</Text>
            <View style={styles.colorContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    backgroundColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setBackgroundColor(color)}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Chat", { name: name, backgroundColor: backgroundColor})}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  title: {
    flex: 1,
    color: "#ffffff",
    fontSize: 45,
    fontWeight: "600",
    justifyContent: "center",
    marginTop: 80,
  },
  contentContainer: {
    flex: 1,
    width: "88%",
    height: "44%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 30,
  },
  textInput: {
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    borderWidth: 1,
    padding: 15,
    color: "#757083",
    borderColor: "#757083",
    opacity: 50,
  },
  chooseColorBox: {
    width: "88%",
    alignItems: "center",
  },
  colorText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "left",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  button: {
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#757083",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default Start;