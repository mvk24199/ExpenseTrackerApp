import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddExpenseScreen = ({ navigation, route }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const newExpense = {
      description,
      amount: parseFloat(amount),
      date,
    };

    if (route.params?.addExpense) {
      route.params.addExpense(newExpense);
    }

    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date:</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={styles.dateText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  dateText: {
    color: '#000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddExpenseScreen;
