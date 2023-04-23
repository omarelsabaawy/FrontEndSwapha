import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchModel() {

    const [search, setSearch] = useState();
    const navigate = useNavigate();
    const handleSubmit = () => {
        return navigate(`/${localStorage.getItem('location')}/search/${search}`);
    }

    return (
        <div class="search-model">
            <div class="h-100 d-flex align-items-center justify-content-center">
                <div class="search-close-switch">+</div>
                <form
                    class="search-model-form"
                    onSubmit={handleSubmit}
                    onKeyDown={(event) => { event.key === 'Enter' && handleSubmit() }}
                >
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Search here....."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
}

export default SearchModel;