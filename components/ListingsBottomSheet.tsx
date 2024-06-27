import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { Listing } from "@/interfaces/listing";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Listings from "./Listings";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  listings: Listing[];
  category: string;
}

const ListingsBottomSheet = ({ listings: items, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["10%", "100%"], []);

  const [refresh, setRefresh] = useState(0);
  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      ></View>
      <View style={{ flex: 1 }}>
        <Listings listings={items} category={category} refresh={refresh} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity style={styles.btn} onPress={showMap}>
            <Text style={styles.btnText}>Map</Text>
            <Ionicons name="map" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    borderRadius: 24,
    gap: 6,
  },
  btnText: {
    fontFamily: "mon-sb",
    color: "#fff",
  },
});
