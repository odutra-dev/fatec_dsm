import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout(){
    return(
    <Tabs
    screenOptions={{
        tabBarActiveBackgroundColor: "yellow",
        tabBarActiveTintColor: "red"
    }}>
        <Tabs.Screen name="index"
          options={{title: "Home",
            tabBarIcon: ({color, size,focused}) =>
                focused? <MaterialCommunityIcons name="home" size={size} color={color} />: <MaterialCommunityIcons name="home-outline" size={size} color={color} />
          }}/>
        <Tabs.Screen name="calculadora"
          options={{title: "Calculadora",
            tabBarIcon: ({color, size, focused}) => focused? <MaterialCommunityIcons name="calculator-variant" size={size} color={color} /> : <MaterialCommunityIcons name="calculator-variant-outline" size={size} color={color} />,
            
          }}/>
    </Tabs>
    )
}