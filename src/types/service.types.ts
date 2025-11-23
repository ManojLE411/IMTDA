export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string; // Icon name from lucide-react (e.g., 'Code', 'Brain', 'Cloud')
  image?: string; // Optional image URL
}

