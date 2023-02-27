// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { Dimensions, LogBox, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { pushNotifications } from './src/services';
import { ConfigureNotification, backgroundNotififications, createChannels, notificationListener, requestUserPermission } from './src/config/NotificationsServices';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Purchases from 'react-native-purchases';
LogBox.ignoreLogs(['EventEmitter.removeListener']);



if (Platform.OS === 'ios') {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      const { foreground, userInteraction, title, message } = notification;
      if (foreground && (title || message) && !userInteraction) PushNotification.localNotification(notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  });
}
// pushNotifications.configure();
createChannels();

backgroundNotififications();
ConfigureNotification();

const toastConfig = {
  tomatoToast: ({ text1, text2, props }) => (
    <LinearGradient
      colors={['#9400D3', '#4B0082']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.infoBox}>
      <View>
        <Text style={styles.gradientText}>{text1}</Text>
        <Text style={styles.gradientText}>{text2}</Text>
      </View>
    </LinearGradient>
  )
};

const App = () => {
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
      console.log('Calling public key for ios')
      Purchases.configure({ apiKey: "appl_JYKohbActUVXLGWCukVEjWSiOQP" });
    }
    if (Platform.OS === 'android') {
      console.log('Calling public key for android')
      Purchases.configure({ apiKey: "goog_GZrzjuRsqwzTynOFOuBFufeWGRm" });
    }

    requestUserPermission();
    notificationListener();
  }, [])
  return (
    <>
      {/* <GestureHandlerRootView> */}
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />
      <RootNavigator />
      <Toast config={toastConfig} />
      {/* </GestureHandlerRootView> */}
    </>
  )
};
export default App;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  gradientText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: windowWidth * 0.04,
  },
  infoBox: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 40,
  },
})