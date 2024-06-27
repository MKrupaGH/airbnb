import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";
import { ListingGeo } from "@/interfaces/listingGeo";
import MapView from "react-native-map-clustering";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 52.52,
  longitude: 13.4,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter();
  const onMarkeSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    console.log("Cluster render");

    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        tracksViewChanges={false}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>+{points}</Text>
        </View>
      </Marker>
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        animationEnabled={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo, index: number) => (
          <Marker
            onPress={() => onMarkeSelected(item)}
            key={item.properties.id}
            coordinate={{
              latitude: +item.geometry.coordinates[1],
              longitude: +item.geometry.coordinates[0],
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  marker: {
    backgroundColor: "#fff",
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  markerText: {
    fontFamily: "mon-sb",
  },
});
