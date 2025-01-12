import { createContext } from 'react';

import type { AuthService } from '@/service/authService';
import type { EchoService } from '@/service/echoService';
import type { PostService } from '@/service/postService.ts';
import type { UserService } from '@/service/userService';

export type ServiceContext = {
  echoService: EchoService;
  authService: AuthService;
  postService: PostService;
  userService: UserService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);