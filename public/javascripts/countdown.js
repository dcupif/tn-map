class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: "",
            minutes: "",
            seconds:"",
            diff : ""
        };
    }

    componentDidMount = () => {
        this.tick();
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        let endDate = moment("2017-09-22T23:00:01+01:00");
        let diff = endDate.diff(moment());
        let time = moment.duration(diff);
        this.setState({
            classSeconds : time.seconds() != this.state.seconds ? "animated" : "",
            classMinutes : time.minutes() != this.state.minutes ? "animated" : "",
            classHours : time.days()*24 + time.hours() != this.state.hours ? "animated" : ""
        }, this.setState({
            diff : diff,
            hours : time.days()*24 + time.hours(),
            minutes : time.minutes(),
            seconds :  time.seconds()
        }))


    }


    render() {
        return (
            <div className="main-container">
                <div className="countdown-container">

                        { this.state.diff <= 0 ?
                            <div className="countdown">
                                <a href="#" className="btn btn-lg btn-warning">Welcome et Bon bativersaire !</a>
                            </div>
                            :
                            <div className="countdown">
                                <div className={"animation "+ this.state.classHours}>{this.state.hours < 10 ? "0" +this.state.hours : this.state.hours}</div>:
                                <div className={"animation "+ this.state.classMinutes}>{this.state.minutes < 10 ? "0" +this.state.minutes : this.state.minutes}</div>:
                                <div className={"animation "+ this.state.classSeconds}>{this.state.seconds < 10 ? "0" +this.state.seconds : this.state.seconds}</div>
                            </div>
                        }
                </div>
            </div>
        );
    }
}
