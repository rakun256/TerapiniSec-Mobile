import React, { useRef, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Greeting from "./components/HomePageComponents/Greeting";
import Tasks from "./components/HomePageComponents/Tasks";
import MoodTracker from "./components/HomePageComponents/MoodLog";
import GroupTherapyHighlights from "./components/HomePageComponents/GroupTherapyHighlights";
import WeeklyReportPreview from "./components/HomePageComponents/WeeklyReport";
import SleepTrackingAndTips from "./components/HomePageComponents/SleepTrackingAndTips";
import GoalsAndProgress from "./components/HomePageComponents/GoalsAndProgress";
import SurveysPreview from "./components/HomePageComponents/SurveyPreview";
import StoriesPreview from "./components/HomePageComponents/StoriesPreview";
import LibraryPreview from "./components/HomePageComponents/Library";


export default function HomePage() {
  const scrollViewRef = useRef(null);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
      <StoriesPreview />
      <Greeting />
      <Tasks />
      <MoodTracker />
      <GroupTherapyHighlights />
      <WeeklyReportPreview />
      <SleepTrackingAndTips />
      <GoalsAndProgress />
      <SurveysPreview />
      <LibraryPreview />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
