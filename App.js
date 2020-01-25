import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component{
  state = {
    count: 0
  }

  numberUp = () => {
    for(let i=0; i<100; i++){
      this.setState((prevState) => ({ count: prevState.count + 1}));
    }
  }


  componentDidMount() {
      this.numberUp();    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});