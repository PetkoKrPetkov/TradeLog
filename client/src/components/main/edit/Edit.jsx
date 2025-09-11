import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { update } from '../../../api/trades-api';
import { useForm } from '../../../hooks/useForm';
import { useGetOneTrade } from '../../../hooks/useTrades';
import styles from './Edit.module.css';
import { tradeSchema } from '../../../features/trades/schema';
import { useToast } from '../../../contexts/ToastContext.jsx';
import PageHeader from '../../common/page-header/PageHeader';

const Edit = () => {
    const navigate = useNavigate();
    const [trade, setTrade, loading, setLoading] = useGetOneTrade();
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const { addToast } = useToast();

    const updateHandler = async (id, values) => {
        try {   
            setSubmitting(true);
            const updatedTrade = await update(id, values);
            setTrade(updatedTrade);
            addToast('success', 'Trade updated');
            navigate(`/trades/${trade._id}/details`);  
        } catch (error) {
            addToast('error', error?.message || 'Update failed');
            console.log(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const todayISO = () => new Date().toISOString().slice(0, 10);
    const toNullable = (v) => (v === '' || v === undefined ? null : v);
    function normalize(values) {
        return {
            ...values,
            date: values.date || todayISO(),
            exit: values.exit === '' ? null : values.exit,
            support: toNullable(values.support),
            ma: toNullable(values.ma),
            price_action: toNullable(values.price_action),
            oscilators: toNullable(values.oscilators),
            strategy: toNullable(values.strategy),
            tags: toNullable(values.tags),
        };
    }

    const { values, changeHandler, submitHandler } = useForm(trade, async (values) => {
        const normalized = normalize(values);
        const result = tradeSchema.safeParse(normalized);
        if (!result.success) {
            const zodErrors = result.error.issues.reduce((acc, issue) => {
                const key = issue.path[0];
                if (!acc[key]) acc[key] = issue.message;
                return acc;
            }, {});
            setErrors(zodErrors);
            return;
        }
        setErrors({});
        const payload = {
            ...result.data,
            tags: result.data.tags ? String(result.data.tags).split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(result.data.tags) ? result.data.tags : []),
        };
        await updateHandler(trade._id, payload);
    }, { resetOnSubmit: false })

    return (
        <div className={styles.formContainer}>
            <PageHeader title="Edit Trade" breadcrumbs={[{label:'Home', to:'/'},{label:'Trades', to:'/trades'},{label:`${trade.ticker || ''}`},{label:'Edit'}]} />
            <form className={styles.form} onSubmit={submitHandler}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Edit Trade</h2>
                    <p className={styles.subtitle}>Update key details and save changes</p>
                </header>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label htmlFor="ticker" className={styles.label}>Ticker</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="ticker"
                            name="ticker"
                            value={values.ticker}
                            onChange={changeHandler}
                            placeholder="EUR/USD"
                            aria-invalid={!!errors.ticker}
                            required
                        />
                        {errors.ticker && <p className={styles.error}>{errors.ticker}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="date" className={styles.label}>Date</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="date"
                            name="date"
                            value={values.date}
                            onChange={changeHandler}
                            aria-invalid={!!errors.date}
                            required
                        />
                        {errors.date && <p className={styles.error}>{errors.date}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="trade_direction" className={styles.label}>Trade Direction</label>
                        <select
                            className={styles.input}
                            id="trade_direction"
                            name="trade_direction"
                            value={values.trade_direction}
                            onChange={changeHandler}
                            aria-invalid={!!errors.trade_direction}
                            required
                        >
                            <option value="">-- select --</option>
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.trade_direction && <p className={styles.error}>{errors.trade_direction}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="entry" className={styles.label}>Entry Price</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="entry"
                            name="entry"
                            value={values.entry}
                            onChange={changeHandler}
                            step="0.01"
                            placeholder="1.10"
                            aria-invalid={!!errors.entry}
                            required
                        />
                        {errors.entry && <p className={styles.error}>{errors.entry}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="exit" className={styles.label}>Exit Price</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="exit"
                            name="exit"
                            value={values.exit}
                            onChange={changeHandler}
                            step="0.01"
                            placeholder="1.11"
                            aria-invalid={!!errors.exit}
                        />
                        {errors.exit && <p className={styles.error}>{errors.exit}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="volume" className={styles.label}>Volume</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="volume"
                            name="volume"
                            value={values.volume}
                            onChange={changeHandler}
                            placeholder="5000"
                            aria-invalid={!!errors.volume}
                            required
                        />
                        {errors.volume && <p className={styles.error}>{errors.volume}</p>}
                    </div>

                    <div className={`${styles.field} ${styles.full}`}>
                        <label htmlFor="support" className={styles.label}>Support</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="support"
                            name="support"
                            value={values.support}
                            onChange={changeHandler}
                            placeholder="Trend/Support lines, etc"
                            aria-invalid={!!errors.support}
                        />
                        {errors.support && <p className={styles.error}>{errors.support}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="ma" className={styles.label}>Moving Averages</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="ma"
                            name="ma"
                            value={values.ma}
                            onChange={changeHandler}
                            placeholder="50MA, 200MA, etc"
                            aria-invalid={!!errors.ma}
                        />
                         {errors.ma && <p className={styles.error}>{errors.ma}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="price_action" className={styles.label}>Price action</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="price_action"
                            name="price_action"
                            value={values.price_action}
                            onChange={changeHandler}
                            placeholder="Japanese candlestick patterns"
                            aria-invalid={!!errors.price_action}
                        />
                        {errors.price_action && <p className={styles.error}>{errors.price_action}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="oscilators" className={styles.label}>Oscillators</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="oscilators"
                            name="oscilators"
                            value={values.oscilators}
                            onChange={changeHandler}
                            placeholder="oscillators"
                            aria-invalid={!!errors.oscilators}
                        />
                        {errors.oscilators && <p className={styles.error}>{errors.oscilators}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="strategy" className={styles.label}>Strategy</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="strategy"
                            name="strategy"
                            value={values.strategy}
                            onChange={changeHandler}
                            placeholder="e.g. Breakout, S/R bounce"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="tags" className={styles.label}>Tags</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="tags"
                            name="tags"
                            value={values.tags}
                            onChange={changeHandler}
                            placeholder="comma separated, e.g. EURUSD, news, breakout"
                        />
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link to={`/trades/${trade._id}/details`} className={styles.secondaryButton}>Cancel</Link>
                    <button type="submit" className={styles.button} disabled={submitting} aria-busy={submitting}>
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
