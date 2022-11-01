interface EvenBetterHistory {
	readonly push: (url?: string | URL | null) => void;
	readonly replace: (url?: string | URL | null) => void;
}

export type { EvenBetterHistory};
