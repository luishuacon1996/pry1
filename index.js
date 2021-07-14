/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import React from 'react'

import { name as appName } from './app.json'
import Toast from 'react-native-toast-message'

import { MyProvider } from './src/context'

const provider = () => (
  <MyProvider>
    <App />
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </MyProvider>
)

AppRegistry.registerComponent(appName, () => provider)
