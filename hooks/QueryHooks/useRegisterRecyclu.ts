import { registerRecyclu } from "@/lib/apiAuth";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export function useRegisterRecyclu() {
  const setLoading = useUserStore((state) => state.setLoading);
  const setUser = useUserStore((state) => state.setUser);
  const setRefresh = useUserStore((state) => state.setRefresh);
  const router = useRouter();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: registerRecyclu,
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        const { access, user, refresh } = data;
        setUser({ access, ...user });
        setRefresh(refresh);
      }
      setLoading(false);
      router.push("/(tabs)/(wastes)");
    },
    onError: (error: any) => {
      console.log("error for query", error.response.data);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const errorMessages = Object.values(errors).flat().join("\n");

        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: errorMessages,
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Unexpected Error",
          text2: "Please try again later.",
          position: "top",
        });
      }
    },
  });

  return { registerUser, isPending };
}
