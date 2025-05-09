import type { Input, InputForForm, SelectInput } from '@/entities/input';
import type { JobMajorCategory, JobMinorCategory } from '@/entities/post';
import { JOB_CATEGORY_MAP } from '@/entities/post';
import type { PostInputPresentation } from '@/feature/post/presentation/postInputPresentation';

type InitialState = {
  title?: string;
  job?: JobMinorCategory | 'NONE';
  headcount?: number;
  salary?: number;
  detail?: string;
  employmentEndDateTime?: string;
};

type PostFormPresentation = {
  useValidator({
    initialState,
    postInputPresentation,
  }: {
    initialState?: InitialState;
    postInputPresentation: PostInputPresentation;
  }): {
    inputStates: {
      title: Input<string>;
      jobMajorCategory: SelectInput<JobMajorCategory>;
      jobMinorCategory: SelectInput<JobMinorCategory | 'NONE'>;
      headcount: Input<string>;
      salary: Input<string>;
      detail: Input<string>;
      employmentEndDate: Input<string>;
    };
    formStates: {
      title: InputForForm<string>;
      job: InputForForm<JobMinorCategory | 'NONE'>;
      headcount: InputForForm<number>;
      salary: InputForForm<number>;
      detail: InputForForm<string>;
      employmentEndDateTime: InputForForm<string>;
    };
  };
};

const DATE_TIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

export const postFormPresentation: PostFormPresentation = {
  useValidator: ({ initialState, postInputPresentation }) => {
    const getJobMajorCategory = (
      target: JobMinorCategory | 'NONE',
    ): JobMajorCategory | undefined => {
      if (target === 'NONE') {
        return 'DEVELOPMENT';
      }
      return Object.entries(JOB_CATEGORY_MAP).find(([_, values]) =>
        values.includes(target),
      )?.[0] as JobMajorCategory | undefined;
    };

    const initialStateForInput = {
      title: initialState?.title,
      jobMajorCategory:
        initialState?.job !== undefined
          ? getJobMajorCategory(initialState.job)
          : undefined,
      jobMinorCategory: initialState?.job,
      headcount:
        initialState?.headcount !== undefined
          ? String(initialState.headcount)
          : undefined,
      salary:
        initialState?.salary !== undefined
          ? String(initialState.salary)
          : undefined,
      detail: initialState?.detail,
      employmentEndDate: initialState?.employmentEndDateTime,
    };

    const {
      title,
      jobMajorCategory,
      jobMinorCategory,
      headcount,
      salary,
      detail,
      employmentEndDate,
    } = postInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    const employmentEndDateTime =
      employmentEndDate.value.trim().length !== 0
        ? `${employmentEndDate.value}T23:59:59`
        : '';

    const checkOverToday = (datetime: string) => {
      if (datetime.trim().length === 0) {
        return true;
      }

      const currentDateTime = new Date(); // 현재 시각
      const employmentEndDateTimeObj = new Date(employmentEndDateTime);

      return employmentEndDateTimeObj > currentDateTime;
    };

    return {
      inputStates: {
        title,
        jobMajorCategory,
        jobMinorCategory,
        headcount,
        salary,
        detail,
        employmentEndDate,
      },
      formStates: {
        title: {
          isError: title.isError || title.value.length === 0,
          value: title.value,
        },
        job: {
          isError: jobMinorCategory.isError,
          value: jobMinorCategory.value,
        },
        headcount: {
          isError:
            headcount.value === '' ||
            isNaN(Number(headcount.value)) ||
            Number(headcount.value) < 0 ||
            Number(headcount.value) > 9999,
          value: Number(headcount.value),
        },
        salary: {
          isError:
            salary.isError ||
            Number(salary.value) < 0 ||
            Number(salary.value) > 2000,
          value: Number(salary.value),
        },
        detail: {
          isError: detail.isError || detail.value.length === 0,
          value: detail.value,
        },
        employmentEndDateTime: {
          isError:
            !checkOverToday(employmentEndDate.value) ||
            employmentEndDate.isError ||
            employmentEndDate.value === '' ||
            (employmentEndDateTime !== '' &&
              !DATE_TIME_REGEX.test(employmentEndDateTime)),
          value: employmentEndDateTime,
        },
      },
    };
  },
};
