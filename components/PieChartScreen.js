import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const PieChartScreen = ({ route }) => {
  const { expenses } = route.params;

  const groupExpensesByCategory = (expenses) => {
    const groupedExpenses = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += expense.amount;
      return acc;
    }, {});

    return Object.keys(groupedExpenses).map((key) => ({
      name: key,
      amount: groupedExpenses[key],
    }));
  };

  const pieData = groupExpensesByCategory(expenses).map((item) => ({
    name: item.name,
    population: item.amount,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Distribution by Category</Text>
      <PieChart
        data={pieData}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PieChartScreen;
