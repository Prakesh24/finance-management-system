import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import StorePage from '../pages/app/Home/storePage';
import CategoryPage from '../pages/app/category';
import StoreLayout from '../components/layout/store-layout';
import appCategoryServices from '../services/app/category.service';
import appStoreService from '../services/app/store.service';

const StoreRoutes = () => {
    const { stateName, cityName } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const mallId = data?.length > 0 ? data[0]?._id : null
    const location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                let res = await appStoreService.getStoresByStateAndCity(stateName, cityName)
                if (res) {
                    setData(res.data)
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [stateName, cityName, location])
    return (
        <Routes>
            <Route element={<StoreLayout mallId={mallId} loading={loading} data={data} />}>
                <Route path='/shops' element={<StorePage data={data} loading={loading} />} />
                <Route path='/category/:categoryName/:categoryId' element={<CategoryPage />} />
            </Route>
        </Routes>
    );
}

export default StoreRoutes;
