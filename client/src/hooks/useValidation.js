import { useState } from 'react';

export function useValidation() {
    const [errors, setErrors] = useState({});

    const validate = (values) => {
        let errors = {};

        // Required basics (align with zod schema)
        if (!values.ticker) errors.ticker = 'Ticker is required';
        if (!values.date) errors.date = 'Date is required';
        if (!values.trade_direction) errors.trade_direction = 'Trade direction is required';
        if (!values.entry && values.entry !== 0) errors.entry = 'Entry price is required';
        if (!values.volume && values.volume !== 0) errors.volume = 'Volume is required';

        // Format and allowed values
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (values.date && !dateRegex.test(values.date)) {
            errors.date = 'Date must be in YYYY-MM-DD format';
        }

        const allowedDirections = ['long', 'short', 'other'];
        if (values.trade_direction && !allowedDirections.includes(values.trade_direction)) {
            errors.trade_direction = 'Select a direction: long / short / other';
        }

        // Numeric checks
        const entry = Number(values.entry);
        const exit = values.exit === '' || values.exit === null || values.exit === undefined ? null : Number(values.exit);
        const volume = Number(values.volume);

        if (Number.isFinite(entry)) {
            if (entry <= 0) errors.entry = 'Entry must be greater than 0';
        } else if (values.entry !== undefined) {
            errors.entry = 'Entry must be a valid number';
        }

        if (exit !== null) {
            if (!Number.isFinite(exit)) {
                errors.exit = 'Exit must be a valid number';
            } else if (exit < 0) {
                errors.exit = 'Exit cannot be negative';
            } else if (Number.isFinite(entry) && exit <= entry) {
                errors.exit = 'Exit price must be greater than entry price';
            }
        }

        if (Number.isFinite(volume)) {
            if (volume <= 0 || !Number.isInteger(volume)) {
                errors.volume = 'Volume must be a positive integer';
            }
        } else if (values.volume !== undefined) {
            errors.volume = 'Volume must be a valid number';
        }

        // Optional text fields length (only if provided)
        if (values.support && values.support.length < 3) errors.support = 'Support must be at least 3 characters long';
        if (values.ma && values.ma.length < 3) errors.ma = 'Moving averages must be at least 3 characters long';
        if (values.price_action && values.price_action.length < 3) errors.price_action = 'Price action must be at least 3 characters long';
        if (values.oscilators && values.oscilators.length < 3) errors.oscilators = 'Oscillators must be at least 3 characters long';

        return errors;
    };

    return [errors, setErrors, validate];

}
