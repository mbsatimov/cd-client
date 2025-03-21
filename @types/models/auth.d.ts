interface LoginRequestData {
  password: string;
  phoneNumber: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterRequestData {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

type RegisterResponse = number;

interface VerifyResponse {
  message: string;
  token: string;
}
