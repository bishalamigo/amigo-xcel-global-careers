import { describe, expect, test } from "bun:test";
import { academyCourses, resolveCourseEnquiry } from "./academy";

describe("academy enquiry rules", () => {
  test("offers only the two requested courses", () => {
    expect(academyCourses.map((course) => course.title)).toEqual(["AI-Powered Tech Recruitment", "Digital Marketing"]);
  });
  test("preserves the recruitment course selection", () => {
    expect(resolveCourseEnquiry("AI-Powered Tech Recruitment")).toBe("AI-Powered Tech Recruitment");
  });
  test("preserves the marketing course selection", () => {
    expect(resolveCourseEnquiry("Digital Marketing")).toBe("Digital Marketing");
  });
  test("defaults unrecognised selections to course guidance", () => {
    expect(resolveCourseEnquiry("Tech Ready Kids")).toBe("Help me choose");
  });
});