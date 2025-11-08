// src/types/work.ts
import type { MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

export type Work = {
  id: string;           // microCMSが付与
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;

  title: string;
  slug: string;
  lead?: string | null;

  // richEditorV2 は API からは HTML 文字列で返る想定（htmlを直接埋め込み）
  body?: string | null;

  cover?: {
    url: string;
    width?: number;
    height?: number;
  } | null;

  // multiple select は文字列配列
  tech?: string[];      

  order?: number | null;
};
