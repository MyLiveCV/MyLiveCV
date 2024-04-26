import { ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

type VisibleResumeArgs = {
  id: string;
  set: boolean;
};

export const visibleResume = async ({ id, set }: VisibleResumeArgs) => {
  const response = await axios.patch(`/resume/${id}/visible`, { set });

  queryClient.setQueryData<ResumeDto>(["resume", { id: response.data.id }], response.data);

  queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
    if (!cache) return [response.data];
    return cache.map((resume) => {
      if (resume.id === response.data.id) return response.data;
      return resume;
    });
  });

  return response.data;
};

export const useVisibleResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: visibleResumeFn,
  } = useMutation({
    mutationFn: visibleResume,
  });

  return { visibleResume: visibleResumeFn, loading, error };
};
