import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return "";
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log in or Sign up",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          gestureEnabled: true,
          presentation: Platform.select({
            ios: "containedModal",
            android: "containedModal",
          }),
          animation: "slide_from_bottom",
          animationDuration: 100,
        }}
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          title: "Booking",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          gestureEnabled: true,
          presentation: Platform.select({
            ios: "containedModal",
            android: "containedModal",
          }),
          animation: "fade",
        }}
      />
    </Stack>
  );
}
