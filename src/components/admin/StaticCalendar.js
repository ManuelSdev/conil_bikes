
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import BookingPickersDay from '../booking/bookingPickersDay';
import ContentCard from '../contentCard/ContentCard';
import ContentCardBody from '../contentCard/ContentCardBody';
import esLocale from 'date-fns/locale/es';
import { useGetBookingsQuery } from '../../app/store/services/bookingApi';
import format from 'date-fns/format';
import { addMonths, set } from 'date-fns';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import Link from '../elements/Link';


export default function StaticCalendar() {
    //  console.log('RENDER STATIC CALENDAR')
    //Obtiene el primer día del mes del mes actual que muestra por defecto el calendario
    //Este es el mismo formato que pasa onMonthChange
    //Esta primera fecha, pasada al día 1, se usa en la primera petición para
    //encontrar las reservas que corresponden al mes actual, que es el que muestra por defecto
    //el calendario
    const firstDay = set(new Date(), { date: 1, hours: 0, minutes: 0, seconds: 0 })

    const [value, setValue] = React.useState(null);

    const [date, setDate] = React.useState(firstDay)
    const [skip, setSkip] = React.useState(true)


    //addMonth sera el extremo del rango para buscar fechas dentro del mes actual
    const dateToRange = (date) => ({ from: date, to: addMonths(date, 1) })

    const rangeToISORange = ({ from, to }) => ({ from: from.toISOString(), to: to.toISOString() })

    const toParamsToString = obj => {
        const searchParams = new URLSearchParams(obj)
        return searchParams.toString()
    }

    const pipe = (...fns) => arg => fns.reduce((acc, fn) => fn(acc), arg)

    const dateRangeQuery = date => pipe(
        dateToRange,
        rangeToISORange,
        toParamsToString,
    )(date)

    //onMonthChange pasa la Date así Tue Nov 01 2022 00:00:00 GMT+0100 (hora estándar de Europa central)
    //cuando cambias el mes del calendario
    //Al pasar a ISO, será un día antes porque la Date se registra a las 00:00h e ISO va con 2h menos
    const handleMonthChange = newDate => {
        //  console.log('handleMonthChanges')
        setDate(newDate)
    }
    // console.log('cambiaDate', date)
    const handleChange = newValue => {
        setValue(newValue);
    }

    const handleRenderDay = (a, b, c) =>
        //console.log('handleRenderDay') ||
        BookingPickersDay(bookingDatesOnMonth)(a, b, c)

    const { data: bookingDatesOnMonth, isLoading, isSuccess, refetch, isFetching } = useGetBookingsQuery(
        dateRangeQuery(date),
        {
            //  skip,
            // refetchOnMountOrArgChange: true
        })
    /*
        React.useEffect(() => {
            skip && setSkip(false)
        }, [])
    */
    // console.log('=============', bookingDatesOnMonth)
    //bookingsOnMonth será un array de objetos tipo [{from,to},{from,to},...] 
    //con las fechas de las reservas del mes en formato ISO

    return (

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                //openTo="year"
                renderDay={handleRenderDay}
                loading={isLoading}
                renderLoading={() => <CircularProgress />}
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={handleChange}
                onMonthChange={handleMonthChange}
                renderInput={(params) => <TextField {...params} />}
                disabled
            />
        </LocalizationProvider>



    );
}
