import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "./utils/colors";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState();

    const startGameHandler = (userNumber) => {
        setUserNumber(userNumber);
    };

    let screen = <StartGameScreen startGame={startGameHandler} />;

    if (userNumber) {
        screen = <GameScreen chosenNumber={userNumber} />;
    }

    return (
        <LinearGradient
            style={styles.rootScreen}
            colors={[Colors.primary700, Colors.accent500]}
        >
            <ImageBackground
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
                source={require("./assets/images/background.jpg")}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
