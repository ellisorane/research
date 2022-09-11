import { configureStore } from "@reduxjs/toolkit";

import paymentSlice from "../features/payment/paymentSlice";
import projectsSlice from "../features/projects/projectsSlice";
import searchBarSlice from "../features/searchBar/searchBarSlice";

export default configureStore({
    reducer: {
        payment: paymentSlice,
        projects: projectsSlice,
        searchBar: searchBarSlice
    }
})