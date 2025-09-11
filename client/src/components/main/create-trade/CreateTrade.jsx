import { tradeSchema } from '../../../features/trades/schema'; 

// import styles from './CreateTrade.module.css';
// import { useForm } from '../../../hooks/useForm';
// import { useValidation } from '../../../hooks/useValidation';
// import { useCreateTrade } from '../../../hooks/useTrades';
// import { useNavigate } from 'react-router-dom';

// const initialValues = {
//     ticker: '',
//     date: '',
//     trade_direction: '',
//     entry: '',
//     exit: '',
//     volume: '',
//     support: '',
//     ma: '',
//     price_action: '',
//     oscilators: '',
// }

// export default function CreateTrade() {
//     const navigate = useNavigate();
//     const createTrade = useCreateTrade();
//     const [errors, setErrors, validate] = useValidation();

//     const createHandler = async (values) => {
//         try {
//             const { _id: tradeId } = await createTrade(values);
//             navigate(`/trades/${tradeId}/details`)      
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     const {
//         values,
//         changeHandler,
//         submitHandler,
//      } = useForm(initialValues, async (values) => {        
//         const validationErrors = validate(values);
//         if (Object.keys(validationErrors).length === 0) {
//             await createHandler(values);
//         } else {
//             setErrors(validationErrors);
//         }
//     });

//     return (
//         <div className={styles.formContainer}>
//             <form className={styles.form} onSubmit={submitHandler}>
//                 <h2 className={styles.title}>Create Trade</h2>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="ticker">Ticker</label>
//                     <input
//                         type="text"
//                         id="ticker"
//                         name="ticker"
//                         value={values.ticker}
//                         onChange={changeHandler}
//                         placeholder="EUR/USD"
//                     />
//                     {errors.ticker && <p className={styles.error}>{errors.ticker}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="date">Date</label>
//                     <input
//                         type="date"
//                         id="date"
//                         name="date"
//                         value={values.date}
//                         onChange={changeHandler}
//                     />
//                     {errors.date && <p className={styles.error}>{errors.date}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="trade_direction">Trade Direction</label>
//                     <input
//                         type="text"
//                         id="trade_direction"
//                         name="trade_direction"
//                         value={values.trade_direction}
//                         onChange={changeHandler}
//                         placeholder="Short/Long"
//                     />
//                     {errors.trade_direction && <p className={styles.error}>{errors.trade_direction}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="entry">Entry Price</label>
//                     <input
//                         type="number"
//                         id="entry"
//                         name="entry"
//                         value={values.entry}
//                         onChange={changeHandler}
//                         step="0.01"
//                         placeholder="1.10"
//                     />
//                     {errors.entry && <p className={styles.error}>{errors.entry}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="exit">Exit Price</label>
//                     <input
//                         type="number"
//                         id="exit"
//                         name="exit"
//                         value={values.exit}
//                         onChange={changeHandler}
//                         step="0.01"
//                         placeholder="1.11"
//                     />
//                     {errors.exit && <p className={styles.error}>{errors.exit}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="volume">Volume</label>
//                     <input
//                         type="number"
//                         id="volume"
//                         name="volume"
//                         value={values.volume}
//                         onChange={changeHandler}
//                         placeholder="5000"
//                     />
//                     {errors.volume && <p className={styles.error}>{errors.volume}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="support">Support</label>
//                     <input
//                         type="text"
//                         id="support"
//                         name="support"
//                         value={values.support}
//                         onChange={changeHandler}
//                         placeholder="Trend/Support lines, etc"
//                     />
//                     {errors.support && <p className={styles.error}>{errors.support}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="ma">Moving Averages</label>
//                     <input
//                         type="text"
//                         id="ma"
//                         name="ma"
//                         value={values.ma}
//                         onChange={changeHandler}
//                         placeholder="50MA, 200MA, etc"
//                     />
//                     {errors.ma && <p className={styles.error}>{errors.ma}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="price_action">Price action</label>
//                     <input
//                         type="text"
//                         id="price_action"
//                         name="price_action"
//                         value={values.price_action}
//                         onChange={changeHandler}
//                         placeholder="Japanese candlestick patterns"
//                     />
//                     {errors.price_action && <p className={styles.error}>{errors.price_action}</p>}
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="oscilators">Oscilators</label>
//                     <input
//                         type="text"
//                         id="oscilators"
//                         name="oscilators"
//                         value={values.oscilators}
//                         onChange={changeHandler}
//                         placeholder="oscilators"
//                     />
//                     {errors.oscilators && <p className={styles.error}>{errors.oscilators}</p>}
//                 </div>
//                 <button type="submit" className={styles.button}>Create Trade</button>
//             </form>
//         </div>
//     );
// }

import styles from './CreateTrade.module.css';
import { useForm } from '../../../hooks/useForm';
import { useValidation } from '../../../hooks/useValidation';
import { useCreateTrade } from '../../../hooks/useTrades';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext.jsx';
import PageHeader from '../../common/page-header/PageHeader';

const initialValues = {
  ticker: '',
  date: '',
  trade_direction: '',
  entry: '',
  exit: '',
  volume: '',
  support: '',
  ma: '',
  price_action: '',
  oscilators: '',
  strategy: '',
  tags: '',
};

const todayISO = () => new Date().toISOString().slice(0, 10);
const toNullable = (v) => (v === '' || v === undefined ? null : v);

function normalizeForValidation(values) {
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

export default function CreateTrade() {
  const navigate = useNavigate();
  const createTrade = useCreateTrade();
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();
  const [errors, setErrors] = useValidation(); // ползваме само setErrors тук

  const createHandler = async (payload) => {
    try {
      const { _id: tradeId } = await createTrade(payload);
      addToast('success', 'Trade created successfully');
      navigate(`/trades/${tradeId}/details`);
    } catch (error) {
      addToast('error', error?.message || 'Create failed');
      console.log(error?.message || error);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(initialValues, async (values) => {
    const normalized = normalizeForValidation(values);
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

    const payload = {
      ...result.data,
      exit: result.data.exit ?? 0, // ако искаш null → махни този ред
    };

    setErrors({});
    try {
      setSubmitting(true);
      await createHandler(payload);
    } finally {
      setSubmitting(false);
    }
  }, { resetOnSubmit: false });

  return (
    <div className={styles.formContainer}>
      <PageHeader title="Create Trade" breadcrumbs={[{label:'Home', to:'/'},{label:'Trades', to:'/trades'},{label:'Create'}]} />
      <form className={styles.form} onSubmit={submitHandler} noValidate>
        <header className={styles.header}>
          <h2 className={styles.title}>Create Trade</h2>
          <p className={styles.subtitle}>Log a new trade with key details</p>
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
              inputMode="decimal"
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
              inputMode="decimal"
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
              step="1"
              inputMode="numeric"
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
          <button type="submit" className={styles.button} disabled={submitting} aria-busy={submitting}>
            {submitting ? 'Creating...' : 'Create Trade'}
          </button>
        </div>
      </form>
    </div>
  );
}
