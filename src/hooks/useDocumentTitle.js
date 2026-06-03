import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const baseTitle = "B N B Software";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [title]);
};
