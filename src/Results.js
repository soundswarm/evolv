import React, { Component } from 'react';
import firebase from 'firebase'
import * as Stats from 'simple-statistics'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playbackRateCorr: 0,
      pauseCorr: 0,
    }

  }

  componentWillMount() {


  
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC565uXrdRp_sJqAxyAtkgg_MIX6Ve8PS8",
      authDomain: "evolve-40e84.firebaseapp.com",
      databaseURL: "https://evolve-40e84.firebaseio.com",
      storageBucket: "evolve-40e84.appspot.com",
      messagingSenderId: "210850034270"
    };
    firebase.initializeApp(config);
 
  }

  componentDidMount() {
    const that = this
    // console.log(firebase)
    firebase.database().ref('data/').push().set({
      percentCorrect: this.percentCorrect(this.props.stats),
      videoStats: this.props.videoStats,
      date: new Date().toString()
    })
    .then(()=>{
      firebase.database().ref('data/').once('value').then(function(snapshot) {
        const data = snapshot.val()
        console.log(data)
        const playbackRates = Object.keys(data).map((key)=>{ 
          return parseFloat(data[key].videoStats.playbackRate)
        })
        const pauseCounts = Object.keys(data).map((key)=>{ 
          return parseFloat(data[key].videoStats.pauseCount)
        })

        const scores = Object.keys(data).map((key)=>{ 
          return parseFloat(data[key].percentCorrect)
        })

        that.setState({playbackRateCorr: Stats.sampleCorrelation(scores, playbackRates)})
        that.setState({pauseCorr: Stats.sampleCorrelation(scores, pauseCounts)})
      });
    })         
  }

  percentCorrect(stats) { 
    let totalCorrect = 0
    for(let key in stats){
      if(stats[key].correct) {
        totalCorrect +=1
      }
    }
    return totalCorrect / Object.keys(stats).length
  }

  table(stats) {
    return <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th>question</th>
            <th>status</th>
            <th>time spent on question (sec)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stats).map((key, i)=>{
            return (
              <tr>
                <td>{key}</td>
                <td>{stats[key].correct? 'correct': 'incorrect'}</td>
                <td>{stats[key].timeElapsed}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  }
  videoStats(stats) {
    console.log('vstats', stats)
    return <div className='row'>
      <h4>Video stats</h4>
      <p>playback rate: {stats.playbackRate}X</p>
      <p>number of pauses: {stats.pauseCount}</p>
      <p>watched the end of video: {stats.finishedVideo? 'true' : 'false'}</p>
    </div>
  }
  multiUserStats() {
    return <div className='row'>
      <h2>Stats accross all quiz takers</h2>
      <p>Correlation between video playback rate and quiz score: {this.state.playbackRateCorr.toFixed(2)}</p>
      <p>Correlation between number of pauses and quiz score: {this.state.pauseCorr.toFixed(2)}</p>
    </div>
  }
  render() {
    console.log(this.props.videoStats)
    const {key, answerKey, stats, videoStats} = this.props
    return <div className='row'>
      <h2> Quiz stats</h2>
      <h4>{this.percentCorrect(stats)*100}% of the questions were answered correctly</h4>
      {this.table(stats)}
      {this.videoStats(videoStats)}
      
      
      {this.multiUserStats()}

      
    </div>
  }
}


export default Results;
