import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../hooks/useNotes'; 

export default function FormScreen({ route }) {
  const navigation = useNavigation();
  const { saveNote } = useNotes();
  const { note } = route.params || {};
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [color, setColor] = useState(null);
  const newDate = new Date()

    useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    if(!color) return console.log(false);;
    const newNote = {
      // Generate a new ID if no note exists
      id: note ? note.id : Date.now().toString(),  
      title,
      content,
      date: newDate.getDate() + ' / '+ newDate.getMonth() + ' / ' + newDate.getFullYear() , 
      color
    };

    await saveNote(newNote);
    navigation.navigate('Dashboard');  
  };
    
  return (
    <View style={styles.container}>

      {/* Title Input */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.titleInput}
      />

      {/* Date Text */}
      <Text style={styles.dateText}>
        {newDate.getDate() + ' / '+ newDate.getMonth() + ' / ' + newDate.getFullYear()}
      </Text>


      {/* Circle Icons */}
      <View style={styles.circleIconsContainer}>
        <TouchableOpacity style={[styles.circleIcon, styles.blueCircle]} onPress={()=>setColor('#249DFF')} />
        <TouchableOpacity style={[styles.circleIcon, styles.orangeCircle]} onPress={()=>setColor('#FF8D24')} />
        <TouchableOpacity style={[styles.circleIcon, styles.redCircle]} onPress={()=>setColor('#FF7171')} />
      </View>
          
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Note something down or click on image to upload image"
        multiline
        style={styles.contentInput}
      />

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>
          Save Note
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  titleInput: {
    width: 308,
    height: 50,
    fontSize: 24,
    fontWeight: '700',
    color: '#999',
    // opacity: 0.2,
    borderBottomWidth: 1,
    borderBottomColor: '#868484',
    paddingHorizontal: 10,
    marginBottom10: 10,
    outline: 'none',
  },
  dateText: {
    paddingVertical: 10,
    fontSize: 12,
    color: '#868484',
  },
  contentInput: {
    width: 308,
    height: 60,
    fontSize: 16,
    color: '#3D3B3B',
    opacity: 0.8,
    paddingHorizontal: 10,
    outline: 'none',
  },
  
  saveButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%' ,
    height: 48,
    backgroundColor: '#3354FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  circleIconsContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  circleIcon: {
    width: 24.96,
    height: 24.96,
    borderRadius: 12.48,
    marginRight: 4,
  },
  blueCircle: {
    backgroundColor: '#249DFF',
    cursor: 'pointer',
  },
  orangeCircle: {
    backgroundColor: '#FF8D24',
    cursor: 'pointer',
  },
  redCircle: {
    backgroundColor: '#FF7171',
    cursor: 'pointer',
  },
});
