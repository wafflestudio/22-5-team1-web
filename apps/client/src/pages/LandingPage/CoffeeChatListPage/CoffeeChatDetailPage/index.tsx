import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext.ts';

export const CoffeeChatDetailPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  if (resumeId === undefined) {
    throw new Error('잘못된 접근입니다.');
  }

  const { resumeDetailData } = useGetCoffeeChatDetail({ resumeId });

  if (resumeDetailData === undefined) {
    return <div>로딩중...</div>;
  }

  if (resumeDetailData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const resumeDetail = resumeDetailData.data;

  return (
    <>
      <p>{resumeDetail.id}</p>
      <p>{resumeDetail.content}</p>
    </>
  );
};

const useGetCoffeeChatDetail = ({ resumeId }: { resumeId: string }) => {
  const { token } = useGuardContext(TokenContext);
  const { resumeService } = useGuardContext(ServiceContext);

  const { data: resumeDetailData } = useQuery({
    queryKey: ['user', 'resume', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return resumeService.getResumeDetail({ token: t, resumeId: resumeId });
    },
    enabled: token !== null,
  });

  return { resumeDetailData: resumeDetailData };
};
