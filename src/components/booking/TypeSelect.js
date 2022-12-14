import { Box, FormControl, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField } from "@mui/material"

import { useEffect, useState } from "react"

import { useDispatch, useSelector } from 'react-redux';
import { getDate, getSize, getType } from '../../app/store/selectors';
import { useGetRangesQuery, useGetTypesQuery, useGetTypesQueryState, useLazyGetRangesQuery, useLazyGetTypesQuery } from "../../app/store/services/filterApi"
import { typesMap } from "../../lib/utils/detailsMaps"
import { setType } from "../../app/store/bookingFormSlice"

const TypeSelect = () => {

    const dispatch = useDispatch()
    const isoDate = useSelector(getDate)
    const selectedSize = useSelector(getSize)
    const selectedType = useSelector(getType)

    const params = (b) => new URLSearchParams(b)
    const args = params({ ...isoDate, size: selectedSize }).toString()

    const handleChange = (event) => {
        dispatch(setType(event.target.value))
    };


    const [trigger, { data: avaiableTypes, isLoading, isSuccess, unsubscribe }, lastPromiseInfo] = useLazyGetTypesQuery()


    useEffect(() => {
        selectedType &&
            //   console.log('@@@@@@@@ dispatch typeSelect') ||
            dispatch(setType(''))
        selectedSize && trigger(args)
    }, [selectedSize]);

    const loadingLabel = () => (
        <Box>
            Cargando tipos de bicicleta
            <LinearProgress
                sx={{
                    //      backgroundColor: 'grey',
                    //      color: 'red',
                    //display: 'flex',
                    //       justifySelf: 'center',
                    //      position: 'relative',
                    //   '&..MuiCircularProgress-root.MuiCircularProgress-svg': { position: 'relative' },
                }}
            />
        </Box>)

    return (
        <FormControl fullWidth disabled={!!!selectedSize}>
            <InputLabel id="bike-type-select-label"
                sx={{ width: '100%' }}
            >{isLoading ?
                loadingLabel()
                :
                'Tipo'
                }
            </InputLabel>
            <Select
                required
                labelId="bike-type-select-label"
                id='bike-type-select'
                onChange={handleChange}
                label='Type'
                value={selectedType}
            >
                {typesMap.map(type => {
                    const [engType, spaType] = type
                    return (
                        < MenuItem
                            disabled={avaiableTypes ? !avaiableTypes.includes(engType) : true}
                            key={engType} value={engType}>
                            {spaType.charAt(0).toUpperCase() + spaType.slice(1)}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl >
    )
}

export default TypeSelect