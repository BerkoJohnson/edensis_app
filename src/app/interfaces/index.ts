export interface Election extends Document {
  title: string;
  school: string;
  academicYear: string;
  positions?: string[] | Position[];
}

export interface Payload {
  success: boolean;
  count?: number;
  errors?: string[];
}

export interface ElectionPayload extends Payload {
  data: Election[];
}

export interface Position extends Document {
  title: string;
  cast_type: "Thumbs" | "Yes/No";
  election?: string | Election;
  candidates?: string[] | Candidate[];
}

export interface PositionPayload extends Payload {
  data: Position[];
}

export interface Document {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Candidate extends Document {
  student: string | Student;
  nickname: string;
  position: string | Position;
  photo?: string;
}

export interface Student extends Document {
  name: string;
  gender: "Male" | "Female";
  room: string;
  studentID: string;
  photo?: string;
  isCandidate: boolean;
  candidate: string | Candidate;
}
