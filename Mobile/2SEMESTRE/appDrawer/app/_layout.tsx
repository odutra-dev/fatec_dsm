import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Drawer>
      <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({color, size,focused}) =>
                focused? <MaterialCommunityIcons name="home" size={size} color={color} />: <MaterialCommunityIcons name="home-outline" size={size} color={color} />
          }}
        />
      <Drawer.Screen
          name="buscaCep"
          options={{
            drawerLabel: 'Busca Cep',
            title: 'Busque o seu CEP',
            drawerIcon: ({color, size,focused}) =>
                focused? <MaterialCommunityIcons name="card-search" size={size} color={color} />: <MaterialCommunityIcons name="card-search-outline" size={size} color={color} />
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
