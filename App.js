import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const lottoCount = 6; //로또 한번에 선택할수 있는 개수
const lottoMaxnumber = 45; //로또 번호 선택할수 있는 최댓값

//let bonusBall = 0;

const selectedNumber = [38, 39, 31, 16, 41, 26];
const selectedbonusBall = 23;
//const selectedNumber = [1, 2, 3, 4, 5, 6]  //로또번호 선택

let ratio = [0,0,0,0,0,0];


export default class App extends React.Component{
  state = {
    count: 0
  }


  generateAutoLotto = (count, maxNumber) => {
    //로또번호 생성기
    let randomBall = [];
    
    while (randomBall.length < count) {
      let randomNumber = Math.floor(Math.random() * maxNumber + 1)
      if ( randomBall.indexOf(randomNumber) === -1 ){
        randomBall.push(randomNumber);
      }
    }

    //console.log(randomBall);
    return randomBall;
  }


  checkLotto = (array, seletedArray) => {
    // 로또 추첨
    let hitCount = 0;
    //let isFinished = true;

    // while (isFinished) {
    //   bonusBall = Math.floor(Math.random() * lottoMaxnumber + 1);
    //   if ( selectedNumber.indexOf(bonusBall) === -1 ){
    //     isFinished = false;
    //   }
    // }
    
    array.map((each) => {
      if (seletedArray.indexOf(each) !== -1) {
        hitCount++;
      }
    })

    //console.log(hitCount);
    //console.log("보너스볼 : ", bonusBall);
    return hitCount;
  }


  givePrize = (hitCount, array) => {
    if (hitCount === 6) {
      //console.log("1등");
      ratio[0]++;
    } else if (hitCount === 5) {
        if (array.indexOf(selectedbonusBall) !== -1) {
          //console.log("2등");
          ratio[1]++;
        } else {
          //console.log("3등");
          ratio[2]++;
        }
      } else if (hitCount === 4) {
        //console.log("4등");
        ratio[3]++;
      } else if (hitCount === 3) {
        //console.log("5등");
        ratio[4]++;
      } else {
        //console.log("꽝");
        ratio[5]++;
      }
    }




  numberUp = () => {



    const lottoArray = this.generateAutoLotto(lottoCount, lottoMaxnumber);
    
    const hitCount = this.checkLotto(lottoArray,selectedNumber);
    
    this.givePrize(hitCount, lottoArray);



      this.setState((prevState) => ({
        count: prevState.count + 1
      }));

  }

  componentDidMount() {
    setInterval(this.numberUp, 0); // 0으로 설정하면 가장 빠르게해줌^^

    

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>시도 : {this.state.count} 금액: </Text>
        <Text style={styles.text}>1등 : {ratio[0]}</Text>
        <Text style={styles.text}>2등 : {ratio[1]}</Text>
        <Text style={styles.text}>3등 : {ratio[2]}</Text>
        <Text style={styles.text}>4등 : {ratio[3]}</Text>
        <Text style={styles.text}>5등 : {ratio[4]}</Text>
        <Text style={styles.text}>꽝  : {ratio[5]}</Text>

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
  text: {
    fontSize: 25
  }
});