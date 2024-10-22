import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native';

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
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputImage}
              source={require("../assets/icon2.png")}
              size={15}
            />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>
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
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingBottom: 10,
    width: "88%"
  },
  inputImage: {
    marginTop: 10,
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    padding: 15,
    color: "#757083",
    opacity: 50,
  },
  chooseColorBox: {
    width: "88%",
    alignItems: "center",
  },
  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
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