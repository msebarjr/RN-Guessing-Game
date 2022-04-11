import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import Colors from "./utils/colors";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [guessRounds, setGuessRounds] = useState(0);

    const [fontsLoaded] = useFonts({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const startGameHandler = (userNumber) => {
        setUserNumber(userNumber);
    };

    const gameOverHandler = (numberOfRounds) => {
        setGameOver(true);
        setGuessRounds(numberOfRounds);
    };

    const startNewGameHandler = () => {
        setUserNumber(null);
        setGameOver(false);
        setGuessRounds(0);
    };

    let screen = <StartGameScreen startGame={startGameHandler} />;

    if (userNumber) {
        screen = (
            <GameScreen
                chosenNumber={userNumber}
                onGameOver={gameOverHandler}
            />
        );
    }

    if (gameOver) {
        screen = (
            <GameOverScreen
                userNumber={userNumber}
                numberOfRounds={guessRounds}
                onStartNewGame={startNewGameHandler}
            />
        );
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
