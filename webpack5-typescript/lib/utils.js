const path = require('path');

const WORK_ROOT = (exports.WORK_ROOT = process.cwd());

exports.resolve = (...p) => path.resolve(WORK_ROOT, ...p);
