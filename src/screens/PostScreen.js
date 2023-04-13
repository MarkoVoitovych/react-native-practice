import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { THEME } from '../assets/colors/theme';
import { DATA } from '../data';

export const PostScreen = ({ navigation, route }) => {
  const { postId } = route.params;

  const post = DATA.find((post) => post.id === postId);

  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => {}, style: 'destructive' },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: post.img }} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title="Delete"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'openSans-regular',
  },
});
