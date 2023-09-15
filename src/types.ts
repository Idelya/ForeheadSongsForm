export type CategoryType = {
  id?: string;
  name: string;
};

export type SongFormInputType = {
  categories: CategoryType[];
  title: string;
  source: string;
  lyrics: string;
};
