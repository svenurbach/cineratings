// TODO: Gehört vielleicht eher in einen types Ordner?

export interface IMovie {
    title: string;
    releaseDate: string;
    imdbId: string;
    posterUrl: string | null;
    // regisseur: string;
    // schauspieler: string;
    // genre: string;
}