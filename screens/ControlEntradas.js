import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de importar Firestore correctamente

const ControlEntradas = () => {
  const [records, setRecords] = useState([]);

  // Función para obtener los registros de la base de datos
  const fetchRecords = () => {
    const q = query(collection(db, 'controlDeEntradas'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recordsArray = [];
      querySnapshot.forEach((doc) => {
        recordsArray.push(doc.data());
      });
      setRecords(recordsArray);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchRecords();
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>{`Hora: ${new Date(item.timestamp).toLocaleString()}`}</Text>
            <Text>{`Estado: ${item.status}`}</Text>
            <Text>{`Usuario: ${item.user}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Fondo gris claro
  },
  record: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ControlEntradas;






