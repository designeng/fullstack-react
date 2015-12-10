var React = require('react'),
    model = require('./model.js');

class NamesList extends React.Component {
    constructor() {
        super()
        this.state = {names: {}}
    }

    update() {
        model.getValue(['names', 'length'])
            .then(length => model.get(['names', {from: 0, to: length-1}, 'name']))
            .then(response => this.setState({names: response.json.names}))
    }

    componentWillMount() {
        this.update()
    }

    render() {
        var names = Object.keys(this.state.names).map(idx => {
            return <li key={idx}>{this.state.names[idx].name}</li>
        })
        return (
            <ul>{names}</ul>
        )
    }
}

module.exports = NamesList
