import React from "react";
import PrimaryUIButton from "@/components/ui/PrimaryButton";

export default function PrimaryButton(props: {
  onPress: () => void;
  size?: number;
  children: React.ReactNode;
}) {
  return <PrimaryUIButton {...props} />;
}
