class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
    }
    handleDeleteOptions(){
        this.setState(()=>{
            return {
                options : []
            }
        })
    }


    handleDeleteOption(optionToRemove) {
        this.setState((prevState)=>{
            return {
                options: prevState.options.filter((option)=> optionToRemove !== option)

            }
        })
    }
        
    handlePick() {
        const random = Math.floor(Math.random() *
            this.state.options.length);
        const option = this.state.options[random];
        alert(option);
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        });
    }
    componentDidUpdate(prevProps,prevState) {
        console.log('saving data');
        // localStorage.setItem('option',JSON.stringify(this.state));
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    componentDidMount() {
        console.log('fetching data');
        try {
            const data = localStorage.getItem('options');
            const json = JSON.parse(data)
            if (data) {
                this.setState(() => {
                    json;
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const title = 'TodoApp';
        const subTitle = 'Organize schedule';
        return (
            <div>
                <Header title={ title } subTitle={ subTitle } />
                <Action
                    handlePick={ this.handlePick }
                    hasOptions={ this.state.options.length > 0 }
                />
                <Options options={ this.state.options }
                    handleDeleteOptions={ this.handleDeleteOptions }
                    handleDeleteOption= {this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={ this.handleAddOption }
                />
                {/* <Tick /> */ }
            </div>
        )
    };
};

const Header = (props) => (
    <div>
        <h1>{ props.title }</h1>
        <h2>{ props.subTitle }</h2>
    </div>
);

class Action extends React.Component {
    // handlePick() {
    //     alert("Seattle is awesome")
    // }
    render() {
        return (
            <div>
                <button
                    onClick={ this.props.handlePick }
                    disabled={ !this.props.hasOptions }
                >What should I do</button>
            </div>
        )
    };
};

//handleRemoveAll
// when click Remove data options
class Options extends React.Component {
    constructor(props) {
        super(props);
        //this.handleRemoveAll = this.handleRemoveAll.bind(this)
    }
    handleRemoveAll() {
        console.log("Remove data options");
        // console.log(this.props.options)
    }
    render() {
        return (
            <div>
                <button onClick={ this.props.handleDeleteOptions }>Remove All</button>
                { this.props.options.map((option) => {
                    return (
                        <Option 
                        key={ option } 
                        optionText={ option }
                        handleDeleteOption = {this.props.handleDeleteOption}
                        />
                    )
                }) }</div>
        )
    };
};

const Option = (props) => (
    <div>
        { props.optionText }
        <button onClick = {()=>{ props.handleDeleteOption(props.optionText)}}>Remove</button>
        </div>
);

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();//prevent the form from checking a server
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)
        this.setState(() => {
            return {
                error
            }
        })
        e.target.elements.option.value = '';
    }
    render() {
        return (
            <div>
                { this.state.error && <p>{ this.state.error }</p> }
                <form onSubmit={ this.handleAddOption }>
                    <input type="text" id="option" />
                    <button>Add Option</button>
                </form>
            </div>
        )
    };
};

// const Tick = () => (
//     <div>
//         <h1>Hello, world!</h1>
//         <h2>It is { new Date().toLocaleTimeString() }.</h2>
//     </div>
// )

// setInterval(Tick,1000);

ReactDOM.render(<TodoApp />,document.getElementById("app"));