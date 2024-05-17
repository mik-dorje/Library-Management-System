import { create } from "zustand";

const TOTAL_STEPS = 2; // 0, 1, 2

interface ICourseState {
	activeCourseId: number;
	setActiveCourseId: (activeCourseId: number) => void;

	// steps to create a course
	currentStep: number;
	incrementCurrentStep: () => void;
	decrementCurrentStep: () => void;
	setCurrentStep: (currentStep: number) => void;

	resetStore: () => void;
}

const useCourseStore = create<ICourseState>((set) => {
	return {
		activeCourseId: 0,
		setActiveCourseId: (activeCourseId) => {
			set(() => {
				return {
					activeCourseId,
				};
			});
		},

		currentStep: 0,
		incrementCurrentStep: () => {
			set((store) => {
				return {
					currentStep:
						store.currentStep === TOTAL_STEPS
							? store.currentStep
							: store.currentStep + 1,
				};
			});
		},
		decrementCurrentStep: () => {
			set((store) => {
				return {
					currentStep:
						store.currentStep === 0
							? store.currentStep
							: store.currentStep - 1,
				};
			});
		},
		setCurrentStep: (currentStep) => {
			set(() => {
				return {
					currentStep:
						currentStep > TOTAL_STEPS
							? TOTAL_STEPS
							: currentStep < 0
								? 0
								: currentStep,
				};
			});
		},
		resetStore: () => {
			set(() => {
				return {
					activeCourseId: 0,
					currentStep: 0,
				};
			});
		},
	};
});

export default useCourseStore;
