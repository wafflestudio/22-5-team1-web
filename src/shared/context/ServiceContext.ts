import { createContext } from 'react';

import type { EchoService } from '@/service/echoService';

export type ServiceContext = {
  echoService: EchoService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
