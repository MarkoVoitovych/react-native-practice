import { StyleSheet, Text, View, FlatList } from 'react-native';
import { DATA } from '../data';
import { Post } from '../components/Post';

export const BookedScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('PostBooked', {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  return (
    <View>
      <FlatList
        data={DATA.filter((post) => post.booked)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
