import { app } from './config/express';
import { logger } from './config/logger';

logger.info('Làm việc với Winston!');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Server start listening on port ${port}!`);
});
