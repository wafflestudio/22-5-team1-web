import type {
  Input,
  InputForForm,
  ListInput,
  SelectInput,
} from '@/entities/input';
import type { Series } from '@/entities/post';
import type { CompanyInputPresentation } from '@/feature/company/presentation/companyInputPresentation';

type ExternalLink = {
  link: string;
  description: string;
};

type InitialState = {
  companyName?: string;
  explanation?: string;
  email?: string;
  slogan?: string;
  investAmount?: number;
  investCompany?: string[];
  series?: Series | 'NONE';
  irDeckPreview?: { file: File; url: string } | null;
  irDeckLink?: string;
  landingPageLink?: string;
  imagePreview?: { file: File; url: string } | null;
  imageLink?: string;
  externalDescriptionLink?: ExternalLink[];
  tags?: string[];
};

type CompanyFormPresentation = {
  useValidator({
    initialState,
    companyInputPresentation,
  }: {
    initialState?: InitialState;
    companyInputPresentation: CompanyInputPresentation;
  }): {
    inputStates: {
      companyName: Input<string>;
      explanation: Input<string>;
      email: Input<string>;
      slogan: Input<string>;
      investAmount: Input<string>;
      rawInvestCompany: Input<string>;
      investCompany: ListInput<string>;
      series: SelectInput<Series | 'NONE'>;
      irDeckPreview: Input<{ file: File; url: string } | null>;
      irDeckLink: Input<string>;
      landingPageLink: Input<string>;
      imagePreview: Input<{ file: File; url: string } | null>;
      imageLink: Input<string>;
      rawExternalDescriptionLink: Input<ExternalLink>;
      externalDescriptionLink: ListInput<ExternalLink>;
      rawTag: Input<string>;
      tags: ListInput<string>;
    };
    formStates: {
      companyName: InputForForm<string>;
      explanation: InputForForm<string>;
      email: InputForForm<string>;
      slogan: InputForForm<string>;
      investAmount: InputForForm<number>;
      investCompany: InputForForm<string>;
      series: InputForForm<Series | 'NONE'>;
      irDeckLink: InputForForm<string>;
      landingPageLink: InputForForm<string>;
      imageLink: InputForForm<string>;
      externalDescriptionLink: InputForForm<ExternalLink[]>;
      tags: InputForForm<string[]>;
    };
  };
};

export const companyFormPresentation: CompanyFormPresentation = {
  useValidator: ({ initialState, companyInputPresentation }) => {
    const initialStateForInput = {
      companyName: initialState?.companyName,
      explanation: initialState?.explanation,
      email: initialState?.email,
      slogan: initialState?.slogan,
      investAmount:
        initialState !== undefined
          ? String(initialState.investAmount)
          : undefined,
      investCompany: initialState?.investCompany,
      series: initialState?.series,
      irDeckPreview: initialState?.irDeckPreview,
      landingPageLink: initialState?.landingPageLink,
      imagePreview: initialState?.imagePreview,
      externalDescriptionLink: initialState?.externalDescriptionLink,
      tags: initialState?.tags,
    };

    const {
      companyName,
      explanation,
      email,
      slogan,
      investAmount,
      rawInvestCompany,
      investCompany,
      series,
      irDeckPreview,
      irDeckLink,
      landingPageLink,
      imagePreview,
      imageLink,
      rawExternalDescriptionLink,
      externalDescriptionLink,
      rawTag,
      tags,
    } = companyInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    const isEmptyElementsInFilteredStringList = (input: string[]) => {
      const filteredInput = input.filter((item) => item.trim().length !== 0);
      return filteredInput.length === 0;
    };

    return {
      inputStates: {
        companyName,
        explanation,
        email,
        slogan,
        investAmount,
        rawInvestCompany,
        investCompany,
        series,
        irDeckPreview,
        irDeckLink,
        landingPageLink,
        imagePreview,
        imageLink,
        rawExternalDescriptionLink,
        externalDescriptionLink,
        rawTag,
        tags,
      },
      formStates: {
        companyName: {
          isError: companyName.isError || companyName.value.trim().length === 0,
          value: companyName.value,
        },
        explanation: {
          isError: explanation.isError || explanation.value.trim().length === 0,
          value: explanation.value,
        },
        email: {
          isError: email.isError || email.value.trim().length === 0,
          value: email.value,
        },
        slogan: {
          isError: slogan.isError || slogan.value.trim().length === 0,
          value: slogan.value,
        },
        imageLink: {
          isError: imageLink.isError || imageLink.value.trim().length === 0,
          value: imageLink.value,
        },
        series: {
          isError: series.isError || series.value === 'NONE',
          value: series.value,
        },
        investAmount: {
          isError: isNaN(Number(investAmount)) || Number(investAmount) < 0,
          value: Number(investAmount),
        },
        investCompany: {
          isError:
            investCompany.isError ||
            isEmptyElementsInFilteredStringList(investCompany.value),
          value: investCompany.value
            .filter((item) => item.trim().length !== 0)
            .join(','),
        },
        tags: tags,
        irDeckLink: irDeckLink,
        landingPageLink: landingPageLink,
        externalDescriptionLink: {
          isError: externalDescriptionLink.isError,
          value: externalDescriptionLink.value.filter(
            (item) =>
              item.link.trim().length !== 0 &&
              item.description.trim().length !== 0,
          ),
        },
      },
    };
  },
};
