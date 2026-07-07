export interface HeroSkill {
  id: string;
  name: string;
  type: 'passive' | 'skill1' | 'skill2' | 'skill3';
  cooldown: string;
  mana: string;
  tags: string[];
  description: string;
  image: string;
}

export interface HeroMockData {
  id: string;
  slug: string;
  name: string;
  chineseName: string;
  title: string;
  regionId: string; // e.g., 'truong-thanh', 'hoc-vien-tac-ha', 'trung-vuc', 'tay-vuc'
  roles: string[];
  lanes: string[];
  views: number;
  upvotes: number;
  downvotes: number;
  stats: {
    winRate: string;
    banRate: string;
    pickRate: string;
  };
  radar: {
    cong: number; // 0 - 100
    ky: number;
    kho: number;
    sinh: number;
  };
  extraInfo: string;
  skills: HeroSkill[];
  image: string;
  portrait?: string;
  element?: string;
}

export const REGIONS_MOCK = [
  { id: "trung-vuc", name: "Trung Vực - Hà Lạc" },
  { id: "dong-vuc", name: "Đông Vực - Cửu Châu" },
  { id: "nam-vuc", name: "Nam Vực - Hoang Giao" },
  { id: "vi-tay", name: "Vi Tây Lục Mạc" },
  { id: "my-nhan", name: "Mỹ Nhân" },
  { id: "tam-quoc", name: "Tam Quốc" },
  { id: "tay-vuc", name: "Tây Vực - Mạc Địa" },
  { id: "bac-vuc", name: "Bắc Vực - Băng Khâu" },
  { id: "tay-du", name: "Tây Du Ký" },
  { id: "thanh-tu", name: "Thành Tru" }
];

// Load all JSON files dynamically from the heroes directory
const heroModules = import.meta.glob('./heroes/*.json', { eager: true });

export const HEROES_MOCK_DATA: HeroMockData[] = Object.values(heroModules).map((module: any) => module.default || module);

export const getHeroBySlug = (slug: string): HeroMockData | undefined => {
  return HEROES_MOCK_DATA.find(h => h.slug === slug || h.id === slug);
};

export const getHeroesByRegion = (regionId: string): HeroMockData[] => {
  return HEROES_MOCK_DATA.filter(h => h.regionId === regionId);
};
