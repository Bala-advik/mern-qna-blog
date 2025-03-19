import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { QnAList } from "../../interface/QnA.model";
import customAPIController from "../../interface/custom-api-controller";

interface QnAState {
  qnaList: QnAList[];
  filteredList: QnAList[];
  loading: boolean;
  searchVal: string;
  qnaCategory: string;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  error: string | null;
  refreshCount: number;
}

const initialState: QnAState = {
  qnaList: [],
  filteredList: [],
  qnaCategory: "js",
  loading: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  searchVal: "",
  error: null,
  refreshCount: 0,
};

export const fetchQnARedux = createAsyncThunk(
  "items/fetchQnA",
  async (qnaCategory: string) => {
    const response = await customAPIController.get<QnAList[]>(
      `${import.meta.env.VITE_API_URL}/v1/qna?category=${qnaCategory}`
    );
    return response.data;
  }
);

export const updateQnARedux = createAsyncThunk(
  "items/updateQnA",
  async ({ id, formValues }: { id: string; formValues: any }) => {
    const response = await customAPIController.put(
      `${import.meta.env.VITE_API_URL}/v1/qna/${id}`,
      formValues
    );
    return response.data;
  }
);

const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    searchItems(state, action: PayloadAction<string>) {
      const query = action.payload.toLowerCase();
      state.filteredList = state.qnaList.filter((qna) =>
        qna.question.toLowerCase().includes(query)
      );
    },
    setEditModalOpen(state) {
      state.isEditModalOpen = true;
    },
    setDeleteModalOpen(state) {
      state.isDeleteModalOpen = true;
    },
    resetModalsClose(state) {
      state.isDeleteModalOpen = false;
      state.isEditModalOpen = false;
    },
    resetSearch(state) {
      state.filteredList = state.qnaList;
    },
    resetAll(_state) {
      _state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQnARedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQnARedux.fulfilled,
        (state, action: PayloadAction<QnAList[]>) => {
          state.qnaList = action.payload;
          state.filteredList = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchQnARedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch items";
      })
      .addCase(updateQnARedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQnARedux.fulfilled,
        (state, action: PayloadAction<QnAList>) => {
          const updatedQna = action.payload;
          const qnaIndex = state.qnaList.findIndex(
            (qna) => qna._id === updatedQna._id
          );
          if (qnaIndex !== -1) {
            state.qnaList[qnaIndex] = updatedQna;
          }
          state.filteredList = state.qnaList;
          state.loading = false;
          state.isEditModalOpen = false;
          state.refreshCount++;
        }
      )
      .addCase(updateQnARedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update item";
      });
  },
});

export const {
  searchItems,
  resetSearch,
  setEditModalOpen,
  setDeleteModalOpen,
  resetModalsClose,
  resetAll,
} = qnaSlice.actions;
export default qnaSlice.reducer;
