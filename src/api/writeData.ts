import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { CategoryType, SongFormInputType } from "../types";
import { db } from "./firebase";

const isCategoryExist = async (name: string) => {
  const collRef = collection(db, "categories");
  const q = query(collRef, where("name", "==", name));
  const id = await getDocs(q).then((querySnapshot) => {
    const ids = querySnapshot.docs.map((doc) => doc.id);
    return ids.length ? ids[0] : undefined;
  });
  return id;
};

const isSongExistInCategory = async (
  songsCollRef: CollectionReference<DocumentData, DocumentData>,
  name: string,
  source: string
) => {
  const q = query(
    songsCollRef,
    where("title", "==", name),
    where("source", "==", source)
  );
  const id = await getDocs(q).then((querySnapshot) => {
    const ids = querySnapshot.docs.map((doc) => doc.id);
    return ids.length ? ids[0] : undefined;
  });
  console.log(id);
  return !!id;
};

const addNewCategories = async (categories: CategoryType[]) => {
  const newCategories = categories.filter((e) => !e.id);
  const categoriesIds = categories.filter((e) => !!e.id).map((e) => e.id);

  for (const category of newCategories) {
    const id = await isCategoryExist(category.name);
    if (id) {
      categoriesIds.push(id);
    } else {
      const docRef = await addDoc(collection(db, "categories"), {
        name: category.name,
      });
      categoriesIds.push(docRef.id);
      console.log("Added category ", category.name, categoriesIds);
    }
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
    const isExist = await isSongExistInCategory(
      songsCollRef,
      data.title,
      data.source
    );
    console.log(element, isExist);
    if (!isExist) {
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
  }
};
