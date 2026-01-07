"use client";

import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { FaMagic } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { ComponentProps, Dispatch, FC, SetStateAction } from "react";

import { cn } from "@/lib/utils";

export interface AnimationSwitchProps {
  className?: string;
  animated: boolean;
  setAnimated: Dispatch<SetStateAction<boolean>>;
}

const MagicIcon = FaMagic as unknown as FC<ComponentProps<"svg">>;
const ImageIcon = FaImage as unknown as FC<ComponentProps<"svg">>;

export const AnimationSwitch: FC<AnimationSwitchProps> = ({ className, animated, setAnimated }) => {
  const onChange = () => {
    setAnimated((prev) => !prev);
  };

  return (
    <div className={cn(className)}>
      {!animated ? (
        <Tooltip content="Animate it!" placement="bottom">
          <Button
            isIconOnly
            className="dark:border-knight dark:bg-transparent dark:border-2 bg-midnight border-0"
            radius="full"
            variant="bordered"
            onPress={onChange}
          >
            <MagicIcon aria-hidden className="h-4 w-4" />
          </Button>
        </Tooltip>
      ) : (
        <Button
          isIconOnly
          className="dark:border-knight dark:bg-transparent dark:border-2 bg-midnight border-0"
          radius="full"
          variant="bordered"
          onPress={onChange}
        >
          <ImageIcon aria-hidden className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
