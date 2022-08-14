import { Routes, Route } from "react-router-dom"


import './shop.style.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {setCategories} from "../../store/categories/category.action";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoryArray));
        };

        getCategoriesMap();
    }, []);
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
};

export default Shop;
