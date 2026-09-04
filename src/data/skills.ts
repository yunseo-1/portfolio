export interface SkillItem {
  id: string;
  name: string;
  description: string;
  abilities: string[];
  libraries: string[];
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}
