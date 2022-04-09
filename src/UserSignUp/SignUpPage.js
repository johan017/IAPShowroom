import React, {Component} from 'react';
import CompanyRepresentative from './CompanyRepresentative';
import StudentResearcher from './StudentResearcher';
import VerifyInformation from './VerifyInformation';
import Advisor from './Advisor';
import GeneralSignUp from './GeneralSignUp';

export default class SignUpPage extends Component{

    state ={
        step: 1,
        first_name: '',
        last_name:'',
        email: '',
        password:'',
        gender:'',
        user_role:'', 
        gradDate:'', 
        researchP:'', 
        department:'', 
        company:'', 
        researchAdv:''
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

    render(){
        const {step} = this.state;
        const {first_name, last_name, email, password, gender, user_role, gradDate, researchP, department, company, researchAdv} = this.state;
        const values = {first_name, last_name, email, password, gender, user_role, gradDate, researchP, department, company, researchAdv};
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
                        values={values}     
                              
                    />
                )
            }
            else if(step === 2 && user_role === "Advisor") {
                return(
                    <Advisor
                       nextStep={this.nextStep}
                       prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}     
                                  
                    />
                )
            }
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