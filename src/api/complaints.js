import httpRequest from "./base";

export const fetchAllComplaints = async () => {
  try {
    const res = await httpRequest.get('/complaint')
    return res.data
  } catch (err) {
    console.log(err.message)
  }
}

export const sendComplaints = async () => {
  try {
    const res = await httpRequest.post('/complaint')
    return res
  } catch (err) {
    console.log(err.message)
  }
}
