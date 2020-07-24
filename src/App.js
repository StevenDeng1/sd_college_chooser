import React from 'react';
import './App.css';
import Box from './Components/Box/Box';
import Navigation from './Components/Navigation/Navigation';
import Ap_Courses from './ApCourse';
import MajorList from './MajorList';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      route: 'home',
      inputofMajor: '',
      inputofAP: '',
      courses: [],
      majors: []
    }
  }

  componentDidMount(){
    this.setState({courses:Ap_Courses,
                    majors:MajorList
                  });

  }
  
  onSearchChange = (event) => {
    if(event.target.id === 'AP'){
    this.setState({inputofAP: event.target.value});  
    }
    else{
      this.setState({inputofMajor: event.target.value});
    }
  }


 render(){
   
  const CourseSuggestions = this.state.courses.filter(course => {
   return this.state.inputofAP === '' ? undefined : course.name.toUpperCase().includes(this.state.inputofAP.toUpperCase());
    });

  const MajorSuggestions = this.state.majors.filter(major => {
    return this.state.inputofMajor === '' ? undefined : major.name.toUpperCase().includes(this.state.inputofMajor.toUpperCase());
  })
    

  return( 
    <div>
      <Navigation/>
      <Box Majors = {MajorSuggestions} Courses={CourseSuggestions} onSearchChange={this.onSearchChange}/>
  </div>
  )
  
}

}

export default App;
