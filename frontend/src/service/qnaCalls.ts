import axios from "axios";

export const fetchQnA = async (categoryName: string) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/qna?category=${categoryName}`
  );
};
