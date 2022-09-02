import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories


export const selectCategories = createSelector(
    [selectCategoryReducer],   //Input selector
    (categoriesSlice) => categoriesSlice.categories //Output selector
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) =>  categoriesSlice.isLoading
)
