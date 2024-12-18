import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const Index = () => {
  return (
   <View className='flex-1 items-center justify-center bg-white'>
   <Text className='text-3xl'>Aora</Text>
   <StatusBar style="auto" />
   </View>
  )
}

export default Index;
