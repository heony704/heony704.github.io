import Link from 'next/link';
import { withBasePath } from '@/lib/paths';

export default function NotFound() {
  return (
    <div className="page-shell narrow-page">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청한 글이 없거나 경로가 변경되었습니다.</p>
      <Link href={withBasePath('/')} className="text-link">
        홈으로 이동
      </Link>
    </div>
  );
}
