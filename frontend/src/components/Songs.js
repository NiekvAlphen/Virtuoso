class App extends React.Component {
    /*
      Component renders our main frontend and fetches http requests to our flask 
      server. Requests are reverse proxied to backend api using Nginx.
    */
      constructor(props){
        super(props);
        this.state = {
          data: null,
          songs: null
        }
      }
    
      /*onFirstNumChange(event){
        this.setState({firstNumber: event.target.value})
      }*/
    
      /*insertCalculation(event, calculation){
      
        Making a POST request via a fetch call to Flask API with numbers of a
        calculation we want to insert into DB. Making fetch call to web server
        IP with /api/insert_nums which will be reverse proxied via Nginx to the
        Application (Flask) server.
      
        event.preventDefault();
    
        fetch('http://34.66.13.114:8080/api/insert_nums', {method: 'POST',
                                                        mode: 'cors',
                                                        headers: {
                                                        'Content-Type' : 'application/json'
                                                        },
                                                        body: JSON.stringify(calculation)}
         ).then((response) => {
           if(response.status === 200){
             response.json().then(
                data => console.log(data['Response'])
             )
           } else{
              response.json().then(
                data => console.log(data['Response'])
             )
           }
         }).catch((error) => {
           console.log('Error in inserting nums', error)
         })
      }*/
    
      /*onCalculateValues(event){
        event.preventDefault();
        let operands = {firstNum: this.state.firstNumber, secondNum: this.state.secondNumber, answer: null}
    
        if(isNaN(parseInt(operands.firstNum)) || isNaN(parseInt(operands.secondNum))){
          this.setState({answer: "Must enter valid number"})
        } else{
          let calculationAnswer = parseInt(operands.firstNum) + parseInt(operands.secondNum)
    
          this.setState({answer: calculationAnswer})
    
          operands.answer = calculationAnswer
    
          this.insertCalculation(event, operands)
        }
      }*/
    
      showData(event){
        event.preventDefault()
    
        this.setState({data: "loading data"})
        
        this.getData(event)
      }
    
      closeData(event){
        event.preventDefault()
    
        this.setState({data: null})
      }
    
      showSongs(event){
        event.preventDefault()
    
        this.setState({songs: "loading data"})
        
        this.getSongs(event)
      }
    
      closeSongs(event){
        event.preventDefault()
    
        this.setState({songs: null})
      }
    
      getData(event){
        
        /*Making a GET request via a fetch call to Flask API to retrieve calculations history.*/
        
        event.preventDefault()
    
        fetch('http://127.0.0.1:80/songapi/hello', {method: 'GET', mode: 'cors',}
        ).then(response => {
          if(response.status === 200){
            (response.json()).then((data) => {
              this.setState({data: data['messages']})
            })
          } else {
            (response.json()).then(() => {
              this.setState({data: 'error'})
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
        })
      }
    
      getSongs(event){
        
        /*Making a GET request via a fetch call to Flask API to retrieve calculations history.*/
        
        event.preventDefault()
    
        fetch('http://127.0.0.1:80/songapi/songs', {method: 'GET', mode: 'cors',}
        ).then(response => {
          console.log(response)
          if(response.status === 200){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
            })
          } else {
            (response.json()).then(() => {
              this.setState({songs: 'error'})
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
        })
      }
    
      render() {
        return(
          <form method='GET'>
            <div>
              <ShowData
              data={this.state.data}
              closeData={(event)=> this.closeData(event)}
              showData={(event) => this.showData(event)}
              getData = {(event) => this.getData(event)}/>
            </div>
            <div>
              <Data data={this.state.data}/>
            </div>
            <div>
              <ShowSongs
              songs={this.state.songs}
              closeSongs={(event)=> this.closeSongs(event)}
              showSongs={(event) => this.showSongs(event)}
              getSongs = {(event) => this.getSongs(event)}/>
            </div>
            <div>
              <Songs songs={this.state.songs}/>
            </div>
          </form>
        )
      }
    }
    
    /*function FirstNumber(props){
      return(
        <input placeholder='0' onChange={props.onFirstChange}></input>
      )
    }*/
    
    /*function SecondNumber(props){
      return(
        <input placeholder='0' onChange={props.onSecondChange}></input>
      )
    }*/
    
    /*function Calculate(props){
      return(
        <button onClick={props.onCalculateClick}>Calculate!</button>
      )
    }*/
    
    /*function Answer(props){
      return(
      <p>{props.answerNumber}</p>
      )
    }*/
    
    function ShowData(props){
      if(props.data !== null){
        return(
          <button onClick={props.closeData}>Close data</button>
        )
      } else{
        return(
          <button onClick={props.showData}>Show data</button>
        )
      }
    }
    
    function Data(props){
      if(props.data !== null && props.data !== "loading data"){
        return (
          <div>{props.data}</div>
        )
      } else if(props.data === "loading data"){
        return(
          <div>loading data...</div>
        )
      }else{
        return(
          <div>No data.</div>
        )
      }
    }
    
    function ShowSongs(props){
      if(props.songs !== null){
        return(
          <button onClick={props.closeSongs}>Close songs</button>
        )
      } else{
        return(
          <button onClick={props.showSongs}>Show songs</button>
        )
      }
    }
    
    function Songs(props){
      if(props.songs !== null && props.songs !== "loading songs"){
        return (
          <div>{props.songs}</div>
        )
      } else if(props.songs === "loading songs"){
        return(
          <div>loading songs...</div>
        )
      }else{
        return(
          <div>No songs.</div>
        )
      }
    }
    
    export default App;