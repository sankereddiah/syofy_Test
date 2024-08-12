import { Component } from "react"
class App extends Component{
    state={count:0}
render(){
    let{count}=this.state
    return(
        <div>
<button onClick={()=>(this.setState(prevState=>({count:prevState.count-1})))}>
    decrease
</button>
<h1>{count}</h1>
<button onClick={()=>(this.setState(prevState=>({count:prevState.count+1})))}>
    increase
</button>
        </div>
    )
}
}

export default App