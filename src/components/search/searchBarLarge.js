import { SearchIcon } from "@heroicons/react/solid"
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

function SearchBarLg() {
    const [searchVal, setSearchVal] = useState('');
    const [inputFocused, setInputFocused] = useState(false);

    const handleInput = (e) => {
      setSearchVal(e.target.value);
    }
  
    const handleClearBtn = () => {
      setSearchVal('');
    }

    const inputRef = useClickAway(() => {
      setInputFocused(false);
    });
  return (
    <div ref={inputRef} className={`group relative flex items-center rounded-full bg-[--searchbar-tinted-base] hover:bg-[--searchbar-tinted-press] h-[50px] w-[330px] text-sm border-[2px] hover:border-solid 
      ${inputFocused ? 'border-[--home-text-light] border-solid' : 'hover:border-[--background-tinted-highlight] border-transparent '} `}>
        <svg className={`absolute left-[15px] group-hover:text-[--home-text-light] ${searchVal ? 'text-[--home-text-light]' : 'text-neutral-200'}`}
        role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z" fill="currentColor"></path></svg>
        <input
          onClick={() => setInputFocused(true)}
          onChange={handleInput}
          value={searchVal}
          type="text"
          name="product-search"
          id="product-search"
          placeholder="What do you want to listen to?"
          className="w-full h-full py-4 ps-10 pe-12 bg-transparent outline-none text-[--home-text-light] placeholder-neutral-200"
        />
       <svg className={`absolute left-[300px] text-[--home-text-light] ${searchVal ? 'visible' : 'invisible'}`}
       onClick={handleClearBtn}
       role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M1.47 1.47a.75.75 0 0 1 1.06 0L8 6.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L9.06 8l5.47 5.47a.75.75 0 1 1-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 0 1 0-1.06z" fill="currentColor"></path></svg>
      </div>
  )
}
export default SearchBarLg