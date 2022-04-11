import { StyleSheet, Image, View, Text } from "react-native";
import Colors from "../utils/colors";

import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ numberOfRounds, userNumber, onStartNewGame }) {
    return (
        <View style={styles.rootContainer}>
            <Title>Game Over!</Title>
            <Image
                style={styles.image}
                source={require("../assets/images/success.png")}
            />
            <Text style={styles.summaryText}>
                Your phone needed{" "}
                <Text style={styles.highlight}>{numberOfRounds}</Text> rounds to
                guess the number{" "}
                <Text style={styles.highlight}> {userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>
                Start New Game
            </PrimaryButton>
        </View>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        margin: 36,
    },
    summaryText: {
        fontFamily: "open-sans",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 24,
    },
    highlight: {
        fontFamily: "open-sans-bold",
        color: Colors.primary500,
    },
});
