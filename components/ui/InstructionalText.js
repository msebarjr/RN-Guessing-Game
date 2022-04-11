import { StyleSheet, Text, View } from "react-native";

import Colors from "../../utils/colors";

function InstructionalText({ children }) {
    return <Text style={styles.instructions}>{children}</Text>;
}

export default InstructionalText;

const styles = StyleSheet.create({
    instructions: {
        color: Colors.accent500,
        fontSize: 24,
    },
});
