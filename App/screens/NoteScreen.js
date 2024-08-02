import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../hooks/useNotes';

export default function NoteScreen({ route }) {
  const { note } = route.params;
  const navigation = useNavigation();
  const { deleteNote } = useNotes();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tour Planning</Text>
      <Text style={styles.date}>{note.date}</Text>
      <View style={styles.ellipses}>
        <View style={styles.ellipse1} />
        <View style={styles.ellipse2} />
        <View style={styles.ellipse3} />
      </View>
      <Text style={styles.content}>{note.content}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('Form', { note })}
      />
      <Button
        title="Delete"
        style={styles.btn}
        onPress={() => {
          deleteNote(note.id);
          navigation.navigate('Dashboard');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: 20,
    height: '100vh',
  },

  header: {
    width: 133,
    height: 27,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 27,
    color: '#3D3B3B',
  },
  
  date: {
    width: 64,
    height: 16,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#868484',
  },
  content: {
    width: 327,
    height: 92,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 23,
    color: '#3D3B3B',
  },
  ellipses: {
    flexDirection: 'row',
    
  },
  ellipse1: {
    width: 24.96,
    height: 24.96,
    backgroundColor: '#249DFF',
    borderRadius: 12.48,
  },
  ellipse2: {
    width: 24.96,
    height: 24.96,
    backgroundColor: '#FF8D24',
    borderRadius: 12.48,
    marginLeft: 10,
  },
  ellipse3: {
    width: 24.96,
    height: 24.96,
    backgroundColor: '#FF7171',
    borderRadius: 12.48,
    marginLeft: 10,
  },
  vector2: {    
    backgroundColor: '#000000',
  },
  deleteIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#292D32',
  },

  btn: {
    position: 'absolute',
    bottom: 0
  }
});
