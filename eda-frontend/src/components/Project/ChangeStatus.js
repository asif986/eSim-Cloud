import { Button, Paper, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getStatus, changeStatus } from '../../redux/actions'

function ChangeStatus({ publication }) {
    const dispatch = useDispatch()
    const [status, setStatus] = React.useState(null)
    const [note, setNote] = React.useState("")
    const handleSelectChange = (event) => {
        setStatus(event.target.value)
    };
    const clickChangeStatus = () => {
        dispatch(changeStatus(publication.details.publication_id, status, note))
    }
    const onChangeNote = (e) => {
        setNote(e.target.value)
    }
    useEffect(() => {
        if(publication.details)
        {
            setNote(publication.details.reviewer_notes)
        }
        dispatch(getStatus(publication.details?.publication_id))
    }, [dispatch, publication.details])
    return (
        <Paper>
            {publication.states &&
                <div style={{ padding: ' 0 1% 1% 1%', textAlign: 'left' }}>
                    <br />
                    <h3 style={{ marginTop: '0' }}>Review the project and change it's state</h3>
                    <h3 style={{ marginTop: '0' }}>Current State : {publication.details?.status_name}</h3>
                    <TextField
                        style={{ width: '50%', marginBottom: '2%' }}
                        placeholder='Reviewer Notes'
                        multiline
                        value={note}
                        defaultValue={publication.details?.reviewer_notes}
                        onChange={onChangeNote}
                        rows={2} />
                    <InputLabel style={{ marginTop: '0' }}>Select and Change the status of this project</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{ width: '50%' }}
                        onChange={handleSelectChange}
                        value={status}
                    >
                        {publication.states.map((item, index) =>
                        (
                            <MenuItem value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                    <Button style={{ float: 'right' }} variant='contained' color='primary' onClick={clickChangeStatus}>Change Status</Button>
                </div>
            }
        </Paper>
    )
}

export default ChangeStatus
