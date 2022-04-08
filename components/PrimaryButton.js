import { StyleSheet, Text, View, Pressable } from "react-native";

function PrimaryButton({ children, onConfirm }) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer
                }
                onPress={onConfirm}
                android_ripple={{ color: "white" }} // Android ONLY
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        backgroundColor: "#72063c",
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },

    // Used to add visual feedback on Pressable component on iOS
    pressed: {
        opacity: 0.75,
    },
});
