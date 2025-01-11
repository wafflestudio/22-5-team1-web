import { useQuery } from '@tanstack/react-query';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';

interface UseGetPostsProps {
  page?: number;
  roles?: string[];
  investment?: number;
  investor?: string;
  pathStatus?: number;
}

export const useGetPosts = ({
  page = 0,
  roles,
  investment,
  investor,
  pathStatus,
}: UseGetPostsProps) => {
  const { postService } = useGuardContext(ServiceContext);

  const { data } = useQuery({
    queryKey: [
      'postService',
      'getPosts',
      page,
      roles,
      investment,
      investor,
      pathStatus,
    ],
    queryFn: async () => {
      const response = await postService.getPosts({
        page,
        roles,
        investment,
        investor,
        pathStatus,
      });
      if (response.type === 'success') {
        return response.data;
      }
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    },
  });

  return { data };
};