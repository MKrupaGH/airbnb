import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link, router } from "expo-router";

const Trips = () => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <FontAwesome name="suitcase" size={36} color={Colors.primary} />
        <Text style={{ fontFamily: "mon-sb" }}>There is no pending trips</Text>
        <Text style={{ fontFamily: "mon", textAlign: "center" }}>
          Let's pack the luggage and explore the world with us!
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate("(modals)/booking")}
          style={[defaultStyles.btn, { marginTop: 10, paddingHorizontal: 20 }]}
        >
          <Text style={defaultStyles.btnText}>Explore the world</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    padding: 20,
    alignItems: "center",
  },
  message: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 10,
    padding: 20,
    gap: 10,
  },
});

export default Trips;
