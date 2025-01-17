import type { ResumeResponse } from '@/mocks/resume/schemas';

export const mockResumes: ResumeResponse[] = [
  {
    id: '1',
    postId: 'post1',
    author: {
      id: 'author1',
      snuMail: 'mail1',
      username: 'string',
      phoneNumber: 'string',
      isAdmin: false,
      localId: 'string1',
      googleId: 'string1',
    },
    content: '프론트엔드 개발자 포지션에 지원합니다.',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-01-01T10:00:00Z',
  },
  {
    id: '2',
    postId: 'post2',
    author: {
      id: 'author2',
      snuMail: 'mail2',
      username: 'string',
      phoneNumber: 'string',
      isAdmin: false,
      localId: 'string2',
      googleId: 'string2',
    },
    content: '백엔드 개발자로 지원하고 싶습니다.',
    phoneNumber: '010-2345-6789',
    createdAt: '2025-01-02T11:00:00Z',
  },
  {
    id: '3',
    postId: 'post3',
    author: {
      id: 'author3',
      snuMail: 'mail3',
      username: 'string',
      phoneNumber: 'string',
      isAdmin: false,
      localId: 'string3',
      googleId: 'string3',
    },
    content: '디자이너 포지션에 관심이 있습니다.',
    phoneNumber: '010-3456-7890',
    createdAt: '2025-01-03T12:00:00Z',
  },
  {
    id: '4',
    postId: 'post4',
    author: {
      id: 'author4',
      snuMail: 'mail4',
      username: 'string',
      phoneNumber: 'string',
      isAdmin: false,
      localId: 'string4',
      googleId: 'string4',
    },
    content: '데이터 엔지니어 지원합니다.',
    phoneNumber: '010-4567-8901',
    createdAt: '2025-01-04T13:00:00Z',
  },
  {
    id: '5',
    postId: 'post5',
    author: {
      id: 'author5',
      snuMail: 'mail5',
      username: 'string',
      phoneNumber: 'string',
      isAdmin: false,
      localId: 'string5',
      googleId: 'string5',
    },
    content: '마케터로 지원하고 싶습니다.',
    phoneNumber: '010-5678-9012',
    createdAt: '2025-01-05T14:00:00Z',
  },
];
