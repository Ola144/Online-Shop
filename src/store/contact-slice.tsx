import { createSlice } from "@reduxjs/toolkit";
import { get, push, query, ref, set } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

interface IContact {
  contactList: any[];
  loading: boolean;
}

const initialState: IContact = {
  contactList: [],
  loading: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
    },
    fetchNotLoading: (state) => {
      state.loading = false;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.contactList = action.payload;
    },
  },
});

export const { fetchLoading, fetchNotLoading, fetchSuccess } =
  contactSlice.actions;
export default contactSlice.reducer;

export const sendContact =
  (contactObj: object): any =>
  async (dispatch: any) => {
    dispatch(fetchLoading());

    try {
      let user;
      const localUser = localStorage.getItem("onlineShopUsers");
      if (localUser != null) user = JSON.parse(localUser);

      const contactRef = push(ref(database, "contacts"));
      const id = contactRef.key;
      await set(contactRef, {
        userId: user.uid,
        contactId: id,
        date: new Date().toLocaleString("en-Us", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        ...contactObj,
      });
      toast.success("Contact Sent Successfully!");
      dispatch(fetchNotLoading());
      dispatch(getContact());
    } catch (error: any) {
      toast.error(error.message);
      dispatch(fetchNotLoading());
    }
  };

export const getContact = (): any => async (dispatch: any) => {
  dispatch(fetchLoading());

  try {
    const contacRef = ref(database, "contacts");
    const q = query(contacRef);
    await get(q).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() || {};
        const dataArray = Object.values(data);
        dispatch(fetchSuccess(dataArray));
      } else {
        dispatch(fetchSuccess([]));
      }
    });
  } catch (error: any) {
    toast.error(error.message);
    dispatch(fetchNotLoading());
  }
};
