import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import Store from './Store';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <>
      <Provider store={Store}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

