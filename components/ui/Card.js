import { StyleSheet, View } from "react-native";

import Colors from "../../utils/colors";

function Card({ children }) {
    return <View style={styles.card}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: Colors.primary800,
        elevation: 4, // Box shadow - Android ONLY -

        // Box shadow for iOS
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});
