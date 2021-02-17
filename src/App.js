import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation'
import StudentsList from './components/StudentsList'
import CreateStudents from './components/CreateStudents'
import CreateSubjects from './components/CreateSubjects'
import SubjectList from './components/SubjectsList'
import CreateGroups from './components/CreateGroups'
import CreatePeriod from './components/CreatePeriod'
import Home from './components/Home';
import CreateGrades from './components/CreateGrades';
import GradesList from './components/GradesList';
import EditGrade from './components/EditGrade';


function App() {
  return (
    <Router>
      <Navigation/>

      <div className="container p-4">
        <Route exact path="/" component={Home}/>
        <Route path="/listStudent" component={StudentsList}/>
        <Route path="/editStudent/:id" component={CreateStudents}/>
        <Route path="/createStudent" component={CreateStudents}/>
        <Route path="/listSubject" component={SubjectList}/>
        <Route path="/editSubject/:id" component={CreateSubjects}/>
        <Route path="/createSubject" component={CreateSubjects}/>
        <Route path="/createGroup" component={CreateGroups}/>
        <Route path="/createPeriod" component={CreatePeriod}/>
        <Route path="/listGrades" component={GradesList}/>
        <Route path="/editGrade/:id" component={EditGrade}/>
        <Route path="/createGrade" component={CreateGrades}/>
      </div>
    </Router>
  );
}

export default App;
