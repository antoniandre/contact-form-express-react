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


class ContactForm extends React.Component {

    submit = values => {
        submitToServer(values).then(data => {
            if (data.message !== undefined) {
                this.setState({success: true, message: data.message});
            }
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
        </div>
    )
}

// Decorate the form component.
export default reduxForm({
    form: 'ContactForm',// a unique identifier for this form.
    validate,
    asyncValidate
})(ContactForm)