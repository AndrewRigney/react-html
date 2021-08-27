class Hello extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        audience: "JavaScript",
      };
    }
    changeAudience = (a) => {
      this.setState({
        audience: a,
      });
    };
    render() {
      return (
        <div>
          <h1>Hello {this.state.audience} World!</h1>
          <button type="button" onClick={() => this.changeAudience("React")}>Change the world!</button>
        </div>
      );
    }
  }

  ReactDOM.render(<Hello />, document.getElementById("mydiv"));