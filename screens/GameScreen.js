import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../utils/colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionalText from "../components/ui/InstructionalText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

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
    const [rounds, setRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === chosenNumber) {
            min = 1;
            max = 100;
            onGameOver(rounds.length);
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

        const newRandomGuess = generateRandomBetween(min, max, currentGuess);

        setCurrentGuess(newRandomGuess);
        setRounds((prevState) => [newRandomGuess, ...prevState]); // Using the spread operator at the end puts the new guess at the front when displaying the array
    };

    const guessRoundsListLength = rounds.length;

    return (
        <View style={styles.container}>
            <Title>Opponent's Guess</Title>
            <View style={styles.guessWrapper}>
                <Text style={styles.guess}>{currentGuess}</Text>
            </View>
            <Card>
                <InstructionalText style={styles.instructionalText}>
                    Higher or Lower?
                </InstructionalText>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "lower")}
                        >
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color="white"
                            />
                        </PrimaryButton>
                    </View>
                    <View style={{ flex: 1 }}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "higher")}
                        >
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={rounds}
                    keyExtractor={(item) => item}
                    renderItem={(itemData) => (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index} // Since adding each guess to beginning of array the index will always be 0 of new item so take length of array and minus the current index and you get the index that the item was entered at
                            guess={itemData.item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        marginTop: 60,
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
        fontFamily: "open-sans-bold",
    },
    instructionalText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
});
