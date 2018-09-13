const p = new Promise((resolve, reject) => {
  console.log('fetching from db');
  setTimeout(() => {
    // resolve({id: 1, user: 'bill' });
    reject(new Error('ERROR!!!'));
  }, 2000);
});

p
  .then(data => console.log(data))
  .catch(err => console.log('Error', err.message));
