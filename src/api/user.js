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