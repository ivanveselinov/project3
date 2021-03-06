import React, { Profiler, useEffect, useState } from 'react'
import { useContextProvider } from '../../context/StateProvider';
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from '../../firebase/Firebase';
import ReadDB from '../container/ReadDB'

export const Connection = () => {
    const [{ lections, filteredLections, selectedCategory }, dispatch] = useContextProvider();
    const [lection, setLection] = useState([]);
    const [realtimeLectures] = useCollection(
        db.collection("lection").orderBy("timestamp", "desc").limit(150) // desc going down last one on top db is connected
        );
                         //Delete 
    const handleDelete = (lectionId) => {  
        const newLection = [...lection];
        const index = lection.findIndex((lection) => lection.id === lectionId);
        newLection.splice(index, 1);

        setLection(newLection);

        db.collection("lection").doc(lectionId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            // console.error("Error removing document: ", error);
        });
    }

      useEffect(() => {
        const myLections = [];
        realtimeLectures?.docs.map((lecture) => {
          console.log('i am realTime lecures',realtimeLectures)
          myLections.push({
            id: lecture.id,    
            title: lecture.data().title,
            description: lecture.data().description,
            postImage: lecture.data().postImage,
            category: lecture.data().category,
            timestamp: lecture.data().timestamp ,
            user: lecture.data().user,
          });
          console.log('lections',myLections)
        });
        dispatch({
          type: "ADD_PRODUCTS",
          payload: myLections,
        });
      }, [realtimeLectures]);
    
     

    return (
         
         <div>
                {/* showing the products conditionaly if any categore is selected or not */}
      {selectedCategory
        ? filteredLections.map(
            (
                lecture //show all feeds from db
            ) => (
              <ReadDB
              key={lecture.id}
              lectionId={lecture.id} //comments
              lecture={lecture}
              title={lecture.title}
              description={lecture.description}
              category={lecture.category}
              timestamp={lecture.timestamp}
              createAt={lecture.timestamp}
              user={lecture.user}
              postImage={lecture.postImage}
              handleDelete={handleDelete}
              />
            )
          )
        : // if there is no product selected show all the products
          lections?.map(
            (
                lecture //show all feeds from db
            ) => (
              <ReadDB
              key={lecture.id}
              lectionId={lecture.id} //comments
              lecture={lecture}
              title={lecture.title}
              description={lecture.description}
              category={lecture.category}
              timestamp={lecture.timestamp}
              createAt={lecture.timestamp}
              user={lecture.user}
              postImage={lecture.postImage}
              handleDelete={handleDelete}
              />
            )
          )}
                </div>
    )

}
  
