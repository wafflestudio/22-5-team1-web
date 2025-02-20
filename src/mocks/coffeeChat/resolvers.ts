import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockCoffeeChats } from '@/mocks/coffeeChat/data';
import type {
  CoffeeChatDTO,
  CoffeeChatListResponse,
  CoffeeChatResponse,
} from '@/mocks/coffeeChat/schemas';

type CoffeeChatResolver = {
  getCoffeeChatList: HttpResponseResolver<never, never, CoffeeChatListResponse>;
  getCoffeeChatDetail: HttpResponseResolver<never, never, CoffeeChatResponse>;
  createCoffeeChat: HttpResponseResolver<never, never, CoffeeChatResponse>;
  deleteCoffeeChat: HttpResponseResolver<never, never, never>;
};

export const coffeeChatResolver: CoffeeChatResolver = {
  getCoffeeChatList: () => {
    const response = { coffeeChatList: mockCoffeeChats };
    return HttpResponse.json(response, { status: 200 });
  },

  getCoffeeChatDetail: ({ params }) => {
    const { coffeeChatId } = params;
    const response = mockCoffeeChats.find((r) => r.id === coffeeChatId);

    if (response == null) {
      return HttpResponse.json(response, { status: 404 });
    }

    return HttpResponse.json(response, { status: 200 });
  },

  createCoffeeChat: async ({ request, params }) => {
    const { postId } = params;
    const { phoneNumber, content } = await request.json();

    const newCoffeeChat: CoffeeChatDTO = {
      id: `${mockCoffeeChats.length + 1}`,
      postId,
      author: {
        id: 'newAuthor',
        snuMail: 'newMail',
        username: 'newUser',
        phoneNumber: 'newPhoneNumber',
        isAdmin: false,
        localId: 'newLocalId',
        googleId: 'newGoogleId',
      },
      content,
      phoneNumber,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(newCoffeeChat, { status: 200 });
  },

  deleteCoffeeChat: ({ params }) => {
    const { coffeeChatId } = params;
    const coffeeChatExists = mockCoffeeChats.some((r) => r.id === coffeeChatId);

    if (!coffeeChatExists) {
      return HttpResponse.json(
        { error: '이력서를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(null, { status: 200 });
  },
};
