import React from 'react';
import './Navigation.css'

class Navigation extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

render(){
    return(
    <nav className='NavBar'>
        <div className='Whole'>
        <div className='Logo'>
            <h1 id='title'>Ucsd College Chooser</h1>
        </div>

        <div className='links pt3 pr3'>
           <a className='pr5 ' href="/about" >About</a>
           <a className='pr5 ' href="/more">More</a>
           <a className='' href="/Github" >Github</a>
        </div>
        </div>
             
        
    </nav>
        )
    }

}
export default Navigation;
