/**
 * Icon mapping utility for services
 * Maps icon name strings to Lucide React icon components
 */

import {
  Code, Cloud, Brain, Database, Smartphone, Shield, Zap, Globe,
  BarChart3, Settings, Cpu, Video, PenTool, BookOpen, Briefcase,
  Mail, Phone, Camera, Code2, Server, Workflow, TrendingUp
} from 'lucide-react';

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Cloud,
  Brain,
  Database,
  Smartphone,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Settings,
  Cpu,
  Video,
  PenTool,
  BookOpen,
  Briefcase,
  Mail,
  Phone,
  Camera,
  Code2,
  Server,
  Workflow,
  TrendingUp,
};

export const getIcon = (iconName: string) => {
  return iconMap[iconName] || Code;
};

