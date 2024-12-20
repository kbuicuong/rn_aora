import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {

  const [form, setForm] = React.useState({
    email: '',
    password: ''
  })

  const {setUser, setIsLoggedIn} = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert('Success', 'Logged in successfully');
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image source={images.logo} className='w-[115px] h-[35px] ' resizeMode='contain' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder='Enter your email'
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title='Password'
            value={form.password}
            placeholder='Enter your password'
            handleChangeText={(e:string) => setForm({...form, password: e})}
            otherStyles='mt-7'
            keyboardType='password'
          />

          <CustomButton 
            title='Sign in'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center p-5 flex-row gap-2'>
            <Text className='text-gray-100 text-lg font-pregular'>Don't have an account?</Text>
            <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn