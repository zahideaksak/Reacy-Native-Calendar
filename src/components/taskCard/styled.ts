import {StyleSheet} from 'react-native';
const baseStyle = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 17,
  },
});

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    ...baseStyle.container,
  },
  taskText: {
    ...baseStyle.taskText,
    color: 'black',
  },
  completedContainer: {
    ...baseStyle.container,
    backgroundColor: 'grey',
  },
  completedTaskText: {
    ...baseStyle.taskText,
    color: 'white',
    textDecorationLine: 'line-through',
  },
});
