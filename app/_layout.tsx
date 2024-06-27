import { useFonts } from "expo-font";
import { Stack, router, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, TouchableOpacity } from "react-native";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ModalHeaderText from "@/components/ModalHeaderText";
import Colors from "@/constants/Colors";

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
    <GestureHandlerRootView>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <RootLayoutNav />
      </ClerkProvider>
    </GestureHandlerRootView>
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
      <Stack.Screen
        name="listing/[id]"
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          headerBackVisible: false,
          headerTransparent: true,
          presentation: Platform.select({
            ios: "transparentModal",
            android: "transparentModal",
          }),
          animation: "fade",
          headerTitle: () => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
