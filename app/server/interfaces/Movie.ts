// TODO: Gehört vielleicht eher in einen types Ordner?
import type { ProviderResponse } from "./ProviderResponse";

export interface Movie {
    // TODO: index type wirklich nötig?
    // [key: string]: string | null | undefined | ProviderResponse | ProviderResponse[];
    readonly title: string;
    readonly releaseDate: string;
    readonly imdbId: string; // WICHTIG um den Film Provider übergreifend zu identifizieren
    readonly posterUrl?: string;
    // regisseur: string;
    // schauspieler: string;
    // genre: string;
    readonly provider?: ProviderResponse;
    providers: ProviderResponse[];
}
