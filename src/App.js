import React, {useEffect, useState} from "react";
import classes from './App.module.css';
import Select from "./Select/Select";
import {useNavigate} from "react-router";


function App() {
   const types = ['terms', 'brands_terms', 'styles']

   const [selected, setSelected] = useState(() => {
      const localString = window.localStorage.getItem('artCode')

      if (localString)
         return JSON.parse(localString)

      return {
         terms: '',
         brands_terms: '',
         styles: ''
      }
   })

   const navigate = useNavigate()

   const changeHandler = (value, type) => {
      setSelected(prev => ({...prev, [type]: value}))
   }

   // Navigate and add to localStorage on change selected
   useEffect(() => {
      // Create url
      const url = Object.keys(selected).reduce((acc, key) => {
         if (selected[key])
            return `${acc}/${key[0]}-${selected[key]}`

         return acc
      }, '')

      navigate(url)

      // Set selected data to local storage
      window.localStorage.setItem('artCode', JSON.stringify(selected))
   }, [selected])

   return (
      <div className={classes.container}>
         {types.map(el => (
            <Select
               key={el}
               type={el}
               selected={selected[el]}
               changeHandler={changeHandler}
            />
         ))}
      </div>
   );
}

export default App;
