import type {
  Input,
  InputForForm,
  ListInput,
  SelectInput,
} from '@/entities/input';
import type { JobMinorCategory } from '@/entities/post';
import type { ApplicantInputPresentation } from '@/feature/applicant/presentation/applicantInputPresentation';
import { convertEmptyStringToUndefined } from '@/lib/responseFormat';
import { fileFormatPresentation } from '@/shared/file/fileFormatPresentation';

type ExternalLink = {
  link: string;
  description: string;
};

type InitialState = {
  enrollYear?: number;
  department?: string;
  positions?: JobMinorCategory[];
  slogan?: string;
  explanation?: string;
  stack?: string[];
  imagePreview?: { file: File; url: string } | null;
  cvPreview?: { file: File; url: string } | null;
  portfolioPreview?: { file: File; url: string } | null;
  links?: ExternalLink[];
};

type ApplicantFormPresentation = {
  useValidator({
    initialState,
    applicantInputPresentation,
  }: {
    initialState?: InitialState;
    applicantInputPresentation: ApplicantInputPresentation;
  }): {
    inputStates: {
      enrollYear: Input<string>;
      department: Input<string>;
      rawPosition: SelectInput<JobMinorCategory | 'NONE'>;
      positions: ListInput<JobMinorCategory>;
      slogan: Input<string>;
      explanation: Input<string>;
      rawStack: Input<string>;
      stack: ListInput<string>;
      imagePreview: Input<{ file: File; url: string } | null>;
      cvPreview: Input<{ file: File; url: string } | null>;
      portfolioPreview: Input<{ file: File; url: string } | null>;
      rawLink: Input<ExternalLink>;
      links: ListInput<ExternalLink>;
    };
    formStates: {
      enrollYear: InputForForm<number>;
      department: InputForForm<string>;
      positions: InputForForm<JobMinorCategory[] | undefined>;
      slogan: InputForForm<string | undefined>;
      explanation: InputForForm<string | undefined>;
      stack: InputForForm<string[] | undefined>;
      imageKey: InputForForm<string | undefined>;
      cvKey: InputForForm<string | undefined>;
      portfolioKey: InputForForm<string | undefined>;
      links: InputForForm<ExternalLink[] | undefined>;
    };
  };
};

export const applicantFormPresentation: ApplicantFormPresentation = {
  useValidator: ({ initialState, applicantInputPresentation }) => {
    const initialStateForInput = {
      enrollYear:
        initialState !== undefined
          ? String(initialState.enrollYear)
          : undefined,
      department: initialState?.department,
      positions: initialState?.positions,
      slogan: initialState?.slogan,
      explanation: initialState?.explanation,
      stack: initialState?.stack,
      imagePreview: initialState?.imagePreview,
      cvPreview: initialState?.cvPreview,
      portfolioPreview: initialState?.portfolioPreview,
      links: initialState?.links,
    };

    const {
      enrollYear,
      department,
      rawPosition,
      positions,
      slogan,
      explanation,
      rawStack,
      stack,
      imagePreview,
      cvPreview,
      portfolioPreview,
      rawLink,
      links,
    } = applicantInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    const { formatFileNameToS3Key } = fileFormatPresentation();

    const filteredLinks = links.value.filter(
      (item) =>
        item.link.trim().length !== 0 && item.description.trim().length !== 0,
    );

    return {
      inputStates: {
        enrollYear,
        department,
        rawPosition,
        positions,
        slogan,
        explanation,
        rawStack,
        stack,
        imagePreview,
        cvPreview,
        portfolioPreview,
        rawLink,
        links,
      },
      formStates: {
        enrollYear: {
          isError:
            enrollYear.value.trim().length === 0 ||
            isNaN(Number(enrollYear.value)) ||
            Number(enrollYear.value) < 0,
          value: Number(enrollYear.value),
        },
        department: {
          isError: department.isError || department.value.trim().length === 0,
          value: department.value,
        },
        positions: {
          isError: positions.isError,
          value: positions.value.length !== 0 ? positions.value : undefined,
        },
        slogan: {
          isError: slogan.isError,
          value: convertEmptyStringToUndefined(slogan.value),
        },
        explanation: {
          isError: explanation.isError,
          value: convertEmptyStringToUndefined(explanation.value),
        },
        stack: {
          isError: stack.isError,
          value: stack.value.length !== 0 ? stack.value : undefined,
        },
        imageKey: {
          isError: imagePreview.isError,
          value:
            imagePreview.value !== null
              ? formatFileNameToS3Key({
                  fileName: imagePreview.value.file.name,
                  fileType: 'APPLICANT_THUMBNAIL',
                })
              : undefined,
        },
        cvKey: {
          isError: cvPreview.isError,
          value:
            cvPreview.value !== null
              ? formatFileNameToS3Key({
                  fileName: cvPreview.value.file.name,
                  fileType: 'CV',
                })
              : undefined,
        },
        portfolioKey: {
          isError: portfolioPreview.isError,
          value:
            portfolioPreview.value !== null
              ? formatFileNameToS3Key({
                  fileName: portfolioPreview.value.file.name,
                  fileType: 'PORTFOLIO',
                })
              : undefined,
        },
        links: {
          isError: links.isError,
          value: filteredLinks.length !== 0 ? filteredLinks : undefined,
        },
      },
    };
  },
};
