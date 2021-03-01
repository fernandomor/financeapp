import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default function Sidebar() {
    const [currencies, setCurrencies] = useState([])
    useEffect(() => {
        const getCurrencies = async () => {
            const res       = await axios.get("https://api.exchangeratesapi.io/latest")
            const data      = await res.data.rates
            const arrData   = Object.keys(data)
            setCurrencies(arrData)
        }
        getCurrencies()
    }, [])
    return (
        <>
            <div class="flex flex-col w-64 h-screen py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
    <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Currencies</h2>
    <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
            <ul>

            

        {
                currencies.map((e,i) => {
                    return(
                        <li class="flex items-center px-4 py-2 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                            <Link key={i} to={`/${e}`}>
                            <span class="mx-4 font-medium">{e}</span>
                            </Link>
                        </li>
                    )
                })
            }
    
           
            </ul>
        </nav>
    </div>
</div>
        </>
    )
}






            
            