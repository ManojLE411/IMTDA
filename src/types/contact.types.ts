export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Replied';
}

