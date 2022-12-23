import httpRequest from "./base";

export const fetchHospitals = async () => {
  try {
    const res = await httpRequest.get('/hospital')
    return res.data
  } catch (err) {
    console.log(err.message)
  }
}