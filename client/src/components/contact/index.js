import React from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import asyncValidate from './async-validate';

import './index.css';


async function submitToServer(data) {
    try {
        let response = await fetch('/contact', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let responseJson = await response.json();

        return responseJson;
    } catch(error) {
        console.log(error);
    }
}

const validate = values => {
    const errors = {}
    const requiredFields = [ 'firstName', 'lastName', 'email', 'message' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors
}


class Thankyou extends React.Component {

    render = () => (
        <div className="thankyou">
            <div className="thankyou-inner">
                <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 37 37">
                    <path className="svg-circ path" d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"/>
                    <polyline className="svg-tick path" points="11.6,20 15.9,24.2 26.4,13.8"/>
                </svg>
                <p>Thank you!<br/>{this.props.message}</p>
            </div>
        </div>
    )
}

class ContactForm extends React.Component {

    state = {
        success: false,// Whether the form submission is successful or not.
        message: ""// A message returned from the server.
    }

    submit = values => {
        submitToServer(values).then(data => {
            // If a message is returned show it in the thankyou container.
            if (data.message !== undefined) {
                this.setState({success: true, message: data.message});
            }
            // Here you can check the returned data from the server.
            console.log(data)
        })
    }

    renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
        <TextField hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
        />
    )

    /**
     * Main form render using Material UI.
     *
     * @memberof ContactForm
     */
    render = () => (
            <div>
                <h1>Contact Us</h1>
                <div className="form-wrapper">
                    <form onSubmit={this.props.handleSubmit(this.submit)}>
                        <div>
                            <Field name="firstName" component={this.renderTextField} label="First Name"/>
                        </div>
                        <div>
                            <Field name="lastName" component={this.renderTextField} label="Last Name"/>
                        </div>
                        <div>
                            <Field name="email" component={this.renderTextField} label="Email"/>
                        </div>
                        <div>
                            <Field name="message" component={this.renderTextField} label="Message" multiLine={true} rows={2}/>
                        </div>
                        <div>
                            {/* <button type="submit" disabled={pristine || submitting}>Submit</button> */}
                            <RaisedButton label="Clear Values" disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}/> &nbsp;
                            <RaisedButton label="submit" onClick={this.props.handleSubmit(this.submit)} primary disabled={this.props.pristine || this.props.submitting}/>
                        </div>
                    </form>
                    <Thankyou message={this.state.message}/>
                </div>
            </div>
        )
}

// Decorate the form component.
export default reduxForm({
    form: 'ContactForm',// a unique identifier for this form.
    validate,
    asyncValidate
})(ContactForm)