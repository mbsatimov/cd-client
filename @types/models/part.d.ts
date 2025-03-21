interface Part<T> {
  createdAt: string;
  createdBy: User;
  description: string | null;
  forCdi: boolean;
  id: number;
  isEditable: boolean;
  part: T;
  title: string;
  updatedAt: string | null;
  updatedBy: User | null;
  question: {
    id: number;
    content: any | any[];
    numberOfQuestions: number;
  };
}

interface PartRequest<T> extends Pick<Part<T>, 'description' | 'forCdi' | 'part' | 'title'> {
  question: {
    content: any | any[];
    numberOfQuestions: number;
  };
}
