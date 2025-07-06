import { configureStore } from "@reduxjs/toolkit";

// (Optional: you can import slices or APIs here)
import { api } from "../redux/Api/UserApi.js";

const store = configureStore({
    reducer: {
        // RTK Query reducer
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;
