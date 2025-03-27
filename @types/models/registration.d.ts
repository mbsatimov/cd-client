type RegistrationStatus = 'BOOKED' | 'CANCELED' | 'MARKED' | 'P_MARKED';
interface Registration {
  code: string;
  createdAt: string;
  examDateTime: string;
  id: number;
  isStudent: boolean;
  location: string;
  locationUrl: string;
  registeredAt: string;
  speakingTime: string;
  status: RegistrationStatus;
  type: ExamType;
}
interface RegistrationRequest {
  isStudent: boolean;
  speakingTimeId: number;
}
type RegistrationResponse = Registration;
type RegistrationsResponse = Registration[];
