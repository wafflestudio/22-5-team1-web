// filter

export type RoleCategory =
  | 'PLANNER'
  | 'FRONT'
  | 'APP'
  | 'BACKEND'
  | 'DESIGN'
  | 'DATA'
  | 'MARKETER';

export const ROLE_CATEGORY_LIST: RoleCategory[] = [
  'PLANNER',
  'FRONT',
  'APP',
  'BACKEND',
  'DESIGN',
  'DATA',
  'MARKETER',
];

export type FilterElements = {
  roles?: RoleCategory[];
  investment?: number;
  pathStatus?: 0 | 1 | 2;
};