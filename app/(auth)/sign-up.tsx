import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {

  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const submit = () => {
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image source={images.logo} className='w-[115px] h-[35px] ' resizeMode='contain' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up for Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder='Enter your username'
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
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
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center p-5 flex-row gap-2'>
            <Text className='text-gray-100 text-lg font-pregular'>Have an account already?</Text>
            <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp