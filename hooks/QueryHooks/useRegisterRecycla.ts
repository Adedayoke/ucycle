import { registerRecycla } from "@/lib/apiAuth";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export function useRegisterRecycla() {
  const setLoading = useUserStore((state) => state.setLoading);
  const setUser = useUserStore((state) => state.setUser);
  const setRefresh = useUserStore((state) => state.setRefresh);
  const router = useRouter();

  const { mutate: registerCompany, isPending } = useMutation({
    mutationFn: registerRecycla,
    onSuccess: (data) => {
      if (data) {
        const { access, message, refresh } = data;
        const splitMessage = message.split(".");
        Toast.show({
          type: "info",
          text1: splitMessage[0],
          text2: splitMessage[1],
          position: "top",
          autoHide: false
        });
        setRefresh(refresh);
      }
      console.log(data);
      //   setLoading(false)
      //   router.push("/(tabs)/(wastes)");
    },
    onError: (error: any) => {
        console.log("error for query", error);
        if (error.response && error.response.data) {
          const errors = error.response.data;
          const errorMessages = Object.values(errors).flat().join('\n');
      
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
      }
      

  });

  return { registerCompany, isPending };
}
