import { useState } from 'react';

export function useValidation() {
    const [errors, setErrors] = useState({});

    const validate = (values) => {
        let errors = {};
        
        if (!values.ticker) errors.ticker = 'Ticker is required';
        if (!values.date) errors.date = 'Date is required';
        if (!values.trade_direction) errors.trade_direction = 'Trade direction is required';
        if (!values.entry) errors.entry = 'Entry price is required';
        if (!values.exit) errors.exit = 'Exit price is required';
        if (!values.volume) errors.volume = 'Volume is required';
        if (!values.support) errors.support = 'Support field is required';
        if (!values.ma) errors.ma = 'Moving averages field is required';
        if (!values.price_action) errors.price_action = 'Price action field is required';
        if (!values.oscilators) errors.oscilators = 'Oscilators field is required';
    
        if (values.entry <= 0) errors.entry = 'Entry price must be greater than 0';
        if (values.exit <= 0) errors.exit = 'Exit price must be greater than 0';
        if (values.volume <= 0) errors.volume = 'Volume must be greater than 0';
    
        if (parseFloat(values.exit) <= parseFloat(values.entry)) {
            errors.exit = 'Exit price must be greater than entry price';
        }
    
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (values.date && !dateRegex.test(values.date)) {
            errors.date = 'Date must be in MM-DD-YYYY format';
        }
    
        if (values.trade_direction.length < 3) errors.trade_direction = 'Trade direction must be at least 3 characters long';
        if (values.support.length < 3) errors.support = 'Support must be at least 3 characters long';
        if (values.ma.length < 3) errors.ma = 'Moving averages must be at least 3 characters long';
        if (values.price_action.length < 3) errors.price_action = 'Price action must be at least 3 characters long';
        if (values.oscilators.length < 3) errors.oscilators = 'Oscilators must be at least 3 characters long';
    
        return errors;
    };

    return [errors, setErrors, validate];

}
