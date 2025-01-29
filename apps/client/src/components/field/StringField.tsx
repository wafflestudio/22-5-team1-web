import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import type { Input as InputType } from '@/entities/input';

type StringFieldProps = {
  label: string;
  input: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
};

export const StringField = ({
  label,
  input,
  isPending,
  isSubmit,
  errorMessage,
  infoMessage,
  required,
  placeholder,
}: StringFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <Input
        value={input.value}
        placeholder={placeholder}
        disabled={isPending}
        onChange={(e) => {
          input.onChange(e.target.value);
        }}
      />
      <div className="flex flex-col gap-1">
        <FormInfoResponse>{infoMessage}</FormInfoResponse>
        {isSubmit && input.isError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
