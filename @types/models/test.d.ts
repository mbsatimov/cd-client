interface Test {
  createdAt: string;
  createdBy: User;
  description: string | null;
  forCdi: boolean;
  id: number;
  title: string;
  updatedAt: string;
  updatedBy: User;
}

interface TestRequest extends Pick<Test, 'description' | 'forCdi' | 'title'> {}
