import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const initialExpenses = [
      { id: 1, description: 'Groceries', category: 'Groceries', amount: 50.23, date: new Date(2022, 3, 25) },
      { id: 2, description: 'Gas', category: 'Transport', amount: 30.12, date: new Date(2022, 3, 24) },
      { id: 3, description: 'Dinner', category: 'Entertainment', amount: 80.45, date: new Date(2022, 3, 23) },
    ];
    setExpenses(initialExpenses);
  }, []);

  const handleAddExpense = (newExpense) => {
    newExpense.id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== expenseId));
  };

  const handleEditExpense = (expense) => {
    navigation.navigate('AddExpense', { expense, updateExpense });
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prevExpenses) => {
      const index = prevExpenses.findIndex((exp) => exp.id === updatedExpense.id);
      if (index > -1) {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[index] = updatedExpense;
        return updatedExpenses;
      }
      return prevExpenses;
    });
  };

  const confirmDelete = (expense) => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete ${expense.description}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteExpense(expense.id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddExpense', { addExpense: handleAddExpense })}
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.description}>{item.description} - {item.category}</Text>
            <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{item.date.toLocaleDateString()}</Text>

            <TouchableOpacity onPress={() => handleEditExpense(item)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmDelete(item)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <TouchableOpacity
        style={styles.pieChartButton}
        onPress={() => navigation.navigate('PieChart', { expenses })}
      >
        <Text style={styles.pieChartButtonText}>View Expense Distribution</Text>
      </TouchableOpacity>
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
  pieChartButton: {
    backgroundColor: '#32a852',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  pieChartButtonText: {
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
  editText: {
    color: '#2196F3',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  deleteText: {
    color: '#ff0000',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default HomeScreen;
