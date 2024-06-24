import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"

const Explore = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
      <Link href={"/listing/1337"}>Listing</Link>
    </View>
  )
}

export default Explore
