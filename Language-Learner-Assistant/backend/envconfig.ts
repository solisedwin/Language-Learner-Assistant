import env from 'dotenv';
env.config();

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';

dayjs.extend(utc);
dayjs.extend(isSameOrBefore);

