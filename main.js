// GET REQUEST
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/posts',{params: {_limit: 5}})
  .then( (res) => showOutput(res))
  .catch( (err) => console.error(err) )
  console.log('GET Request');
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/posts',{title: 'NewTODO', completion: false})
  .then( (res) => showOutput(res))
  .catch( (err) => console.error(err))
  console.log('POST Request');
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.put('https://jsonplaceholder.typicode.com/posts/1',{title: 'UpdatedTODO', completion: false})
  .then( (res) => showOutput(res))
  .catch( (err) => console.error(err))
  console.log('PUT/PATCH Request');
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/posts/1')
  .then( (res) => showOutput(res))
  .catch( (err) => console.error(err))
  console.log('DELETE Request');
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/comments')
  ])
  .then( (res) => {
    showOutput(res[0])
  })
  .catch( (err) => console.error(err))
  console.log('Simultaneous Request');
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers:{
      'Content-Type' : 'application/json'
    } 
  }
  axios.post('https://jsonplaceholder.typicode.com/posts',{title: 'NewTODO', completion: false},config)
  .then( (res) => showOutput(res))
  .catch( (err) => console.error(err))
  console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options ={
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: {title: 'Hello World'},
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data
    })
  }
  axios(options)
  .then( (res) => showOutput(res))
  .catch( (err) => console.error(err))
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/postss')
  .then( (res) => showOutput(res))
  .catch( err => {
    if(error.response){
      console.log(err.response.data)
      console.log(err.response.headers)
      console.log(err.response.status)
    }
  })
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/posts',{cancelToken: source.token})
  .then( (res) => showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
      console.log('Request Cancelled',thrown.message)
    }
  })
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
// axios.interceptors.request.use( config => {
//   console.log(config.method.toUpperCase())
// })
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
