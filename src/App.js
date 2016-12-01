// play video 

// record
  // # of pauses, fast forwards, rewinds, full watches

// write a couple sentences that use prefixes

// ask questions - test
  // button - play around with prefixes
  // questions: 
  // submit questions

// reporting:
  // # of pauses, fast forwards, rewinds, full watches - individual and (group)
  //



import React, { Component } from 'react';
import './App.css';
import YouTube from 'react-youtube'
import tracking from 'tracking'
import '../node_modules/tracking/build/data/eye.js'
import Quiz from './Quiz'
// import './webgazer'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startQuiz: false,
      videoStats: {
        playbackRate: 1,
        pauseCount: 0,
        finishedVideo: false

      }
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    // var objects = new tracking.ObjectTracker(['eye']);
    // objects.on('track', function(event) {
    //   if (event.data.length === 0) {
    //     // No objects were detected in this frame.
    //   } else {
    //     event.data.forEach(function(rect) {
    //       console.log(rect)
    //       // rect.x, rect.y, rect.height, rect.width
    //     });
    //   }
    // });

    // webgazer.begin()
    // webgazer.setGazeListener(function(data, elapsedTime) {
    //   if (data == null) {
    //       return;
    //   }
    //   var xprediction = data.x; //these x coordinates are relative to the viewport 
    //   var yprediction = data.y; //these y coordinates are relative to the viewport
    //   console.log(elapsedTime); //elapsed time is based on time since begin was called
    // })
                  
  }
  onReady(e) {
    const playbackRates = [.5, 1, 1.25]
    const randI = Math.floor(Math.random()*playbackRates.length)
    const playbackRate = playbackRates[randI] 
    console.log('ppbrate', playbackRate)
    let newState = {...this.state}
    newState.videoStats.playbackRate = playbackRate
    this.setState(newState)
    e.target.setPlaybackRate(playbackRate)
  }
  handlePlay(e) {
    console.log('play',e.target.getCurrentTime())
  }
  handlePause(e) {
    let newState = {...this.state}
    newState.videoStats.pauseCount++

    console.log('paused',e.target.getCurrentTime())
  }
  handleStateChange(e, data) {
    if(data===0) { // 0 means video played until the end
      let newState = {...this.state}
      newState.videoStats.finishedVideo = true
      this.setState(newState)
    }
    console.log('e, data', e, data)
    const time = e.target.getCurrentTime()
    console.log('state change', time)
  }

  startQuiz(){
    this.setState({startQuiz: true})
  }
  render() {

    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 0
      }
    }
    return (
      <div id='video' className="video">
        
        <div className='container'>
          <h1 className='center'> Watch The Video Then Take A Quiz</h1>
          <div className='row'>
          <div className='video'>
            <YouTube
              videoId="mRdMYuNeAng"
              opts={opts}
              onReady={this.onReady.bind(this)}
              onPlay={this.handlePlay.bind(this)}
              onPause={this.handlePause.bind(this)}
              onStateChange={this.handleStateChange.bind(this)}
            />
          </div>
          </div>
          {this.state.startQuiz? <Quiz videoStats={this.state.videoStats}/> : 
            <div className='row'>
              <div onClick={this.startQuiz.bind(this)} className='btn btn-primary btn-lg btn-block'>Take Quiz</div> 
            </div>
          }
        </div>

      </div>
    );
  }
}

export default App;
