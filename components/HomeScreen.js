import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const initialExpenses = [
      { description: 'Groceries', amount: 50.23, date: new Date(2022, 3, 25) },
      { description: 'Gas', amount: 30.12, date: new Date(2022, 3, 24) },
      { description: 'Dinner', amount: 80.45, date: new Date(2022, 3, 23) },
    ];
    setExpenses(initialExpenses);
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('AddExpense', { addExpense: handleAddExpense })
        }
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{item.date.toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default HomeScreen;
