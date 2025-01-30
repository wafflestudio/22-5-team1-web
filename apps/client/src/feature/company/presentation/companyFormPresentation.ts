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
      landingPageLink: Input<string>;
      imagePreview: Input<{ file: File; url: string } | null>;
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
      investCompany: InputForForm<string[]>;
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
      investAmount: String(initialState?.investAmount),
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
        landingPageLink,
        imagePreview,
        rawExternalDescriptionLink,
        externalDescriptionLink,
        rawTag,
        tags,
      },
      formStates: {
        companyName: companyName,
        explanation: explanation,
        email: email,
        slogan: slogan,
        imageLink: imageLink,
        series: series,
        investAmount: {
          isError: isNaN(Number(investAmount)) || Number(investAmount) < 0,
          value: Number(investAmount),
        },
        investCompany: {
          isError: investCompany.isError,
          value: investCompany.value.filter((item) => item.trim().length !== 0),
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
