import type { AuthorBriefDTO } from '@/entities/author';

export type JobMajorCategory =
  | 'DEVELOPMENT'
  | 'DESIGN'
  | 'PLANNER'
  | 'MARKETING';

type JobMinorCategoryMap = {
  DEVELOPMENT: 'FRONT' | 'APP' | 'BACKEND' | 'DATA' | 'OTHERS';
  DESIGNER: 'DESIGN';
  PLANNER: 'PLANNER';
  MARKETING: 'MARKETING';
};

export type JobMinorCategory = JobMinorCategoryMap[keyof JobMinorCategoryMap];

export const JOB_CATEGORY_MAP: Record<JobMajorCategory, JobMinorCategory[]> = {
  DEVELOPMENT: ['FRONT', 'APP', 'BACKEND', 'DATA', 'OTHERS'],
  DESIGN: ['DESIGN'],
  PLANNER: ['PLANNER'],
  MARKETING: ['MARKETING'],
};

export const JOB_MAJOR_CATEGORIES = Object.keys(JOB_CATEGORY_MAP);
export const JOB_MINOR_CATEGORIES = Object.values(JOB_CATEGORY_MAP).flat();

export type Series = 'SEED' | 'PRE_A' | 'A' | 'B' | 'C' | 'D';
export const seriesList = ['SEED', 'PRE_A', 'A', 'B', 'C', 'D'];

export type FilterElements = {
  roles?: JobMinorCategory[];
  investmentMax?: number;
  investmentMin?: number;
  pathStatus?: 0 | 1;
  series?: Series[];
};

export type Link = {
  link: string;
  description: string;
};

export type Post = {
  id: string;
  author: AuthorBriefDTO;

  // 회사 정보
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount?: number;
  investCompany: string;
  series: Series;
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink?: string;
  externalDescriptionLink?: Link[];
  tags?: { tag: string }[];

  // post 정보
  title: string;
  employmentEndDate?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  category: JobMinorCategory;
  detail: string;
  headcount: number;
  isBookmarked: boolean;
};

export type CreateCompanyRequest = Pick<
  Post,
  | 'companyName'
  | 'explanation'
  | 'email'
  | 'slogan'
  | 'investAmount'
  | 'investCompany'
  | 'series'
  | 'irDeckLink'
  | 'landingPageLink'
  | 'imageLink'
  | 'externalDescriptionLink'
  | 'tags'
>;

export type CreatePostRequest = Pick<
  Post,
  'title' | 'employmentEndDate' | 'category' | 'detail' | 'headcount'
> & { companyId: string };

export type BriefPost = Omit<
  Post,
  | 'explanation'
  | 'irDeckLink'
  | 'landingPageLink'
  | 'externalDescriptionLink'
  | 'tags'
  | 'createdAt'
  | 'updatedAt'
  | 'detail'
>;
