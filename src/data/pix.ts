import { createStaticPixPayload } from "@/lib/pix";

export const pix = {
  key: "Araujoleticia74@gmail.com",
  merchantName: "Leticia Pires de Araujo",
  merchantCity: "Mairipora",
  description: "Presente casamento",
} as const;

export const pixCopyPaste = createStaticPixPayload(pix);
