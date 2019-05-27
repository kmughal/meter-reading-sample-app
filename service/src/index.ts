
import { initialize } from './infrastructure/seed-data';
import { createServer } from './server';
const PORT = process.env.PORT || 3000;

if (!module.parent) {
  initialize(() => {
    createServer().start(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  });
}
