import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const lottoCount = 6; //로또 한번에 선택할수 있는 개수
const lottoMaxnumber = 45; //로또 번호 선택할수 있는 최댓값

const winningNumbers = [38, 39, 31, 16, 41, 26]; //당첨번호
const winningBonusNumber = 23; //당첨 보너스번호

let winningCount = [0,0,0,0,0,0]; //당첨자 1~5등, 꽝, 횟수 카운트

export default class App extends React.Component{
  state = {
    count: 0
  }

  generateAutoLotto = () => {
    //자동 로또번호 생성기
    let autoLottoNumbers = [];
    
    while (autoLottoNumbers.length < lottoCount) {
      let randomNumber = Math.floor(Math.random() * lottoMaxnumber + 1);
      if ( autoLottoNumbers.indexOf(randomNumber) === -1 ){
        autoLottoNumbers.push(randomNumber);
      }
    }
    return autoLottoNumbers;
  }

  checkLottoHitCount = (autoLottoNumbers) => {
    // 로또 맞은 개수 확인
    let hitCount = 0;
    
    autoLottoNumbers.map((eachNumber) => {
      if (winningNumbers.indexOf(eachNumber) !== -1) {
        hitCount++;
      }
    })
    return hitCount;
  }

  givePrize = (hitCount, autoLottoNumbers) => {
    // 로또 등수 판별 후 카운팅
    if (hitCount === 6) {
      winningCount[0]++;
    } else if (hitCount === 5) {
      if (autoLottoNumbers.indexOf(winningBonusNumber) !== -1) {
        winningCount[1]++;
      } else {
        winningCount[2]++;
      }
    } else if (hitCount === 4) {
      winningCount[3]++;
    } else if (hitCount === 3) {
      winningCount[4]++;
    } else {
      winningCount[5]++;
    }
  }

  lotterySimulator = () => {
    const autoLottoArray = this.generateAutoLotto();
    const hitCount = this.checkLottoHitCount(autoLottoArray);
    this.givePrize(hitCount, autoLottoArray);

    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  componentDidMount() {
    setInterval(this.lotterySimulator, 0); // 0으로 설정하면 가장 빠르게해줌^^
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>시도 : {this.state.count} 금액: {this.state.count * 1000} 원</Text>
        <Text style={styles.text}>1등 : {winningCount[0]} 번, 확률 : {(winningCount[0] / this.state.count).toFixed(3)} %</Text>
        <Text style={styles.text}>2등 : {winningCount[1]} 번, 확률 : {(winningCount[1] / this.state.count).toFixed(3)} %</Text>
        <Text style={styles.text}>3등 : {winningCount[2]} 번, 확률 : {(winningCount[2] / this.state.count).toFixed(3)} %</Text>
        <Text style={styles.text}>4등 : {winningCount[3]} 번, 확률 : {(winningCount[3] / this.state.count).toFixed(3)} %</Text>
        <Text style={styles.text}>5등 : {winningCount[4]} 번, 확률 : {(winningCount[4] / this.state.count).toFixed(3)} %</Text>
        <Text style={styles.text}>꽝  : {winningCount[5]} 번, 확률 : {(winningCount[5] / this.state.count).toFixed(3)} %</Text>

        <Text style={styles.text}>수익 : {(1928079219 * winningCount[0])+(66485491 * winningCount[1])+(1402240 * winningCount[2])+(50000 * winningCount[3])+(5000 * winningCount[4]) - (this.state.count * 1000)} 원</Text>

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
    fontSize: 20
  }
});