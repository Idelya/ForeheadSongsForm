import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { CategoryType } from "../types";

export const useCategories = (triggerRefresh) => {
  const [categories, setCategries] = useState<CategoryType[]>([]);

  const fetchCategories = async () => {
    await getDocs(collection(db, "categories")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategries(newData as CategoryType[]);
    });
  };

  useEffect(() => {
    if (!triggerRefresh) {
      fetchCategories();
    }
  }, [triggerRefresh]);

  return { categories };
};
