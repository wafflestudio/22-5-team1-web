import { useQuery } from '@tanstack/react-query';

import { TagStatus } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset';
import { CompanyNoCoffeeChat } from '@/feature/coffeeChat/ui/mypage/company/CompanyNoCoffeeChat';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getShortenedDate } from '@/util/postFormatFunctions';

type CompanyCoffeeChatListViewProps = {
  selectedChats: string[];
  setSelectedChats: React.Dispatch<React.SetStateAction<string[]>>;
  isSelectMode: boolean;
};
export const CompanyCoffeeChatListView = ({
  selectedChats,
  setSelectedChats,
  isSelectMode,
}: CompanyCoffeeChatListViewProps) => {
  const { coffeeChatListData } = useGetCoffeeChatList();
  const { toCoffeeChatDetail } = useRouteNavigation();
  const handleSelectChat = (coffeeChatId: string) => {
    setSelectedChats((prev) =>
      prev.includes(coffeeChatId)
        ? prev.filter((id) => id !== coffeeChatId)
        : [...prev, coffeeChatId],
    );
  };
  if (coffeeChatListData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  if (
    coffeeChatListData !== undefined &&
    coffeeChatListData.data.coffeeChatList.length === 0
  ) {
    return <CompanyNoCoffeeChat />;
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {coffeeChatListData !== undefined ? (
        coffeeChatListData.data.coffeeChatList.map((coffeeChat) => (
          <div key={coffeeChat.id} className="flex items-center gap-4">
            {isSelectMode && (
              <div className="flex w-[20px] items-center justify-center">
                {coffeeChat.coffeeChatStatus === 'WAITING' && (
                  <Checkbox
                    checked={selectedChats.includes(coffeeChat.id)}
                    onClick={() => {
                      handleSelectChat(coffeeChat.id);
                    }}
                  />
                )}
              </div>
            )}
            <div
              key={coffeeChat.id}
              className="relative flex h-[50px] flex-1 cursor-pointer items-center justify-between rounded-xl bg-white px-4 px-6 duration-300 hover:shadow-md"
              onClick={() => {
                toCoffeeChatDetail({ coffeeChatId: coffeeChat.id });
              }}
            >
              {coffeeChat.coffeeChatStatus === 'WAITING' && !isSelectMode && (
                <div className="absolute left-[-5px] top-[20px]">
                  <img src={ICON_SRC.BADGES} />
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="truncate text-14 font-regular text-grey-900">
                  {coffeeChat.applicant.name}
                </span>
                <span className="truncate text-12 font-regular text-grey-700">
                  {coffeeChat.positionType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-13 font-regular">
                <span className="text-grey-400">
                  {getShortenedDate(coffeeChat.createdAt)}
                </span>
                {coffeeChat.coffeeChatStatus !== 'WAITING' && (
                  <>
                    <div className="h-[18px] w-[2px] bg-grey-200"></div>
                    <span
                      className={
                        coffeeChat.coffeeChatStatus === 'ACCEPTED'
                          ? 'text-green-400'
                          : coffeeChat.coffeeChatStatus === 'REJECTED'
                            ? 'text-red-400'
                            : 'text-grey-800'
                      }
                    >
                      {getShortenedDate(coffeeChat.updatedAt)}
                    </span>
                  </>
                )}
                <TagStatus coffeeChatStatus={coffeeChat.coffeeChatStatus} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="flex h-[50px] cursor-pointer items-center justify-between rounded-md bg-white px-[24px]"
            >
              <Skeleton className="h-[18px] w-[350px]" />
              <Skeleton className="h-6 w-[80px]" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const useGetCoffeeChatList = () => {
  const { token } = useGuardContext(TokenContext);
  const { coffeeChatService } = useGuardContext(ServiceContext);

  const { data: coffeeChatListData } = useQuery({
    queryKey: ['coffeeChatService', 'getCoffeeChatList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.getCoffeeChatList({ token: t });
    },
    enabled: token !== null,
  });

  if (coffeeChatListData?.type === 'success') {
    coffeeChatListData.data.coffeeChatList.sort((a, b) => {
      if (
        a.coffeeChatStatus === 'WAITING' &&
        b.coffeeChatStatus !== 'WAITING'
      ) {
        return -1;
      }
      if (
        a.coffeeChatStatus !== 'WAITING' &&
        b.coffeeChatStatus === 'WAITING'
      ) {
        return 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  return { coffeeChatListData };
};
