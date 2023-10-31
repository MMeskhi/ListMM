import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "ListMM",
  description = "Make a list of what you want to watch, listen or play.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
  customTag = "darkreader-lock",
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Meskhi7",
    },
    icons,
    metadataBase: new URL("https://listmm.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    verification: {
      other: {
        "darkreader-lock": [customTag],
      },
    },
  };
}

export default constructMetadata;
