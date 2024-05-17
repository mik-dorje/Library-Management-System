export interface IStudentInvolvement {
    id: number;
    testType: string;
    studentsEnrolled: number;
    inProgress: number;
    completed: number;
  }
  
  export interface IConsultancyBooked {
    id: number;
    consultancyName: string;
    noOfStudents: number;
    location: string;
  }
  export interface IStudentList {
    id: number;
    studentName: string;
    notes: string;
    testStatus: string;
  }
  