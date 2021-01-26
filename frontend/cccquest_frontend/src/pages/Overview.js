import React from "react";

class Overview extends React.Component {
  state = {
    iterations: [],
    selectedIteration: null
  }

  componentDidMount() {
    this.fetchIterations()
  }

  fetchIterations() {
    fetch('/api/iterations/')
      .then(res => res.json())
      .then(data => this.setState({ iterations: data }))
  }

  deleteSelectedIteration() {
    // omit credentials here to avoid confusing django with the react xsrf token
    fetch('/api/iterations/'+this.state.selectedIteration.id+'/', {method: 'DELETE', credentials: 'omit'})
      .then(() => this.setState({selectedIteration: null}))
      .then(() => this.fetchIterations())
  }

  render() {
    return (
      <div className="page">
        <div className="Iterations">
          <h1>Iterations</h1>
          <p>List of all question iterations.</p>
          <ul>
            {this.state.iterations.map(iteration => (
              <li key={iteration.id} onClick={() => this.setState({selectedIteration: iteration})}>{iteration.iteration_title} - {iteration.created} - {iteration.complete ? <span>Complete</span> : <span>Canceled</span>}</li>
            ))}
          </ul>
        </div>
        { this.state.selectedIteration && (
          <div className="IterationDetails">
            <h1>Iteration Details</h1>
            <ul>
              <li>Title: {this.state.selectedIteration.iteration_title}</li>
              <li>Date: {this.state.selectedIteration.created}</li>
              <li>Complete: {this.state.selectedIteration.complete ? <span>Yes</span> : <span>No</span>}</li>
              <li>Answers:
                <ul>
                  {this.state.selectedIteration.answers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                  ))}
                </ul>
              </li>
            </ul>
            <button onClick={this.deleteSelectedIteration.bind(this)}>Delete</button>
          </div>
        )}
      </div>
    );
  }
};

export default Overview;

