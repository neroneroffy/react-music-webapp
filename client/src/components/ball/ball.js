import React,{ Component } from 'react';
import './ball.css';
class Ball extends Component{
    init=()=>{
        this.refs.ballY.style.top=`${this.props.origin.y}px`;
        this.refs.ballY.style.left=`${this.props.origin.x}px`;

/*        if(this.props.terminal.y-this.props.origin.y<40){
            this.refs.ballY.style.transition = "all .4s cubic-bezier(0,.3,.55,1.62)"
        }*/
        setTimeout(()=>{
            this.fall()
        },0)
    };
    fall=()=>{
        this.refs.ballY.style.transform=`translateY(${this.props.terminal.y-this.props.origin.y}px)`;
        this.refs.ballX.style.transform=`translateX(${this.props.terminal.x-this.props.origin.x}px)`;

        setTimeout(()=>{
            this.props.complete(this.props.id)
        },400)
    };
    render(){

        return (
            <div className="ball-y" ref="ballY" >
                <div className="ball-x" ref="ballX">+</div>
            </div>
        )
    }
}
export default Ball