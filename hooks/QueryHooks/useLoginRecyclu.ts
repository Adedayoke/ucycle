import { loginRecyclu } from "@/lib/apiAuth";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export function useLoginRecyclu() {
  const setLoading = useUserStore((state) => state.setLoading);
  const setUser = useUserStore((state) => state.setUser);
  const setRefresh = useUserStore((state) => state.setRefresh);
const router = useRouter();
  
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: loginRecyclu,
    onSuccess: (data) => {
        if(data){
            const {access, coins, email, referral_code, refresh, username} = data
            setUser({coins, email, referral_code, username, access});
            setRefresh(refresh)
        }
      setLoading(false)
      router.push("/(tabs)/(wastes)");
    },
  });

  return { loginUser, isPending };
}
