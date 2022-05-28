import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    categories: [],
    loading: false,
    error: false,
    category: 'All',
}

export const getAllCategories = createAsyncThunk(
    'categories/getAllCategories',
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/categories')

            return response.data.categories
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getCategory = createAsyncThunk(
    'categories/getCategory',
    async(categoryId, { rejectWithValue, getState }) => {
        try {
            const response = await axios.get(`/api/categories/${categoryId}`)
            return response.data.category
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        allVideos: state => {
            state.category = 'All'
        },
    },
    extraReducers: {
        [getAllCategories.pending]: state => {
            state.loading = true
            state.error = false
        },
        [getAllCategories.fulfilled]: (state, { payload }) => {
            state.categories = payload
            state.loading = false
            state.error = false
        },
        [getAllCategories.rejected]: state => {
            state.error = true
            state.loading = false
        },
        [getCategory.pending]: state => {
            state.loading = true
            state.error = false
            state.category = {}
        },
        [getCategory.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.category = payload
        },
        [getCategory.rejected]: state => {
            state.error = true
            state.loading = false
            state.category = {}
        },
    },
})

export default categoriesSlice.reducer

export const { allVideos } = categoriesSlice.actions