import React, {useEffect} from 'react';
import ContentContainer from "../components/content_container/ContentContainer";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import {getGroups} from "../store/actions/groupActions";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router";
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import {getAllUsers} from "../store/actions/userActions";

const columns = [
    {
        id:0,
        label:<Grid3x3Icon/>
    },
    {
        id:1,
        label:"Логин"
    },
    {
        id:2,
        label:"ФИО"
    },
    {
        id:3,
        label:"Роль"
    },
    {
        id:4,
        label:"Телефон"
    },
    {
        id:5,
        label:"email"
    },
    {
        id:6,
        label:"Действия"
    }
]

const Users = () => {
    const groups = useSelector(state=>state.user.users)
    console.log(groups);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetch = async ()=>{
        try{
            dispatch(getAllUsers())
        }catch (e){

        }
    }

    useEffect(()=>{
        fetch()
    },[])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <ContentContainer title={"Пользователи"}>
            <Paper sx={{ width: '100%', overflow: 'hidden', padding:3 }}>
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                    <Button variant="contained" onClick={()=>{navigate("/groups/group/new")}}>Добавить</Button>
                </div>
                <TableContainer sx={{ maxHeight: 640, marginTop:2 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column,num) => (
                                    <TableCell key={num}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            <TableCell>
                                                {number}
                                            </TableCell>
                                            <TableCell>
                                                {row.login}
                                            </TableCell>
                                            <TableCell>
                                                {`${row.surname || ""} ${row.name || ""} ${row.second_name || ""}`.trim()}
                                            </TableCell>
                                            <TableCell>
                                                {row.role}
                                            </TableCell>
                                            <TableCell>
                                                {row.phone || "Не указан"}
                                            </TableCell>
                                            <TableCell>
                                                {row.email || "Не указан"}
                                            </TableCell>
                                            <TableCell>
                                                <SettingsIcon cursor={"pointer"}></SettingsIcon>
                                                <DeleteIcon cursor={"pointer"} style={{marginLeft:"10px"}}></DeleteIcon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={groups.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </ContentContainer>
    );
};

export default Users;