import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button, SubmitButton } from '@/components/button';
import { FormContainer } from '@/components/form';
import { LabelContainer } from '@/components/input/LabelContainer.tsx';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal.tsx';
import type { ResumeRequest } from '@/entities/resume.ts';
import { resumePresentation } from '@/feature/resume/presentation/resumePresentation.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';

export const CreateResumeForm = ({ postId }: { postId: string }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { createResume, isPending } = useCreateResume({
    setResponseMessage,
    postId,
  });

  const { phoneNumber, contents } = resumePresentation.useValidator({});

  const { toPost } = useRouteNavigation();

  const handleSubmit = () => {
    setIsSubmit(true);

    const isPhoneNumberValid = !phoneNumber.isError;
    const isContentsValid = !contents.isError;

    if (!isPhoneNumberValid || !isContentsValid) {
      return;
    }

    createResume({
      resume: { phoneNumber: phoneNumber.value, content: contents.value },
    });
  };

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 px-10">
      <div className="w-full max-w-2xl">
        <p className="w-full text-left text-3xl py-7 font-medium text-gray-700">
          커피챗 신청서 작성
        </p>
        <FormContainer
          id="CreateResumeForm"
          handleSubmit={handleSubmit}
          response={responseMessage}
          className={'text-sm w-full bg-white rounded-lg'}
        >
          <LabelContainer
            label="전화번호"
            id="phoneNumber"
            className={'font-medium text-gray-700 w-full'}
          >
            <input
              id="phoneNumber"
              value={phoneNumber.value}
              disabled={isPending}
              onChange={(e) => {
                phoneNumber.onChange(e.target.value);
              }}
              placeholder="010-0000-0000"
              className="w-full border border-gray-300 rounded-md
                focus:ring-blue-500 focus:border-blue-500
      placeholder:text-gray-400 placeholder:top-0 placeholder:left-0
      p-3 resize-none overflow-auto"
            />
            {isSubmit && phoneNumber.isError && (
              <p className="text-gray-500">
                전화번호 양식에 맞게 작성해주세요. (예시: 010-0000-0000)
              </p>
            )}
          </LabelContainer>

          <LabelContainer
            label="내용"
            id="contents"
            className="font-medium text-gray-700 h-80"
          >
           <textarea
             id="contents"
             value={contents.value}
             disabled={isPending}
             onChange={(e) => {
               contents.onChange(e.target.value);
             }}
             placeholder="간단한 자기소개, 커피챗 신청 사유, 가능한 시간대를 작성해주세요"
             className="w-full h-full border border-gray-300 rounded-md
      focus:ring-blue-500 focus:border-blue-500
      placeholder:text-gray-400 placeholder:top-0 placeholder:left-0
      p-3 resize-none overflow-auto"
           />
            {isSubmit && contents.isError && (
              <p className="text-gray-500">
                내용은 10,000자 이하로 작성해주세요.
              </p>
            )}
          </LabelContainer>

          <div className="flex">
            <Button
              type="button"
              onClick={handleClickCancelButton}
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
            >
              취소
            </Button>

            <SubmitButton
              type="submit"
              form="CreateResumeForm"
              onClick={handleSubmit}
              disabled={isPending}
              className="flex-1 px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500"
            >
              등록
            </SubmitButton>
          </div>
          {isCancel && (
            <CancelCheckModal
              onClose={() => {
                toPost({ postId });
              }}
              onCancel={closeCancelModal}
            />
          )}
        </FormContainer>
      </div>
    </div>
  );
};

const useCreateResume = ({
  setResponseMessage,
  postId,
}: {
  setResponseMessage(input: string): void;
  postId: string;
}) => {
  const { resumeService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toPost } = useRouteNavigation();

  const { mutate: createResume, isPending } = useMutation({
    mutationFn: ({ resume }: { resume: ResumeRequest }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return resumeService.createResume({
        token,
        resumeContents: resume,
        postId,
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toPost({ postId });
      } else {
        setResponseMessage(response.code);
      }
    },
    onError: () => {
      setResponseMessage(
        '공고 생성에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });
  return {
    createResume,
    isPending,
  };
};
