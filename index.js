/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Main() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </SafeAreaProvider>

    );
};

AppRegistry.registerComponent(appName, () => Main);
