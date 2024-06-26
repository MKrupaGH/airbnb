import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 52.52,
  longitude: 13.4,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();
  const onMarkeSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            onPress={() => onMarkeSelected(item)}
            key={item.properties.id}
            coordinate={{
              latitude: +item.geometry.coordinates[1],
              longitude: +item.geometry.coordinates[0],
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
