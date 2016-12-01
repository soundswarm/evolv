import React, { Component } from 'react';
import Results from './Results'

class Quiz extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      checked: false,
      onQuestion: 0,
      showNext: false,
      answers: {
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null
      },
      finishedQuiz: false,
      questionStats: {
        q1: {
          start: 0,
          end: 0,
          timeElapsed: 0,
        },
        q2: {
          start: 0,
          end: 0,
          timeElapsed: 0,
        },
        q3: {
          start: 0,
          end: 0,
          timeElapsed: 0,
        },
        q4: {
          start: 0,
          end: 0,
          timeElapsed: 0,
        },
        q5: {
          start: 0,
          end: 0,
          timeElapsed: 0,
        }
      }
    }
    this.questions = [
      {
        code: 'q1',
        question: 'Prefixes are added to what side of a word?',
        choices: {
          0: 'middle',
          1: 'front',
          2: 'back'
        }
      },
      {
        code: 'q2',
        question: 'Fore is a prefix that means...',
        choices: {
          0: 'back',
          1: 'middle',
          2: 'front'
        }
      },
      {
        code: 'q3',
        question: 'Certainty is to uncertainty as...',
        choices: {
          0: 'tapped is to not tapped',
          1: 'middle is to sideways',
          2: 'risk is to aversion'
        }
      },
      {
        code: 'q4',
        question: 'Prefix contains a prefix.',
        choices: {
          0: 'true',
          1: 'false'
        }
      },
      {
        code: 'q5',
        question: 'Inter means',
        choices: {
          0: 'outside',
          1: 'inside',
          2: 'between',
          3: 'before'
        }
      }
    ]
    this.answerKey = {
      q1: 1,
      q2: 2,
      q3: 0,
      q4: 0,
      q5: 2
    }
  }

  componentDidMount() {
    this.state.questionStats.q1.start = Date.now()
  }

  handleSubmit(question, e) {
    e.preventDefault()
    const q = question.code
    this.state.questionStats[question.code].timeElapsed = (Date.now() - this.state.questionStats[question.code].start) / 1000 
    if(this.state.answers[q] === this.answerKey[q]) {
      this.state.questionStats[question.code].correct = true
    } else {
      this.state.questionStats[question.code].correct = false
    }
    if(this.state.onQuestion < this.questions.length-1) {

      this.setState({onQuestion: ++this.state.onQuestion}, ()=>{
        const key = Object.keys(this.state.questionStats)[this.state.onQuestion]
        this.state.questionStats[key].start = Date.now()
      })
      // reset radio button
      document.querySelectorAll('input[type="radio"]').forEach(el=>{
        el.checked = false
      })

    } else {
      this.setState({finishedQuiz: true})
      console.log(this.state.answers)
    }
  }

  handleAnswer(e) {
   
    
    let answers = {...this.state.answers}
    answers[e.target.id] = parseInt(e.target.value)
    this.setState({answers})
    
  }

  renderChoice(q, qText, val, i) {
    return <div className="form-check" key={i}>
      <label className="form-check-label">
        <input onChange={this.handleAnswer.bind(this)}  className="form-check-input" type="radio" name="exampleRadios" id={q} value={val} name={q} /> 
        {qText}
      </label>
    </div>
  }

  renderFullQuestion(question) {
    return <form onSubmit={this.handleSubmit.bind(this, question)}>
      <legend> {question.question} </legend>
      <fieldset className="form-group">
        {Object.keys(question.choices).map((key, i)=>{
          return this.renderChoice(question.code, question.choices[key], i) 
        })
        }
      </fieldset>
      <button type="submit" className="btn btn-primary">next</button>
    </form>
  }

  render() {
    return <div className='row'>
      {this.state.finishedQuiz? <Results 
        stats={this.state.questionStats} 
        answers = {this.state.answers} 
        answerKey = {this.answerKey}
        videoStats={this.props.videoStats}
      />: this.renderFullQuestion( this.questions[this.state.onQuestion] )}
    </div>
  
  }
}

export default Quiz;
