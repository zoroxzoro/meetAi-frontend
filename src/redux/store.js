// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../redux/Api/UserApi.js";
import { agentsApi } from "./Api/AgentApi.js";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [agentsApi.reducerPath]: agentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(agentsApi.middleware),
});

export default store;
