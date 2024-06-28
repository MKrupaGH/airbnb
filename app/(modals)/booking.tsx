import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";

//@ts-ignore
import DatePicker from "react-native-modern-datepicker";

const guestsGropus = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 1,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 2,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Booking = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(2);
  const [selectedPlace, setSelectedPlace] = useState(2);
  const [guests, setGuests] = useState(guestsGropus);
  const today = new Date().toISOString().substring(0, 10);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
    setGuests(guestsGropus);
  };

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={100}
      blurReductionFactor={5}
      tint="prominent"
      style={styles.container}
    >
      {/* where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 0 && (
          <>
            <Text style={styles.cardHeader}>Where to?</Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons
                  style={styles.searchIcon}
                  name="search-outline"
                  size={20}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destination"
                  placeholderTextColor={Colors.grey}
                />
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}
              >
                {places.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedPlace(index)}
                  >
                    <Image
                      source={item.img}
                      style={
                        selectedPlace === index
                          ? styles.placeSelected
                          : styles.place
                      }
                    />
                    <Text
                      style={[
                        styles.whereToText,
                        selectedPlace === index
                          ? { fontFamily: "mon-sb" }
                          : { fontFamily: "mon" },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </>
        )}
      </View>

      {/* when */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Text style={styles.cardHeader}>When?</Text>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                options={{
                  defaultFont: "mon",
                  headerFont: "mon-sb",
                  borderColor: "transparent",
                  mainColor: Colors.primary,
                }}
                current={today}
                selected={today}
                mode={"Calendar"}
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* who */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 2 && (
          <>
            <Text style={styles.cardHeader}>With how?</Text>
            <Animated.View style={styles.cardBody}>
              {guestsGropus.map((group, index) => (
                <View
                  style={[
                    styles.groupContainer,
                    index + 1 < guests.length ? styles.border : {},
                  ]}
                  key={index}
                >
                  <View>
                    <Text style={{ fontFamily: "mon-sb", color: Colors.dark }}>
                      {group.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "mon",
                        color: Colors.grey,
                        fontSize: 12,
                      }}
                    >
                      {group.text}
                    </Text>
                  </View>
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...guests];
                        newGroups[index].count--;
                        setGuests(newGroups);
                      }}
                      disabled={guests[index].count > 0 ? false : true}
                      style={guests[index].count === 0 ? { opacity: 0.1 } : {}}
                    >
                      <Ionicons name="remove-circle-outline" size={26} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 16,
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {guests[index].count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...guests];
                        newGroups[index].count++;
                        setGuests(newGroups);
                      }}
                    >
                      <Ionicons name="add-circle-outline" size={26} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* Footer */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(100)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onClearAll}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={"#fff"}
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: { fontFamily: "mon-sb", fontSize: 14, color: Colors.dark },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-sb",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingBottom: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  searchIcon: {
    padding: 10,
    fontSize: 22,
  },
  inputField: {
    flex: 1,
  },
  place: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  placeSelected: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  whereToText: {
    fontSize: 14,
    marginTop: 5,
  },
  groupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 20,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    backgroundColor: "#fff",
    borderColor: Colors.grey,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 4,
  },
});

export default Booking;
