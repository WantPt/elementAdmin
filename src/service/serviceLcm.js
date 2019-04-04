import axios from './service'

export function list(page) {
  return axios.post('/ms/table/list',{page}).then(res=>{
    return res.data;
  }).catch(err => {
    return err
  })
}