import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';

export const CancelCoffeeChatDeleteModal = ({
  onClose,
  onCancel,
}: {
  onClose(): void;
  onCancel(): void;
}) => {
  const { isVisible, handleClose: handleCancel } = useDialog({
    onClose: onCancel,
  });
  return (
    <ModalFloatBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleCancel}
    >
      <div className="flex flex-col text-center gap-[14px]">
        <p className="text-[14px] font-semibold">
          정말로 이 커피챗 신청을 취소하시겠어요?
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="destructive" onClick={onClose} className="flex-1">
          예
        </Button>
        <Button variant="secondary" onClick={handleCancel} className="flex-1">
          아니오
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
