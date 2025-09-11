import 'dotenv/config';
import app from './app.js';

const port = Number(process.env.PORT || 3030);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));


