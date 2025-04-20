import OnboardingScreen from "@/components/OnboardingScreen";
import OpaquePressable from "@/components/OpaquePressable";
import { useUserStore } from "@/store/userStore";
import { themes } from "@/theme";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import {
	Extrapolation,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import type { ICarouselInstance } from "react-native-reanimated-carousel";

const { height, width } = Dimensions.get("window");

const data = [
  {
    title: "What is Ucycle?",
    description:
      "UCYCLE is a mobile application that helps users determine if their waste is recyclable",
      color: "#f1f1f1"
  },
  {
    title: "How does it work?",
    description:
      "When waste is picked up and verified by a company agent, the app awards points to individual users (RECYCU)",
      color: "#f1f1f1"
  },
  {
    title: "What is our goal?",
    description:
      "The goal is to promote recycling by rewarding sustainable behavior while streamlining waste management for recycling service providers (RECYKLA)",
      color: "#f1f1f1"
  },
];

export default function Onboarding() {
  const carouselRef = useRef<ICarouselInstance>(null); // Create a ref for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const goToNext = () => {
    carouselRef.current?.next(); // Move to the next slide
    if (currentIndex < 1) {
      setCurrentIndex((idx) => idx + 1);
    }
  };
  const goToPrevious = () => {
    carouselRef.current?.prev(); // Move to the next slide
    if (currentIndex >= 1) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    setCurrentIndex(index);
    carouselRef.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };


  const handleToggleHasOnboarded = () => {
    toggleHasOnboarded();
    router.replace("/login");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={themes.colorPrimaryDark} />{" "}
      {/* Set status bar color */}
      <Carousel
        ref={carouselRef}
        onProgressChange={progress}
        onSnapToItem={(index) => setCurrentIndex(index)} // 🔥 keep currentIndex in sync
        width={width}
        height={height - 100}
        data={data}
        scrollAnimationDuration={600}
        loop={false}
        renderItem={({ index }) => (
          <OnboardingScreen data={data} index={index} />
        )}
      />
      <View style={styles.footer}>
        <OpaquePressable style={styles.nextBtn} onPress={goToPrevious}>
          <Text style={[styles.prevText, currentIndex > 0 && {display: "flex"}]}>Previous</Text>
        </OpaquePressable>
        <Pagination.Custom<{ color: string }>
				progress={progress}
				data={data}
				size={8}
				dotStyle={{
					borderRadius: 16,
					backgroundColor: themes.colorInactive,
				}}
				activeDotStyle={{
					borderRadius: 8,
					width: 20,
					height: 8,
					overflow: "hidden",
					backgroundColor: "#f1f1f1",
				}}
				containerStyle={{
					gap: 8,
					marginTop: 10,
					alignItems: "center",
					height: 10,
          position: "absolute",
          left: "50%",
          top: -5,
				}}
				horizontal
				onPress={onPressPagination}
				customReanimatedStyle={(progress, index, length) => {
					let val = Math.abs(progress - index);
					if (index === 0 && progress > length - 1) {
						val = Math.abs(progress - length);
					}
 
					return {
						transform: [
							{
								translateY: interpolate(
									val,
									[0, 1],
									[0, 0],
									Extrapolation.CLAMP,
								),
							},
						],
					};
				}}
			/>
        {currentIndex < 2 ? (
          <OpaquePressable style={styles.nextBtn} onPress={goToNext}>
            <Text style={styles.nextText}>Next</Text>
          </OpaquePressable>
        ) : (
            <TouchableOpacity onPress={handleToggleHasOnboarded} style={styles.nextBtn}>
              <Text style={styles.nextText}>Get started</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colorPrimaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  prevText: {
    display: "none",
    color: "white",
    fontSize: 1,
  },
  nextText: {
    color: themes.colorSecondary,
    fontSize: 16,
  },
  nextBtn: {},
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: "relative",
  },
});
