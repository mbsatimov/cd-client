type UserRole =
  | 'ADMIN'
  | 'PLACEMENT_TAKER'
  | 'PLACEMENT_TESTER'
  | 'SUPER_ADMIN'
  | 'TEACHER'
  | 'USER';

interface User {
  balance: number;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  student: boolean;
}

type UserResponse = User;
