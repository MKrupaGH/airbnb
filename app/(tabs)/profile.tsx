import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Profile = () => {
  const { isSignedIn, signOut } = useAuth();
  return (
    <SafeAreaView>
      <Button title="Log out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )}
    </SafeAreaView>
  );
};

export default Profile;
