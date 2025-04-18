import { useState } from 'react';

import type { CoffeeChatCompany } from '@/api/apis/localServer/schemas';
import { FormErrorResponse } from '@/components/response/formResponse';
import { TagStatus } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApplicantInfoForCoffeeChat } from '@/feature/coffeeChat/ui/detail/ApplicantInfoForCoffeeChat';
import { SkeletonCoffeeChatDetailView } from '@/feature/coffeeChat/ui/detail/SkeletonCoffeeChatDetailView';
import {
  useGetCoffeeChatDetail,
  useUpdateCoffeeChatStatus,
} from '@/feature/coffeeChat/ui/detail/useCoffeeChatDetailHooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getFormatDate } from '@/util/postFormatFunctions';

export const CoffeeChatDetailView = ({
  coffeeChatId,
}: {
  coffeeChatId: string;
}) => {
  const [responseMessage, setResponseMessage] = useState('');
  const { coffeeChatDetailData } = useGetCoffeeChatDetail({ coffeeChatId });
  const { toMyPage } = useRouteNavigation();
  const { updateCoffeeChatStatus, isPending } = useUpdateCoffeeChatStatus({
    setResponseMessage,
  });

  const handleStatusChange = (status: 'ACCEPTED' | 'REJECTED') => {
    updateCoffeeChatStatus({
      coffeeChatList: [coffeeChatId],
      coffeeChatStatus: status,
    });
  };

  if (coffeeChatDetailData === undefined) {
    return <SkeletonCoffeeChatDetailView />;
  }

  if (coffeeChatDetailData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  const coffeeChatDetail = coffeeChatDetailData.data as CoffeeChatCompany;
  const isWaiting = coffeeChatDetail.coffeeChatStatus === 'WAITING';

  return (
    <div>
      <div className="mx-auto flex w-full px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <div className="flex w-full flex-col gap-6 gap-[28px] rounded-lg bg-white px-[40px] py-[46px] text-grey-900">
          <div className="flex items-center justify-between">
            <h1 className="text-30 font-bold">커피챗 신청서</h1>
            <div className="flex items-center gap-2">
              <span className="font-regular text-grey-600">
                {getFormatDate(coffeeChatDetail.createdAt)}
              </span>
              <TagStatus coffeeChatStatus={coffeeChatDetail.coffeeChatStatus} />
            </div>
          </div>
          <ApplicantInfoForCoffeeChat applicant={coffeeChatDetail.applicant} />
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-22 font-bold">커피챗 신청 내용</h3>
            <p className="whitespace-pre-wrap font-regular text-gray-700">
              {coffeeChatDetail.content}
            </p>
          </div>
          <div className="flex gap-[10px] pt-[52px]">
            <Button
              variant="secondary"
              onClick={() => {
                toMyPage({ query: { tab: 'COFFEE_CHAT' } });
              }}
              className="flex-1"
              disabled={isPending}
            >
              목록으로
            </Button>
            <Button
              variant="default"
              onClick={() => {
                handleStatusChange('ACCEPTED');
              }}
              className="flex-1"
              disabled={isPending || !isWaiting}
            >
              성사시키기
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleStatusChange('REJECTED');
              }}
              className="flex-1"
              disabled={isPending || !isWaiting}
            >
              거절하기
            </Button>
          </div>
        </div>
      </div>

      {responseMessage !== '' && (
        <FormErrorResponse>{responseMessage}</FormErrorResponse>
      )}
    </div>
  );
};
