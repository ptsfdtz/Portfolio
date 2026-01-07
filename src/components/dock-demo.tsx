import React, { ComponentProps } from "react";
import { IoDocumentText, IoLogoGithub, IoLogoLinkedin, IoMail } from "react-icons/io5";

import { Dock, DockIcon } from "@/components/dock";
import { siteConfig } from "@/config/site";

export type IconProps = React.HTMLAttributes<SVGElement>;

interface DockDemoProps {
  resumeUrl: string;
}

const DocIcon = IoDocumentText as unknown as React.FC<ComponentProps<"svg">>;
const GithubIcon = IoLogoGithub as unknown as React.FC<ComponentProps<"svg">>;
const LinkedinIcon = IoLogoLinkedin as unknown as React.FC<ComponentProps<"svg">>;
const MailIcon = IoMail as unknown as React.FC<ComponentProps<"svg">>;

export function DockDemo({ resumeUrl }: DockDemoProps) {
  return (
    <button className="self-end" onMouseDown={(e) => e.stopPropagation()}>
      <Dock>
        <DockIcon tooltip="Resume" url={resumeUrl}>
          <DocIcon aria-hidden className="h-5 w-5" />
        </DockIcon>
        <DockIcon tooltip="GitHub" url={siteConfig.links.github}>
          <GithubIcon aria-hidden className="h-5 w-5" />
        </DockIcon>
        <DockIcon tooltip="LinkedIn" url={siteConfig.links.linkedin}>
          <LinkedinIcon aria-hidden className="h-5 w-5" />
        </DockIcon>
        <DockIcon tooltip="Email" url={siteConfig.links.email}>
          <MailIcon aria-hidden className="h-5 w-5" />
        </DockIcon>
      </Dock>
    </button>
  );
}
