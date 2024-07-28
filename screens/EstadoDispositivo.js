import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de importar Firestore correctamente
import { getAuth } from 'firebase/auth'; // Importar autenticación de Firebase

const EstadoDispositivo = ({ onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const toggleDeviceState = async () => {
    // Cambia el estado del dispositivo y actualiza la base de datos
    const nuevoEstado = !isOpen;
    setIsOpen(nuevoEstado);

    // Referencia a la colección específica en tu base de datos
    const deviceRef = collection(db, 'controlDeEntradas'); // Usa la colección adecuada

    // Actualiza el estado en la base de datos
    try {
      await addDoc(deviceRef, {
        timestamp: new Date().toISOString(),
        status: nuevoEstado ? 'Abierto' : 'Cerrado',
        user: user ? user.email : 'Desconocido' // Guardar el usuario que hizo el cambio
      });
      Alert.alert(
        'Éxito',
        `El estado del dispositivo se actualizó a ${nuevoEstado ? 'Abierto' : 'Cerrado'}`
      );
      // Llama a la función de callback para notificar el cambio
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {`El dispositivo está ${isOpen ? 'Abierto' : 'Cerrado'}`}
      </Text>
      <Button
        title={isOpen ? 'Cerrar Dispositivo' : 'Abrir Dispositivo'}
        onPress={toggleDeviceState}
        color="#6200ee" // Color morado para el botón
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5', // Fondo gris claro
  },
  statusText: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default EstadoDispositivo;




