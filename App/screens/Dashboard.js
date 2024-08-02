import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../hooks/useNotes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-web';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { notes, loadNotes } = useNotes();
  const [timer, setTimer] = useState(0)
  const handleNotes = useCallback(() => {
    loadNotes();
    setTimer(prevTimer => prevTimer + 1);
  }, [loadNotes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNotes();
    }, 10000); // 10000 ms = 10s

    return () => clearInterval(intervalId);
  }, [timer, handleNotes]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Notes</Text>

      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <Icon name="search" size={24} color="#292D32" style={styles.searchIcon} />
      </View>

      <View>
        <Text style={styles.pinnedLabel}>Pinned</Text>
      </View>

      <ScrollView style={[styles.notesContainer, {height: '65vh'}]}>
        <View style={styles.notesWrapper}>
          {notes?.length > 0 && notes?.map((note, index) => (
            <TouchableOpacity key={index} style={[styles.noteCard, { backgroundColor: note?.color }]} onPress={() => navigation.navigate('Note', { note })} >
              <Text style={styles.noteTitle}>{note?.title}</Text>
              <Text style={styles.noteDate}>{note?.date}</Text>
              <Text style={styles?.noteContent} numberOfLines={3} ellipsizeMode='tail' >{note?.content}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Pressable 
        onPress={() => navigation.navigate('Form')}
        style={styles.addButton}>
        <Icon name="add" size={32} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 33,
    color: '#3D3B3B',
  },
  searchContainer: {
    width: '100%',
    height: 48,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
      // borderColor: 'rgba(112, 121, 139, 0.12)',
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#868484',
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  pinnedLabel: {
    marginTop: 19,
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19,
    color: '#868484',
  },
   notesContainer: {
    flexGrow: 1,
    paddingBottom: 32, 
  },
  notesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    width: '100%',
    gap: 10,
  },
  noteCard: {
    width: '48%',
    height: 157,
    borderRadius: 16,
    padding: 16,
  },
  noteTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    // paddingVertical: 5,
    lineHeight: 22,
    color: '#3D3B3B',
  },
  noteDate: {
    fontFamily: 'Manrope',
    fontSize: 12,
    lineHeight: 16,
    color: 'white',
  },
  noteContent: {
    fontFamily: 'Manrope',
    fontSize: 16,
    lineHeight: 22,
    color: '#3D3D3D',
  },
  addButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    right: 16,
    bottom: 16,
    backgroundColor: '#3354FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 34,
    zIndex: 100
  },
});
