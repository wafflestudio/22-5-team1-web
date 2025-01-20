export type StringInput = {
  isError: boolean;
  value: string;
  onChange: (input: string) => void;
};

export type SelectInput<TSelect> = {
  isError: boolean;
  value: TSelect;
  onChange: (input: TSelect) => void;
};

export type ListInput<TElement> = {
  isError: boolean;
  value: TElement[];
  onChange: ({
    input,
    index,
    mode,
  }:
    | {
        input: TElement;
        index?: never;
        mode: 'ADD' | 'REMOVE';
      }
    | {
        input: TElement;
        index: number;
        mode: 'PATCH';
      }) => void;
};
