import httpRequest from "./base"

export const login = async ({ email, password }) => {
  try {
    const res = await httpRequest.post(`/user/login`, {
      email,
      password,
    })
    return res.data
  } catch (err) {
    console.log(err.message)
  }
}

export const register = async (body) => {
  try {
    const res = await httpRequest.post('/user/register', body)
    return res.data
  } catch (err) {
    console.log(err.message)
  }
}

export const logout = async () => {
  try {
    const res = await httpRequest.post('/user/logout')
    return res.data
  } catch(err) {
    console.log(err.message)
  }
}
