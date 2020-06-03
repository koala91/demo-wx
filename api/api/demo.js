import Request from '../request'

const req = new Request()

const  demo = {
  index (data) {
    return req.get('/index', data)
  },
  delete () {
    return req.delete('/delete')
  },
  post (data) {
    return req.post('/post', data)
  },
  put (id, data) {
    return req.put(`/put/${id}`, data)
  }
}

export default demo