export interface MovieMetadata {
    readonly title: string;
    readonly year: string;
    readonly imdbId: string; // WICHTIG um den Film, Provider übergreifend zu identifizieren
    readonly posterUrl?: string;
    readonly runtime?: number;
    readonly plot?: string;
}
