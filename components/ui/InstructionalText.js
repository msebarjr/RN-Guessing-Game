import { StyleSheet, Text, View } from "react-native";

import Colors from "../../utils/colors";

function InstructionalText({ children, style }) {
    return <Text style={[styles.instructions, style]}>{children}</Text>;
}

export default InstructionalText;

const styles = StyleSheet.create({
    instructions: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily: "open-sans",
    },
});
