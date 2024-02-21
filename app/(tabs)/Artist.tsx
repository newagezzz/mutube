import {Text, View} from 'react-native';
import TextTicker from 'react-native-text-ticker'

const Artist = () => {
  console.log("!!!!!!!!!!!!!!!!Artist!!!!!!!!!!!!!!!!");
  return (
    <View>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Artist...Artist...Artist...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Artist...Artist...Artist...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Artist...Artist...Artist...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Artist...Artist...Artist...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
    </View>
  );
};

export default Artist;

