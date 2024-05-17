export interface IQuizData {
	questionDate: string;
	createdDate: string;
	institute: string;
	version: string;
	testType: TestType[];
	year: number;
	month: number;
	price: number;
}

export interface TestType {
	id: number;
	type: string;
	createdDate: string;
}

export interface IQuizSegment {
	questionDate: string;
	institute: string;
	version: string;
	testDetails: {
		questionDate: string;
		institute: string;
		version: string;
		testTypeDetails: {
			type: string;
		};
	};
	segmentDetails: [
		{
			id: number;
			type: string;
			contextDetails: [
				{
					id: number;
					contextDetails: string;
					testContextType: string;
					questions: [
						{
							id: number;
							question: string;
							weight: number;
							hasOption: true;
							questionValueType: string;
							questionDetails: [
								{
									id: number;
									options: string;
									isAnswer: true;
								},
							];
							section: number;
						},
					];
					fileId: [number];
					section: number;
				},
			];
			questionsList: [
				{
					id: number;
					question: string;
					weight: number;
					hasOption: true;
					questionValueType: string;
					questionDetails: [
						{
							id: number;
							options: string;
							isAnswer: true;
						},
					];
					section: number;
				},
			];
		},
	];
}
