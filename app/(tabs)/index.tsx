import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listings from "../../assets/data/air-bnb-listings.json";
import listingsGeo from "../../assets/data/air-bnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Explore = () => {
  const [category, setCategory] = useState("Tiny homes");

  const items = useMemo(() => listings as any, []);

  const itemsGeo = useMemo(() => listingsGeo as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listings={itemsGeo} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Explore;
