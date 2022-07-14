import React, {useEffect, useState} from 'react'
import classes from './Select.module.css'


const Select = (props) => {
   const [options, setOptions] = useState([])

   useEffect(() => {
      (async () => {
         try {
            const url = `https://autobooking.com/api/test/v1/search/${props.type}`

            const response = await fetch(url, {
               method: 'GET',
               cache: 'no-cache',
               headers: {
                  'Accept-Language': 'ua'
               }
            })

            const data = await response.json()

            if (response.ok) {
               setOptions(data.data)
            } else {
               throw data
            }

         } catch (e) {
            console.log(e)
         }
      })()
   }, [props.type])

   return (
      <div className={classes.container}>
         <label htmlFor={props.type}></label>

         <select
            name={props.type}
            id={props.type}
            value={props.selected}
            onChange={e => props.changeHandler(e.target.value, props.type)}
         >
            <option value={''}>
               ---Select---
            </option>

            {options.map(el => (
               <option key={el.slug} value={el.slug}>
                  {el.label}
               </option>
            ))}
         </select>
      </div>
   )
}

export default Select