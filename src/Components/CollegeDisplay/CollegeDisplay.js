import React, {Component} from 'react';
import Collapsible from 'react-collapsible';


class CollegeDisplay extends Component{
    constructor(){
        super();
        this.state={};
        
    }

render(){
    return (
    <div className='center pt3 ma0 mv0 mr0'>
<section className="vh-100-l mw9 center bg-light-gray pa3">
    <Collapsible trigger='Start here'>
        <div> 
            <div className='bg-blue'> Hi</div>
        <p>This is the collapsible content. It can be any element or React component you like.</p>
        <p>It can even be another Collapsible component. Check out the next section!</p>
        </div>
      </Collapsible>
</section>
</div>
    );
};

}

export default CollegeDisplay;
