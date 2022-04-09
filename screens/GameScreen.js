import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "../utils/colors";
import Title from "../components/ui/Title";

/**
 * This function is outside the functional component in order to set the state as the function must be declared first
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Number} exclude
 * @returns Random Number
 */
function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

function GameScreen({ chosenNumber }) {
    const initialGuess = generateRandomBetween(1, 100, chosenNumber); // With Math.random the upper boundary is EXCLUDED so always go 1 higher hence why passing 100 and not 99
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    return (
        <View style={styles.container}>
            <Title>Opponent's Guess</Title>
            <View style={styles.guessWrapper}>
                <Text style={styles.guess}>{currentGuess}</Text>
            </View>
            <View>
                <Text>Higher or Lower?</Text>
            </View>
            <View>
                <Text># of Rounds</Text>
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    guessWrapper: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        borderRadius: 8,
    },
});
