import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const AddExpenseScreen = ({ navigation, route }) => {
  const expenseToEdit = route.params?.expense || {};
  const [description, setDescription] = useState(expenseToEdit.description || '');
  const [amount, setAmount] = useState(expenseToEdit.amount ? expenseToEdit.amount.toString() : '');
  const [date, setDate] = useState(expenseToEdit.date || new Date());
  const [category, setCategory] = useState(expenseToEdit.category || 'Groceries');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const newExpense = {
      id: expenseToEdit.id,
      description,
      amount: parseFloat(amount),
      date,
      category,
    };

    if (route.params?.addExpense) {
      route.params.addExpense(newExpense);
    } else if (route.params?.updateExpense) {
      route.params.updateExpense(newExpense);
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
      
      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Groceries" value="Groceries" />
        <Picker.Item label="Transport" value="Transport" />
        <Picker.Item label="Utilities" value="Utilities" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

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
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
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
