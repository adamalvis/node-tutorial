
function log (options = {}) {
  // .. do something with options
  return (req, res, next) => {
    console.log('Logging...');
    next();
  };
}

module.exports = log;
