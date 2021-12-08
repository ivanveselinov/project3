import React from 'react'
import { useContextProvider } from "../../context/StateProvider"


function Category(props) {
    const[{selectedCategory}, dispatch] = useContextProvider();
   
    const clickToCategory = () => {
        console.log("clickToCategory")
        dispatch({
            type: "SELECT_CATEGORY",
            payload: selectedCategory === props.label ? "" : props.label,
          });
        };

    return (
        <div className={`flex justify-between items-center cursor-pointer mb-2 ${
             
        selectedCategory === props.label && "bg-gray-200 p-2 "
      }`}
      onClick={clickToCategory}
    >
      <div className="border rounded-full">
        {/* <Icon /> */}
      </div>
      <div>{props.label}</div>
        </div>
    )
}

export default Category
