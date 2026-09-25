import { DisclaimerFooter } from "@/components/common/DisclaimerFooter";
import { OrangeButton } from "@/components/common/OrangeButton";
import { StickerTitle } from "@/components/common/StickerTitle";
import { NameField } from "@/components/input/NameField";

interface InputScreenProps {
  name1: string;
  name2: string;
  setName1: (v: string) => void;
  setName2: (v: string) => void;
  onSubmit: () => void;
}

export function InputScreen({ name1, name2, setName1, setName2, onSubmit }: InputScreenProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-black text-white">
      <StickerTitle width={240} />
      <form
        className="flex flex-col flex-1 min-h-0 px-10 pt-10"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <NameField label="상대방의 이름" value={name1} onChange={setName1} />
        <div className="h-14" />
        <NameField label="내 이름" value={name2} onChange={setName2} />
        <div className="flex-1 min-h-0" />
        <div className="flex justify-center pb-6 pt-8">
          <OrangeButton type="submit" disabled={!name1.trim() || !name2.trim()}>
            알아보기
          </OrangeButton>
        </div>
      </form>
      <DisclaimerFooter />
    </div>
  );
}
