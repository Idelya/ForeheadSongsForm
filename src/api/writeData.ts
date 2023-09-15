import { addDoc, collection, doc } from "firebase/firestore";
import { CategoryType, SongFormInputType } from "../types";
import { db } from "./firebase";

const addNewCategories = async (categories: CategoryType[]) => {
  const newCategories = categories.filter((e) => !e.id);
  const categoriesIds = categories.filter((e) => !!e.id).map((e) => e.id);

  for (const category of newCategories) {
    const docRef = await addDoc(collection(db, "categories"), {
      name: category.name,
    });
    categoriesIds.push(docRef.id);
    console.log("Added category ", category.name, categoriesIds);
  }
  return categoriesIds;
};

export const saveSong = async (data: SongFormInputType) => {
  const { categories, ...song } = data;
  const categoriesIds = await addNewCategories(categories);
  const categoryCollRef = collection(db, "categories");

  for (const element of categoriesIds) {
    const categoryDocRef = doc(categoryCollRef, element);
    const songsCollRef = collection(categoryDocRef, "songs");
    const docRef = await addDoc(songsCollRef, song);
    console.log(
      "Added song ",
      data.title,
      " - ",
      docRef.id,
      " to category ",
      element
    );
  }
};
