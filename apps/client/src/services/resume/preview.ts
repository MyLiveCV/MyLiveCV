import { UrlDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { RESUME_PREVIEW_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

const enablePreview = import.meta.env.VITE_RESUME_PREVIEW === "true";

export const previewResume = async (data: { id: string }) => {
  const response = await axios.get<UrlDto>(`/resume/print/${data.id}/preview`);

  return response.data;
};

export const useResumePreview = (id: string) => {
  const {
    error,
    isLoading: loading,
    data,
  } = useQuery({
    queryKey: [RESUME_PREVIEW_KEY, { id }],
    queryFn: () => previewResume({ id }),
    enabled: enablePreview,
  });

  return { url: data?.url, loading, error };
};
