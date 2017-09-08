import React from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// This is just a simulation of server check for an existing email address on validate.
// In the case of a contact form it is useless but I find this piece of code interesting as
// another real life layer of validation.
import asyncValidate from './async-validate';

import './index.css';


/**
 * This is where the valid submitted data.
 *
 * @param {object} data: an object of data we want to pass to the server.
 * @returns void.
 */
async function submitToServer(data) {
    try {
        // The current react app is running on port 3000,
        // and the backend server (Express) is set to run on port 3001 for no conflict.
        // So we want to have a proxy set in client/package.json to transfer the request from :3000 to 3001.
        // Otherwise there will be a cross-origin call error.
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

/**
 * This is the validation function from Material UI.
 * http://redux-form.com/6.1.1/examples/material-ui/
 *
 * @param {object} values: object containing all the form fields to validate.
 */
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

/**
 * This component is used to render the thankyou message after a valid submission.
 *
 * @class Thankyou
 * @extends {React.Component}
 */
class Thankyou extends React.Component {

    // For the 'valid' svg animation we need to delay the addition of the class 'show'.
    state = {
        show: false
    }

    // Here when the component is added to the DOM timeout a second and append the class 'show'
    // for a smooth animation.
    componentDidMount () {
        this.timeoutId = setTimeout(function () {
            this.setState({show: true});
        }.bind(this), 1000);
    }

    render = () => (
        <div className={this.state.show ? 'thankyou show' : 'thankyou'}>
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

/**
 * Main form class using redux form (http://redux-form.com/6.1.1/).
 * it first renders the form using material ui design then attaches the validation.
 * The material ui 'MuiThemeProvider' wrapper is set in app/index.js.
 * When no error is found the form submits to the server through submitToServer() and display
 * the thank you message from the Thankyou component.
 *
 * @class ContactForm
 * @extends {React.Component}
 */
class ContactForm extends React.Component {

    state = {
        success: false,// Whether the form submission is successful or not.
        message: ""// A message returned from the server.
    }

    /**
     * Function called when the form is submitted.
     *
     * @memberof ContactForm
     */
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

    /**
     * Helper to write material-ui valid fields.
     *
     * @memberof ContactForm
     */
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
                    {/* Display thankyou message if the success state is true. */}
                    {this.state.success ? <Thankyou message={this.state.message}/> : null}
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