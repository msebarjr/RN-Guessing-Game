import { useState } from "react";
import { StyleSheet, View, TextInput, Text, Alert } from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionalText from "../components/ui/InstructionalText";
import Colors from "../utils/colors";

function StartGameScreen({ startGame }) {
    const [enteredNumber, setEnteredNumber] = useState("");

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText);
    };

    const resetInputHandler = () => {
        setEnteredNumber("");
        return;
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Input",
                "Please enter a number between 1 and 99",
                [
                    {
                        text: "Ok",
                        onPress: resetInputHandler,
                        style: "destructive", // on iOS this turns the color to red. Android remains blue
                    },
                ]
            );
        }

        startGame(chosenNumber);
    };

    return (
        <View style={styles.root}>
            <Title>Guess My Number</Title>
            <Card>
                <InstructionalText>Enter A Number</InstructionalText>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType="numeric" // ALWAYS check docs to ensure property works for both platforms
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={enteredNumber}
                    onChangeText={numberInputHandler} // Difference between onChangeText and onChange is that onChangeText sends just the input value to called function whereas onChange sends an event as a prop where you then have to access with event.target.value like in React
                />
                <View style={styles.buttonsContainer}>
                    <View style={{ flex: 1 }}>
                        <PrimaryButton onPress={resetInputHandler}>
                            Reset
                        </PrimaryButton>
                    </View>
                    <View style={{ flex: 1 }}>
                        <PrimaryButton onPress={confirmInputHandler}>
                            Confirm
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 60,
        alignItems: "center",
    },
    numberInput: {
        height: 50,
        width: 50,
        textAlign: "center",
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
    },
    buttonsContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
});
