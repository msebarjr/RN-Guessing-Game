import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";

import Colors from "../utils/colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionalText from "../components/ui/InstructionalText";
import Card from "../components/ui/Card";

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

let min = 1;
let max = 100;

function GameScreen({ chosenNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, chosenNumber); // With Math.random the upper boundary is EXCLUDED so always go 1 higher hence why passing 100 and not 99
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === chosenNumber) {
            onGameOver();
        }
    }, [currentGuess]);

    const nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < chosenNumber) ||
            (direction === "higher" && currentGuess > chosenNumber)
        ) {
            Alert.alert("Do Not Lie!", "Cheating is bad...", [
                { text: "Sorry", style: "default" },
            ]);
            return;
        }

        if (direction === "lower") {
            max = currentGuess;
        } else {
            min = currentGuess + 1;
        }

        setCurrentGuess(generateRandomBetween(min, max, currentGuess));
    };

    return (
        <View style={styles.container}>
            <Title>Opponent's Guess</Title>
            <View style={styles.guessWrapper}>
                <Text style={styles.guess}>{currentGuess}</Text>
            </View>
            <Card>
                <InstructionalText>Higher or Lower?</InstructionalText>
                <View>
                    <PrimaryButton
                        onPress={nextGuessHandler.bind(this, "lower")}
                    >
                        -
                    </PrimaryButton>
                    <PrimaryButton
                        onPress={nextGuessHandler.bind(this, "higher")}
                    >
                        +
                    </PrimaryButton>
                </View>
            </Card>
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
        margin: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    guess: {
        color: Colors.accent500,
        fontSize: 36,
        fontWeight: "bold",
    },
});
