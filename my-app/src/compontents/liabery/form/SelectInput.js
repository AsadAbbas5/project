import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SelectInput(props) {
    const { input, meta, options, label, ...rest } = props;
    const { touched, error } = meta;

    return (
        <FormControl sx={{marginTop:"2rem",width:"50%",marginLeft:"4rem"}} error={touched && error ? true : false}>

            <InputLabel >{input.label}</InputLabel>
            <Select
                {...input}
                {...rest}
                label={input.label}
                size='small'
            >
                {
                    options.map((option, index) => {
                        return (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        )
                    })
                }
            </Select>
            <FormHelperText error>
                {
                    touched && error ? error : <span>&nbsp;</span>
                }
            </FormHelperText>
        </FormControl>
    )
}

export default SelectInput