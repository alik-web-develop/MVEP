const concurrently = require('concurrently');
const { exec } = require('child_process');

// Запускаем оба процесса параллельно
concurrently([
  { command: 'npm run dev', name: 'frontend', prefixColor: 'blue' },
  { command: 'npx json-server -w src/store/db.json -p 3001', name: 'backend', prefixColor: 'green' }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
}).then(
  () => console.log('Все процессы успешно завершены'),
  (error) => console.error('Произошла ошибка:', error)
); 