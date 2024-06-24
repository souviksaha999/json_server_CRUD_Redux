import React from 'react'
import Layout from '../Common/Layout'
import { useDispatch } from 'react-redux'
import { UsersFetch } from '../Slices/UsersSlice'
import { useQuery } from '@tanstack/react-query'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { Link } from 'react-router-dom'
import { DeleteUser } from '../Slices/DeleteSlice'




export default function AllUsers() {

    const dispatch = useDispatch()

    const getUsers = async () => {
        try {
            const response = await dispatch(UsersFetch())
            return response?.payload
        } catch (error) {
            return error
        }
    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['allusers'],
        queryFn: getUsers,
    })

    console.log("ALL_USERS DATAAA.....", data)

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const handleDelete = async(idd)=>{
        // alert(idd)
        await dispatch(DeleteUser(idd))
        refetch()
    }


    return (
        <Layout>
            <h1>All Users</h1>

            <Button variant='contained' color='secondary'> <Link to="/adduser" style={{textDecoration : "none", color: "white"}}>  Add User </Link> </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.isArray(data) && data.map((item, index) => {
                                return (
                                 
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >

                                            <TableCell align="center">{item.id}</TableCell>
                                            <TableCell align="center">{item.name}</TableCell>
                                            <TableCell align="center">{item.email}</TableCell>
                                            <TableCell align="center">{item.phone}</TableCell>
                                            <TableCell align="center">
                                                <Button> <Link to={`/details/${item.id}`}> <RemoveRedEyeOutlinedIcon color='info' /> </Link> </Button>
                                                <Button> <Link to={`/edituser/${item.id}`}> <EditNoteOutlinedIcon color='secondary' /> </Link> </Button>
                                                <Button onClick={()=>handleDelete(item.id)}> <DeleteSweepOutlinedIcon color='warning' />  </Button>
                                            </TableCell>

                                        </TableRow>
                                )
                            })

                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}
