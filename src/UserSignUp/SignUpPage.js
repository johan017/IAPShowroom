import React, {Component} from 'react';
import CompanyRepresentative from './CompanyRepresentative';
import StudentResearcher from './StudentResearcher';
import VerifyInformation from './VerifyInformation';
import Advisor from './Advisor';
import GeneralSignUp from './GeneralSignUp';

export default class SignUpPage extends Component{

    state ={
        step: 1,
        firstName: '',
        lastName:'',
        email: '',
        password:'',
        gender:'',
        role:'', 
        gradDate:'', 
        researchP:'', 
        department:'', 
        company:'', 
        researchAdv:''
    }

    nextStep = () =>{
        const {step} = this.state;
        // const {firstName, lastName, email, password, gender, role, gradDate, researchP, department, company, researchAdv} =this.state;
        // const values = {firstName, lastName, email, password, gender, role, gradDate, researchP, department, company, researchAdv}
        this.setState({step: step+ 1});

        // if({role} === "Student Researcher"){
        //     this.setState({step: 2});
        // } else if({role} === "Advisor"){
        //     this.setState({step: 3});
        // }else if({role} === "Company Representative"){
        //     this.setState({step: 4});
        // }else{
        //     this.setState({step:5});
        // }
    }
    prevStep = () =>{
        const {step} = this.state;
        // const {firstName, lastName, email, password, gender, role, gradDate, researchP, department, company, researchAdv} =this.state;
            this.setState({step: step -1});

        // if({role} === "Student Researcher"){
        //     this.setState({step: 2});
        // } else if({role} === "Advisor"){
        //     this.setState({step: 3});
        // }else if({role} === "Company Representative"){
        //     this.setState({step: 4});
        // }else{
        //     this.setState({step:1});
        // }
    }
    
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    } 

    render(){
        const {step} = this.state;
        const {firstName, lastName, email, password, gender, role, gradDate, researchP, department, company, researchAdv} =this.state;
        const values = {firstName, lastName, email, password, gender, role, gradDate, researchP, department, company, researchAdv}
        
        switch(step){
            case 1:
                return(
                    <GeneralSignUp
                       nextStep={this.nextStep}
                       handleChange={this.handleChange}
                       values={values}     
                            
                    />
                )
            case 2:
                return(
                    <StudentResearcher
                       nextStep={this.nextStep}
                       prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}     
                              
                    />
                )
            case 3:
                return(
                    <Advisor
                       nextStep={this.nextStep}
                       prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}     
                                  
                    />
                )

            case 4:
                return(
                    <CompanyRepresentative
                       nextStep={this.nextStep}
                       prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}     
                                      
                    />
                )
            case 5:
                return(
                    <VerifyInformation
                       prevStep={this.prevStep}
                       values={values}     
                                      
                    />
                )
        }
    }
}