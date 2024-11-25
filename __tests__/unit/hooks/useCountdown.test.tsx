import { act, renderHook } from "@testing-library/react";
import { useCountdown } from "@/hooks/useCountdown";

describe("testing useCountdown hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("it should have the given countdown", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useCountdown(3000, mockFn));
    expect(result.current).toBe(3000);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  test("it should decrement countdown", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useCountdown(3000, mockFn));
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.current).toBe(2000);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  test("it should call the callback", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useCountdown(3000, mockFn));
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.current).toBe(2000);
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.current).toBe(1000);
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.current).toBe(0);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("it should not call the callback", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useCountdown(-1, mockFn));
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.current).toBe(-1);
    expect(mockFn).not.toHaveBeenCalled();
  });
});
