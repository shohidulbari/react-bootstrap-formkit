import React, { Component } from 'react';

class FormKit extends Component{
    constructor(props){
        super();
        this.props = props;

        //initialValue and fields Validation
        let propsValidation = true;
        for(let i=0; i<props.fields.length; i++){
            for(let j=0; j<props.fields[i].length; j++){
                if(props.fields[i][j].name === undefined || props.fields[i][j].type === undefined){
                    propsValidation = false;
                }else{
                    let initialValueKeys = Object.keys(props.initialValue);
                    if(!initialValueKeys.includes(props.fields[i][j].name)){
                        propsValidation = false;
                    }
                }
            }
        }

        if(!propsValidation){
            throw new Error("Invalid Props! Please check fields and initialValue. Read Documentation for more!");
        }
        this.state = {
            ...props.initialValue
        }
    }

    render(){
        return(
                <form className="was-validated">
                    {
                        this.props.fields.map((field, key) => {
                            return(
                                    <div key={key} className="form-row">
                                        {
                                            field.map((element) => {
                                                if(element.type === "radio"){
                                                    return(
                                                        <div key={element.key} className="form-check ml-2">
                                                            <input
                                                                className={element.className === undefined?"form-check-input": element.className}
                                                                type="radio"
                                                                name= {element.name}
                                                                id = {element.id}
                                                                value = {element.value}
                                                                defaultChecked = {element.value === this.state[element.name]}
                                                                onChange = {e => this.setState({[element.name]: e.target.value})}
                                                            />
                                                            <label htmlFor={element.id}>{element.label}</label>
                                                        </div>
                                                    )
                                                }else if(element.type === "checkbox"){
                                                    return (
                                                        <div key={element.key} className="form-check ml-2">
                                                            <input 
                                                                className= {element.className === undefined? "form-check-input": element.className}
                                                                type="checkbox"
                                                                name={element.name}
                                                                id={element.id}
                                                                value={element.value}
                                                                defaultChecked={this.state[element.name].includes(element.value)}
                                                                onClick = {e => {
                                                                    let prevState = this.state[element.name];
                                                                    if(prevState.includes(e.target.value)){
                                                                        for(let i=0; i<prevState.length; i++){
                                                                            if(prevState[i] === e.target.value){
                                                                                prevState.splice(i, 1);
                                                                            }
                                                                        }
                                                                    }else{
                                                                        prevState.push(e.target.value);
                                                                    }

                                                                    this.setState({
                                                                        [element.name] : [...prevState]
                                                                    })
                                                                }}
                                                            />
                                                            <label htmlFor={element.id}>{element.label}</label>
                                                        </div>
                                                        
                                                    )
                                                }else if(element.type === "file"){
                                                    return(
                                                        <div key={element.key} className="form-group col text-left">
                                                            <label htmlFor={element.id} className={element.className === undefined?"":element.className}>{element.label}</label>
                                                            <input 
                                                                type= "file" 
                                                                className={element.className === undefined ? "form-control": element.className} 
                                                                id={element.id}
                                                                name={element.name}
                                                                value= {undefined}
                                                                onChange={(e) => this.setState({[element.name]: e.target.files[0]})}
                                                                required = {element.required === true ? true : false}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                
                                                else{
                                                return(
                                                    <div key={element.key} className="form-group col text-left">
                                                        <label htmlFor={element.id} className={element.type === "radio"? "radio-inline":""}>{element.label}</label>
                                                        <input 
                                                            type= {element.type} 
                                                            className={element.className === undefined?"form-control": element.className} 
                                                            id={element.id}
                                                            name={element.name}
                                                            value={this.state[element.name]}
                                                            onChange={(e) => this.setState({[element.name]: e.target.value})}
                                                            required = {element.required === true ? true : false}
                                                        />
                                                    </div>
                                                )}
                                            })
                                        }
                                    </div>
                            )
                        })
                    }
                    <div className="d-flex row">
                        <div className="col">
                            <button type="button" className={this.props.submitButton.className} onClick={async () => {
                                await this.props.onSubmit(this.state)}} >{this.props.submitButton.name}</button>
                        </div>
                    </div>
                </form>
        )
    }
}

export default FormKit