import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useNotes() {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
     try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
        console.log('Notes chargées :', parsedNotes);  // Ajoutez ceci pour vérifier
        }
    } catch (error) {
        console.error('Erreur lors du chargement des notes:', error);
    }
  };

    const saveNotes = async (note) => {
      const notes = await AsyncStorage.getItem('notes') || [];
      if(notes.length > 0) {
        const json = JSON.parse(notes)
        await AsyncStorage.setItem('notes', JSON.stringify([...json, note[0]]));
        setNotes([...json, note[0]]);
      } else {
        await AsyncStorage.setItem('notes', JSON.stringify(note));
        setNotes(note);
      }
  };

  const saveNote = async (note) => {
    const updatedNotes = [...notes];
    const index = updatedNotes.findIndex((n) => n.id === note.id);
    if (index > -1) {
      updatedNotes[index] = note;
    } else {
      updatedNotes.push(note);
    }
    await saveNotes(updatedNotes);
  };

  const deleteNote = async (id) => {
    const storedNotes = await AsyncStorage.getItem('notes');
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      const updatedNotes = parsedNotes.filter((note) => note.id !== id);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    }
  };

  return {
    notes,
    saveNote,
    deleteNote,
    loadNotes,
  };
}