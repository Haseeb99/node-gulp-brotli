console.log('Test Log');

setTimeout(() => {
  const author = document.getElementById('author');
  author.innerHTML = `By ${author.innerHTML}`;
}, 5000);
