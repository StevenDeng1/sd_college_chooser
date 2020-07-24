import React, {Component} from 'react';
import './Box.css';


class Box extends Component{
    constructor(props){
        super(props);
        this.state={
            classes: [],
            click: false,
            scores: [],
            name: '',
            totalCourses: [], // array containing all classes along with grade
            majorList: [],
            AP_boxClicked: false,
            MAJOR_boxClicked: false,
            selectedMajor: '',
            submitMessage: '* Once you finish entering your major and courses click submit',
            messageColor: ''

        };
    }

arrayUpdater = (array,element) => {
    let temp = [];
   // console.log(array);
    if(array.length === 0){
        return [element];
    }
    
    for(let i=0; i<array.length; i++){
        temp.push(array[i]);
    }
    temp.push(element);
    return temp;
}

createSuggestions = (suggestionType) => {
    if(suggestionType === 'majors'){
        let majorList = [];
      
        this.props.Majors.forEach(major =>{
            //console.log(majorList);
            if(majorList.length < 4){
                majorList.push(
                    <div
                        data-div_id={major.name}
                        onClick={(e) => this.onClick('major',e)}
                        key={major.name}
                        >{major.name}
                        </div>
                );
            }
        })
       
        return majorList;
    }

    else{
    let courseList = [];

    this.props.Courses.forEach(course=>{
        //console.log(courseList.length)
        if(courseList.length < 4){
        courseList.push(
            <div 
                data-div_id={course.name}
                onClick={(e) => this.onClick('course',e)}
                key={course.name}>
                     {course.name}
                </div>);    
        }
    });
    return courseList;
    //console.log('create', this.props.Courses);
    }

}
MajorDiv = () => {
    if(this.state.click === true){
    return (
    <div className='Major-Div-Container' >
             <div>{this.state.selectedMajor}</div>
    </div>
    );
    }
    return <div></div>;
}
onClick = (cause,ev) =>{
    //console.log("onclick is invoked")
    if(cause === 'major'){
        if(this.state.messageColor === 'red'){
            this.setState({messageColor: 'green',
                          submitMessage:'All good now'
            }
            )
        }
        this.setState({click:true, selectedMajor: `${ev.currentTarget.dataset.div_id}`,});
        
       // this.setState({selectedMajor: `${ev.currentTarget.dataset.div_id}`}, this.createMajorDiv); //changes state of selectedMajor 
       
  
        
    }
    else{
    if(!this.state.classes.includes(`${ev.currentTarget.dataset.div_id}`)){
        this.setState({classes: this.arrayUpdater(this.state.classes,`${ev.currentTarget.dataset.div_id}`)})
        //this.addCourses();
        //this.setState({click: true}); //idk why this works alows for updating
    }

    if(this.state.totalCourses.length===0){
        this.state.totalCourses.push({
            courseName: `${ev.currentTarget.dataset.div_id}`,
            courseScore:1
        });
       // console.log('totalCourses with first addition', this.state.totalCourses);
    }
    else{
        let temp = this.state.totalCourses;
        let containsElement = false;
        for(let i =0; i<temp.length; i++){
            if(temp[i].courseName === `${ev.currentTarget.dataset.div_id}`){
                containsElement=true;
                //console.log('totalCourses with dupe', this.state.totalCourses)
                return;    
            }
        }
        if(!containsElement){
            temp.push({
                courseName: `${ev.currentTarget.dataset.div_id}`,
                courseScore:1
            });
        }
        //console.log('totalCourses with new addition non first ', this.state.totalCourses);
        this.setState({totalCourses: temp});
        
    }
}
    

    
}
addCourses = () =>{
  //  console.log("add course was invoked")
    let List_of_Courses = [];
   // console.log('this state of classes ', this.state.classes)
    this.state.classes.forEach(course => {
        List_of_Courses.push(
            <div id='courseHolder' key={course} className='flex pb2'>
                <div className='pr3 w-50'>
                    <li data-div_id={course} onClick = {this.onCourseClick} className='f5'>{course}</li>
                </div>
                <div className='pl3'>
                <select id={course} onChange={this.handleChange} className=''>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>  
                    <option value='5'>5</option>
                
            </select>
            </div>
            </div>
        ); 
            
    });
   // console.log('list',List_of_Courses)
    return List_of_Courses;
}
onCourseClick = ev =>{
   
    this.setState({classes: this.state.classes.filter(item => item !== `${ev.currentTarget.dataset.div_id}`)});
    
    //console.log('arr is',this.state.classes);

    this.setState({totalCourses: this.state.totalCourses.filter(course => course.courseName !== `${ev.currentTarget.dataset.div_id}`)});

   //this.setState({click: true}); //idk why this works look into states again
    
}
onSubmit = () => {
    if(this.state.selectedMajor ===''){
        this.setState({submitMessage:'YOU HAVE NOT ENTERED A MAJOR, if not sure click undeclared',
                      messageColor: 'red'
                    }
                        
                    );
        
    }
    else{
    var myJson = JSON.stringify([this.state.selectedMajor,this.state.totalCourses]);
    console.log(myJson);
    }
}
handleChange = ev => {
  //  console.log('course is ', ev.currentTarget.id )
   // console.log(ev.target.value);


    let courseGrade = {courseName: ev.currentTarget.id,
                       courseScore: ev.target.value
    }
    let modified = false;
    let temp = this.state.totalCourses;
   

    for (let i=0; i<temp.length; i++ ){
        if(temp[i].courseName === courseGrade.courseName){
            temp[i].courseScore = courseGrade.courseScore;
            modified = true;
            //console.log('temp is ', temp);
            this.setState({totalCourses: temp});
            break;
        }

    }

    if(!modified){
       // console.log('temp is ',temp);
        this.state.totalCourses.push(courseGrade);
    }

   // console.log(this.state.totalCourses)
}
render(){

        return(
            <div className='center pt3 ma0 mv0 mr0'>
                <section className="vh-100-l mw9 center bg-light-gray pa3">
         <div className='leftSide split'>
                <h1 className="">Ucsd College Chooser</h1>
                <div className='w-50'>
                <p className='pb1'> This website allows you to enter your Ap/Ib credits and Major and 
                    ranks the 7 UCSD Colleges 
                    for you based upon 
                    how many GE requirments you would have to do based on credits earned.
                    </p>
                    
                    <ul className='guide dashed'>
                    <li> To add courses or a major use the respective search bars</li> 
                     <li> Click on the selected choice to add </li>
                     <li> Use selectors to input scores for courses  </li>
                     <li> To remove courses simply click on the course name</li> 
                     <li> A major must be delcared, if unsure put undeclared</li>
                    </ul>
                 </div>  


                 <label className=" pt2 db fw6 lh-copy black f6" htmlFor="Credits">Enter your Major</label>
                  
                  <div id='Major-Search-Box'>
                      <input 
                          className='SearchBox'
                          id='Major'
                          type='search'
                          placeholder='Search'
                          onChange = {this.props.onSearchChange}
                          onClick ={()=> this.setState({AP_boxClicked: false,
                            MAJOR_boxClicked: true})}
                      />
                  <div className='SuggestionPanel'>
                      {this.state.MAJOR_boxClicked? this.createSuggestions('majors'): ''}
                  </div>
                            
                  </div>


                <label className=" pt2 db fw6 lh-copy black f6" htmlFor="Credits">Enter your credits </label>

                <div className='invisContainerApBox'>
                <div id='Ap-Search-Box'>
                    <input 
                        className='SearchBox'
                        id='AP'
                        type='search'
                        placeholder='Search Here...'
                        onChange = {this.props.onSearchChange}
                        onClick ={()=> this.setState({AP_boxClicked: true,
                                                      MAJOR_boxClicked: false})}
                    />
                <div className='SuggestionPanel'>
                    {this.state.AP_boxClicked? this.createSuggestions('courses') : ''}
                

                </div>

                </div>
                </div>
                <label className='submitLabel center' style={{color: this.state.messageColor}}> {this.state.submitMessage}</label>
                <div className='w-50 pt2'>
                <button onClick={this.onSubmit} className='pa2 w-50'>Submit</button>
                </div>

         </div>
        <div className='rightSide split'>
            <div className='MajorBigContainer'>

            <div className='MajorContainer'>
            <div className='titleContainer f3'>
                <label className='center right-1'>Major:</label>
            </div>
           
                            <this.MajorDiv className='Major-Div-Container pt2 absolute' />
                    
        </div>
        </div>

            <div className='courseContainer h-50'>
            <div className='titleContainer absolute f3 pr7'>
                <label className='center f3' >Courses:</label>
            </div>

                <div className='pt2 f3 pr7'> 
                <ul className='classList f3'>
                   {this.addCourses()}
                    </ul>
                </div>
        </div>
        </div>

                
                     

                </section>       
            </div>
        )
    }

}
export default Box;