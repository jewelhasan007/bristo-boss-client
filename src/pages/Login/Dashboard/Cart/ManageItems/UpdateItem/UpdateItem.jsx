import { useLoaderData, useParams } from "react-router-dom";
import CategoryTitle from "../../../../../../Shared/CategoryTitle/CategoryTitle";
import { useEffect, useState } from "react";


const UpdateItem = () => {
const item = useLoaderData();
console.log(item)
const [itemMenu, setItemMenu] = useState([]);

useEffect(()=>{
    fetch("http://localhost:5000/menu")
    .then(res=>{
        console.log(res)
        setItemMenu(itemMenu)
    })
    .then(error=>{console.log(error)})
},[])

    return (
        <div>
            <CategoryTitle
            subHeading="Refresh Info"
            heading="Update an Item"
            ></CategoryTitle>
            <div>
               <h1>The Menu id is: </h1>
            </div>
            
        </div>
    );
};

export default UpdateItem;