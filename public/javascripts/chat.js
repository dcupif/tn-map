class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            me : props.me,
            message: '',
            messages: []
        };
    }

    componentWillMount = () => {
        socket.on('loadChatsRet', (c) => {
            this.setState({
                messages: c
            });
        });

        socket.on('messageSent', (m) => {
            this.setState({
                messages: [...this.state.messages, m]
            })
        })
    }

    componentDidMount(){
        socket.emit('loadChats');
        this.scrollToBottom();
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer)
        // const messagesContainer = document.getElementById("messages");
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    componentWillUnmount = () => {
        socket.off('loadChatsRet');
    }

    _handleSubmit = (e) => {
        e.preventDefault();

        this._sendMessage();
    }

    _handleChange = (e) => {
        this.setState({
            message: e.target.value
        });
    }

    _handleKeyUp = (e) => {
        if(e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();

            this._sendMessage();
        }
    }

    _sendMessage = () => {
        socket.emit('sendMessage', this.state.me, this.state.message);

        this.setState({
            message: ''
        });
    }

    render() {
        return (
            <div id="chat">
                <div className="card overflowY" id="messages" ref={(el) => { this.messagesContainer = el; }}>
                    <ul className="list-group">
                        {this.state.messages.map((m, km) => {
                            return (
                                <li key={km} className="list-group-item">
                                    <div className="entry-message-container">
                                        <div className="name-placeholder">{m.user}</div>
                                        <div className="hour-placeholder">{moment(Number(m.time)).format('LT')}</div>
                                        <div className="text-placeholder">{m.message}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <form onSubmit={this._handleSubmit}>
                        <div className="input-group">
                            <textarea
                                className="form-control"
                                id="messageToSend"
                                placeholder="Votre message"
                                rows="3"
                                onChange={this._handleChange}
                                onKeyUp={this._handleKeyUp}
                                value={this.state.message}>
                            </textarea>
                            <button
                                type="submit"
                                className="btn btn-outline-warning"
                                onClick={() => {this._sendMessage} }>
                                <i className="material-icons">send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
