import Link from 'next/link';
import { Theme, Review, calculateTrustScore, getDifficultyLabel } from '@/lib/mockData';

interface ThemeCardProps {
  theme: Theme;
  reviews: Review[];
  showSpoilerFree?: boolean;
}

export default function ThemeCard({
  theme,
  reviews,
  showSpoilerFree = false,
}: ThemeCardProps) {
  const themeReviews = reviews.filter((r) => r.themeId === theme.id);

  // 스포일러 필터링
  const filteredReviews = showSpoilerFree
    ? themeReviews.filter((r) => !r.hasSpoiler)
    : themeReviews;

  const avgRating =
    filteredReviews.length > 0
      ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
      : '데이터 없음';

  return (
    <Link href={`/discover/${theme.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {/* 테마 이미지 영역 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center">
          <div className="text-6xl mb-2">{theme.image}</div>
          <h3 className="font-bold text-lg text-gray-900">{theme.name}</h3>
        </div>

        {/* 정보 영역 */}
        <div className="p-4 space-y-3">
          {/* 평점 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-bold text-lg">{avgRating}</span>
              <span className="text-xs text-gray-500">
                ({filteredReviews.length}개 리뷰)
              </span>
            </div>
            {showSpoilerFree && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                스포일러X
              </span>
            )}
          </div>

          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">난이도:</span>
              <span className="ml-1 font-medium">{getDifficultyLabel(theme.difficulty)}</span>
            </div>
            <div>
              <span className="text-gray-600">지역:</span>
              <span className="ml-1 font-medium">{theme.region}</span>
            </div>
            <div>
              <span className="text-gray-600">가격:</span>
              <span className="ml-1 font-medium">{theme.price.toLocaleString()}원</span>
            </div>
            <div>
              <span className="text-gray-600">인원:</span>
              <span className="ml-1 font-medium">{theme.minPeople}~{theme.maxPeople}명</span>
            </div>
          </div>

          {/* 상세보기 버튼 */}
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
            상세보기
          </button>
        </div>
      </div>
    </Link>
  );
}
