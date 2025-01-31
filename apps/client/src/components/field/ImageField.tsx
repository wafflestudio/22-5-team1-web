import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { ICON_SRC } from '@/entities/asset';
import type { Input as InputType } from '@/entities/input';

type ImageFieldProps = {
  label: string;
  input: InputType<{ file: File; url: string } | null>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  responseErrorMessage?: string;
  infoMessage?: string;
  required?: boolean;
};

export const ImageField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  responseErrorMessage,
  infoMessage,
  required,
}: ImageFieldProps) => {
  const addImage = (file: File | undefined) => {
    if (file !== undefined) {
      input.onChange({ file, url: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => {
    input.onChange(null);
  };

  const showError = (!isSubmit && input.isError) || (isSubmit && isSubmitError);

  return (
    <LabelContainer label={label} required={required}>
      {input.value !== null && !input.isError ? (
        <div>
          <div className="relative w-[100px] h-[100px] border border-grey-light-hover rounded-md">
            <img
              src={input.value.url}
              alt="썸네일"
              className="w-full h-full object-cover rounded-md"
            />
            <div
              onClick={() => {
                if (isPending) {
                  return;
                }
                removeImage();
              }}
              className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-[20px] h-[20px] bg-grey-normal text-white rounded-full p-1 text-xs hover:bg-grey-normal-hover transition"
            >
              <img src={ICON_SRC.CLOSE.WHITE} />
            </div>
          </div>

          {/* <Button
            
            disabled={isPending}
            className="absolute top-10 right-10 w-[20px] h-[20px] bg-grey-normal text-white rounded-full p-1 text-xs hover:bg-grey-normal-active transition"
          >
            삭제
          </Button> */}
        </div>
      ) : (
        <label
          htmlFor="fileInput"
          className="flex flex-col gap-1 justify-center items-center w-[100px] h-[100px] bg-grey-light-hover rounded-md"
        >
          <img src={ICON_SRC.CAMERA} />
          <span className="text-grey-normal-hover text-xs">이미지 등록</span>
        </label>
      )}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isPending}
        onChange={(e) => {
          if (e.target.files !== null) {
            addImage(e.target.files[0]);
          }
        }}
      />
      <div className="flex flex-col gap-1">
        {infoMessage !== undefined && (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {showError && <FormErrorResponse>{errorMessage}</FormErrorResponse>}
        {responseErrorMessage !== '' && (
          <FormErrorResponse>{responseErrorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
