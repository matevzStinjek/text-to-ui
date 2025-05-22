import { treaty } from '@elysiajs/eden';
import type { AppType } from '../../../schema-service/src/app';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const eden = treaty<AppType>(API_URL);
