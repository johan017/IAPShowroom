import React, {Component} from 'react';
import CompanyRepresentative from './CompanyRepresentative';
import StudentResearcher from './StudentResearcher';
import VerifyInformation from './VerifyInformation';
import Advisor from './Advisor';
import GeneralSignUp from './GeneralSignUp';

const inputSet = new Set();
export default class SignUpPage extends Component{

    state ={
        step: 1,
        first_name: '',
        last_name:'',
        email: '',
        password:'',
        gender:'',
        user_role:'', 
        grad_date:'', 
        projectids: new Array(),
        projectTitles: new Array(),
        department: '', 
       // department: new Array(), 
        company_name:'', 
        ispm:'false',
        confirmPass: ''
    }

    nextStep = () =>{
        const {step} = this.state;
        this.setState({step: step+1});
    }
    prevStep = () =>{
        const {step} = this.state;
        this.setState({step: step-1});
    }
    
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    } 

    
    handleProjectChange = e => {
        var inputArr = new Array();
        var inputArrg = new Array();

        e.forEach(function (choice){
            inputArr.push(choice.title);

            inputArr.push(", ");
            inputArrg.push(choice.project_id);
        });

        inputArr[inputArr.length-1] = "";
     
        this.setState({"projectTitles": inputArr});
        this.setState({"projectids": inputArrg});
    }

    // Included for students who are in more than one department (unused)
    handleDepartmentChange = e => {
        var inputArr = new Array();
        e.forEach(function (choice){
            inputArr.push(choice.value);
        });
        this.setState({"department": inputArr});
    } 


    render(){
        const {step} = this.state;
        const {first_name, last_name, email, password, gender, user_role, grad_date, projectids,projectTitles, department, company_name, ispm, confirmPass} = this.state;
        const values = {first_name, last_name, email, password, gender, user_role, grad_date, projectids, projectTitles, department, company_name, ispm, confirmPass};

            if(step === 1){
                return(
                    <GeneralSignUp
                       nextStep={this.nextStep}
                       handleChange={this.handleChange}
                       values={values}     
                    />
                )
            }
            if(step === 2 && user_role === "Student Researcher") {
                return(
                    <StudentResearcher
                       nextStep={this.nextStep}
                       prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleProjectChange = {this.handleProjectChange}
                        handleDepartmentChange= {this.handleDepartmentChange}
                        values={values}     
                              
                    />
                )
            }
            // else if(step === 2 && user_role === "Advisor") {
            //     return(
            //         <Advisor
            //            nextStep={this.nextStep}
            //            prevStep={this.prevStep}
            //             handleChange={this.handleChange}
            //             handleProjectChange = {this.handleProjectChange}
            //             values={values}     
                                  
            //         />
            //     )
            // }
            else if(step === 2 && user_role === "Company Representative" ) {
                return(
                    <CompanyRepresentative
                       nextStep={this.nextStep}
                       prevStep={this.prevStep}
                       handleChange={this.handleChange}
                       values={values}                   
                    />
                )
            }
            else {
                return(
                    <VerifyInformation
                       prevStep={this.prevStep}
                       values={values}     
                                      
                    />
                )
            }
    }
}