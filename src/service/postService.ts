import type { ServiceResponse } from '@/entities/response.ts';
import type { Apis } from '@/shared/api';
import type { PostDetailResponse, PostsResponse } from '@/shared/api/entities';

export type PostService = {
  getPosts: () => ServiceResponse<PostsResponse>;
  getPostDetail: ({
    postId,
    token,
  }: {
    postId: string;
    token: string;
  }) => ServiceResponse<PostDetailResponse>;
};

export const implPostService = ({ apis }: { apis: Apis }): PostService => ({
  getPosts: async () => {
    const { status, data } = await apis['GET /post']();

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },

  getPostDetail: async ({
    token,
    postId,
  }: {
    token: string;
    postId: string;
  }) => {
    const params = { postId };
    const { status, data } = await apis['GET /post/:postId']({ token, params });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
