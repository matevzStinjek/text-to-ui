import React from "react";
import * as LucideIcons from "lucide-react";

export type LucideIconName = keyof typeof LucideIcons;

export const getLucideIcon = (
  name?: string | null
): React.FC<LucideIcons.LucideProps> | null => {
  if (!name || !(name in LucideIcons)) {
    return null;
  }

  return LucideIcons[
    name as LucideIconName
  ] as React.FC<LucideIcons.LucideProps>;
};
