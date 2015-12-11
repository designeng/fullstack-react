var React = require('react'),
    ReactDom = require('react-dom'),
    NameAdder = require('./name-adder.jsx'),
    NamesList = require('./names-list.jsx');

import SocketIoClient from "socket.io-client";

var socket = SocketIoClient.connect('http://localhost:9090');
setTimeout(() => {socket.emit('join')}, 1000);

class NameManager extends React.Component {
    handleNameAdded() {
        this.refs.namesList.update()
    }

    render() {
        return (
            <div>
                <NameAdder onAdded={this.handleNameAdded.bind(this)}/>
                <NamesList ref="namesList"/>
            </div>
        )
    }
}

ReactDom.render(<NameManager/>, document.querySelector('#application'))
