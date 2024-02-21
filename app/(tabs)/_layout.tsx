import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import {LoadUserAction} from "../store/actions/userAction"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const funcIconList: any[]  = 
  [
    {funcName: "index", iconName: "home", href: null},
    {funcName: "Wechat", iconName: "wechat", href: "Wechat"},
    {funcName: "Ranking", iconName: "line-chart", href: "Ranking"},
    {funcName: "Artist", iconName: "microphone", href: "Artist"},
    {funcName: "Search", iconName: "search-plus", href: "Search"},
    {funcName: "VideoList", iconName: "search-minus", href: "VideoList"},
    {funcName: "Playlist", iconName: "music", href: "Playlist"},
    {funcName: "Setting", iconName: "gear", href: "Setting"},
  ];

  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  console.log("-------------------TabLayout(Before LoadUserAction)-------------");
  console.log(user);

  //dispatch({ type: 'user/LOAD' });
  if (user == undefined || user == null) { 
    LoadUserAction(dispatch);
  }
  console.log("-------------------TabLayout(After LoadUserAction)-------------");
  console.log(user);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/*
      <Tabs.Screen
        // Name of the route to hide.
        name="index"
        options={{
          // This tab will no longer show up in the tab bar.
          href: "",
        }}
      />
      */}
      {funcIconList.map((funcIcon: any) => 
        <Tabs.Screen key={funcIcon.funcName} name={funcIcon.funcName} 
          options={{
            href: funcIcon.href,
            headerShown: false,
            tabBarIcon: ({ focused }) => <Icon name={funcIcon.iconName} color="purple" size={25}/>,
          }}
        />
      )}
    </Tabs>
  );
}

/*
<Tabs.Screen
  name="index"
  options={{
    title: 'Tab One',
    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    headerRight: () => (
      <Link href="/modal" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="info-circle"
              size={25}
              color={Colors[colorScheme ?? 'light'].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    ),
  }}
/>
<Tabs.Screen
name="two"
options={{
  title: 'Tab TwoY',
  tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
}}
/>
<Tabs.Screen
name="three"
options={{
  title: 'Tab Three',
  tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
}}
/>
*/
