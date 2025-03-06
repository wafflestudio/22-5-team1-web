export const PATH = {
  INDEX: '/',
  POST_DETAIL: '/post/:postId',
  SIGN_IN_SELECT: '/signin',
  SIGN_UP_SELECT: '/signup',
  SIGN_UP_LOCAL: '/signup/local',
  SIGN_UP_COMPLETE: '/signup/complete',
  FIND_ACCOUNT: '/find-account',
  VERIFY_EMAIL: '/verify-email',
  MY_PAGE: '/mypage',
  CREATE_COFFEE_CHAT: '/post/:postId/coffeeChat/create',
  COFFEE_CHAT_LIST: '/coffeeChat',
  COFFEE_CHAT_DETAIL: '/coffeeChat/:coffeeChatId',
  CREATE_COMPANY: '/company/create',
  CREATE_POST: '/post/create/:companyId',
  CREATE_PROFILE: '/profile/create',
  MAKE: {
    POST_DETAIL: (postId: string) => `/post/${postId}`,
    CREATE_COFFEE_CHAT: (postId: string) => `/post/${postId}/coffeeChat/create`,
    COFFEE_CHAT_DETAIL: (coffeeChatId: string) => `/coffeeChat/${coffeeChatId}`,
    CREATE_POST: (companyId: string) => `/post/create/${companyId}`,
  },
};
