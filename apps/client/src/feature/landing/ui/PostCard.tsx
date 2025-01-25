import type { BriefPost } from '@/entities/post';

type PostCardProps = {
  post: BriefPost;
  onDetailClick: (postId: string) => void;
};

export const PostCard = ({ post, onDetailClick }: PostCardProps) => {
  const {
    id,
    companyName,
    slogan,
    title,
    series,
    isActive,
    imageLink,
    investAmount,
    employmentEndDate,
  } = post;

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-sm bg-white
    hover:shadow-md cursor-pointer transition-shadow"
      onClick={() => {
        onDetailClick(id);
      }}
    >
      {/* 직군 & 마감일 */}
      <div className="relative">
        <div className="flex justify-between items-center rounded-t-lg pl-5 pr-5 p-3 bg-gray-200 relative">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_2490_3958"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2490_3958)">
                <path
                  d="M12 11.6921C11.0375 11.6921 10.2136 11.3495 9.52825 10.6641C8.84275 9.97864 8.5 9.15464 8.5 8.19214C8.5 7.22964 8.84275 6.40572 9.52825 5.72039C10.2136 5.03489 11.0375 4.69214 12 4.69214C12.9625 4.69214 13.7864 5.03489 14.4718 5.72039C15.1573 6.40572 15.5 7.22964 15.5 8.19214C15.5 9.15464 15.1573 9.97864 14.4718 10.6641C13.7864 11.3495 12.9625 11.6921 12 11.6921ZM4.5 17.7884V17.0844C4.5 16.5947 4.633 16.1412 4.899 15.7239C5.165 15.3066 5.5205 14.9857 5.9655 14.7614C6.95383 14.2769 7.95092 13.9135 8.95675 13.6711C9.96258 13.4288 10.977 13.3076 12 13.3076C13.023 13.3076 14.0374 13.4288 15.0433 13.6711C16.0491 13.9135 17.0462 14.2769 18.0345 14.7614C18.4795 14.9857 18.835 15.3066 19.101 15.7239C19.367 16.1412 19.5 16.5947 19.5 17.0844V17.7884C19.5 18.2101 19.3523 18.5687 19.0568 18.8644C18.7613 19.1599 18.4026 19.3076 17.9808 19.3076H6.01925C5.59742 19.3076 5.23875 19.1599 4.94325 18.8644C4.64775 18.5687 4.5 18.2101 4.5 17.7884ZM6 17.8076H18V17.0844C18 16.8819 17.9413 16.6944 17.824 16.5219C17.7067 16.3496 17.5474 16.2089 17.3462 16.0999C16.4846 15.6756 15.6061 15.3541 14.7107 15.1354C13.8152 14.9169 12.9117 14.8076 12 14.8076C11.0883 14.8076 10.1848 14.9169 9.28925 15.1354C8.39392 15.3541 7.51542 15.6756 6.65375 16.0999C6.45258 16.2089 6.29333 16.3496 6.176 16.5219C6.05867 16.6944 6 16.8819 6 17.0844V17.8076ZM12 10.1921C12.55 10.1921 13.0208 9.99631 13.4125 9.60464C13.8042 9.21297 14 8.74214 14 8.19214C14 7.64214 13.8042 7.17131 13.4125 6.77964C13.0208 6.38797 12.55 6.19214 12 6.19214C11.45 6.19214 10.9792 6.38797 10.5875 6.77964C10.1958 7.17131 10 7.64214 10 8.19214C10 8.74214 10.1958 9.21297 10.5875 9.60464C10.9792 9.99631 11.45 10.1921 12 10.1921Z"
                  fill="#383B41"
                />
              </g>
            </svg>
            <span className="text-lg text-gray-600">{title}</span>
          </div>
          <span className="text-lg text-gray-400">
            {getEmploymentStatus(employmentEndDate)}
          </span>
        </div>
        {/* 삼각형 */}
        <div
          className="text-lg absolute bottom-[-10px] right-4 transform -translate-x-1/2
      w-0 h-0 border-l-[10px] border-l-transparent
      border-r-[10px] border-r-transparent
      border-t-[10px] border-t-gray-200"
        ></div>
      </div>

      {/* 회사 정보 */}
      <div
        className="flex items-center gap-3
      pl-5 pr-5 p-4"
      >
        {/* 회사 이미지 */}
        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
          <img
            src={imageLink}
            alt={companyName}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">{companyName}</h3>
        </div>
      </div>

      <div className="text-lg text-gray-600 pl-5 pr-5 p-4">{slogan}</div>

      {/* 시리즈 및 투자 정보 */}
      <div
        className="flex items-center gap-2
      p-5"
      >
        <span
          className={`px-2 py-1 text-xs rounded ${
            series === 'PRE_A' || series === 'A'
              ? 'bg-blue-100 text-blue-900'
              : series === 'B'
                ? 'bg-red-100 text-red-900'
                : series === 'C'
                  ? 'bg-green-100 text-green-900'
                  : series === 'D'
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'bg-gray-100 text-gray-800'
          }`}
        >
          {series === 'PRE_A'
            ? 'Pre-Series A'
            : series.length === 1
              ? `Series ${series}`
              : 'Seed'}
        </span>
        {investAmount != null && (
          <span className="px-2 py-1 bg-gray-200 text-xs rounded">
            투자 누적 {investAmount.toLocaleString()}억
          </span>
        )}
        {isActive && (
          <span className="px-2 py-1 bg-gray-200 text-xs rounded">추천</span>
        )}
      </div>
    </div>
  );
};

const getEmploymentStatus = (employmentEndDate: string): string => {
  if (employmentEndDate === '') return '상시';

  const daysLeft = Math.ceil(
    (new Date(employmentEndDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return daysLeft >= 0 ? `D-${daysLeft}` : '마감';
};
