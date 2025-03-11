import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '../../entities';
import type {
  BookmarkPageParams,
  ChangePasswordRequest,
  CheckSnuMailVerificationRequest,
  CoffeeChatIdParams,
  CoffeeChatListResponse,
  CoffeeChatResponse,
  CreateAndUpdatePostRequest,
  CreateCoffeeChatRequest,
  CreateCompanyRequest,
  CreatePostRequest,
  FileUploadRequest,
  MailRequest,
  PositionRespone,
  PostBriefDTO,
  PostDetailResponse,
  PostIdParams,
  PostPathParams,
  PostsResponse,
  PresignedUrlResponse,
  SignInRequest,
  SignUpRequest,
  SnuMailRequest,
  TokenResponse,
  UserResponse,
  UserWithTokenResponse,
} from './schemas';

type GetApisProps = {
  callWithToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token: string },
  ) => Promise<R | ErrorResponse>;
  callWithoutToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: never },
  ) => Promise<R | ErrorResponse>;
  callWithOptionalToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: string },
  ) => Promise<R | ErrorResponse>;
};

type Api = (_: {
  body: never;
  token: string;
  params: never;
  query: never;
}) => Promise<{ status: number; data: unknown }>;

export const getLocalServerApis = ({
  callWithToken,
  callWithoutToken,
  callWithOptionalToken,
}: GetApisProps) =>
  ({
    'POST /user': ({ body }: { body: SignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user',
        body,
      }),
    'POST /user/auth': ({ body }: { body: SignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/auth',
        body,
      }),
    'DELETE /user/auth': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: 'user/auth',
        token,
      }),
    'GET /user/token': () =>
      callWithoutToken<SuccessResponse<TokenResponse>>({
        method: 'GET',
        path: 'user/token',
      }),
    'POST /user/mail': ({ body }: { body: MailRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/mail',
        body,
      }),
    'POST /user/snu-mail/verification': ({ body }: { body: SnuMailRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/snu-mail/verification',
        body,
      }),
    'POST /user/snu-mail/verification/validate': ({
      body,
    }: {
      body: CheckSnuMailVerificationRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/snu-mail/verification/validate',
        body,
      }),
    'DELETE /user': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: 'user',
        token,
      }),
    'PATCH /user/password': ({
      token,
      body,
    }: {
      token: string;
      body: ChangePasswordRequest;
    }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'PATCH',
        path: 'user/password',
        body,
        token,
      }),
    'POST /user/password': ({ body }: { body: MailRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/password',
        body,
      }),
    'GET /user/me': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: 'GET',
        path: 'user/me',
        token,
      }),
    'GET /post': ({
      params,
      token,
    }: {
      params: PostPathParams;
      token?: string;
    }) =>
      callWithOptionalToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post?${params.postPath}`,
        token,
      }),
    'GET /post/:postId': ({
      token,
      params,
    }: {
      token?: string;
      params: PostIdParams;
    }) =>
      callWithOptionalToken<SuccessResponse<PostDetailResponse>>({
        method: 'GET',
        path: `post/${params.postId}`,
        token,
      }),
    'POST /admin/post': ({
      token,
      body,
    }: {
      token: string;
      body: CreateAndUpdatePostRequest;
    }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: 'POST',
        path: 'admin/post',
        token,
        body,
      }),
    'PATCH /admin/post/:postId': ({
      token,
      params,
      body,
    }: {
      token: string;
      params: PostIdParams;
      body: CreateAndUpdatePostRequest;
    }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: 'PATCH',
        path: `admin/post/${params.postId}`,
        token,
        body,
      }),
    'GET /coffeeChat/:coffeeChatId': ({
      token,
      params,
    }: {
      token: string;
      params: CoffeeChatIdParams;
    }) => {
      return callWithToken<SuccessResponse<CoffeeChatResponse>>({
        method: 'GET',
        path: `coffeeChat/${params.coffeeChatId}`,
        token,
      });
    },
    'GET /coffeeChat': ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<CoffeeChatListResponse>>({
        method: 'GET',
        path: 'coffeeChat',
        token,
      });
    },
    'POST /coffeeChat/:postId': ({
      token,
      params,
      body,
    }: {
      token: string;
      params: PostIdParams;
      body: CreateCoffeeChatRequest;
    }) => {
      return callWithToken<SuccessResponse<CoffeeChatResponse>>({
        method: 'POST',
        path: `coffeeChat/${params.postId}`,
        token,
        body,
      });
    },
    'DELETE /coffeeChat/:coffeeChatId': ({
      token,
      params,
    }: {
      token: string;
      params: CoffeeChatIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: `coffeeChat/${params.coffeeChatId}`,
        token,
      });
    },
    'POST /post/upload/presigned': ({
      token,
      body,
    }: {
      token: string;
      body: FileUploadRequest;
    }) => {
      return callWithToken<SuccessResponse<PresignedUrlResponse>>({
        method: 'POST',
        path: 'post/upload/presigned',
        token,
        body,
      });
    },
    'POST /post/:postId/bookmark': ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'POST',
        path: `post/${params.postId}/bookmark`,
        token,
      });
    },
    'GET /post/bookmarks': ({
      token,
      params,
    }: {
      token: string;
      params: BookmarkPageParams;
    }) => {
      if (params.bookmarkPage === undefined) {
        return callWithToken<SuccessResponse<PostsResponse>>({
          method: 'GET',
          path: `post/bookmarks`,
          token,
        });
      }
      return callWithToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post/bookmarks?${params.bookmarkPage}`,
        token,
      });
    },
    'DELETE /post/:postId/bookmark': ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: `post/${params.postId}/bookmark`,
        token,
      });
    },
    'POST /post/company': ({
      token,
      body,
    }: {
      token: string;
      body: CreateCompanyRequest;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'post/company',
        token,
        body,
      });
    },
    'POST /post/position': ({
      token,
      body,
    }: {
      token: string;
      body: CreatePostRequest;
    }) => {
      return callWithToken<SuccessResponse<PositionRespone>>({
        method: 'POST',
        path: `post/position`,
        token,
        body,
      });
    },
    'GET /post/company/me': ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<PostBriefDTO[]>>({
        method: 'GET',
        path: 'post/company/me',
        token,
      });
    },
    'GET /post/position/me': ({
      token,
      params,
    }: {
      token: string;
      params: PostPathParams;
    }) => {
      return callWithToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post/position/me?${params.postPath}`,
        token,
      });
    },
  }) satisfies Record<string, Api>;
