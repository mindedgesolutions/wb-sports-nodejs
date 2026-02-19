import fs from 'fs';
import path from 'path';
import pino from 'pino';

const logDir = path.join(process.cwd(), './src/globals/logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logger = pino(
  {
    level: 'info',
  },
  pino.destination({
    dest: path.join(logDir, 'app.log'),
    sync: false,
  }),
);
