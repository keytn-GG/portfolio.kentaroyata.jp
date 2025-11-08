import type { MicroCMSImage, MicroCMSDate, MicroCMSContentId } from "microcms-js-sdk";

export type Project = {
    title: string;
    slug: string;
    lead?: string;
    body?: string;
    cover?: MicroCMSImage;
    tech?: string[];
    url?: string | null;
    repo?: string | null;
    fetured?: boolean;
    order?: number;
} & MicroCMSContentId & MicroCMSDate;