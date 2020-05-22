const chokidar = require('chokidar');
const {backOff} = require('exponential-backoff');
const path = require('path');
const fs = require('then-fs');

if (!process.env.DISCORD_WATCHED_PATHS) {
  console.error('DISCORD_WATCHED_PATHS is not set!');
  process.exit(1);
}

const cursedFilenameRegex = /(image|video)+\d/;

const watchedPaths = process.env.DISCORD_WATCHED_PATHS.split(',').map(s => s.trim());

chokidar.watch(watchedPaths, {
  ignoreInitial: true,
  depth: 0
}).on('add', async filePath => {
  const pathData = path.parse(filePath);

  const newPath = path.join(pathData.dir, `discord_${Date.now()}${pathData.ext}`);

  if (cursedFilenameRegex.test(pathData.name)) {
    console.log(`Cursed filename found at ${filePath}, renaming to ${newPath}`);

    try {
      backOff(() => fs.rename(filePath, newPath));
    } catch (error) {
      console.error(`Couldn't rename ${filePath}`, error);
    }
  }
});
