import httpRequest from "./base";

export const fetchAllComplaints = async () => {
  try {
    const res = await httpRequest.get('/complaint')
    return res.data
  } catch (err) {
    console.log(err.message)
  }
}

export const sendComplaints = async ({
  nameAffected,
  sender,
  selfAffected,
  hospitalName,
  facility,
  createdAt,
  description,
  files,
  status,
  type
}) => {
  try {
    const res = await httpRequest.post('/complaint', {
      nameAffected,
      sender,
      selfAffected,
      hospitalName,
      facility,
      createdAt,
      description,
      files,
      complainReplies: [],
      status,
      type
    })
    return res
  } catch (err) {
    console.log(err.message)
  }
}

export const fetchComplaintById = async (id) => {
  try {
    const res = await httpRequest.get(`/complaint/${id}`)
    return res
  } catch(err) {
    console.log(err.message)
  }
}
