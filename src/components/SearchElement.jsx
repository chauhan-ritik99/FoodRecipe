import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import TrendingSlider from './TredingSlider';
import { useParams, Link } from 'react-router-dom';

const SearchElement = () => {
    const { searchTerm } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const result = await api.json();
            setData(result.meals);
        };
        
        fetchData();
    }, [searchTerm]);

    return (
        <>
            <Navbar />
            <div style={{
                width: '90%',
                margin: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
                gridGap: '1rem',
                marginTop: '2rem'
            }}>  
                {data && data.length > 0 ? (
                    data.map((d) => (
                        <Link to={`/${d.idMeal}`} className='link' key={d.idMeal}>
                            <div style={{ textAlign: 'center' }}>
                                <div className="img">
                                    <img src={d.strMealThumb} alt="" style={{ width: '13rem' }} />
                                </div>
                                <h3>{d.strMeal}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No meals found for "{searchTerm}"</p>
                )}
            </div>

            <TrendingSlider />
        </>
    );
};

export default SearchElement;
