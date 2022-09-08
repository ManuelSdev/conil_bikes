// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    //reducerPath: clave única que define dónde el store Redux almacenará el caché.
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        /*
        headers globales sustituidos por headers propios de cada parte del api
        prepareHeaders: (headers) => {
            //headers.set('Authorization', `Bearer ${token}`);
            headers.set('Content-Type', 'application/json; charset=UTF-8');
            headers.set('Accept', 'application/json');
            return headers;
        }
        */
    }),
    tagTypes: ['User', 'Product', 'Order'],
    //endpoints: conjunto de operaciones que queremos realizar contra el servidor
    endpoints: (builder) => ({
        ejemplo: builder.query({
            query: (name) => `pokemon/${name}`,
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    // useAddOrderMutation,
    useEjemploQuery,
} = baseApi


/**
Now that we have defined the endpoints, React hooks to access them will
 be automatically generated. The names of hooks generated all take the form 
 use<endpoint name><endpoint type> in camelCase. For tasks, the hooks’ name will 
 be useTasksQuery; for addTask, it will be useAddTaskMutation, and so on. You can 
 view all the hooks generated by logging taskApi in the browser console with 
 console.log(taskApi). Let’s export the hooks so that we can use it in our components.
  Add the following lines of code at the bottom of the taskApi.js file:
 */