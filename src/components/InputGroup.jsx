import React, { Fragment } from 'react';


const InputGroup = (props) => {
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...props.data };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

        // console.log('event',event);
        // console.log('inputIdentifier', inputIdentifier);
        // console.log('this', updatedFormElement.elementType === 'select');
        // if (updatedFormElement.elementType === 'select') {
        //     updatedFormElement.value = event.label
        // } else {
        //     updatedFormElement.value = event.target.value;
        // }

        updatedFormElement.value = updatedFormElement.elementType === 'select'
            ? updatedFormElement.value = event.label
            : updatedFormElement.value = event.target.value;

        // updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        props.output(updatedOrderForm, formIsValid)
    }
    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        };
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        };
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        };
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        };
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        };
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        };
        return isValid;
    }
    const formElementsArray = [];
    for (let key in props.data) {
        formElementsArray.push({
            id: key,
            config: props.data[key]
        });
    }
    return (
        <Fragment>
            {formElementsArray.map(formElement => (
                <input
                    label={formElement.config.label}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    
                />
            ))}
        </Fragment>
    )
};
export default InputGroup;