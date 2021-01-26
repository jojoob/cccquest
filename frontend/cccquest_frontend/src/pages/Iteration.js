import React from "react";


class Iteration extends React.Component {
  state = {
    questions: [],
    iteration: null,
    title: '',
    currentQuestion: null,
    nextQuestionIndex: 0,
  }

  componentDidMount() {
    fetch('/api/questions/')
      .then(res => res.json())
      .then(data => this.setState({ questions: data }))
  }

  handleSubmit(event) {
    event.preventDefault()
    if(this.state.currentQuestion == null) {
      // ToDo: Error handling
      fetch('/api/iterations/', {
        method: 'POST',
        // omit credentials here to avoid confusing django with the react xsrf token
        credentials: 'omit',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          iteration_title: this.state.title,
          complete: false})
      })
        .then(res => res.json())
        .then(data => this.setState({ iteration: data }))
    } else {
      this.state.currentQuestion.choices.forEach((choice, index) => {
        // ToDo: Use a dedicated state array for checkbox values.
        //       Using event.target[index] here is a quick&dirty solution.
        if(event.target[index].checked) {
          // ToDo: Error handling
          fetch('/api/answers/', {
            method: 'POST',
            // omit credentials here to avoid confusing django with the react xsrf token
            credentials: 'omit',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              iteration: this.state.iteration.id,
              choice: choice.id})
          })
        }
      })
      if(this.state.nextQuestionIndex >= this.state.questions.length) {
        this.setState({title: '', iteration: null, currentQuestion: null, nextQuestionIndex: 0})
        // ToDo: Error handling
        fetch('/api/iterations/'+this.state.iteration.id+'/', {
          method: 'PATCH',
          // omit credentials here to avoid confusing django with the react xsrf token
          credentials: 'omit',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({complete: true})
        })
        alert('All questions answered!')
        return
      }
    }
    this.setState({currentQuestion: this.state.questions[this.state.nextQuestionIndex]})
    this.setState({nextQuestionIndex: this.state.nextQuestionIndex + 1})
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }

  render() {
  	return (
      <div className="page">
        <div className="Iteration">
          <h1>New Iteration</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            { this.state.currentQuestion == null ? (
                <label>
                  Title:
                  <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)} />
                </label>
              ): (
                <div>
                  <p>{this.state.currentQuestion.question_text}</p>
                  <ul>
                    {this.state.currentQuestion.choices.map(choice => (
                      <li key={choice.id}><label><input name={choice.id} type="checkbox" />{choice.choice_text}</label></li>
                    ))}
                  </ul>
                </div>
              )
            }
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
  	)
  }
}

export default Iteration;
