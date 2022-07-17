import { useEffect, useRef, useState } from "react";
import Card from "./Card";

interface SearchBarProps {

}
function SearchBar(props: SearchBarProps) {
    const [focus, setFocus] = useState<boolean>(false)
    const [showSuggestionBox, setShowSuggestionBox] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [latestProducts, setLatestProducts] = useState<any>([]);
    const [popularSuggestions, setPopularSuggestion] = useState<any>([]);

    const inputRef = useRef<any>(null);
    const apiUrl = 'https://fakestoreapi.com/products?limit=5'
    useEffect(() => {
        const getData = async () => {
            inputRef.current && inputRef.current.focus()
            await fetch(apiUrl)
                .then(res => res.json())
                .then(json => setLatestProducts(json))
            await fetch('https://fakestoreapi.com/products/categories')
                .then(res => res.json())
                .then(json => setPopularSuggestion(json))
        }
        getData()
    }, [focus])

    const focusHandler = () => {
        setFocus(!focus)
    }

    const onChangeHandler = (e: any) => {
        const value = e.target.value;
        setInputValue(value);
        setShowSuggestionBox(true)
    }

    return (<div className="input">
        <input name="search" ref={inputRef} onFocus={focusHandler} onChange={(e) => onChangeHandler(e)} value={inputValue} />
        {showSuggestionBox && <div className="suggestion-box">
            <div className="latest-trends">
                <h3>Latest Trends</h3>
                {latestProducts.map((element: any) => {
                    return (
                        <div className="row">
                            <Card image={element.image} category={element.category} />
                        </div>
                    )
                })}
            </div>
            <div className="popular-suggestion">
                <h3>Popular Suggestion</h3>
                <ul>
                    {popularSuggestions?.map((element: any) => {
                        return (
                            <li>{element}</li>
                        )
                    })}
                </ul>
            </div>
        </div>}
    </div>)
}

export default SearchBar;
