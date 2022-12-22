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

export const fetchComplaintById = async (id) => {
  try {
    const res = await httpRequest.get(`/complaint/${id}`)
    return res
  } catch (err) {
    console.log(err.message)
  }
}

export const updateComplaintById = async ({ id, status }) => {
  try {
    const res = await httpRequest.put(`/complaint/status/${id}`, { status })
    return res
  } catch (err) {
    console.log(err.message)
  }
}