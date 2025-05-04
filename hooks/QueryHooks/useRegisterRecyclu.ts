import { registerRecyclu } from "@/lib/apiAuth";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";

export function useRegisterRecyclu() {
  const setLoading = useUserStore((state) => state.setLoading);
  const setUser = useUserStore((state) => state.setUser);
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: registerRecyclu,
    onSuccess: (data) => {
      setUser(data);
      setLoading(false)
    },
  });

  return { registerUser, isPending };
}
