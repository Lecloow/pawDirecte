import type { GradeValue } from "./grade-value";

export type SubjectOverview = {
  classAverage: GradeValue;
  overallAverage: GradeValue;
  subjects: {
    name: string;
    id: string;
    childSubjectId: string;
    isChildSubject: boolean;
    color: string;
    coefficient: number;
    classAverage: GradeValue;
    maxAverage: GradeValue;
    minAverage: GradeValue;
    studentAverage: GradeValue;
    outOf: GradeValue;
  }[];
};


export type GradesOverview = {
  [key: string]: SubjectOverview;
};
