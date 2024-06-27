import {
  View,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Listing } from "../interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings = ({ listings: items, category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
    console.log("Listings - refresh");
  }, [refresh]);

  useEffect(() => {
    setLoading(true);
    console.log("Listings - loading");
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const cardLayout: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeInLeft}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity style={styles.heart}>
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{ fontFamily: "mon-sb", fontSize: 16, flex: 4 }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={20} />
              <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
            <Text style={{ fontFamily: "mon" }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={cardLayout}
        ListHeaderComponent={
          <Text style={{ fontFamily: "mon-sb", textAlign: "center" }}>
            {items.length} homes
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  heart: {
    position: "absolute",
    right: 30,
    top: 30,
  },
});

export default Listings;
