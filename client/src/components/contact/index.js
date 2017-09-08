import React from 'react'
import { Field, reduxForm } from 'redux-form';


class ContactForm extends React.Component {

    submit = values => {
    }


    render = () => (
            <div>
                <h1>Contact Us</h1>
            </div>
        )
}

// Decorate the form component.
export default reduxForm({
    form: 'ContactForm',// a unique identifier for this form.
})(ContactForm)