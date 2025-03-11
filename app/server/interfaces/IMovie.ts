// TODO: Gehört vielleicht eher in einen types Ordner?
import type { IProviderResponse } from "./IProviderResponse";

export interface IMovie {
    [key: string]: string | null | IProviderResponse | IProviderResponse[];
    title: string;
    releaseDate: string;
    imdbId: string; // WICHTIG um den Film Provider übergreifend zu identifizieren
    posterUrl: string | null;
    // regisseur: string;
    // schauspieler: string;
    // genre: string;
    provider: IProviderResponse | null;
    providers: IProviderResponse[];
}