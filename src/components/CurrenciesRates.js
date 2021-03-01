import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
export default function CurrenciesRates() {
// 1. ESTADOS
    // DATOS DEL API
    const [data, setData] = useState({})
    // DATOS DE SI ESTÁ CARGANDO O NO
    const [loading, setLoading] = useState(true)
    // DATOS DE LAS FECHAS DE LOS INPUTS
    const [date, setDate] = useState({
        startDate: "2020-01-01",
        endDate: "2020-02-28"
    })
    const { currency } = useParams()
    useEffect(() => {
        const getRates = async (cur) => {
            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}`)
            const rates = await res.data.rates
            const labels = Object.keys(rates)
            const dataValues = Object.keys(rates).map((e) => {
                return rates[e][cur]
                // rates."2020-01-01".ILS
            })
            setData({
                labels: labels, // 39 fechas
                datasets: [
                    {
                        label: "Tipo de cambio USD",
                        data: dataValues, // 39 datos
                        borderColor: "blue",
                        pointBackgroundColor: "red",
                        pointRadius: 5
                    }
                ]
            })
            setLoading(false)
        }
        getRates(currency)
    },[currency, date])
    const handleDate = (e) => {
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
    }    
    return (
        <div class="w-10/12">
            <nav class="bg-white shadow bg-gray-800">
                <input 
                class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.startDate}
                    name="startDate"
                />
                <input 
                class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.endDate}
                    name="endDate"
                />
            </nav>
            <div className="mt-10">
            {
                loading ?
                <h1>Cargando...</h1>
                :
                <Line 
                data={data}
                />
            }
            </div>
        </div>
    )
}

