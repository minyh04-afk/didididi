'use client';

import BottomNav from '@/components/BottomNav';
import { currentUser } from '@/lib/mockData';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-900">👤 프로필</h1>
          <button className="text-gray-600 hover:text-gray-900">✏️</button>
        </div>

        {/* 프로필 카드 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h2>
          <p className="text-gray-600 text-sm mb-4">
            {currentUser.gender === 'F' ? '여성' : '남성'} | {currentUser.region}
          </p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">{currentUser.experience}</div>
            <div className="text-sm text-gray-600 mt-1">경험</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-3xl font-bold text-purple-600">{currentUser.followers}</div>
            <div className="text-sm text-gray-600 mt-1">팔로워</div>
          </div>
        </div>

        {/* 뱃지 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="font-bold text-lg text-gray-900 mb-4">🏆 뱃지</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-medium text-gray-900">리뷰 작성왕</p>
                <p className="text-xs text-gray-600">리뷰 15개 작성</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">👥</span>
              <div>
                <p className="font-medium text-gray-900">팀매칭 마스터</p>
                <p className="text-xs text-gray-600">25회 참여</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-medium text-gray-900">성공률 80% 달성</p>
                <p className="text-xs text-gray-600">24/30 성공</p>
              </div>
            </div>
          </div>
        </div>

        {/* 소개 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="font-bold text-lg text-gray-900 mb-3">소개</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            취미는 방탈출 ♥️ 매주 토요일에 강남에서 플레이중! 새로운 테마와 팀원을 찾고 있습니다.
          </p>
        </div>

        {/* 설정 */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
          <h3 className="font-bold text-lg text-gray-900 px-2">🔧 설정</h3>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between text-gray-700">
            <span>알림 설정</span>
            <span>→</span>
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between text-gray-700 border-t border-gray-200 pt-3">
            <span>개인정보 수정</span>
            <span>→</span>
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between text-gray-700 border-t border-gray-200 pt-3">
            <span>팔로우 관리</span>
            <span>→</span>
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between text-gray-700 border-t border-gray-200 pt-3">
            <span>로그아웃</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
