import axiosClient from "@/axios-client";


export async function login(
  setLoading: Function,
  email: String,
  password: String,
  setToken: Function,
  setUser: Function
) {
  try {
    setLoading(true);
    const response = await axiosClient.post("/auth/public/login",
      {
        email: email,
        password: password
      }
    )

    if (response?.data?.data?.access_token) {
      setUser(response?.data?.data?.user);
      localStorage.setItem("TOKEN", response?.data?.data?.access_token);
      setToken(response?.data?.data?.access_token)
    }
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export async function register(
  setLoading: Function,
  data: Object
) {
  try {
    setLoading(true);
    const response = await axiosClient.post("/auth/register",
      {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        password_confirmation: data?.password_confirmation
      }
    )
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export async function verifyEmail(
  setLoading: Function,
  code: string
) {
  try {
    setLoading(true);
    const response = await axiosClient.post("/auth/verify-email",
      {
        verification_code: code
      }
    )
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export async function loginAdmin(
  setLoading: Function,
  username: String,
  password: String,
  setToken: Function,
  setUser: Function
) {
  try {
    setLoading(true);
    const response = await axiosClient.post("/auth/admin/login",
      {
        username: username,
        password: password
      }
    )

    if (response?.data?.data?.access_token) {
      setUser(response?.data?.data?.user);
      localStorage.setItem("TOKEN", response?.data?.data?.access_token);
      setToken(response?.data?.data?.access_token)
    }
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export async function mandarCorreoRecuperacion(
  setLoading: Function,
  email: string
) {
  try {
    setLoading(true);
    const response = await axiosClient.post("/auth/forgot-password",
      {
        email: email
      }
    )
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export async function resetPassword(
  setLoading: Function,
  reset_token: string,
  password: string,
  password_confirmation: string
) {
  try {
    setLoading(true);
    const response = await axiosClient.post("/auth/reset-password",
      {
        reset_token: reset_token,
        password: password,
        password_confirmation: password_confirmation
      }
    )
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}