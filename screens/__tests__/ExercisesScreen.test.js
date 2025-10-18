import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ExercisesScreen from "../ExercisesScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";


jest.mock("@react-native-async-storage/async-storage");

describe("ExercisesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders screen elements", () => {
    const { getByText, getByPlaceholderText } = render(<ExercisesScreen />);
    expect(getByText("Exercises")).toBeTruthy();
    expect(getByPlaceholderText("Exercise name")).toBeTruthy();
    expect(getByText("Add Exercise")).toBeTruthy();
  });

  it("adds a new exercise", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ExercisesScreen />);
    fireEvent.changeText(getByPlaceholderText("Exercise name"), "Bench Press");
    fireEvent.press(getByText("Add Exercise"));
    await waitFor(() => expect(queryByText("Bench Press")).toBeTruthy());
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it("does not add empty exercise", () => {
    const { getByText, queryByText } = render(<ExercisesScreen />);
    fireEvent.press(getByText("Add Exercise"));
    expect(queryByText("")).toBeNull();
  });

  it("clears all exercises", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ExercisesScreen />);
    fireEvent.changeText(getByPlaceholderText("Exercise name"), "Squat");
    fireEvent.press(getByText("Add Exercise"));
    await waitFor(() => expect(queryByText("Squat")).toBeTruthy());
    fireEvent.press(getByText("Clear All Exercises"));
    await waitFor(() => expect(queryByText("Squat")).toBeNull());
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("exercises");
  });
});
