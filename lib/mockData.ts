// Mock 데이터: 사용자, 테마, 리뷰

export interface User {
  id: string;
  name: string;
  gender: 'M' | 'F';
  experience: number; // 경험한 방탈출 횟수
  followers: number;
  region: string;
}

export interface Theme {
  id: string;
  name: string;
  region: string;
  difficulty: 'easy' | 'medium' | 'hard';
  price: number;
  minPeople: number;
  maxPeople: number;
  duration: number; // 분 단위
  image: string;
}

export interface Review {
  id: string;
  themeId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  hasSpoiler: boolean;
  likes: number;
  createdAt: string;
}

export interface MyExperience {
  id: string;
  userId: string;
  themeId: string;
  themeName: string;
  date: string;
  success: boolean;
  duration: number;
  rating?: number;
  review?: string;
  hasSpoiler?: boolean;
}

// 현재 로그인한 사용자
export const currentUser: User = {
  id: 'user_001',
  name: '김지은',
  gender: 'F',
  experience: 30,
  followers: 47,
  region: '강남',
};

// 테마 목록
export const themes: Theme[] = [
  {
    id: 'theme_001',
    name: '어쩌다 탈출',
    region: '강남 신사',
    difficulty: 'medium',
    price: 25000,
    minPeople: 2,
    maxPeople: 4,
    duration: 60,
    image: '🏢',
  },
  {
    id: 'theme_002',
    name: '탈출불가능 시즌2',
    region: '강남 교대',
    difficulty: 'hard',
    price: 30000,
    minPeople: 2,
    maxPeople: 4,
    duration: 60,
    image: '🔒',
  },
  {
    id: 'theme_003',
    name: '비밀의 문',
    region: '강남 역삼',
    difficulty: 'medium',
    price: 28000,
    minPeople: 2,
    maxPeople: 5,
    duration: 50,
    image: '🚪',
  },
  {
    id: 'theme_004',
    name: '미스터리 하우스',
    region: '강남 삼성',
    difficulty: 'easy',
    price: 22000,
    minPeople: 2,
    maxPeople: 4,
    duration: 45,
    image: '🏚️',
  },
  {
    id: 'theme_005',
    name: '시간의 성',
    region: '강남 논현',
    difficulty: 'hard',
    price: 32000,
    minPeople: 3,
    maxPeople: 5,
    duration: 70,
    image: '🏰',
  },
];

// 리뷰 목록
export const reviews: Review[] = [
  {
    id: 'review_001',
    themeId: 'theme_001',
    userId: 'user_kim',
    userName: '김지은',
    rating: 5,
    content: '정말 재밌었어요! 친구들과 함께해서 더 좋았어요',
    hasSpoiler: false,
    likes: 24,
    createdAt: '2026-06-15',
  },
  {
    id: 'review_002',
    themeId: 'theme_001',
    userId: 'user_lee',
    userName: '이소정',
    rating: 4,
    content: '재미있었지만 조금 어려웠어요',
    hasSpoiler: false,
    likes: 8,
    createdAt: '2026-06-10',
  },
  {
    id: 'review_003',
    themeId: 'theme_001',
    userId: 'user_park',
    userName: '박준호',
    rating: 3,
    content: '중급 난이도라고 했는데 좀 더 어렵네요',
    hasSpoiler: true,
    likes: 5,
    createdAt: '2026-06-08',
  },
  {
    id: 'review_004',
    themeId: 'theme_002',
    userId: 'user_min',
    userName: '최민서',
    rating: 4,
    content: '정말 도전적인 테마! 강력 추천합니다',
    hasSpoiler: false,
    likes: 12,
    createdAt: '2026-06-12',
  },
  {
    id: 'review_005',
    themeId: 'theme_003',
    userId: 'user_kim',
    userName: '김지은',
    rating: 4,
    content: '좋은 테마네요. 스토리가 몰입감 있어요',
    hasSpoiler: false,
    likes: 6,
    createdAt: '2026-06-05',
  },
];

// 사용자의 경험 기록
export const myExperiences: MyExperience[] = [
  {
    id: 'exp_001',
    userId: 'user_001',
    themeId: 'theme_001',
    themeName: '어쩌다 탈출',
    date: '2026-06-15',
    success: true,
    duration: 28,
    rating: 5,
    review: '정말 재밌었어요',
    hasSpoiler: false,
  },
  {
    id: 'exp_002',
    userId: 'user_001',
    themeId: 'theme_002',
    themeName: '탈출불가능 시즌2',
    date: '2026-06-08',
    success: false,
    duration: 60,
  },
  {
    id: 'exp_003',
    userId: 'user_001',
    themeId: 'theme_003',
    themeName: '비밀의 문',
    date: '2026-06-01',
    success: true,
    duration: 42,
    rating: 4,
  },
];

// 신뢰도 점수 계산
export function calculateTrustScore(review: Review, author: User): number {
  const baseScore = review.rating;
  const spoilerBonus = review.hasSpoiler ? 0.8 : 1.2;
  const followerBonus = author.followers >= 100 ? 0.3 : author.followers >= 50 ? 0.2 : author.followers >= 10 ? 0.1 : 0;
  const experienceBonus = author.experience >= 50 ? 0.3 : author.experience >= 30 ? 0.2 : author.experience >= 10 ? 0.1 : 0;

  return Math.min(5, Math.round((baseScore * spoilerBonus + followerBonus + experienceBonus) * 10) / 10);
}

// 난이도 라벨
export function getDifficultyLabel(difficulty: string): string {
  const map: Record<string, string> = {
    easy: '초급',
    medium: '중급',
    hard: '상급',
  };
  return map[difficulty] || difficulty;
}

// 결과 라벨
export function getResultLabel(success: boolean): string {
  return success ? '✅ 성공' : '❌ 실패';
}
